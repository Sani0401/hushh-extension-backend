import { GoogleGenerativeAI } from "@google/generative-ai";
import supabase from "../config/supabaseConfig.js";
import base64ToObject from "../minor_Services/base64ToObject.js";

async function getCategory(req, res) {
  try {
    const { APIData } = req.body;
    const decodedObject = base64ToObject(APIData);
    const API_KEY = process.env.GOOGLE_API_KEY;
    const query_type1 = process.env.QUERY_TYPE1;
    const query_type2 = process.env.QUERY_TYPE2;
    const { linkUrl, type, userId } = decodedObject;
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (error && error.status == 404 && error.code == "validation_failed") {
      console.log("Error while checking user with userID: ", error);
      return res
        .status(404)
        .json({ message: "Invalid User ID, please check", status: 404 });
    }
    if (error && error.status == 404 && error.code == "user_not_found") {
      console.log("Error while checking user with userID: ", error);
      return res.status(404).json({
        message: "User not found, please create an account",
        status: 404,
      });
    }
    if (!linkUrl) {
      return res
        .status(400)
        .json({ message: "linkUrl and query are required." });
    }

    if (type == 1) {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = await genAI.getGenerativeModel({ model: "gemini-1.0-pro" }); //chainging the model

      const prompt = `${linkUrl} ${query_type1}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return res.status(200).json({ response: JSON.parse(text), status: 1 });
    }
    if (type == 2) {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = await genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const prompt = `${linkUrl} ${query_type2}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return res.status(200).json({ response: JSON.parse(text), status: 1 });
    }
  } catch (e) {
    console.error("Error:", e.message);
    return res
      .status(500)
      .json({ error: e.message, message: "Internal Server Error" });
  }
}

export default getCategory;
