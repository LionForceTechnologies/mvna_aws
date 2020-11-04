const Database = require('../database/server');
const activity=require('./LogactivityController');
const table_name='menus';
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
   var menu=req.query.menu;
    var data = `SELECT * FROM ${table_name}`
    var data1 = `SELECT * FROM ${table_name}`

    if(status_connection && status_connection==1){
        var data= data + ` WHERE status = ${config.get('status.active')} AND place = '${config.get('place.website')}'`;
    }else{
        var data= data + ` WHERE status != ${config.get('status.delete')} AND place = '${config.get('place.website')}'`;
    }

    if(menu == 0){
        var data= data + 'AND parent_id = 0';
    }else if(menu == 1){
        var data= data + 'AND parent_id != 0';
    }

    if(search !== '' && search != undefined){
        var data= data + ` AND role LIKE '%${search}%'`;
    }

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
        Database.getDb().query(data1, function(error, countresult) {
            var result_data = {'status':'success','total_count': countresult.length, 'data':result};
            res.status(200).json(result_data);
      });
    } 
  });
};

// ============================custom=============================
  const custom = function(req, res){

    var data = `SELECT * FROM menus`;

    var data= data + ` WHERE status = ${config.get('status.active')} AND place = 'w' AND parent_id = 0 ORDER BY serial ASC`;
    Database.getDb().query(data, function(error, result) {
      if(error){
        res.status(500).send(error);
      }else{
        result.forEach((element,key) => {
          Database.getDb().query(`SELECT * FROM menus where parent_id = ${element.id}`, function(error1, result1) {
        element['sub_menus']=result1;
          if(key+1 == result.length){
            var result_data = {'status':'success','total_count': result.length, 'data':result};
            res.status(200).json(result_data);
          }
        });
        });
      }
});
    // console.log(req.query)
    //   res.send('custom');
  };

  // ======================================web menu=====================
  const web_menu = function(req, res){
    var data = `SELECT * FROM menus`;
    // var role_permission = `SELECT * FROM role_permission WHERE role_id=${req.headers['webloginroleid']}`;
    var role_permission = `SELECT * FROM role_permission WHERE role_id=${req.headers['webloginroleid']}`;

    Database.getDb().query(role_permission, function(permissionerror, permissionresult) {
      if(permissionerror){ 
        res.status(400).json(permissionerror);
      }
      if(permissionresult.length > 0){
        var arrayjson=JSON.parse(permissionresult[0].role_permission);
        var menusql =`SELECT * FROM menus WHERE id IN (`+arrayjson+`) AND status = ${config.get('status.active')} AND parent_id = 0 ORDER BY serial ASC`
        Database.getDb().query(menusql, function(menuerror, menuresult) {
          if(menuerror){
            res.status(400).json(menuerror);
          }
      if(menuresult.length > 0){
        menuresult.forEach((element,key) => {
          Database.getDb().query(`SELECT * FROM menus WHERE id IN (`+arrayjson+`) AND parent_id = ${element.id}`, function(submenuerror, submenuresult) {
         element['sub_menus']=submenuresult;
          if(key+1 == menuresult.length){
            var result_data = {'status':'success','total_count': menuresult.length, 'data':menuresult};
            res.status(200).json(result_data);
          }
        });
        });
      }else{
        var result_data = {'status':'success','total_count': menuresult.length, 'data':menuresult};
            res.status(200).json(result_data);

      }
        
    });
      }else{
        res.status(200).json("Need a Permission From Admin To Access");

      }
           
     });


//     var data= data + ` WHERE status = ${config.get('status.active')} AND place = 'w' AND parent_id = 0 ORDER BY serial ASC`;
//     Database.getDb().query(data, function(error, result) {
//       if(error){
//         res.status(500).send(error);
//       }else{
//         result.forEach((element,key) => {
//           Database.getDb().query(`SELECT * FROM menus where parent_id = ${element.id}`, function(error1, result1) {
//          element['sub_menus']=result1;
//           if(key+1 == result.length){
//             var result_data = {'status':'success','total_count1': result.length, 'data':result};
//             res.status(200).json(result_data);
//           }
//         });
//         });
//       }
// });
    // console.log(req.query)
    //   res.send('custom');
  };
  // ============================sub-menu collab==========================
  const submenuStructure = function(req, res){

    var items_per_pages = req.query.items_per_page;
    var current_page_no = req.query.current_page_no;
    var search = req.query.search;

    var data = `SELECT * FROM ${table_name}`
    var data1 = `SELECT * FROM ${table_name} WHERE status = ${config.get('status.active')} AND place = 'w' AND parent_id != 0`
 
    if(search !== '' && search != undefined){
      var data= data + ` AND menu LIKE '%${search}%'`;
  }

    var data= data + ` WHERE status = ${config.get('status.active')} AND place = 'w' AND parent_id != 0`;

    if(items_per_pages && current_page_no){
      var current_page_starting_no = (items_per_pages * (current_page_no - 1));
      var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
  }

    Database.getDb().query(data, function(error, result) {
      if(error){
        res.status(500).send(error);
      }else{
  console.log(result.length);

if(result.length != 0){
  result.forEach((element,key) => {
    Database.getDb().query(`SELECT menu FROM menus where id = ${element.parent_id}`, function(error1, result1) {
  element.parent_menu=result1[0].menu;
    if(key+1 == result.length){
      Database.getDb().query(data1, function(error, countresult) {
        var result_data = {'status':'success','total_count': countresult.length, 'data':result};
        res.status(200).json(result_data);
});
    }
    });
  });
}else{
  var result_data = {'status':'success','total_count': result.length, 'data':result};
        res.status(200).json(result_data);
}
      }
});
    // console.log(req.query)
    //   res.send('custom');
  };

  // =============================check menu========================
  const checkmenu = (req, res)=>{
    Database.getDb().query(`SELECT * FROM ${table_name} WHERE parent_id = ${req.query.id} AND status != ${config.get('status.delete')}`, function(error, result) {
    if(error){
      res.status(422).json(error);
    }else{
      var result_data = {'status':'success','total_count':result.length};
      res.status(200).json(result_data);
    } 
}); 
  };
