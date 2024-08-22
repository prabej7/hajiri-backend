const { Router } = require("express");
const User = require("../../models/user.model");
const sendMail = require("../../utils/mail");
const { generate } = require("otp-generator");
const checkUser = Router();

checkUser.post("/", (req, res) => {
  (async () => {
    try {
      const isUser = await User.findOne({ email: req.body.email });
      if (isUser) {
        const otp = generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          specialChars: false,
          upperCaseAlphabets: false,
        });
        // await sendMail(req.body.email, otp);
        return res.status(200).json({ message: "User found!" });
      }
      return res.status(404).json({ message: "User not found!" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = checkUser;
