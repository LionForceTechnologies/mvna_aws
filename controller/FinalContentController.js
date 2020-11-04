const Database = require('../database/server');
const activity = require('./LogactivityController');
const table_name = 'page_output';
const config = require('config');
var Joi = require('@hapi/joi');
// const { join } = require('path');
const fs = require('fs');
const path = require("path");

// ====================index(get values)================================

const index = (req, res) => {
  // activity.activity_store('hi');
  // console.log((req.headers['authorization']));
  var items_per_pages = req.query.items_per_page;
  var current_page_no = req.query.current_page_no;
  var search = req.query.search;
  var status_connection = req.query.status_connection;

  // console.log(req.headers);
  var data = `SELECT * FROM ${table_name}`

  if (status_connection && status_connection == 1) {
    var data = data + ` WHERE status = ${config.get('status.active')}`;
  } else {
    var data = data + ` WHERE status != ${config.get('status.delete')}`;
  }

  if (search !== '' && search != undefined) {
    var data = data + ` AND role LIKE '%${search}%'`;
  }

  if (items_per_pages && current_page_no) {
    var current_page_starting_no = (items_per_pages * (current_page_no - 1));
    var data = data + ` ORDER BY id DESC LIMIT ${items_per_pages} OFFSET ${current_page_starting_no} `   //offset - skip     fetch - take
  }
  // activity()
  Database.getDb().query(data, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log(activityw);
      Database.getDb().query(`SELECT * FROM ${table_name}`, function (error, countresult) {
        var result_data = { 'status': 'success', 'total_count': countresult.length, 'data': result };
        res.status(200).json(result_data);
      });
    }
  });
};

// ============================custom=============================
const custom = function (req, res) { 
  var data = `SELECT menus.id,menus.menu,menus.status FROM ${table_name} INNER JOIN menus ON page_output.menu_id = menus.id WHERE page_output.status=1`
  // var data = `SELECT role_permission.*,role.* FROM ${table_name} INNER JOIN role ON role_permission.role_id = role.id`
var data1=`SELECT id,menu,status FROM menus WHERE parent_id = 0 AND status = 1 AND place ='w'`;

Database.getDb().query(data, function (error, countresult) {
  // var result_data = { 'status': 'success', 'total_count': countresult };
  // res.status(200).json(result_data);
  Database.getDb().query(data1, function (error, result){
    if(error){
      res.status(500).send(err);
    }else{
      var a=[]
      var final=result.concat(countresult);

      var result = final.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
    },[]);

    // console.log(result);
      // console.log(findDuplicates(strArray)) // All duplicates
      // console.log([...new Set(findDuplicates(strArray))]) // Unique duplicates

      var result_data = { 'status': 'success','total_count': result};
      res.status(200).json(result_data);
    }
  });
});
  // Database.getDb().query(data, function (error, countresult) {
  //   var result_data = { 'status': 'success', 'total_count': countresult };
  //   res.status(200).json(result_data);
  // });
};
// =============================home===============================

const home = function (req, res){   
  var data = `SELECT menus.id,menus.menu,page_output.web_html,page_output.web_css,page_output.id,page_output.menu_id FROM ${table_name} INNER JOIN menus ON page_output.menu_id = menus.id WHERE menus.url='/Home'`
  // var data = `SELECT role_permission.*,role.* FROM ${table_name} INNER JOIN role ON role_permission.role_id = role.id`
  Database.getDb().query(data, function (error, result) {
    try {
      if (result.length > 0){
        var result = [{
          id: result[0].id,menu_id: result[0].menu_id,
          web_css: JSON.parse(result[0].web_css),web_html: JSON.parse(result[0].web_html) 
        }];
      }      
      res.status(200).json(result);
    } catch (error) {        
      res.status(500).json({ status:'edit finalcontroller', line: 327, error: error });
    }
  });
};
// ============================create=============================

