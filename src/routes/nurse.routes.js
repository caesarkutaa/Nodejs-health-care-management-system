const { Router } = require("express");
const router = Router();

const {
    createNurse,
    loginNurse,
    getOneNurse,
    getAllNurse,
    updateNurse,
    deleteNurse
} = require('../controllers/nurse.controller')
const auth = require("../middleware/authentication")


router.post('/',createNurse)
router.post('/login',loginNurse)
router.get('/', getAllNurse)
router.get('/:id', getOneNurse)
router.put('/:id',auth,updateNurse)
router.delete('/:id',auth,deleteNurse)

module.exports = router