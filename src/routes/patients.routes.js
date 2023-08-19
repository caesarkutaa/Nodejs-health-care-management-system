const { Router } = require("express");
const router = Router();

const {
    createpatient,
    getALLpatients,
    getOnepatient,
    updatePatient,
    deletePatient
}  = require('../controllers/patients.controllers')


router.post('/',createpatient)
router.get('/patients',getALLpatients)
router.get('/:id',getOnepatient)
router.put('/:id',updatePatient)
router.delete(':id',deletePatient)


module.exports = router