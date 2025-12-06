const bcrypt = require('bcrypt')
const userRouter = require('express').Router();
const User = require('../models/User')
userRouter.get('/api/users',async(request,response)=>{
    const users = await User.find({});
    response.status(201).json(users)
})

userRouter.post('/api/users',async(request,response,next)=>{
    const {name,username,password} = request.body;
    const saltRounds = 10;
    if(!password || password.length <= 3){
        return response.status(400).json({
            error : "Password length should be atleast 3"
        })
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user  = new User({
        name,
        username,
        passwordHash,
    })
    try{
        const savedUser = await user.save();
        response.status(201).json(savedUser)
    }catch(error){
        next(error)
    }
})

module.exports = userRouter;