const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userAlumSchema = mongoose.Schema({
    nombre: {
       type: String,
       required: true,
       trim: true
    },
    password: {
       type: String,
       required: true,
       minLength: 7
    },
    profesor: {
       type: String,
       required: true,
       trim: true
    },
    tokens: [{
       token: {
          type: String,
          required: true
       }
   }]
 })
 
 userAlumSchema.pre('save', async function (next) {
    const userAlum = this
    if (userAlum.isModified('password')) {
        userAlum.password = await bcrypt.hash(userAlum.password, 8)
    }
    next()
 })
 
 userAlumSchema.methods.generateAuthToken = async function() {
    const userAlum = this
    const token = jwt.sign({_id: userAlum._id}, process.env.JWT_KEY)
    userAlum.tokens = userAlum.tokens.concat({token})
    await userAlum.save()
    return token
 }
 
 userAlumSchema.statics.findByCredentials = async (nombre, password, profesor) => {
    const userAlum = await UserAlum.findOne({nombre, profesor} )
    if (!userAlum) {
       throw new Error({ error: 'Inicio de sesión fallido' })
    }
    const isPasswordMatch = await bcrypt.compare(password, userAlum.password)
    if (!isPasswordMatch) {
       throw new Error({ error: 'Inicio de sesión fallido' })
    }
    return userAlum
 }
 
 const UserAlum = mongoose.model('UserAlum', userAlumSchema)
 
 module.exports = UserAlum