const User = require("../models/user.model");
const checkUser = (route) => {
  return async (req, res, next) => {
    const { username, email } = req.body;
    const isUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (route == "register" && isUser) {
      return res.status(200).json({ message: "User already exists!" });
    } else if (route == "login" && !isUser) {
      return res.status(404).json({ message: "User doesn't exists." });
    }
    next();
  };
};

module.exports = checkUser;
