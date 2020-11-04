const express =require('express');
const bodyParser=require('body-parser');

var cors = require('cors')
const ejs=require('ejs');
const config = require('config');
const db = require('./database/server');
const authConfig = require('./config/auth.config');
const multer=require('multer');
const upload = multer({dest:'public/uploads/'});
// var fileUpload=require('express-fileupload'); 
const app = express();
app.use(cors());     
var timeout = require('connect-timeout'); 
app.use(timeout('200s')); 
const Twit = require('twit')
const path = require('path');
// app.use(bodyParser.json());
 
// ----body-parse------
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
// for parsing multipart/form-data
// app.use(upload.array()); 
app.use('/public',express.static('public'));
 
app.use(function(req, res, next){
  console.log("set");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  // Pass to next layer of middleware
  next();
});     
   
// ===connection =============
app.set("view engine", "ejs");

const PORT=process.env.PORT || 8080 ;


// ==========router==============
const AdminRouter=require('./route/admin');
const WebsiteRouter=require('./route/web');
const tool=require('./route/tool');
const Auth=require('./route/auth');
const { response } = require('express');


app.use('/admin',AdminRouter);
app.use('/auth',Auth);
app.use('/api',WebsiteRouter);
app.use('/db',tool);
  

var T = new Twit({
  consumer_key:         authConfig.apikey,
  consumer_secret:      authConfig.apiSecretKey,
  access_token:         authConfig.accessToken,
  access_token_secret:  authConfig.accessTokenSecret,
});

var options = { screen_name: authConfig.screen_name,count: authConfig.count };
 
 
db.getcon((err)=>{
    if(err){
        console.log(err);process.exit(1);
    }else{
        app.listen(PORT,()=>{console.log(`MVNA running in ${PORT}`)});
 
  //  ======twitter streaming========     
T.get('statuses/user_timeline', options , function(err, data) {

  for (var i = 0; i < data.length ; i++) {

    var element={screen_name:data[i].user.screen_name,twitter_id:data[i].id,twitter_time:data[i].created_at,text:data[i].text,image:data[i].user.profile_image_url_https,status:1,created_by:1};
 
   if(data[i].user.created_at){
    db.getDb().query(`SELECT twitter.* FROM twitter WHERE twitter_time = "${element.twitter_time}"`, function(error, response) {
      if(error){ 
        console.log(error,1)
      }else{ 
        if(!response.length){
          var sql =`INSERT INTO twitter (screen_name,twitter_id,twitter_time,image,text,status,created_by) VALUES ("${element.screen_name}","${element.twitter_id}","${element.twitter_time}","${element.image}","${element.text}",1,1)`;
          db.getDb().query(sql, function(error3, response3) {
          })
        }else{  
        } 
      } 
    })
   }
  } 
}) 
// ========twitter end===========
   }   
})

