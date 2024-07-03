import redisClient from "../config/redisConfig.js";
async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const storedOtp = await redisClient.get(email);

    if (storedOtp === otp) {
      await redisClient.del(email);
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
}

export default verifyOTP;
