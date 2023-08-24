const Assignment = require('../models/assignment.model')
const Patient = require('../models/patients.model')
const Doctor = require('../models/doctors.model')


const createAssignment = async(req,res) =>{
    try {
        const patientId = req.params.patientId;
        const specialization = req.params.specialization;
    
        const patient = await Patient.findById(patientId);
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
    
        const doctor = await Doctor.findOne({ specialization });
        if (!doctor) {
          return res.status(404).json({ error: 'Doctor with the specified specialization not found' });
        }
    
        // Create an assignment
        const assignment = await Assignment.create({ patient: patientId, doctor: doctor._id });
    
        patient.assignedDoctor = doctor._id;
        await patient.save();
    
        res.json({ message: 'Doctor assigned successfully', assignment, assignedDoctor: doctor });
      } catch (error) {
        res.status(500).json({ error: 'Could not assign doctor' });
      }
    }



const getALLassignment = async (req,res)=>{
    
}


const getOneAssignment = async (req,res)=>{
    
}

const updateAssignment = async (req,res)=>{
    
}


const deleteAssignment = async (req,res)=>{
    
}


module.exports = {
    createAssignment,
    getALLassignment,
    getOneAssignment,
    updateAssignment,
    deleteAssignment
}