const connectDb = require('./db/connect')
const express = require('express')
const  authRouter =require('./routers/auth')
const jobRoute=require('./routers/job')
const searchJobRouter=require('./routers/searchJob')
const errorHandler =require('./middlewares/errorHandler')
const notFound=require('./middlewares/notFound')
const authenticator= require('./middlewares/authMiddleware')
const cors= require('cors')
const helmet= require('helmet')
const xCleaner= require('xss-clean') 
const rateLimiter=require('express-rate-limit')
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config()




//objects initialization
const app=express()
const PORTNO =process.env.PORT || 8080 
//setup swagger ui for docs
const docs= YAML.load('./swagger.yaml')

//database connection 
const db_url= `${process.env.MONGO_URI_USERNAME}${encodeURIComponent(process.env.MONGO_URI_PASSWORD)}${process.env.MONGO_URI_END}`
//const local_db_url=process.env.LOCAL_MONGO_URI
const start= async ()=> {
    try {
        await connectDb(db_url) 
        app.listen(PORTNO, ()=> {
            console.log(`Job server application starts listening on port:${PORTNO}`)
        })

    }
    catch (error) {
        console.log('Error connecting with the database')
    }    
}

//server initialization and establishment
start()


//middleware sections
app.set('trust proxy', 1)
app.use( rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(express.static('public'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xCleaner())
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/api/v1/search_job',searchJobRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job',authenticator,jobRoute)
app.use(notFound)
app.use(errorHandler)


