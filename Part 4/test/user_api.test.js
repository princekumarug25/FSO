const {test,after, describe, beforeEach} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const api = supertest(app)
const validUser =  {
    "name": "Prince",
    "username": "princekumarug26",
    "password" : "hjjh"
}
beforeEach(async ()=>{
    await User.deleteMany({});
    const passwordHash  = await bcrypt.hash(validUser.password, 10);
    const user = new User({
        name: validUser.name,
        username: validUser.username,
        passwordHash: passwordHash
    });
    await user.save()
})
const usersInDB = async ()=>{
    let users = await User.find({});
    return users;
}
test('if user details is valid the details are save',async()=>{
   const newUser =   {
        "name": "Prince",
        "username": "kljjkl",
        "password": "hjjh"
    }
    const initial = await usersInDB();
    const res = await api.post('/api/users')
    .send(newUser)
    const final = await usersInDB();
    assert.strictEqual(initial.length + 1, final.length)
})
test('if password is invalid it is not saved',async()=>{
   const newUser =   {
        "name": "Prince",
        "username": "kljjkl",
        "password": "jh"
    }
    const initial = await usersInDB();
    const res = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    const final = await usersInDB();
    assert.strictEqual(initial.length, final.length)
})
after(async ()=>{
    await mongoose.connection.close()
})