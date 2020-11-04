const express = require('express')
const db = require('../database/server');
const Resource = require('express-resource');
const app = express();
const authorize = require('../authorization-middleware');
const router = express.Router();
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
const corsPolicy = require('../config/cors.config');
const fs = require('fs');
const path = require("path");
const Database = require('../database/server');
const config = require("../config/auth.config");
var moment = require('moment')
const multer = require('multer');



// Add headers

router.use(function (req, res, next) {
    console.log("set");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});   


// router.use(function (req, res, next) {
//     let token = req.headers['authorization'];
//   if(req.headers['userlogid']){
//     if (!token) {
//         return res.status(403).send({ message: "No token provided!" ,request:req.Headers,token :req.headers});
//     }else{
//       const bearerToken=token.split(' ');
//       token=bearerToken[1];
//     //   console.log(token.replace(/\"/g, ""));
//     //   token =token.replace(/\"/g, "");
//         jwt.verify(token, config.secret, (err, decoded) => {
//             if (err) {
//                 return res.status(401).send(err);
//             }
//             // console.log(decoded,new Date(decoded.exp * 1000), new Date(decoded.iat * 1000));
//             req.userId = decoded.id;
//             req.headers.user_details=decoded.user;
//             req.headers['id']=decoded.user.id;
//             next();
//         });
//     }
//   }else{
//     return res.status(403).send({ message: "Contact Admin" });
//   }  
// })
 
router.route("/role").get(require('../controller/RoleController').index).post(require('../controller/RoleController').create); //getlist
//  router.post("/role", require('../controller/RoleController').create); //save & Update
router.get("/role/custom", require('../controller/RoleController').custom);
router.get("/role/:id", require('../controller/RoleController').show);
router.get("/role/:id/edit", require('../controller/RoleController').edit);
router.get("/role/:id/:status", require('../controller/RoleController').statusChange); //status chamge


router.get("/user", require('../controller/UserController').index); //save & Update
router.get("/user/custom", require('../controller/UserController').custom);
router.get("/user/:id", require('../controller/UserController').show);
router.get("/user/:id/edit", require('../controller/UserController').edit);
router.get("/user/:id/:status", require('../controller/UserController').statusChange); //status chamge


router.route("/rolepermission").get(require('../controller/RolepermissionController').index).post(require('../controller/RolepermissionController').create); //getlist
//  router.post("/rolepermission", require('../controller/RolepermissionController').create); //save & Update
router.get("/rolepermission/custom", require('../controller/RolepermissionController').custom);
router.get("/rolepermission/:id", require('../controller/RolepermissionController').show);
router.get("/rolepermission/:id/edit", require('../controller/RolepermissionController').edit);
router.get("/rolepermission/:id/:status", require('../controller/RolepermissionController').statusChange); //status chamge


router.get("/menu",require('../controller/MenuController').index); //getlist
router.post("/menu", require('../controller/MenuController').create); //save & Update
router.get("/menu/custom", require('../controller/MenuController').custom);
router.get("/submenu", require('../controller/MenuController').submenuStructure);
router.get("/checkmenu", require('../controller/MenuController').checkmenu);
router.post("/Truncate", require('../controller/MenuController').Truncate);
router.get("/menu/:id", require('../controller/MenuController').show);
router.get("/menu/:id/edit", require('../controller/MenuController').edit);
router.get("/menu/:id/:status", require('../controller/MenuController').statusChange); //status chamge


router.get("/member", require('../controller/MembersController').index);
router.post("/member", require('../controller/MembersController').create);
router.get("/member/custom", require('../controller/MembersController').custom);
router.get("/member/:id", require('../controller/MembersController').show);
router.get("/member/:id/edit", require('../controller/MembersController').edit);
router.get("/member/:id/:status", require('../controller/MembersController').statusChange); //status chamge

 
router.get("/final_content", require('../controller/FinalContentController').index); //getlist
router.post("/final_content", require('../controller/FinalContentController').create); //save & Update
//  router.post("/custom_create", require('../controller/FinalContentController').customcreate); //save & Update
router.get("/final_content/custom", require('../controller/FinalContentController').custom);
router.get("/final_content/:id", require('../controller/FinalContentController').show);
router.get("/final_content/:id/edit", require('../controller/FinalContentController').edit);
router.get("/final_content/:id/:status", require('../controller/FinalContentController').statusChange); //status chamge



router.get("/footer", require('../controller/FooterManagementController').index); //save & Update
router.post("/footer", require('../controller/FooterManagementController').create);
router.get("/footer/:id/edit", require('../controller/FooterManagementController').edit);

router.get("/quicklink", require('../controller/QuickinkController').index); //save & Update
router.post('/quicklink', require('../controller/QuickinkController').create);
router.get("/quicklink/custom", require('../controller/QuickinkController').custom);
router.get("/quicklink/:id", require('../controller/QuickinkController').show);
router.get("/quicklink/:id/edit", require('../controller/QuickinkController').edit);
router.get("/quicklink/:id/:status", require('../controller/QuickinkController').statusChange); //status chamge

router.get("/fileupload", require('../controller/FilesUploadController').index); //save & Update
router.post('/fileupload', require('../controller/FilesUploadController').create);
router.get("/fileupload/custom", require('../controller/FilesUploadController').custom);
router.get("/fileupload/:id", require('../controller/FilesUploadController').show);
router.get("/fileupload/:id/edit", require('../controller/FilesUploadController').edit);
router.get("/fileupload/:id/:status", require('../controller/FilesUploadController').statusChange); //status chamge


router.get("/twitter", require('../controller/TwitterController').index); //save & Update
router.get("/activity", require('../controller/LogactivityController').index); //save & Update

// ================


module.exports = router;  
 