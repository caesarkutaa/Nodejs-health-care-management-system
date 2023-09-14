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
router.get('/:id',getOnepatient)
router.get('/medication-reminders/:patientId', auth,medicationSchedule)
router.patch('/:id',updatePatient)
router.post('/upload/:id', uploadFile)
router.delete('/:patientId',deletePatient)


module.exports = router