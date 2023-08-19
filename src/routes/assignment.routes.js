const { Router } = require("express");
const router = Router();

const {
    createAssignment,
    getALLassignment,
    getOneAssignment,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignment.controllers')


router.put('/assign-doctor/:patientId/:specialization',createAssignment)
router.get('/:doctorId/assigns',getALLassignment)
router.get('/:doctorId',getOneAssignment)
router.delete('/:id', deleteAssignment)



module.exports = router