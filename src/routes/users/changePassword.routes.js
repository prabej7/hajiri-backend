const { Router } = require("express");
const User = require("../../models/user.model");
const { hashSync, compareSync } = require("bcrypt");

const changePassword = Router();

changePassword.post("/", (req, res) => {
  (async () => {
    try {
      const { email, password, currentPassword } = req.body;

      const user = await User.findOne({ email: email });

      if (compareSync(currentPassword, user.password)) {
        const re = await User.updateOne(
          { email: email },
          { $set: { password: hashSync(password, 12) } }
        );

        return res
          .status(200)
          .json({ message: "Password updated Successfully." });
      } else {
        return res.status(400).json({ message: "Password is incorrect!" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = changePassword;
