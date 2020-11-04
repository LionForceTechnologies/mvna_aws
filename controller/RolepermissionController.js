const Database = require('../database/server');
const activity=require('./LogactivityController');
const table_name='role_permission';
const config = require('config');
var Joi = require('@hapi/joi');
const { response } = require('express');
// var json_encode = require('json_encode');   
const { array } = require('@hapi/joi');
var stringify = require('json-stringify');
// ====================index(get values)================================

const index = (req, res)=>{
    console.log(req.query);
    var items_per_pages = req.query.items_per_page;
    var current_page_no = req.query.current_page_no;
    var search = req.query.search;
    var status_connection = req.query.status_connection;
   
    var data = `SELECT role.*,role_permission.* FROM ${table_name} INNER JOIN role ON role_permission.role_id = role.id`
    if(status_connection && status_connection==1){
        var data= data + ` WHERE role_permission.status = ${config.get('status.active')}`;
    }else{
        var data= data + ` WHERE role_permission.status != ${config.get('status.delete')}`;
    }
    if(search !== '' && search != undefined){
        var data= data + ` AND role.role LIKE '%${search}%'`;
    }

    if(items_per_pages && current_page_no){
        var current_page_starting_no = (items_per_pages * (current_page_no - 1));
        var data = data + ` ORDER BY role_permission.id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
    }
    console.log(data);
  
    Database.getDb().query(data, function(err, result) {
    if (err) {
        res.status(500).send(err);
    } else {
        Database.getDb().query(data, function(error, countresult) {
            var result_data = {'status':'success','total_count': countresult.length, 'data':result};
            res.status(200).json(result_data);
            if(error){
              var result_data = {'status':'Error', 'data':error};
              res.status(500).json(result_data);
            }
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

    var id = req.body.id;
    if(id){
     var response = updatevalidateRolePermission(req.body); 
    }else{
     var response = validateRolePermission(req.body); 
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
        console.log(element.role_permission);
        var sql = `UPDATE ${table_name} SET role_id = '${element.role_id}',role_permission = ${JSON.stringify(JSON.stringify(element.role_permission))},updated_by = ${element.updated_by} WHERE id = ${id}`;
        var message = "Update";
      } else {
        element.status=config.get('status.active');
        element.created_by = 1;
        var sql = `INSERT INTO ${table_name} (role_id,role_permission,status,created_by) VALUES (${element.role_id},${JSON.stringify(JSON.stringify(element.role_permission))},${element.status},${element.created_by})`;
        var message = "Created";
      }
      console.log(sql);
     
      Database.getDb().query(sql, function(error, response){
        if(error){
          res.status(500).send(error);
        }else{

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

      // res.send('show forum ' + req.params.forum);
    };
  
    const edit = (req, res)=>{
      var sql=`SELECT role.*,role_permission.* FROM ${table_name} INNER JOIN role ON role_permission.role_id = role.id WHERE role_permission.id = ${req.params.id}`
      Database.getDb().query(sql, function(error, result) {
        if(error){
          res.status(500).send(error);
        }
        if(result.length > 0){
          result[0].role_permission=JSON.parse(result[0].role_permission);
        }
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
  updatevalidateRolePermission=(user)=>{
      const JoiSchema = Joi.object({ 
        role_id : Joi.number().required(),
        role_permission : Joi.required(),
        id   : Joi.number().required()
    });
    
  return JoiSchema.validate(user) 
}

   validateRolePermission = (user)=>{
    const JoiSchema = Joi.object({ 
        role_permission : Joi.required(),
        role_id : Joi.number().required(),
  }); 
   return JoiSchema.validate(user);  
  
  }
  function json_encode_like_in_PHP (it) {
    return JSON.stringify(it).replace(/[\u0080-\uFFFF]/g, function (match) {
      return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).slice(-4);
    });
  }
  // ==========================
  module.exports={index,create,show,edit,update,custom,statusChange}
