// ============================create=============================

  const create = (req, res)=>{

      console.log(req.body);
    var id = req.body.id;
    if(id){
    var response = updatevalidateMenu(req.body); 
    }else{
     var response = validateMenu(req.body); 
    }
    // console.log(response.error);
    // res.status(422).json(response.error);
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
    var element={ menu:req.body.menu,place:req.body.place,url:req.body.url,serial:req.body.serial,parent_id:(req.body.parent_id) != undefined ? req.body.parent_id : 0,icon:req.body.icon,status:config.get('status.active'),created_by:1}
     
        if (id && id !="") {
        element.updated_by = 1;
        var sql = `UPDATE ${table_name} SET menu = '${element.menu}', place = '${element.place}', parent_id = ${element.parent_id}, url = '${element.url}', serial = ${element.serial},updated_by = ${element.updated_by} WHERE id = ${id}`;
        var message = "Update";
      } else {
    
        console.log(config.get('status.active'));    
        console.log(element);
        var sql = `INSERT INTO ${table_name} (menu,place,parent_id,url,serial,icon,status,created_by) VALUES ('${element.menu}','${element.place}',${element.parent_id},'${element.url}','${element.serial}','${element.icon}',${element.status},${element.created_by})`;
        var message = "Created";
      }
    
      Database.getDb().query(sql, function(error, response){
        if(error){
          res.status(500).send(error);
        }else{
          element.id=response.insertId;
          activity.activity_store({user_log_id:req.headers['userlogid'],jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:req.headers['id']},(acterror,actresult)=>{
            if(actresult !== "success"){res.status(500).send(acterror);}
            var result_data = {'status':'success','message':'Menu '+message +' Successfully' };
            res.status(200).json(result_data);
          })
          
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
        console.log(result[0].parent_id);
        if(result[0].parent_id != 0){
          Database.getDb().query(`SELECT menu FROM menus where id = ${result[0].parent_id}`, function(error1, result1) {
            result[0].parent_menu=result1[0].menu;
            var result_data = {'status':'success','data':result};
            res.status(200).json(result_data);
              });
        }else{
          var result_data = {'status':'success',data:result};
          res.status(200).json(result_data);
        }
  });
    };
// ============================delete all=================
    const Truncate = (req,res) =>{
      if(req.body.check == 'menu'){
        console.log(req.body);
        var deleteMenu = `DELETE FROM ${table_name} WHERE id IN (${req.body.id})`;
        var i = true;

      // }else if (req.body.check == 'submenu'){
      //   var deleteMenu = `DELETE FROM ${table_name} WHERE id IN (${req.body.id})`;
      //   var i = true;
      }else if(req.body.check == "all"){
        var deleteMenu = `DELETE FROM ${table_name}`;
        var i = true;

      }

      if(i){
       
        Database.getDb().query(deleteMenu, function(error, result) {
          if(error){
            res.status(500).send(error);
          }else{
            var result_data = {'status':'success',data:"Records deleted Successfully"};
            res.status(200).json(result_data);
          }
    });
      }
    }
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
updatevalidateMenu=(user)=>{
    
      const JoiSchema = Joi.object({ 
        id   : Joi.number().required(),
        menu : Joi.string().required(),
      place : Joi.string().required(),
      url : Joi.string().required(),
      serial : Joi.number().required(),
      icon : Joi.string(),
      parent_id : Joi.string().required(),

    });
    
  return JoiSchema.validate(user) 
}

   validateMenu = (user)=>{
    const JoiSchema = Joi.object({ 
      menu : Joi.string().required(),
      place : Joi.string().required(),
      url : Joi.string().required(),
      serial : Joi.number().required(),
      icon : Joi.string(),
      parent_id : Joi.number(),
  }).options({ abortEarly: false }); 

  return JoiSchema.validate(user) 
  }
  // ==========================
  module.exports={index,create,show,edit,update,custom,statusChange,submenuStructure,checkmenu,Truncate,web_menu}
























