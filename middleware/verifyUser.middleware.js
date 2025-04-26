const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");

const secreatKey = process.env.secreatKey;

const verifyUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(403)
      .json({ sucess: false, message: "Authtoken not found" });
  }
  try {
    const userData = jwt.verify(token, secreatKey);
    const isUserExists = await User.findOne({ email: userData.username });
    req.userID = isUserExists.id;
    return next();
  } catch (error) {
    return res.status(403).json({ sucess: false, message: "invalid token" });
  }
};

module.exports = verifyUser;
