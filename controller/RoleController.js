const Database = require('../database/server');
const activity=require('./LogactivityController');
const table_name='role';
const config = require('config');
var Joi = require('@hapi/joi');

// ====================index(get values)================================

const index = (req, res)=>{
  // activity.activity_store('hi');
    // console.log((req.headers['authorization']));
    var items_per_pages = req.query.items_per_page;
    var current_page_no = req.query.current_page_no;
    var search = req.query.search;
    var status_connection = req.query.status_connection;
   
    var data = `SELECT * FROM ${table_name} WHERE status = 1`

    // if(status_connection && status_connection==1){
    //     var data= data + ` WHERE status = ${config.get('status.active')}`;
    // }else{
    //     var data= data + ` WHERE status != ${config.get('status.delete')}`;
    // }

    // if(search !== '' && search != undefined){
    //     var data= data + ` AND role LIKE '%${search}%'`;
    // }

    if(items_per_pages && current_page_no){
        var current_page_starting_no = (items_per_pages * (current_page_no - 1));
        var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
    }
    // activity()
    Database.getDb().query(data, function(err, result) {
    if (err) {
        res.status(500).send(err);
    } else {      
      // console.log(activityw);
        Database.getDb().query(`SELECT * FROM ${table_name}`, function(error, countresult) {
            var result_data = {'status':'success','total_count': countresult.length, 'data':result};
            res.status(200).json(result_data);
      });
    } 
  }); 
};

// ============================custom=============================
  const custom = function(req, res){
    var data = `SELECT role.* FROM role_permission INNER JOIN role ON  role_permission.role_id != role.id WHERE role_permission.status =1 AND role.status = 1`
    Database.getDb().query(data, function(error, roleresult) {
      if(error){
          var result_data = {'status':'Error', 'data':error};
          res.status(500).json(result_data);
        }
      var result_data = {'status':'success','data':roleresult};
      res.status(200).json(result_data);
      });
  
  };
  
// ============================create=============================

  const create = (req, res)=>{

    var id = req.body.id;
    if(id){
    var response = updatevalidateRole(req.body); 
    }else{
     var response = validateRole(req.body); 
    }
    if(response.error) 
      {   
        var errorMessage=[];
          response.error.details.forEach(element => {
          errorMessage.push({ field : element.context.label , message : element.message })
        });
        res.status(422).json(errorMessage);
      } 
    else
    { 
    var element = req.body;
     
        if (id && id !="") {
        element.updated_by = 1;
        var sql = `UPDATE ${table_name} SET role = '${element.role}', updated_by = ${element.updated_by} WHERE id = ${id}`;
        var message = "Update";
      } else {
        element.status=config.get('status.active');
        element.created_by = 1;

        var sql = `INSERT INTO ${table_name} (${Object.keys(element)}) VALUES ("${element.role}",${element.status},${element.created_by})`;
        var message = "Created";
      }
    
      Database.getDb().query(sql, function(error, response){
        if(error){
          res.status(500).send(error);
        }else{
          element.id=response.insertId;
          // console.log({user_log_id:1,jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:1});
            activity.activity_store({user_log_id:req.headers['userlogid'],jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:req.headers['id']},(acterror,actresult)=>{
              if(actresult !== "success"){res.status(500).send(acterror);}
              var result_data = {'status':'success','message':'Role '+message +' Successfully' };
              res.status(200).json(result_data);
          });

      
        }
     });
 
    } 
  
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
  updatevalidateRole=(user)=>{
    
      const JoiSchema = Joi.object({ 
        role : Joi.string().required(),
        id   : Joi.number().required()
    });
    
  return JoiSchema.validate(user) 
}

   validateRole = (user)=>{
    const JoiSchema = Joi.object({ 
      role : Joi.string().required(),

  }).options({ abortEarly: false }); 

  return JoiSchema.validate(user) 
  }
  // ==========================
  module.exports={index,create,show,edit,update,custom,statusChange}
























