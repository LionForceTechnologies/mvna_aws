const Database = require('../database/server');
const activity=require('./LogactivityController');
const table_name='twitter';
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
    var data = `SELECT * FROM ${table_name}`;
    var data1 = `SELECT * FROM ${table_name}`;


    if(items_per_pages && current_page_no){
        var current_page_starting_no = (items_per_pages * (current_page_no - 1));
        var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
    }
    

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

  // ==========================
  module.exports={index}
























