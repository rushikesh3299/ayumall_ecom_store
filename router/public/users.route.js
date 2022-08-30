const express = require("express");
const router = express.Router();

const {
  addNewUser,
  logInUser
} = require('../../controllers/users.controller.js')


router.route('/signup').post(addNewUser)
router.route('/login').post(logInUser)

module.exports = router;