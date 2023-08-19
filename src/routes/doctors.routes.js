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

router.post('/register',createdoctor)
router.post('/login',logindoctor)
router.get('/', getALLdoctors)
router.get('/:id',getOnedoctor)
router.put('/:id',updatedoctor)
router.get("/verify/:id", verifyDoc)
router.delete('/:id',deletedoctor)


module.exports = router