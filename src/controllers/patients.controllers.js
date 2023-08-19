const Patient = require('../models/patients.model')


const createpatient = async (req,res)=>{
    try {
    const patient = await Patient.create(req.body)
    res.status(201).json({patient})   
    } catch (error) {
        res.status(500).json({msg:error}) 
    }
}



const getALLpatients = async (req,res)=>{
    try {
        const patients = await Patient.find({})
        res.status(200).json({patients})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}


const getOnepatient = async (req,res)=>{
    const {id:patientID}= req.params
    try {
        const patient = await Patient.findOne({_id:patientID})
        if(!patient){
            return res.status(404).json({msg:`no patient with the id found : ${patientID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updatePatient = async (req,res)=>{
    try {
        const {id:patientID} = req.params
        const patient = await Patient.findOneAndUpdate({_id:patientID},req.body,{
            new:true,
            runValidators:true
        })
            res.status(200).json({patient})
        } catch (error) {
            res.status(500).json({msg:error})
     }
}


const deletePatient = async (req,res)=>{
    const {id:patientID} = req.params
    try {
        const patient = await Patient.findByIdAndDelete({_id:patientID})
        if(!patient){
            return res.status(404).json({msg:`no patient with the id found : ${patientID}`})
        }
             req.status(200).json({patient})
            // req.status(200).send()
    } catch (error) {
            res.status(404).json({msg:error})
    }
}


module.exports ={
    createpatient,
    getALLpatients,
    getOnepatient,
    updatePatient,
    deletePatient,
}