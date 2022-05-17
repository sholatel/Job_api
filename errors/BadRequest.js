const httpStatus=require('http-status-codes')
const CustomApiError =require('./CustomApiError')

//bad request error 
class BadRequest extends CustomApiError  {
    constructor(message) {
        super(message)
        this.status=httpStatus.BAD_REQUEST
    }
} 

module.exports=BadRequest