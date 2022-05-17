// function for constructing success json and also return
const constructSuccessJson = (successMsg, data) => {
    return {success:true, msg: successMsg, data:data}
}

module.exports=constructSuccessJson