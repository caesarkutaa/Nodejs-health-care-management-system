
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
  birthDate: Date,
  gender:{
    type:String
    },
  address:{
    type:String
    },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    },
  checkInDate:String,
  checkInOut:String
},{ timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
