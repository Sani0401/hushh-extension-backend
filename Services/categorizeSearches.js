import { GoogleGenerativeAI } from "@google/generative-ai";
import supabase from "../config/supabaseConfig.js";
import base64ToObject from "../minor_Services/base64ToObject.js";

async function categorizeSearches(req,res){
    const {data} = req.body;
    const decodedData = base64ToObject(data);

    console.log('This is the decoded data:', decodedData);
    
}