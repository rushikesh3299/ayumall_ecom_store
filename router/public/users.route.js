const express = require("express");
const router = express.Router();

const {
  addNewUser,
  logInUser,
  logOutUser,
} = require("../../controllers/users.controller.js");

router.route("/signup").post(addNewUser);
router.route("/login").post(logInUser);
router.route("/logout").post(logOutUser);

module.exports = router;
