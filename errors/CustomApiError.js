

class CustomApiError extends Error {
    constructor (message, status) {
        super(message)
        this.status=status
    }

    constructErrorMsg () {
        return {'status':false, msg:this.message}
    }
}



module.exports=CustomApiError