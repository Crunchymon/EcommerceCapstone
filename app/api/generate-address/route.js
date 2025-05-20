import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = "Generate a realistic US address in JSON format with the following fields: street, city, state, zipCode. Make it look like a real address. Return ONLY the JSON object without any markdown formatting or backticks.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text to ensure it's valid JSON
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    // Parse the JSON response
    const address = JSON.parse(cleanText);

    return Response.json({ address });
  } catch (error) {
    console.error('Error generating address:', error);
    return Response.json({ error: 'Failed to generate address' }, { status: 500 });
  }
} 