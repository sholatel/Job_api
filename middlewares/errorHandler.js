const BadRequest = require('../errors/BadRequest')
const AuthenticationError = require('../errors/AuthenticationError')
const NotFound = require('../errors/NotFound')
const req = require('express/lib/request')
const CustomApiError = require('../errors/CustomApiError')
const customErrorMsg = {
  errorCode:500,
  errorMsg:'Something went wrong. Try again!'
}
//error handle middlware
const errorHandler= (err,req,res,next)=> {
  
        if (err instanceof CustomApiError) {
            return res.status(err.status).json(err.constructErrorMsg())
        }
        /*
        else if (err instanceof BadRequest) {
          return res.status(err.status).send(err.constructErrorMsg())
      }
      else if (err instanceof NotFound) {
        return res.status(err.status).send(err.constructErrorMsg())
    }
      
*/
       
        else if (err.name==='ValidationError') {
          customErrorMsg.errorMsg=err.message
          return res.status(customErrorMsg.errorCode).json(customErrorMsg)
        }

        else if (err.code && err.code===11000) {
          const errorKeys=Object.keys(err.keyValue)
          const errorValues= Object.values(err.keyValue)
          const  errors =  errorKeys.map((key,index) => {      
              return {[key]:`A similar ${key} with value ${errorValues[index]} has been used by another user`} //{key:}
          })
          customErrorMsg.errorMsg=errors
          return res.status(customErrorMsg.errorCode).json(customErrorMsg)
        }

        else if (err.name==='CastError') {
          const badRequest=new BadRequest(`No ID or value matched with  ${err.value}`)
           return res.status(badRequest.status).json(badRequest.constructErrorMsg())
        }
        
        return res.status(500).send(err)
                 

          
}

module.exports =errorHandler