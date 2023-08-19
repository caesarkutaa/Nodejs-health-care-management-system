const { Router } = require("express");
const router = Router();

const {
    createAppointment,
    getALLappointment,
    getOneAppointment,
    updateAppointment,
    deleteAppointment
} = require ('../controllers/appointment.controllers')


router.post('/',createAppointment)
router.get('/patients',getALLappointment)
router.get('/:id',getOneAppointment)
router.put('/:id',updateAppointment)
router.delete(':id',deleteAppointment)


module.exports = router