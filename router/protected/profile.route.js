const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/verifyUser.middleware.js");

const {
  getUserProfile,
} = require("../../controllers/userProfile.controller.js");

router.use(verifyUser);
router.route("/").get(getUserProfile);

module.exports = router;
