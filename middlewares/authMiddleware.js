const httpStatus = require('http-status-codes')
const AuthenticationError= require('../errors/AuthenticationError')
require('express-async-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Authenticator = async (req,res,next)=>  {
    const authParam= String (req. headers['authorization'])
    if (!authParam || !authParam.startsWith('Bearer')) {
        throw new  AuthenticationError('Authentication required, Please provide access token!')
    }

    const authParamContents= authParam.split(' ')
    if (authParamContents.length==1) {
        throw new  AuthenticationError('Authentication required, Please provide access token!') 
    }
    
    try {
    const user = jwt.verify(authParamContents[1].trim(),process.env.JWT_SECRET)
    req.user={userId:user.userId,  username:user.username}
    next()
    }

    catch (error) {
        throw new AuthenticationError (error)
    }
    
}

module.exports = Authenticator 