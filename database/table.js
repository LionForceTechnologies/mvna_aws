// CALLBACK Fuction
// CALLBACK Fuction

// DROP TABLE table_name;
var phpmyadmin = require("./server");
const fs = require("fs"); 

const show_db_name = cb => {
  var sql = `SELECT DATABASE()`;
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      cb(result, "success");
    }
  });
};
const show_table = (cb) => {
  var sql = `SHOW TABLES LIKE 'push'`;
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      // result.forEach(element => {
      //   element.show_table = Object.values(element)[0];
      // });
      cb(result, "success");
    }
  });
};
const show_columns = (element, cb) => {
  var sql = `SHOW COLUMNS FROM ${element.table_name}`;
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      var temp_store = [];
      result.forEach(v => {
        if (
          v.Field != "created_by" &&
          v.Field != "updated_by" &&
          v.Field != "id" &&
          v.Field != "status" &&
          v.Field != "created_at" &&
          v.Field != "updated_at"
        ) {
          temp_store.push(v);
        }
      });
      cb(temp_store, "success");
    }
  });
};

const table_create = (element, cb) => {
  var sql = `SHOW TABLES LIKE '${element.table_name}'`;

  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {      
      if (result.length == 1 ) {
        var drop = `DROP  TABLE ${element.table_name}`;
        phpmyadmin.getDb().query(drop, function(err, result) {
          if (err) {
            cb(err, "error");
          } else {
            var sql = `CREATE TABLE ${element.table_name} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${element.temp_field} ,status INT default 1,created_by INT,updated_by INT,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;
            phpmyadmin.getDb().query(sql, function(err, result) {
              if (err) {
                cb(err, "error");
              } else {
                cb(result, "success");
              }
            });
          }
        });
      }else{
          var sql = `CREATE TABLE ${element.table_name} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${element.temp_field} ,status INT default 1,created_by INT,updated_by INT,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;
          phpmyadmin.getDb().query(sql, function(err, result) {
            if (err) {
              cb(err, "error");
            } else {
              cb(result, "success");
            }
          });
      }      
    }
  });
     
  
};

const table_alter = (element, cb) => {
  var drop = `DROP  TABLE ${element.table_name}`;
  phpmyadmin.getDb().query(drop, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      var sql = `CREATE TABLE ${element.table_name} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${element.temp_field} ,status INT default 1,created_by INT,updated_by INT,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;
      phpmyadmin.getDb().query(sql, function(err, result) {
        if (err) {
          cb(err, "error");
        } else {
          cb(result, "success");
        }
      });
    }
  });
};
const table_drop = (element, cb) => {
  var drop = `DROP  TABLE ${element.table_name}`;
  phpmyadmin.getDb().query(drop, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      cb(result, "success");
    }
  });
};



const table_push_insert = (element, cb) => {
  var table_name = element.table_name;
  delete element.table_name;  
  // var sql = `INSERT INTO ${table_name} (${Object.keys(element)}) VALUES ('${element.project_name}','${element.database_url}',${JSON.stringify(element.firebase_json)})`;
  var sql = `INSERT INTO ${table_name} (${Object.keys(element)}) VALUES (${Object.values(element)})`;
  console.log(sql);
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      cb(result, "success");
    }
  });
};

const table_push_list = (cb) => {
  var sql = `SELECT * FROM push WHERE status = 1`;
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      cb(result, "success");
    }
  });
};
const table_push_show_list = (id,cb) => {
  var sql = `SELECT * FROM push WHERE status = 1 and id = ${id}`;
  phpmyadmin.getDb().query(sql, function(err, result) {
    if (err) {
      cb(err, "error");
    } else {
      cb(result, "success");
    }
  });
};


module.exports = { 
  table_create,
  show_table,
  show_columns,
  show_db_name,
  table_drop,
  table_alter,
  table_push_insert,
  table_push_list,
  table_push_show_list
};
