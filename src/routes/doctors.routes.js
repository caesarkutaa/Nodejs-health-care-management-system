const { Router } = require("express");
const router = Router();


const {
  createdoctor,
  logindoctor,
  getALLdoctors,
  getOnedoctor,
  updatedoctor,
  deletedoctor,
  verifyDoc
}   = require('../controllers/doctors.controllers')
const auth = require("../middleware/authentication")

router.post('/register',createdoctor)
router.post('/login',logindoctor)
router.get('/', getALLdoctors)
router.get('/:id', auth,getOnedoctor)
router.put('/:id',auth,updatedoctor)
router.get("/verify/:id", verifyDoc)
router.delete('/:id', auth,deletedoctor)


module.exports = router