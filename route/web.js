const express =require('express')
const bodyparser = require('body-parser');
const router = express.Router();
const Database = require('../database/server');

// router.use(function (req, res, next) {
//     let url = req.headers['url'];
//     let id = req.headers['webloginid'];
//     let role_id = req.headers['webloginroleid'];
//     // console.log(req.headers);
//     if (url){
//         if(role_id){
//             var sql =`SELECT * FROM role_permission WHERE role_id = ${role_id}`
//             Database.getDb().query(sql, function(error, result) {
//                 if(error){
//                    res.status(500).send(error);
//                 }
//            if(result.length > 0){
//               var arrayjson=JSON.parse(result[0].role_permission);
//             var sql1 =`SELECT * FROM menus WHERE id IN (`+arrayjson+`) AND url= "${url}"`
//             Database.getDb().query(sql1, function(error1, result1) {
//               if(error1){
//                 res.status(400).json(error1);
//               }
//             //   return result1;
//               if(result1.length > 0 ){
//                 next();
//               }else{
//            return res.status(403).send({ message: "No URL Access provided!" });

//               }
//             //   var result_data = {'status':'success',data:result1};
//             //   res.status(200).json(result_data);
//         });
//           }else{
//            return res.status(403).send({ message: "No permission provided!" });
//           }
//         });
//         }else{
//             return res.status(403).send({ message: "No access provided!" });

//         }
//     }else{
//         return res.status(403).send({ message: "Restricted User!!!!" });
//     } 
// })

router.get("/", require('../controller/FinalContentController').home);

router.get("/home", require('../controller/MenuController').custom); //getlist

router.get("/web_menu", require('../controller/MenuController').web_menu);
 
router.get("/member", require('../controller/MembersController').index);

router.get("/country", require('../controller/MembersController').countryget);

router.get("/quicklink", require('../controller/QuickinkController').index); //save & Update

router.get("/footer", require('../controller/FooterManagementController').index); //save & Update

router.get("/get_page/:id", require('../controller/FinalContentController').get_page);

router.get("/twitter", require('../controller/TwitterController').index); //save & Update


router.get('/run',(req,res)=>{
    res.render('index')
    })
module.exports=router;  