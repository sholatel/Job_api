const httpStatus=require('http-status-codes')
const CustomApiError =require('./CustomApiError')

//bad request error 
class NotFound extends CustomApiError  {
    constructor(message) {
        super(message)
        this.status=httpStatus.NOT_FOUND
    }
} 

module.exports=NotFound