require('dotenv').config();
const express = require('express');
const db = require('../database/server');
const app = express();
const jwt = require('jsonwebtoken');
var Joi = require('@hapi/joi');
const authorize = require('../authorization-middleware');
const bcrypt = require('bcryptjs');
const createToken = require('../services/token.service');
const multer = require('multer');
const table_name = 'users';
const config = require('config');
const moment = require('moment')
const randtoken = require('rand-token') 

var refreshTokens = {} 
var SECRET = "SECRETO_PARA_ENCRIPTACION" 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '.jpeg')
  }
})
var fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);

  }
}
var upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });


app.post('/register', upload.single('image'), async (req, res) => {
console.log(req.file);
  try { 
    var id = req.body.id;
    console.log(id);
  if (id) {
    var response = updateRegister(req.body)
  } else {
    var response = validateRegister(req.body);
  }
 
  // if (response.error || !id ? req.file === undefined : null) {
    if (response.error) {
        var errorMessage = [];
        // if (!id && req.file === undefined) {
        //   errorMessage.push({ field: 'Image', message: 'Image is not allowed to empty' })
        // }
        if (response.error) {
          response.error.details.forEach(element => {
            errorMessage.push({ field: element.context.label, message: element.message })
          });
        }

        res.status(500).json({ 'status': 'error', 'message': errorMessage });
  } else {
    var element = req.body;
    element.status = 1;
    if (req.file) {
      var path = req.file.destination + "/" + req.file.filename;
      element.avatar = path.replace("./", "");
      var img_update = `,avatar='${element.avatar}'`;
    }else{
      element.avatar = "NULL";
    }

    if(req.body.password){
      const SALTROUND = 10;
      let hashedPassword = bcrypt.hashSync(req.body.password, SALTROUND);
      element.password = hashedPassword;
      var password = `,password='${hashedPassword}'`;
    }

    if (id && id != "") {
        element.updated_by = 1;
        var sql = `UPDATE ${table_name} SET name = '${element.name}',role_id = '${element.role_id}',mobile_number = '${element.mobile_number}',email = '${element.email}',status = '${element.status}', updated_by = ${element.updated_by}`;
        var message = "Update";
        if (img_update) {
          var sql = sql + img_update;
        } 
        if(password){
          var sql = sql + password;
        }
        var sql = sql + ` WHERE id = ${id}`;
    } else {
      element.status = config.get('status.active');
      element.created_by = 1;
      var sql = `INSERT INTO ${table_name} (name,role_id,email,mobile_number,password,status,avatar,created_by) VALUES ("${element.name}","${element.role_id}","${element.email}",${element.mobile_number},"${element.password}",${element.status},"${element.avatar}",${element.created_by})`;
      var message = "Created";
      console.log(sql);
    }   

    db.getDb().query(sql, function (error, response) {
      if (error) {
        res.status(500).json({ "status": "Server Error", "error": error });
      } else {
        //   element.id=response.insertId;
        // console.log({user_log_id:1,jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:1});
        // activity.activity_store({user_log_id:1,jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:1},(acterror,actresult)=>{if(actresult !== "success"){res.status(500).send(acterror);}});
        var result_data = { 'status': 'success', 'message': 'User Register Successfully' };
        res.status(201).json(result_data);
      }
    });
  }
  } catch (error) {
    res.status(500).json({ 'status': 'error', 'message': error });
    
  }
  


  // console.log(new Date().toISOString(),req.file);  

  // try {
  //     // const salt =await bcrypt.genSalt();
  //     const user = {name:req.body.username ,password :hashedpassword }
  //     users.push(user);
  //     res.status(201).send(users);
  //     // console.log(salt);
  //     // console.log(hashedpassword);
  // } catch (error) {
  //     res.status(500).send();
  //     console.log(error);
  // }
  // const user={name : req.body.username ,password :req.body.username }
  // const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
  // res.json({
  //     accessToken : accessToken
  // })
})




app.post('/login', async (req, res) => {
  console.log(req.body); 
  // const SALTROUND=10;
  // let hashedPassword=bcrypt.hashSync(req.body.password,SALTROUND);
  if(req.body.email && req.body.password){
    db.getDb().query(`SELECT * FROM users WHERE email = '${req.body.email}'`, function (error, result) {
      if (error) { 
        res.status(500).json({ "status": "Server Error", "error": error });
      }
      if (result.length == 0) return res.status(400).json({ "status": 'Cannot Find User,Incorrect User ID ' });
      if (bcrypt.compareSync(req.body.password, result[0].password)) {
        var userdetail = {
          id: result[0].id, roleId: result[0].role_id, name: result[0].name, email: result[0].email
        }
        var jwtToken = createToken(userdetail);
        
        // console.log(userdetail.id);
        db.getDb().query(`UPDATE ${table_name} SET jwt_token = '${jwtToken}' WHERE id = ${userdetail.id}`, function (error1, result1) {
          if (error1) {
            res.status(500).json({ "status": "Server Error", "error": error1 });
          } 
          let time=moment().format('YYYY-MM-DD hh:mm:ss a');
  
          var user_log=`INSERT INTO user_log (jwt_token,user_id,role_id,log_in) VALUES ("${jwtToken}","${userdetail.id}","${userdetail.roleId}","${time}")`;
          db.getDb().query(user_log, function (error2, result2) {
            if(error2){
            res.status(500).json({ "status": "Server Error1", "error": error2 });
            }
            userdetail.userlogid=result2.insertId;
            res.status(200).json({ "status": 'Login Successfully', Token: jwtToken, userdetail: userdetail});
          })
  
          
        });
      } else {
        res.status(400).json({ "status": 'Credential Missmatch' })
      }
    });
  }else{
    res.status(500).json({ "status": "Need To Fill All Mandatory Fields" });

  }
 

  // const user=users.find(users=>users.name===req.body.name)
  // if(user == null) return res.status(400).send('cannot find user');
  // try {
  //     if(await bcrypt.compare(req.body.password,user.password)){
  //         const userdetail={
  //             id:1,role_id:1,name:"giriram",email:"giriramdsk@gmail.com"
  //         }
  //         jwt.sign({user:userdetail},'secret',{expiresIn:'1h'},(err,token)=>{
  //             // res.json({token,"Login Successfully"});
  //         res.json({token,"status":"Login Successfully"});

  //         })
  //         // res.send('Login Successfully');
  //     }else{
  //         res.status(400).send('Credential Missmatch')
  //         // res.send('Credential Missmatch');
  //     }
  // }catch (error) {

  // }

})


app.post('/web_login', async (req, res) => {  
 
  db.getDb().query(`SELECT * FROM users WHERE email = '${req.body.email}'`, function (error, result) {
    if (error) {
      res.status(500).json({ "status": "Server Error", "error": error });
    }
    if (result.length == 0) return res.status(400).json({ "status": 'Cannot Find User,Incorrect User ID ' });
    if (bcrypt.compareSync(req.body.password, result[0].password)) {
      var userdetail = {id: result[0].id, roleId: result[0].role_id, name: result[0].name, email: result[0].email
      }
      res.status(200).json({ "status": 'web Login Successfully', userdetail: userdetail});
    } else {
      res.status(400).json({ "status": 'Credential Missmatch' })
    }
  });
})

validateRegister = (detailed) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    role_id: Joi.number().required(),
    mobile_number: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(detailed)

}

updateRegister = (detailed) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    role_id: Joi.number().required(),
    mobile_number: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
    id   : Joi.number().required()

  }).options({ abortEarly: false });

  return JoiSchema.validate(detailed)

}

module.exports = app;