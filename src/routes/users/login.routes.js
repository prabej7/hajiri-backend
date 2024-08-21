const { Router } = require("express");
const User = require("../../models/user.model");
const checkUser = require("../../middlewares/checkUser");
const { compareSync } = require("bcrypt");
const { getToken } = require("../../services/auth");
const login = Router();

login.post("/", checkUser("login"), (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (compareSync(password, user.password)) {
        const token = getToken({
          id: user._id,
          email: user.email,
        });
        return res
          .status(200)
          .json({ message: "User logged in successfully!", token: token });
      }
      return res
        .status(401)
        .json({ message: "Either email or password is wrong!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = login;
