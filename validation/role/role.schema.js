const joi = require('@hapi/joi');

const schema = {
    role: joi.object({
        name :joi.string().required(),
        role : joi.string().required(),
    })
}

module.exports=schema;

// joi.string().max(100).required(),
// joi.string().min(10).required(),
// joi.string().valid("m","f","o").required(),
// joi.string().email().required(),
// joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
// joi.number().integer().min(10000000).message("Invalid mob number").max(9999999).message('invalid number).required()