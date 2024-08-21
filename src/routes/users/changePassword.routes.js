const { Router } = require("express");
const User = require("../../models/user.model");
const { hashSync } = require("bcrypt");

const changePassword = Router();

changePassword.post("/", (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      await User.updateOne(
        { email: email },
        { $set: { password: hashSync(password, 12) } }
      );
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = changePassword;
