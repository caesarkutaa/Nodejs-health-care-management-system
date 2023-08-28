
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
  checkInDate:{
    type:String
    },
  checkInOut:{
    type:String
    },
  medicationSchedule: [{
    medicationName: String,
    dosage: String,
    schedule: [String], // Array of scheduled times
  }],

  documents: {
    public_id:String,
    url: String,
    
  },
},{ timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
