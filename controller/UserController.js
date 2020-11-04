

const db = require('../database/server');
const activity=require('./LogactivityController');
const table_name='users';
const config = require('config');
var Joi = require('@hapi/joi');
const Database = require('../database/server');

const index = (req, res)=>{
  var items_per_pages = req.query.items_per_page;
    var current_page_no = req.query.current_page_no;
    var search = req.query.search;
    var status_connection = req.query.status_connection;
   
    var data = `SELECT users.id,users.name,users.email,role.role,users.avatar,users.role_id,users.status,users.created_by,users.updated_by FROM ${table_name} INNER JOIN role ON users.role_id=role.id `

    // var data = `SELECT role_permission.*,role.* FROM ${table_name} INNER JOIN role ON role_permission.role_id = role.id`
   

    if(status_connection && status_connection==1){
        var data= data + ` WHERE users.status = ${config.get('status.active')}`;
    }else{
        var data= data + ` WHERE users.status != ${config.get('status.delete')}`;
    }

    if(search !== '' && search != undefined){
        var data= data + ` AND users.name LIKE '%${search}%'`;
    }

    if(items_per_pages && current_page_no){
        var current_page_starting_no = (items_per_pages * (current_page_no - 1));
        var data = data + ` ORDER BY users.id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
    }

    Database.getDb().query(data, function(err, result) {
    if (err) {
        res.status(500).send(err);
    } else {      
      // console.log(activityw);
        Database.getDb().query(`SELECT * FROM ${table_name} `, function(error, countresult) {
            var result_data = {'status':'success','total_count': countresult.length, 'data':result};
            res.status(200).json(result_data);
      });
    } 
  });
  };

 
const custom = function(req, res){
    res.send('custom');
};

const create = (req, res)=>{
    console.log(req.body);
    // var sql = "INSERT INTO test (name,age,address) VALUES ("+req.body.name+","+req.body.age+","+req.body.address+")";
    
    //     db.getDb().query(sql, function (err, result) {
    //     if (err) throw err; 
    //     res.send("added");
    //     });
    res.send(req.body);

  };

  const show = (req, res)=>{
    res.send('show forum ' + req.params.forum);
  };

  const update = (req, res)=>{
    res.send('update forum ' + req.params.forum);
  };

  const edit = (req, res)=>{
    var sql =`SELECT users.id,users.name,users.email,role.role,users.avatar,users.mobile_number,users.role_id,users.status,users.created_by,users.updated_by FROM ${table_name} INNER JOIN role ON users.role_id=role.id WHERE users.id = ${req.params.id}`
    Database.getDb().query(sql, function(error, result) {
      if(error){
        res.status(500).send(err);
      }
      var result_data = {'status':'success',data:result};
      res.status(200).json(result_data);
});
  };
  
//  ====================status change================ 
  const statusChange = (req, res)=>{
    console.log(req.headers);
  if(config.get('status.active') == req.params.status){
  var message = "Active";
  }else if(config.get('status.inactive') == req.params.status){
    var message = "InActive";
  }else{
    var message = "Deleted";
  }
  Database.getDb().query(`UPDATE ${table_name} SET status = ${req.params.status} WHERE id = ${req.params.id}`, function(error, result) {
    var result_data = {'status':'success','message':'User '+message+' Successfully'};
    res.status(200).json(result_data);
  });
    // res.send('show forum ' + req.params.forum);
  };

module.exports={index,create,show,edit,update,custom,statusChange}