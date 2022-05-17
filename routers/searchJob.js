const express = require('express')
const {searchJobs, searchSingleJob} = require('../controllers/searchJob')


const router= express.Router()

router.route('/').get(searchJobs)
router.route('/:id').get(searchSingleJob)

module.exports=router