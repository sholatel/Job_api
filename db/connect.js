const mongoDb=require('mongoose')


const connectDb= (url) => {   
    mongoDb.connect(url)
}

module.exports=connectDb

