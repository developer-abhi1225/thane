const express = require("express");
const router = express.Router();
const {
  LoginController,
  SignUpController,
} = require("../Controllers/Auth/AuthController");

router.post("/login", LoginController);
router.post("/signup", SignUpController);

module.exports = router;
