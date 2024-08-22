const { Router } = require("express");
const User = require("../../models/user.model");
const { hashSync } = require("bcrypt");
const changePassword = Router();

changePassword.post("/", (req, res) => {
  (async () => {
    try {
      const { password, email } = req.body;
      await User.updateOne(
        { email: email },
        { $set: { password: hashSync(password, 12) } }
      );
      return res
        .status(200)
        .json({ message: "Password changed successfully!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = changePassword;
