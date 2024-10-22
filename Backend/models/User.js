
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password: String,
    
},{collection:'Users'})

const User = mongoose.model('register', UserSchema)

 module.exports = User