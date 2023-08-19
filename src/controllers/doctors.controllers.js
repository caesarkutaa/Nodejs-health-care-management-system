
const Doctor = require('../models/doctors.model')

// @ts-ignore
const jwt = require('jsonwebtoken')
// @ts-ignore
const mongoose = require('mongoose');

const nodemailer = require("nodemailer")

//env stuff
require("dotenv").config()
//nodemalier stuff
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASSWORD
  }
})


//testing success
transporter.verify((err,success)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log("ready for messages")
    console.log(success)
  }
})



const createdoctor = async (req,res)=>{
    const { email } = req.body
  // Check we have an email
  if (!email) {
     return res.status(422).send({ message: "Missing email." });
  }
  try {
    const existingDoctor = await Doctor.findOne({ email }).exec();
     if (existingDoctor) {
        return res.status(409).send({ 
              message: "Email is already in use."
        });
      }
      const doc = await Doctor.create(...req.body)
      // @ts-ignore
      const verificationToken = doc.createjwt();
      // Step 3 - Email the user a unique verification link
      const url = `http://localhost:3000/api/v1/doctor/verify/${verificationToken}`
      console.log(verificationToken);
      transporter.sendMail({
        to:email,
        subject: 'Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
      })
      return res.status(201).send({
        message: `Sent a verification email to ${email}`
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:error}) 
  }
}

const logindoctor = async (req,res)=>{
//checking if the Doctor has email and password
const {email,password} = req.body
if(!email || !password){
 res.status(403).json('please provide email and password')
}
const doc =  await Doctor.findOne({ email })
//checking if there is a user
if(!doc){
    res.status(403).json('Invalid Doctor')
}
//checking if the user password is correct by using bcrypt.compare
// @ts-ignore
const ispasswordcorrect = await doc.checkpassword(password)
if(!ispasswordcorrect){
    res.status(403).json('Invalid Password')
}
// Ensure the account has been verified
if(!doc.verified){
    return res.status(403).send({ 
          message: "Verify your Account." 
    });
}
  //sending the user name and token
    const token = doc.createjwt()
  res.status(201).json({doctor:{doctor:doc.firstname}, token})
}



const verifyDoc = async(req,res)=>{
    const {id} =  req.params
    console.log(id)
    // Check we have an id
    if (!id) {
        return res.status(422).send({ 
             message: "Missing token" 
        });
    }
    // Step 1 -  Verify the token from the URL
    let payload = null
    try {
        payload = jwt.verify(
        id,
           process.env.JWT_SECRET
        );
    } catch (err) {
      console.log(err);
        return res.status(500).send(err);
    }
    try{
        // Step 2 - Find user with matching ID
        const doc = await Doctor.findOne({ _id: payload.doctorId })
        console.log(payload.doctorId);
        if (!doc) {
           return res.status(404).send({ 
              message: "User does not  exists" 
           });
        }
        // Step 3 - Update user verification status to true
         await Doctor.findByIdAndUpdate( doc,{ verified: true },{new:true});
        return res.status(200).send({
              message: "Account Verified"
        });
     } catch (err) {
      console.log(err);
        return res.status(500).send(err);
     }
  }


const getALLdoctors = async (req,res)=>{
    try {
        const doctors = await Doctor.find({})
        res.status(200).json({doctors})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}



const getOnedoctor = async (req,res)=>{
    const {id:doctorID}= req.params
    try {
        const doctor = await Doctor.findOne({_id:doctorID})
        if(!doctor){
            return res.status(404).json({msg:`no Doctor with the id found : ${doctorID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const updatedoctor = async (req,res)=>{
    const {id:doctorID}= req.params
    try {
        const doctor = await Doctor.findByIdAndUpdate({_id:doctorID})
        if(!doctor){
            return res.status(404).json({msg:`no Doctor with the id found : ${doctorID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}



const deletedoctor = async (req,res)=>{
    const {id:doctorID}= req.params
    try {
        const doctor = await Doctor.findByIdAndDelete({_id:doctorID})
        if(!doctor){
            return res.status(404).json({msg:`no Doctor with the id found : ${doctorID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {
    createdoctor,
    logindoctor,
    getALLdoctors,
    getOnedoctor,
    updatedoctor,
    deletedoctor,
    verifyDoc

}