const create = async (req, res) => {
  // res.status(200).json(req.body);
  var id = req.body.id;
  // if(id){
  // var response = updatevalidatePage(req.body); 
  // }else{
  //  var response = validatePage(req.body); 
  // }
  // if(response.error) 
  //   {   
  //     var errorMessage=[];
  //       response.error.details.forEach(element => {
  //       errorMessage.push({ field : element.context.label , message : element.message })
  //     });
  //     res.status(422).json(errorMessage);
  //   } 
  // else
  // { 
  // console.log(req.body); 

  var element = { menu_id: req.body.menu_id, web_html: req.body.web_html, web_css: req.body.web_css, mvna_html: req.body.mvna_html, mvna_css: req.body.mvna_css, mvna_style: req.body.mvna_style, mvna_components: req.body.mvna_components, mvna_assets: req.body.mvna_assets, slug: req.body.slug, created_by: 1, status: 1, updated_by: 1 };
  if (id && id != "") {
    var sql = `UPDATE ${table_name} SET menu_id = '${element.menu_id}',web_html = ${JSON.stringify(JSON.stringify(element.web_html))},web_css=${JSON.stringify(JSON.stringify(element.web_css))},mvna_html = ${JSON.stringify(JSON.stringify(element.mvna_html))},mvna_css=${JSON.stringify(JSON.stringify(element.mvna_css))},mvna_styles=${JSON.stringify(JSON.stringify(element.mvna_style))},mvna_components=${JSON.stringify(JSON.stringify(element.mvna_components))},mvna_assets=${JSON.stringify(JSON.stringify(element.mvna_assets))},slug=${JSON.stringify(JSON.stringify(element.slug))},updated_by = ${element.updated_by} WHERE id = ${id}`;
    var message = "Update";
  } else {
    var sql = `INSERT INTO ${table_name} (menu_id,web_html,web_css,mvna_html,mvna_css,mvna_styles,mvna_components,mvna_assets,slug,status,created_by) VALUES (${element.menu_id},${JSON.stringify(JSON.stringify(element.web_html))},${JSON.stringify(JSON.stringify(element.web_css))},${JSON.stringify(JSON.stringify(element.mvna_html))},${JSON.stringify(JSON.stringify(element.mvna_css))},${JSON.stringify(JSON.stringify(element.mvna_style))},${JSON.stringify(JSON.stringify(element.mvna_components))},${JSON.stringify(JSON.stringify(element.mvna_assets))},${JSON.stringify(JSON.stringify(element.slug))},${element.status},${element.created_by})`;
    var message = "Created";
  }
 await Database.getDb().query(sql, function (error, response) {
    if (error) {
      res.status(500).send(error);
    } else { 
      var result_data = {'status':'success','message':''+message +' Successfully' };
      res.status(200).json(result_data); 
    //   activity.activity_store({user_log_id:req.headers['userlogid'],jwt_token:req.headers['authorization'],table_name:table_name,primary_id:response.insertId,event:'POST',old_value:'NULL',new_value:element,url:req.url,ip_address:req.ip,user_agent:req.headers['user-agent'],status:1,created_by:req.headers['id']},(acterror,actresult)=>{
    //     if(actresult !== "success"){res.status(500).send(acterror);}
    //     var result_data = {'status':'success','message':''+message +' Successfully' };
    //     res.status(200).json(result_data);
    // }); 
    }
  });
  // } 
};
// =============================custom ============================

// const customcreate=async(req,res)=>{
//   var id = req.body.id;
//   var mvna_html = req.body.mvna_html;
//   var mvna_components = req.body.mvna_components;
//   var mvna_assets = req.body.mvna_assets;
//   var element={ menu_id:req.body.menu_id,web_html:req.body.web_html,web_css:req.body.web_css,mvna_html:req.body.mvna_html,mvna_css:req.body.mvna_css,mvna_style:req.body.mvna_style,mvna_components:req.body.mvna_components,mvna_assets:req.body.mvna_assets,slug:req.body.slug,created_by:1,status:1,updated_by:1};
//   var menu_id=element.menu_id;

//   if(mvna_html){

//     // res.status(200).json("result_data")
//       var sql1 = `UPDATE ${table_name} SET mvna_html=${JSON.stringify(element.mvna_html)},mvna_css=${JSON.stringify(element.mvna_css)},mvna_styles=${JSON.stringify(element.mvna_style)} WHERE id = ${id}`;
//       var message = "Update";
//       await Database.getDb().query(sql1, function(error, response){
//       console.log(3);

//         if(error){res.status(200).send(error);}
//         else{
//           if(!id){id=response.insertId;}
//             var result_data = {'status':'success','message':''+message +' Successfully' ,'id':id ,'menu_id':menu_id};
//             res.status(200).json(result_data);
//          }
//      }); 
// }
// else if(id && mvna_components) {  
//   console.log(4);

