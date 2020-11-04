const Database = require('../database/server');
const activity=require('./LogactivityController');
const table_name='document_managment';
const config = require('config');
var Joi = require('@hapi/joi');
const multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/docs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})
var fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype === 'application/pdf'||file.mimetype === 'application/doc' || file.mimetype === 'application/docx' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(null, false);

  }
}
// ====================index(get values)================================

const index = (req, res)=>{
  // activity.activity_store('hi');
    // console.log((req.headers['authorization']));
    var items_per_pages = req.query.items_per_page;
    var current_page_no = req.query.current_page_no;
    var search = req.query.search;
    var status_connection = req.query.status_connection;
   
    var data = `SELECT * FROM ${table_name}`

    if(status_connection && status_connection==1){
        var data= data + ` WHERE status = ${config.get('status.active')}`;
    }else{
        var data= data + ` WHERE status != ${config.get('status.delete')}`;
    }

    if(search !== '' && search != undefined){
        var data= data + ` AND name LIKE '%${search}%'`;
    }

    if(items_per_pages && current_page_no){
        var current_page_starting_no = (items_per_pages * (current_page_no - 1));
        var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
    }
    Database.getDb().query(data, function(err, result) {
    if (err) {
        res.status(500).send(err);
    } else {      
        Database.getDb().query(`SELECT * FROM ${table_name}`, function(error, countresult) {
            var result_data = {'status':'success','total_count': countresult.length, 'data':result};
            res.status(200).json(result_data);
      });
    } 
  });
};

// ============================custom=============================
  const custom = function(req, res){
    console.log(req.query)
      res.send('custom');
  };
  
// ============================create=============================

  const create = (req, res)=>{
    let upload = multer({ storage: storage, fileFilter: fileFilter}).single('docs');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
           res.send(req.fileValidationError);
      }else if (err instanceof multer.MulterError) {
           res.send(err);
      }else if (err) {
           res.send(err);
      }
      console.log(req.file);
    var id = req.body.id;
    if(id){
        var response = updatedocs(req.body);  
        }else{
         var response = validatedocs(req.body);  
        }
      if(response.error || !id ? !req.file : null){        
            var errorMessage=[];
            if (!id && req.file === undefined) {
              errorMessage.push({ field: 'Docs', message: 'Document is not allowed to empty' })
            }
            if(response.error){
              response.error.details.forEach(element => {
                errorMessage.push({ field : element.context.label , message : element.message })
              });
            }
            res.status(422).json(errorMessage);
 
          } else{ 
    var element = req.body;
    if(req.file){
        var path = req.file.destination + "/" + req.file.filename;
        element.docs = path.replace("./", "");
      }
        if (id && id !=""){
        element.updated_by = req.headers['id'];
        var sql = `UPDATE ${table_name} SET name = '${element.name}',docs = '${element.docs}', updated_by = ${element.updated_by} WHERE id = ${id}`;
        var message = "Update";
      } else {
        element.status=config.get('status.active');
        element.created_by = req.headers['id'];

        var sql = `INSERT INTO ${table_name} (name,docs,status,created_by) VALUES ("${element.name}","${element.docs}",${element.status},${element.created_by})`;
        var message = "Created";
      }
      Database.getDb().query(sql, function(error, response){
        if(error){
          res.status(500).send(error);
        }else{
          element.id=response.insertId;
            activity.activity_store({user_log_id:req.headers['userlogid'],jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:req.headers['id']},(acterror,actresult)=>{
              if(actresult !== "success"){res.status(500).send(acterror);}
              var result_data = {'status':'success','message':'Document'+message +' Successfully' };
              res.status(200).json(result_data);
          });
        }
     });
 
    } 
});
  
    };
  
    const update = (req, res)=>{
      res.send('update forum ' + req);
    };
    const show = (req, res)=>{
      console.log(req.params);
      // res.send('show forum ' + req.params.forum);
    };
  
    const edit = (req, res)=>{
      Database.getDb().query(`SELECT * FROM ${table_name} WHERE id = ${req.params.id}`, function(error, result) {
        var result_data = {'status':'success',data:result};
        res.status(200).json(result_data);
  });
    };

  //  ====================status change================ 
    const statusChange = (req, res)=>{
      
    if(config.get('status.active') == req.params.status){
    var message = "Active";
    }else if(config.get('status.inactive') == req.params.status){
      var message = "InActive";
    }else{
      var message = "Deleted";
    }
    Database.getDb().query(`UPDATE ${table_name} SET status = ${req.params.status} WHERE id = ${req.params.id}`, function(error, result) {
        var result_data = {'status':'success','message':'Role '+message+' Successfully'};
        
      res.status(200).json(result_data);
    });
      // res.send('show forum ' + req.params.forum);
    };
// =============validation==================
  updatedocs=(user)=>{
    
      const JoiSchema = Joi.object({ 
        name : Joi.string().required(),
        id   : Joi.number().required(),
        docs  : Joi.string()
    });
    
  return JoiSchema.validate(user) 
}

   validatedocs = (user)=>{
    const JoiSchema = Joi.object({ 
      name : Joi.string().required(),

  }).options({ abortEarly: false }); 

  return JoiSchema.validate(user) 
  }
  // ==========================
  module.exports={index,create,show,edit,update,custom,statusChange}
























