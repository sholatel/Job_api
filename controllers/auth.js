const userDb = require('../models/User')
const customError=require('../errors/CustomApiError')
const CustomApiError = require('../errors/CustomApiError')
const AuthenticationError=require('../errors/AuthenticationError')
const httpStatus=require('http-status-codes')
const constructSuccessJson= require('../api_messages/successApiLogicHandler')
require('express-async-errors')

//api user model logic

//create new User logi 
const createNewUser = async (req,res)=> {    
    const user=req.body
    const newUser= await userDb.create(user)
    if (!newUser) {
        
    }
    const token=newUser.createToken()
    res.status(httpStatus.CREATED).send(constructSuccessJson('New user created successfully',token)) 
}

//sign in existing user
const login = async (req,res)=> {
    
    const {email,password}= req.body
    if (!email || !password) {
        console.log(req.body)
        throw new AuthenticationError('Please provide login credentials')
    }

    const newUser = await userDb.findOne({email:email})
    if(!newUser) {
        throw new AuthenticationError(`No User is registered with email ${email}`)
    }

    const token =newUser.createToken()
    const isUserAuthorized = await newUser.validatePassword(password) 
    if (!isUserAuthorized) {
        throw new AuthenticationError ('Invalid login credential')
    }
    
    res.status(httpStatus.OK).json(constructSuccessJson('User login successfully',token))
}


module.exports ={createNewUser, login}
