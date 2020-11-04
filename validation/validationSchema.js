const joi = require('@hapi/joi');

const roleSchema = joi.object({
        name :joi.string().required(),
        role : joi.string().required(),
    })

module.exports={roleSchema};
