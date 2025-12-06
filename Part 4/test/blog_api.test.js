const {test,after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const api = supertest(app)
let token = ''
const initialBlogs = [{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
}]
beforeEach(async()=>{
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password',10)
    const user = new User({
        name:"PKum",
        username:"princekumarug25",
        passwordHash
    })
    await user.save()
    const loginResponse = await api
    .post('/api/login')
    .send({
        username:"princekumarug25",
        password:'password'
    })
    token = loginResponse.body.token;
    await Blog.deleteMany({});
    const blog = new Blog(initialBlogs[0]);
    await blog.save();
})
const blogsInDB = async ()=>{
    const blogs = await Blog.find({});
    return blogs;
}
test('Blogs are return as json',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})
test('blog has field id and not _id',async ()=>{
    const response = await api
    .get('/api/blogs')
    const returnedBlog = response.body[0]
    // console.log(returnedBlog,"returned Blog")
    assert.ok(returnedBlog.id)              
    assert.strictEqual(returnedBlog._id, undefined)   
    assert.strictEqual(returnedBlog.__v, undefined) 
})
test('valid blog is saved!',async ()=>{
    const newBlog = {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
    }
    console.log("The value of token is: ",token)
    const res = await api.post('/api/blogs/')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    const blogs = await blogsInDB();
    // const res = await api.get('/api/blogs')
    assert.strictEqual(blogs.length,initialBlogs.length + 1)
    const title = res.body.title;
    assert.strictEqual(title,"Go To Statement Considered Harmful");
})
test('if likes is missing defaults to zero',async ()=>{
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
    const res = await api.post('/api/blogs')
    .send(newBlog);
    const blog = await blogsInDB();
    assert.strictEqual(blog[0].likes,0)
})
test('a blog without title is rejected',async ()=>{
    const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
    const res = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})
test('a blog without url is rejected', async ()=>{
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
    }
    const res = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})
test('a updated blog does not increase the count of docs',async()=>{
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
    const updatedBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Prince",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
    const res = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    assert.strictEqual(res.body.title,newBlog.title)
    // console.log(res.body)
    const id = res.body.id;
    const newRes = await api.put(`/api/blogs/${id}`)
    .send(updatedBlog)
    assert.strictEqual(newRes.body.author,"Prince")
})
test('a deletion decreases the db count by 1',async ()=>{
  const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
    console.log("calling for deletion test")
    const res = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog);
    console.log("successfully posted")
    let initial = await blogsInDB();
    await api.delete(`/api/blogs/${res.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
    console.log("finished deletion")
    let final = await blogsInDB();
    assert.strictEqual(initial.length-1,final.length)
})
after(async ()=>{
    await mongoose.connection.close()
})