//   var sql = `UPDATE ${table_name} SET mvna_components=${JSON.stringify(JSON.stringify(element.mvna_components))} WHERE id = ${id}`;
//   var message = "Update";
//   await Database.getDb().query(sql, function(error, response){
//     if(error){throw error}
//     else{
//       if(!id){id=response.insertId;}
//         var result_data = {'status':'success','message':''+message +' Successfully' ,'id':id ,'menu_id':menu_id};
//         res.status(200).json(result_data);
//      }
//  }); 
//  }else if(id && mvna_assets){
//   console.log(5);

//   var sql = `UPDATE ${table_name} SET mvna_assets=${JSON.stringify(JSON.stringify(element.mvna_assets))} WHERE id = ${id}`;
//   var message = "Update";
//   await Database.getDb().query(sql, function(error, response){
//     if(error){res.status(500).send(error);}
//     else{
//       if(!id){id=response.insertId;}
//         var result_data = {'status':'success','message':''+message +' Successfully' ,'id':id ,'menu_id':menu_id};
//         res.status(200).json(result_data);
//      }
//  }); 
//  }
//  else{

//    if(id){
//      console.log(1);
//     var sql = `UPDATE ${table_name} SET menu_id=${element.menu_id},web_html=${JSON.stringify(JSON.stringify(element.web_html))},web_css=${JSON.stringify(JSON.stringify(element.web_css))},slug=${JSON.stringify(JSON.stringify(element.slug))},status=${element.status},created_by=${element.created_by} WHERE id = ${id}`;
//     var message = "Created";
//    }else{
//     console.log(2); 

//     var sql = `INSERT INTO ${table_name} (menu_id,web_html,web_css,status,slug,created_by) VALUES (${element.menu_id},${JSON.stringify(JSON.stringify(element.web_html))},${JSON.stringify(JSON.stringify(element.web_css))},${JSON.stringify(JSON.stringify(element.slug))},${element.status},${element.created_by})`;

