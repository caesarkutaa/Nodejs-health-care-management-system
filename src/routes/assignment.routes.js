const { Router } = require("express");
const router = Router();

const {
    createAssignment,
    getALLassignment,
    getOneAssignment,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignment.controllers')
const auth = require('../middleware/authentication')

router.put('/assign-doctor/:patientId/:specialization',auth,createAssignment)
router.get('/:doctorId/assigns',auth,getALLassignment)
router.get('/:doctorId',auth,getOneAssignment)
router.delete('/:id',auth, deleteAssignment)



module.exports = router