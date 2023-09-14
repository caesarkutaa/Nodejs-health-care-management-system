const Patient = require('../models/patients.model')
const cloudinary = require('cloudinary').v2
const express = require('express');
const app = express();
const expressfileuploader = require('express-fileupload')





const createpatient = async (req,res)=>{
    try {
    const patient = await Patient.create(req.body)
    res.status(201).json({patient})   
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
}



const getALLpatients = async (req,res)=>{
    try {
        const patients = await Patient.find({})
        res.status(200).json({patients})
    } catch (error) {
        res.status(500).json({msg:error})
        console.log(error);
    }
    
    
}


const getOnepatient = async (req,res)=>{
    const {id:patientID}= req.params
    try {
        const patient = await Patient.findOne({_id:patientID})
        if(!patient){
            return res.status(404).json({msg:`no patient with the id found : ${patientID}`})
           }
           res.status(200).json({patient})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updatePatient = async (req,res)=>{
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id,{$set:req.body},
            {new:true})
            res.status(200).json(patient,{msg:'patient updated successfully'})
        } catch (error) {
            res.status(500).json({msg:error})
            console.log(error);
     }
}


const deletePatient = async (req,res)=>{
    const {id:patientID} = req.params
    try {
        const patient = await Patient.findByIdAndDelete({_id:patientID})
        if(!patient){
            return res.status(404).json({msg:`no patient with the id found : ${patientID}`})
        }
             res.status(200).json({patient})
           
    } catch (error) {
            res.status(404).json({msg:error})
    }
}

const medicationSchedule = async(req,res)=>{
    try {
        const patientId = req.params.patientId;
        const patient = await Patient.findById(patientId);
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
        // You can implement the logic to send reminders here
        const reminders = patient.medicationSchedule;
        res.status(200).json(reminders);
      } catch (error) {
        res.status(500).json({ error: 'Could not fetch medication reminders' });
      }
}


//use express file uploader
app.use(expressfileuploader({
    useTempFiles: true
  }))

const uploadFile = async (req,res)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log(req.files)

      let { documents } = req.files;

      try { 
        const result =await cloudinary.uploader.upload(documents.tempFilePath,{
        folder:"PatientImages"
    })
    console.log(result.secure_url)

    const patient = await Patient.updateOne({
        documents:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    res.status(200).json({msg:"Image Uploaded Successfully"});
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
}


module.exports ={
    createpatient,
    getALLpatients,
    getOnepatient,
    updatePatient,
    deletePatient,
    medicationSchedule,
    uploadFile,
}