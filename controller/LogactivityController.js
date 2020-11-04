const Database = require('../database/server');

var table_name="audits";


const activity_store = (element,cb) => {
console.log(element.primary_id);
element.jwt_token = element.jwt_token.replace(/\"/g, "");
var sql = `INSERT INTO ${table_name} (${Object.keys(element)}) VALUES (${element.user_log_id},"${element.jwt_token}","${element.table_name}",${element.primary_id},"${element.event}","${element.old_value}",${JSON.stringify(JSON.stringify(element.new_value))},"${element.url}","${element.ip_address}","${element.user_agent}",${element.status},${element.created_by})`;
Database.getDb().query(sql, function(err, result){
  if(err){
    cb(err,"error");
  }else{
    cb(result,"success");
  }
});
};

const index = (req, res) => {
  var items_per_pages = req.query.items_per_page;
  var current_page_no = req.query.current_page_no;
  var data = `SELECT * FROM ${table_name}`
  if (items_per_pages && current_page_no) {
    var current_page_starting_no = (items_per_pages * (current_page_no - 1));
    var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
  }
  
  Database.getDb().query(data, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      Database.getDb().query(`SELECT * FROM ${table_name}`, function (error, countresult) {
        var result_data = { 'status': 'success', 'total_count': countresult.length, 'data': result };
        res.status(200).json(result_data);
      });
    }
  });
};




module.exports={activity_store,index}







