//@desc Get cart of user
//@route GET -> /cart
//@access Protected
const getUserProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    profile: req.userData,
  });
};

module.exports = {
  getUserProfile,
};
