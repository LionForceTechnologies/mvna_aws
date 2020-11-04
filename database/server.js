const mysql =require('mysql');

var con=mysql.createConnection({
    host:'13.232.56.107',
    user:'mvna',
    password:'Password!2020',
    database:'mvna_testing',
    multipleStatements:true,
	acquireTimeout: 1000000
});   

// const connection=mysqlcon.connect((err)=>{
//     if(!err){
//         console.log("connected");
//     }else{ 
//         console.log('lost')
//     }
// });
// module.exports=connection;
const State = {
    db:null
};
const getcon =(cb)=>{
    if(State.db){
        cb();
    }else{
        con.connect((err)=>{
            if(err){
                cb(err);
            }else{
                State.db=con;
                cb();
            }
        })
    }
};

const getDb = () =>{
     return State.db;
}

// const getfunction =(query,res)=>{
//     getDb().query(query, function(error, result) {
//         res(res, "success");
//       });
// }

module.exports= { getcon,getDb }
