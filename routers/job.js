const express = require('express')
const {createJob,updateJob, getJob, getAllJobs, deleteJob} = require('../controllers/job')
const router= express.Router()


router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports=router

