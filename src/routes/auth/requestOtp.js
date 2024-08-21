const { Router } = require("express");
const { generate } = require("otp-generator");
const { getData, getToken } = require("../../services/auth");
const mail = require("../../utils/mail");

const requestOtp = Router();

requestOtp.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const email = getData(token).email;
      const otp = generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      const otpToken = getToken(otp);
      await mail(email, otp);
      return res
        .status(200)
        .json({ message: "OTP sent to the email.", otpToken: otpToken });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = requestOtp;
