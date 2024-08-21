require("dotenv").config({ path: "../../.env" });
const transporter = require("../config/mailer");

const mail = async (email, otp) => {
  try {
    console.log("Sending...");
    await transporter.sendMail({
      from: process.env.G_EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

        * {
            padding: 0;
            margin: 0;
            box-sizing: 0;
            font-family: "Inter", sans-serif;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .nav {
            background-color: rgb(0, 122, 255);
            color: #ffffff;
            padding: 12px 0px;
        }

        .title {
            font-weight: 900;
        }

        .body {
            background-color: rgb(19, 19, 19);
            height: 100%;
            color: white;
            padding: 12px 0px;
        }

        .otp {
            margin-top: 12px;
            font-size: 32px;
        }

        footer {
            padding: 12px 0px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="nav">
            <div>
                <h1 class="title">Hajri</h1>
                <p class="sub">"Keep your attendace like attendace."</p>
            </div>
        </div>
        <div class="body">
            <p>Thank you ❤️ for using our service.</p>
            <p>Your OTP is :</p>
            <h2 class="otp">${otp}</h2>
            <footer>
                <p style="font-size:12px" >Please use this code to complete your transaction.</p>
                <div class="footer">
                    <p style="margin-bottom: 12px; font-size:12px" >If you didn't request this code, please ignore this email.</p>
                    <p>Best regards,<br>Your Company</p>
                </div>
            </footer>
        </div>


    </div>
</body>

</html>
      `,
    });
  } catch (e) {
    console.error("Error sending email:", e);
  }
};

module.exports = mail;
