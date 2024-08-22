const { Router } = require("express");
const User = require("../../models/user.model");
const { getData } = require("../../services/auth");

const verifyOtp = Router();

verifyOtp.post("/", (req, res) => {
  (async () => {
    try {
      const { token, otpToken, otp } = req.body;
      const isOtpAuth = getData(otpToken);

      if (!token && otpToken && otp) {
        const isOtpAuth = getData(otpToken);
        if (isOtpAuth !== 1 && isOtpAuth == otp) {
          return res.status(200).json({ message: "OTP Verfied" });
        }
      }

      if (isOtpAuth !== 1 && isOtpAuth == otp) {
        await User.updateOne(
          { _id: getData(token).id },
          { $set: { isVerified: true } }
        );
        return res.status(200).json({ message: "User verified successfully!" });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = verifyOtp;
