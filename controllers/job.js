const model=require('../models/Job')
const httpStatus=require('http-status-codes')
const BadRequest= require('../errors/BadRequest')
const apiMessage=require('../api_messages/successApiLogicHandler')
require('express-async-errors')
//api logic

//createNewJob
const createJob = async (req,res)=> {
    req.body.createdBy=req.user.userId // the job creator id
    const job =await model.create({...req.body})
    if (!job) {
        throw new BadRequest("Couldn't create new job")
    }
    console.log(job)
    res.status(httpStatus.CREATED).json(apiMessage('Job created successfully!',job))    
}

    const updateJob= async (req,res)=> {
        const jobId = req.params.id
        const job = await model.findOneAndUpdate({_id:jobId},{...req.body}, {
            new:true, runValidators:true}) //update job and return the new updated job object
        if (!job) {
            throw new BadRequest("Job update Failed!")
        }

        res.status(httpStatus.OK).json(apiMessage('Job updated successfully!',job))
    }

    const getJob = async (req,res) => {
        const jobId = req.params.id
        const job = await model.findOne({_id:jobId}) //get single job with id that matches param id
        if (!job) {
            throw new BadRequest(`Can't find job with id ${jobId}`)
        }

        res.status(httpStatus.OK).json(apiMessage('Job Found!',job))
    }

    const getAllJobs = async (req,res) => {
        const userId=req.user.userId
        const jobs = await model.find({createdBy:userId}) //get all jobs created by userId
        if (!jobs) {
            throw new BadRequest(`user ${userId} has not created or posted any job yet`)
        }
        res.status(httpStatus.OK).json(apiMessage("Jobs Found!", jobs))
    }

    const deleteJob = async (req,res) => {
        const jobId = req.params.id
        const job = await model.findOneAndDelete({_id:jobId}) //get single job with id that matches param id and delete
        if (!job) {
            throw new BadRequest(`Can't delete Job with id ${jobId}. Job probably may not exist`)
        }

        res.status(httpStatus.OK).json(apiMessage('Job deleted!',job))
    }

module.exports={createJob,updateJob,getJob, getAllJobs, deleteJob}