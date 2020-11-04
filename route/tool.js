const express =require('express')
const router = express.Router();
const db = require('../database/server');
const fs = require("fs");
const path = require("path");
const app = express();
const phptable=require('../database/table');


// router.get('/',(req,res)=>{
//     console.log(req.query.db);
//     db.getcon((err)=> {
//         if (err) throw err;
//         console.log("Connected!");
//         db.getDb().query("CREATE DATABASE "+req.query.db+"", function (err, result) {
//           if (err) throw err;
//           console.log("Database created");
//         });
//     });
// });

// router.post('/table',(req,res)=>{
//     console.log(req.body);
    // db.getcon((err)=> {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     db.getDb().query("CREATE DATABASE "+req.query.db+"", function (err, result) {
    //       if (err) throw err;
    //       console.log("Database created");
    //     });
    // });
// });


router.get("/migrate", (req, res) => {
    phptable.table_create_migration((result, status) => {
      if (status == "error") {
        res.json({ result });
      } else {
        res.json({ result });
      }
    });
  });
  
  router.post("/migration-insert", (req, res) => {
    const temp = req.body;
    // console.log(temp);
    var temp_field = [];
    const f = temp.table_field;
    f.forEach(name => {
      if (name.Null == "YES") {
        var is_null = "";
      } else {
        var is_null = "NOT NULL";
      }
      const v = name.Field + " " + name.Type + " " + is_null;
    //   console.log(v);
      temp_field.push(v);
    });
    temp.temp_field = temp_field;
    phptable.table_create(temp, (result, status) => {
      if (status == "success") {
        fs.writeFile(
          "./database/migration/" + temp.table_name + ".json",
          `${JSON.stringify(temp)}`,
          function(file_err) {
            if (file_err) {
              res.json({ file_err, status: "file can`t generated" });
            }
          }
        );
        var status="Table Create Successfully";
      }
      res.json({ result, status });
    });
  });
  
  /* automation table create,drop,alter*/
  
  router.post("/show-table-drop", (req, res) => {
    const temp = req.body;
    phptable.table_drop(temp, (result, status) => {
      res.json({ result, status });
    });
  });
  
  router.get("/show-table-list", (req, res) => {
    phptable.show_table((result, status) => {
      res.json({ result, status });
    });
  });
  
  router.post("/show-table-colums", (req, res) => {
    phptable.show_columns(req.body, (result, status) => {
      res.json({ result, status });
    });
  });
  router.get("/show-db-name", (req, res) => {
    phptable.show_db_name((result, status) => {
      res.json({ result, status });
    });
  });
  
  
router.get("/table_json_file", (req, res) => {
    const directoryPath = path.join(__dirname, "../database/migration");
    fs.readdir(directoryPath, function(err, files) {
      if (err) {
        res.json("Unable to scan directory: " + err);
      }
      var filesPush = [];
      files.forEach(function(file) {
        filesPush.push({ fullpath: directoryPath+'/' + file,filepath:file,filename:path.basename(file, path.extname(file)) });
      });
      res.json(filesPush);
    });
  });
  router.post("/table_json_file", (req, res) => {
      if (req.body.table_name != null) {
        let rawdata = fs.readFileSync(req.body.table_name);
        let table = JSON.parse(rawdata);
        res.json(table);
      }else{
        res.json('Json file can`t find it');
      }
  
  });
module.exports=router;