import otpGenerator from "otp-generator";
import sendMail from "../config/nodemailerConfig.js";
import redisClient from "../config/redisConfig.js";
import dotenv from "dotenv";
dotenv.config();

async function sendOTP(req, res) {
  try {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    const ttl = 600;
    await redisClient.set(email, otp);
    await redisClient.expire(email, ttl);
    const mailOptions = {
      from: process.env.SMTP_PASS,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    await sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
}

export default sendOTP;
