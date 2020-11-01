const express = require("express");
const upload = require("../Controllers/User/UploadController");
const {
  userProfilePitcureUploadController,
  pathUserDetails,
  getUserDetails,
} = require("../Controllers/User/UserController");
const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  userProfilePitcureUploadController
);

router.patch("/:id", pathUserDetails);
router.get("/:id", getUserDetails);
module.exports = router;
