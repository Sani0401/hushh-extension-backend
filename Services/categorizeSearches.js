import { GoogleGenerativeAI } from "@google/generative-ai";
async function categorizeSearches(req, res) {
    try {
        const { searchQueries } = req.body;
        const API_KEY = process.env.GOOGLE_API_KEY;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        let query1 = "Categorize these string in groups, Name each category with 1 word. return response as JSON in such a way that each category is key and first search in the respective category is the value, each category should only come once, do not return explanation, do not add ```json "
        const prompt = query1 + " " + searchQueries
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();
        text = text.replace('\`\`\`json', '')
        text = text.replace('\`\`\`', '')
        let results = JSON.parse(text);
        return res.status(200).response(results)
    }
    catch (error) {
        console.log('Internal Server Error: ', error);
    }

}

export default categorizeSearches;