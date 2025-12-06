const blogRouter = require('express').Router()
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userExtractor = async (request,response,next) =>{
  let decodedToken = ""
    try{
       decodedToken = jwt.verify(request.token, process.env.SECRET)
    }catch(err){
      console.log("error in jwt")
    }
    if (!decodedToken.id) {
      console.log("error in token")
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    next();
}
blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('User');
  response.json(blogs)
})

blogRouter.post('/api/blogs',userExtractor, async(request, response) => {
  try{
    // console.log(request.user)
    if(request.body.likes === undefined){
      request.body.likes = 0;
    }
    if(request.body.title === undefined || request.body.url === undefined){
      return response.status(400).end();
    }
    if (!request.user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }
    const blog = new Blog({
      title:request.body.title,
      author:request.body.author,
      url:request.body.url,
      likes:request.body.likes,
      User: request.body.User
    })
    const result = await blog.save()
    return response.status(201).json(result)
  }catch(err){
    console.log(err,"Error is posting")
  }
})

blogRouter.delete('/api/blogs/:id',userExtractor,async (request,response)=>{
  try{
    if (!request.user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }catch(error){
    console.log("Error in deletion",error)
  }
})

blogRouter.put('/api/blogs/:id',async (request,response) =>{
  const { title, author, url, likes } = request.body

const updatedBlog = { title, author, url, likes }

 const result = await Blog.findByIdAndUpdate(
  request.params.id,
  updatedBlog,
  { new: true }
)
response.json(result)
})
module.exports = blogRouter;