const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config= require('./utils/config')
const logger=require('./utils/logger')
const blogsRouter=require('./controllers/blogs')
const middleware=require('./utils/middleware')


mongoose.connect(config.URL)
    .then(()=> {
        logger.info('Connected to MongoDB')
    })
    .catch((error)=>{
        logger.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)


module.exports = app