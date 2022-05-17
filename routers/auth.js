const express = require('express')
const {createNewUser,login} = require('../controllers/auth')

const router= express.Router()

router.route('/').post((req,res)=> {
    res.send('Hello')
})
router.route('/register').post(createNewUser)
router.route('/login').post(login)

module.exports=router