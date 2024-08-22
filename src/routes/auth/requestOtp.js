const { Router } = require("express");
const { generate } = require("otp-generator");
const { getData, getToken } = require("../../services/auth");
const mail = require("../../utils/mail");

const requestOtp = Router();

requestOtp.post("/", (req, res) => {
  (async () => {
    try {
      const { token, email } = req.body;
      let e;

      if (token) {
        e = getData(token).email;
      }

      if (email) {
        e = email;
      }

      const otp = generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });

      const otpToken = getToken(otp);
      await mail(e, otp);
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
