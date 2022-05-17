const jobModel=require('../models/Job')
const userModel=require('./auth')
const httpStatus=require('http-status-codes')
const BadRequest= require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')
const apiMessage=require('../api_messages/successApiLogicHandler')
require('express-async-errors')
//api logic
//user should be able to perform pargination
//user should  be able to search based on job title 
//user should be able to search based on job status
//user should be able to seach based on time of posting 


const searchJobs = async (req,res)=> {
    const {title, company, status, sort}=req.query
    //only few information should be returned to searcher for security purpose 
    
    //for building up query strings
    const queryObjects={} 

    if (title) {
        queryObjects.title={$regex:title, $options:'i'}
    } 
    
    if (company) {
        queryObjects.company={$regex:company, $options:'i'}
    } 

    if (status) {
        queryObjects.status={$regex:status, $options:'i'}
    }
    
    const  limit =Number(req.query.limit) || 1000
    const page= Number (req.query.page) || 1
    const skip= (page-1) * limit // skip certain document for pagination 

    
    let jobs  = jobModel.find(queryObjects).
    select('_id title status company location createdAt').skip(skip).limit(limit)
    
    if (!jobs) {
        throw new  NotFound('Job list is empty')
    }
    
    if (sort) {
        jobs= jobs.sort(sort.split(',').join(' '))
    }
     
    const  results = await jobs
    
    res.status(httpStatus.OK).json(apiMessage("Jobs Found", results))
}


//get Single job details
const searchSingleJob = async (req,res)=> {
    const job=  await jobModel.find({_id:req.params.id}).select('_id title description status company location createdAt updatedAt')
    if(job.length==0) {
        throw new  NotFound("Job doesn't exist")
    }

    res.status(httpStatus.StatusCodes.OK).json(apiMessage('Job Found', job))
}

module.exports={searchJobs, searchSingleJob}