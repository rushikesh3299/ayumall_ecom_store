const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model.js");

//@desc Signup user
//@route POST -> /auth/signup
//@access Public
const addNewUser = async (req, res) => {
  try {
    let userData = req.body;
    const isUserExists = await User.findOne({ email: userData.email });
    if (isUserExists) {
      res.status(409).json({
        sucess: false,
        message: "User with same email id already exists",
      });
    } else {
      userData.password = await bcrypt.hash(userData.password, 8);
      const newUser = new User(userData);
      const newlyAddedUser = await newUser.save();
      const jwtToken = jwt.sign(
        { username: userData.email },
        process.env.secreatKey,
        { expiresIn: "24h" }
      );
      res
        .status(201)
        .json({ sucess: true, data: newlyAddedUser, encodedToken: jwtToken });
    }
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

//@desc Login user
//@route POST -> /auth/login
//@access Public
const logInUser = async (req, res) => {
  try {
    const userData = req.body;
    const isUserExists = await User.findOne({ email: userData.email });
    if (isUserExists) {
      const isPasswordValid = await bcrypt.compare(
        userData.password,
        isUserExists.password
      );
      if (isPasswordValid) {
        const foundUser = {
          email: isUserExists.email,
          firstname: isUserExists.firstname,
          lastname: isUserExists.lastname,
        };
        const jwtToken = jwt.sign(
          { username: userData.email },
          process.env.secreatKey,
          { expiresIn: "24h" }
        );
        res
          .status(200)
          .json({ sucess: true, encodedToken: jwtToken, data: foundUser });
      } else {
        res.status(401).json({ sucess: false, message: "Wrong password" });
      }
    } else {
      res.status(404).json({
        sucess: false,
        message: "User with entered email id dosen't exists",
      });
    }
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports = {
  addNewUser,
  logInUser,
};
