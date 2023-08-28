// @ts-nocheck
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
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
  isAdmin: {
        type: Boolean,
        default: true,
      },

},{ timestamps: true });



//encrypting password
adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  //created a jwt for the admin
  adminSchema.methods.creatjwt = function () {
    return jwt.sign(
      { userId: this._id, name: this.firstname, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFESPAN }
    );
  };
  
  ///checking if the admin password is correct for the login using bcrypt.compare
  adminSchema.methods.checkpassword = async function (adminpassword) {
    const passwordmatch = await bcrypt.compare(adminpassword, this.password);
    return passwordmatch;
  };
  // validation
module.exports = mongoose.model('Admin', adminSchema);
