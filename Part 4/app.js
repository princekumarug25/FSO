const express = require('express')
const mongoose = require('mongoose')
const {TEST_MONGODB_URI,MONGODB_URI} = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const app = express()
const mongoUrl = TEST_MONGODB_URI
mongoose.connect(mongoUrl)
app.use(express.json())
const tokenExtractor = (request,response,next) =>{
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ','');
  }
  else request.token = null;
  next();
}
const errorHandler = (error,request,response,next) =>{
    if(error.name === "ValidationError"){
        return response.status(400).json({
            message: "Validation failed",
            errors: Object.values(error.errors).map(e => e.message)
        })
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    return response.status(500).json({ error: error.message })
}
app.use(tokenExtractor)
app.use(blogRouter)
app.use(userRouter)
app.use(loginRouter)
app.use(errorHandler)
module.exports = app