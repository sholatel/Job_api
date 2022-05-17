const mongoDb= require('mongoose')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()


//schema definition
const userSchema = new  mongoDb.Schema({
    username: {
        type:String,
        required:[true, 'Username must be provided'],
        maxlength:[30, 'Username must not be longer than 30 characters']    
    },

    email: {
        type:String,
        unique:true,
        required:[true, 'You must provide a unique email address'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid format, please provide valid email format',]
    },

    password: {
        type:String,
        required:[true,'Password is required'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,  'Invalid password! Password must be  minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character']
       
    }
}, {timestamps: { createdAt: true, updatedAt: true }})


//password is hashed before being saved to the database
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password, salt)   
}) 

//user schema method for creating and returning api token for newly created user
userSchema.methods.createToken  =function () {
    return jwt.sign({userId:this._id,username:this.username}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    } )
}

userSchema.methods.validatePassword = async function (password) {
    console.log(password)
    return await bcrypt.compare(password, this.password)
}

module.exports=mongoDb.model('User',userSchema)





