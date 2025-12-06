const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

loginRouter.post('/api/login',async (request,response)=>{
    const {username,password} = request.body;
    const user = await User.findOne({username})
    let isPassword = password === null ? false : await bcrypt.compare(password,user.passwordHash)
    if(!(user && isPassword)){
        return response.status(401).json({
            error: "username or password invalid"
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken,process.env.SECRET)

    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})
module.exports = loginRouter
