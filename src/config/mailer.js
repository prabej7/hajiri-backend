const nodeMailer = require("nodemailer");

const trasporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.G_EMAIL,
    pass: process.env.G_PASSWORD,
  },
});

module.exports = trasporter;
