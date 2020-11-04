const jwt=require('jsonwebtoken');


module.exports=()=>{
    console.log("enter");
    // console.log("1qasdcfv")
    return function (req,res,next){
        console.log(req);
    next();

    // console.log("token1");

        // const token=req.header['authorization'];
        // console.log(token);
        // if(!token){
        //     return res.status(401).send('Access Denied')
        // }else{
        //     next();

        // }
    //     console.log('middleware');
    }
}