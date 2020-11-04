const { role } = require('./role.schema');

const rolevalidate=async(req,res,next)=>{

}

module.exports = {

    addRoleValidation : async(req,res,next)=>{
        try {
            const value = await role.validate(req.body); 
            next();
        } catch (error) { 
            if(error.isJoi === true){
                res.status(422).json({status : "Error", message : "Validation Error",data :error.details });
            }else{
                res.status(500).json({ status : "Error", message : "Server Error", data :error});
            }
          
        }
         
        
    }
}