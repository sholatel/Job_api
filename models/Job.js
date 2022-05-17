const mongoDb= require('mongoose')
const genArticle= require('../custom_modules/articleGen')
 
const jobSchema = new mongoDb.Schema({
    title: {
        type:String,
        required:[true, 'Job title is required'],
    },

    description: {
        type:String,
        default:`${genArticle(this.title)} qualified, diligent, and hardworking ${this.title}`
    },

    company : {
        type :String ,
        default:'Personal project',
    },

    status : {
        type:String,
        default:'Pending',
        enum: {
            values:['Pending','Interview', 'Closed'],
            message:"{VALUE} job status is invalid"
        }
    },

    location : {
        type:String,
        default:'Remote',
        enum: {
            values:['Remote','On site', 'Hybrid'],
            message:"{VALUE} job location is invalid"
        }
    },

    createdBy: {
        type: mongoDb.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide specify the job creator']
    }
}, {timestamps: { createdAt: true, updatedAt: true }})


module.exports=mongoDb.model('Job',jobSchema)