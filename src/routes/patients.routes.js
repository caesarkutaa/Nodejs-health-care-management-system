const { Router } = require("express");
const router = Router();

const {
    createpatient,
    getALLpatients,
    getOnepatient,
    updatePatient,
    deletePatient,
    medicationSchedule,
    uploadFile
}  = require('../controllers/patients.controllers')
const auth = require("../middleware/authentication")

router.post('/',createpatient)
router.get('/patients',getALLpatients)
router.get('/:patientId',getOnepatient)
router.get('/medication-reminders/:patientId', auth,medicationSchedule)
router.put('/:patientId', auth,updatePatient)
router.post('/upload/:patientId',auth, uploadFile)
router.delete('/:patientId', auth,deletePatient)


module.exports = router