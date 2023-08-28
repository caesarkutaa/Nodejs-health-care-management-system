const { Router } = require("express");
const router = Router();

const {
    createAppointment,
    getALLappointment,
    getOneAppointment,
    updateAppointment,
    deleteAppointment
} = require ('../controllers/appointment.controllers')
const auth = require('../middleware/authentication')

router.post('/',auth,createAppointment)
router.get('/', auth,getALLappointment)
router.get('/:id',auth,getOneAppointment)
router.put('/:id',auth,updateAppointment)
router.delete(':id',auth,deleteAppointment)


module.exports = router