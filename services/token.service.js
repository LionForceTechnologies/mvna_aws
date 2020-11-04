'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

module.exports = function createToken(user) {
    console.log(authConfig);
  return jwt.sign({user:user}, authConfig.secret,{ algorithm: 'HS256', expiresIn: authConfig.expiryTime } );
};
