// models/Doctor.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
     type:String,
     required:true,
     minlength:6
    },
    email:{
        type:String,
        required:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique:true 
    },
  gender:{
    type:String
    },
  address:{
    type:String
    },
  dateOfBirth: Date,
  specialization: {
    type:String
    },
    verified: {
      type: Boolean,
      default: false
  },
},{ timestamps: true });


// @ts-ignore
doctorSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
  next()
 
 })
 
 
 //created a jwt for the user 
 doctorSchema.methods.createjwt = function(){
     // @ts-ignore
     return jwt.sign({doctorId:this._id, name:this.firstname},process.env.JWT_SECRET,
         {expiresIn:process.env.JWT_LIFESPAN})
 }
 
 ///checking if the user password is correct for the login using bcrypt.compare
 doctorSchema.methods.checkpassword = async function(doctorpassword){
     const passwordmatch = await bcrypt.compare(doctorpassword, this.password)
     return passwordmatch
 }
 

module.exports = mongoose.model('Doctor', doctorSchema);
