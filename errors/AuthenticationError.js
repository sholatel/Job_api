const httpStatus=require('http-status-codes')
const CustomApiError =require('./CustomApiError')

//bad request error 
class AuthenticationError extends CustomApiError  {
    constructor(message) {
        super(message)
        this.status=httpStatus.UNAUTHORIZED
    }

    
} 

module.exports=AuthenticationError