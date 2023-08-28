const { Router } = require("express");
const router = Router();

const {
  createAdmin,
  loginAdmin,
  getALLAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const auth = require("../middleware/authentication");


router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.get("/", getALLAdmins)
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

module.exports = router;