//     // var sql = `INSERT INTO ${table_name} (menu_id,web_html,web_css,slug,status,created_by) VALUES (${element.menu_id},"${JSON.stringify(JSON.stringify(element.web_html))}","${JSON.stringify(JSON.stringify(element.web_css))}",${JSON.stringify(JSON.stringify(element.slug))},${element.status},${element.created_by})`;
//     var message = "Created";
//    }
//    await Database.getDb().query(sql, function(error, response){
//     if(error){res.status(500).send(error);}
//     else{
//       if(!id){id=response.insertId;}
//         var result_data = {'status':'success','message':''+message +' Successfully' ,'id':id ,'menu_id':menu_id};
//         res.status(200).json(result_data);
//      }
//  }); 
//  } 
//   } 
// ===============================custom create=======================
const customcreate = (req, res) => {
  res.status(200).json("No Data Found");

  var id = req.body.id;
  var mvna_html = req.body.mvna_html;

  var mvna_components = req.body.mvna_components;
  var mvna_assets = req.body.mvna_assets;

  var element = { menu_id: req.body.menu_id, web_html: req.body.web_html, web_css: req.body.web_css, mvna_html: req.body.mvna_html, mvna_css: req.body.mvna_css, mvna_style: req.body.mvna_style, mvna_components: req.body.mvna_components, mvna_assets: req.body.mvna_assets, slug: req.body.slug, created_by: 1, status: 1, updated_by: 1 };
  var menu_id = element.menu_id;

  if (mvna_html) {
    res.status(200).json(mvna_components);


    fs.appendFile("./database/page/" + menu_id + "/mvna_html.json", `${JSON.stringify(element.mvna_html)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.appendFile("./database/page/" + menu_id + "/mvna_css.json", `${JSON.stringify(element.mvna_css)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.appendFile("./database/page/" + menu_id + "/mvna_style.json", `${JSON.stringify(element.mvna_style)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    var sql = `UPDATE ${table_name} SET mvna_html="${"database/page/" + menu_id + "/mvna_html.json"}",mvna_css="${"database/page/" + menu_id + "/mvna_css.json"}",mvna_styles="${"database/page/" + menu_id + "/mvna_style.json"}" WHERE id = ${id}`;
    var message = "Update";

  }
  else if (mvna_components) {

    fs.writeFile("./database/page/" + menu_id + "/mvna_components.json", `${JSON.stringify(element.mvna_components)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    var sql = `UPDATE ${table_name} SET mvna_components="${"database/page/" + menu_id + "/mvna_components.json"}" WHERE id = ${id}`;
    var message = "Update";

  } else if (mvna_assets) {

    fs.writeFile("./database/page/" + menu_id + "/mvna_assets.json", `${JSON.stringify(element.mvna_assets)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });
    var sql = `UPDATE ${table_name} SET mvna_assets="${"database/page/" + menu_id + "/mvna_assets.json"}" WHERE id = ${id}`;
    var message = "Update";
  }
  else {

    fs.mkdir('./database/page/' + menu_id + '/', { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.writeFile("./database/page/" + menu_id + "/web_html.json", `${JSON.stringify(element.web_html)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.writeFile("./database/page/" + menu_id + "/web_css.json", `${JSON.stringify(element.web_css)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.writeFile("./database/page/" + menu_id + "/mvna_html.json", `${JSON.stringify(element.mvna_html)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.writeFile("./database/page/" + menu_id + "/mvna_css.json", `${JSON.stringify(element.mvna_css)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    fs.writeFile("./database/page/" + menu_id + "/mvna_style.json", `${JSON.stringify(element.mvna_style)}`, function (file_err) {
      if (file_err) { res.status(500).send(file_err); }
    });

    // var sql = `UPDATE ${table_name} SET mvna_html="${"database/page/" + menu_id + "/mvna_html.json"}",mvna_css="${"database/page/" + menu_id + "/mvna_css.json"}",mvna_styles="${"database/page/" + menu_id + "/mvna_style.json"}" WHERE id = ${id}`;
    // var message = "Update";

    if (id) {
      var sql = `UPDATE ${table_name} SET menu_id=${element.menu_id},web_html="${"database/page/" + menu_id + "/web_html.json"}",web_css="${"database/page/" + menu_id + "/web_css.json"}",mvna_html="${"database/page/" + menu_id + "/mvna_html.json"}",mvna_css="${"database/page/" + menu_id + "/mvna_css.json"}",mvna_styles="${"database/page/" + menu_id + "/mvna_style.json"}",slug="${JSON.stringify(element.slug)}",status=${element.status},created_by=${element.created_by} WHERE id = ${id}`;
      var message = "Created";
    } else {
      var sql = `INSERT INTO ${table_name} (menu_id,web_html,web_css,mvna_html,mvna_css,mvna_styles,slug,status,created_by) VALUES (${element.menu_id},"${"database/page/" + menu_id + "/web_html.json"}","${"database/page/" + menu_id + "/web_css.json"}","${"database/page/" + menu_id + "/mvna_html.json"}","${"database/page/" + menu_id + "/mvna_css.json"}","${"database/page/" + menu_id + "/mvna_style.json"}",${JSON.stringify(JSON.stringify(element.slug))},${element.status},${element.created_by})`;
      var message = "Created";
    }
  }
  if (sql) {
    Database.getDb().query(sql, function (error, response) {
      if (error) { res.status(500).send(error); }
      else {
        if (!id) { id = response.insertId; }
        var result_data = { 'status': 'success', 'message': '' + message + ' Successfully', 'id': id, 'menu_id': menu_id };
        res.status(200).json(result_data);
      }
    });
  } else {
    res.status(200).json("No Data Found");

  }


}
// ===================================================
const update = (req, res) => {
  res.send('update forum ' + req);
};
const show = (req, res) => {
  console.log(req.params);
  // res.send('show forum ' + req.params.forum);
};

const edit = (req, res) => {
  Database.getDb().query(`SELECT * FROM ${table_name} WHERE menu_id = ${req.params.id}`, function (error, result) {
    // var result_data = {'status':'success',data:result};
    if (error) {
      res.status(500).send(error);
    } else {

      try {
        if (result.length > 0) {
          var result = [{
            mvna_assets: JSON.parse(result[0].mvna_assets),
            mvna_components: JSON.parse(result[0].mvna_components),
            mvna_css: JSON.parse(result[0].mvna_css),
            mvna_html: JSON.parse(result[0].mvna_html),
            mvna_styles: JSON.parse(result[0].mvna_styles),
            web_css: JSON.parse(result[0].web_css),
            web_html: JSON.parse(result[0].web_html),
            id: result[0].id,
            menu_id: result[0].menu_id,
          }];
        }      
        res.status(200).json(result);

      } catch (error) {        
        res.status(500).json({ status: 'edit finalcontroler', line: 327, error: error });
      }

      // res.status(200).json(result);
      // try {
      //   var mvna_assets_path     = path.join(__dirname, "../"+result[0].mvna_assets);
      //   var mvna_components_path = path.join(__dirname, "../"+result[0].mvna_components);
      //   var mvna_css_path        = path.join(__dirname, "../"+result[0].mvna_css);
      //   var mvna_html_path       = path.join(__dirname, "../"+result[0].mvna_html);
      //   var mvna_styles_path     = path.join(__dirname, "../"+result[0].mvna_styles);
      //   var web_css_path         = path.join(__dirname, "../"+result[0].web_css);
      //   var web_html_path        = path.join(__dirname, "../"+result[0].web_html);

      //    if(mvna_assets_path){result[0].mvna_assets = JSON.parse(fs.readFileSync(mvna_assets_path, 'utf8'));}
      //    if(mvna_components_path){result[0].mvna_components = JSON.parse(fs.readFileSync(mvna_components_path, 'utf8'));}
      //    if(mvna_css_path){result[0].mvna_css = JSON.parse(fs.readFileSync(mvna_css_path, 'utf8'));}
      //    if(mvna_html_path){result[0].mvna_html = JSON.parse(fs.readFileSync(mvna_html_path, 'utf8'));}
      //    if(mvna_styles_path){result[0].mvna_styles = JSON.parse(fs.readFileSync(mvna_styles_path, 'utf8'));}
      //    if(web_css_path){result[0].web_css = JSON.parse(fs.readFileSync(web_css_path, 'utf8'));}
      //    if(web_html_path){result[0].web_html = JSON.parse(fs.readFileSync(web_html_path, 'utf8'));}

      // } catch (error) {
      //   res.status(500).json(error);
      // }   
      // }
      // res.status(200).json(result);

    }
  });



};
// =======================get page========================
const get_page = (req, res) => {
  Database.getDb().query(`SELECT * FROM ${table_name} WHERE menu_id = ${req.params.id}`, function (error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      try {
        if (result.length > 0) {
          var result = [{
            id: result[0].id,
            menu_id: result[0].menu_id,
            web_css: JSON.parse(result[0].web_css),
            web_html: JSON.parse(result[0].web_html)
          }];
        }      
        res.status(200).json(result);
      } catch (error) {        
        res.status(500).json({ status: 'edit finalcontroler', line: 327, error: error });
      }

    }
  });



};
//  ====================status change================ 
const statusChange = (req, res) => {

  if (config.get('status.active') == req.params.status) {
    var message = "Active";
  } else if (config.get('status.inactive') == req.params.status) {
    var message = "InActive";
  } else {
    var message = "Deleted";
  }
  Database.getDb().query(`UPDATE ${table_name} SET status = ${req.params.status} WHERE id = ${req.params.id}`, function (error, result) {
    var result_data = { 'status': 'success', 'message': 'Page ' + message + ' Successfully' };
    res.status(200).json(result_data);
  });
  // res.send('show forum ' + req.params.forum);
};
// =============validation==================
updatevalidatePage = (user) => {

  const JoiSchema = Joi.object({
    id: Joi.number().required(),
    menu_id: Joi.number().required(),
    web_html: Joi.string().required(),
    mvna_html: Joi.string().required(),
    web_css: Joi.string().required(),
    mvna_css: Joi.string().required(),
    mvna_style: Joi.string().required(),
    mvna_components: Joi.string().required(),
    mvna_assets: Joi.string().required(),
  });

  return JoiSchema.validate(user)
}

validatePage = (user) => {
  const JoiSchema = Joi.object({
    menu_id: Joi.number().required(),
    web_html: Joi.string().required(),
    mvna_html: Joi.string().required(),
    mvna_css: Joi.string().required(),
    web_css: Joi.string().required(),
    mvna_style: Joi.string().required(),
    mvna_components: Joi.string().required(),
    mvna_assets: Joi.string().required(),
    slug: Joi.object(),
    status: Joi.number(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user)
}
// ==========================
module.exports = { index,create,home,show,get_page,edit,update,custom,statusChange,customcreate }
























