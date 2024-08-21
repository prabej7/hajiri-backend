const { Router } = require("express");
const checkUser = require("../../middlewares/checkUser");
const { hashSync } = require("bcrypt");
const User = require("../../models/user.model");
const { getToken } = require("../../services/auth");
const register = Router();

register.post("/", checkUser("register"), (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      
      const newUser = new User({
        email: email,
        password: hashSync(password, 12),
        isVerified: false,
      });

      const token = getToken({
        id: newUser._id,
        email: newUser.email,
      });

      await newUser.save();

      return res
        .status(201)
        .json({ message: "Successfully account created!", token: token });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = register;
