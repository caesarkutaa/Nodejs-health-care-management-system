const Appointment = require('../models/appointment.model')


const createAppointment = async (req,res)=>{
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
      } catch (error) {
        res.status(400).json({ error: 'Could not create appointment' });
      }
}



const getALLappointment = async (req,res)=>{
    try {
        const appointments = await Appointment.find().populate('patient');
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ error: 'Could not retrieve appointments' });
      }
}


const getOneAppointment = async (req,res)=>{
    const {id:appointmentID}= req.params
    try {
        const appointment = await Appointment.find({_id:appointmentID})
        if(!appointment){
            return res.status(404).json({msg:`no Appointment with the id found : ${appointmentID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateAppointment = async (req,res)=>{
    const {id:appointmentID}= req.params
    try {
        const appointment = await Appointment.findByIdAndUpdate({_id:appointmentID})
        if(!appointment){
            return res.status(404).json({msg:`no Appointment with the id found : ${appointmentID}`})
           }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const deleteAppointment = async (req,res)=>{
    
}


module.exports ={
    createAppointment,
    getALLappointment,
    getOneAppointment,
    updateAppointment,
    deleteAppointment
}