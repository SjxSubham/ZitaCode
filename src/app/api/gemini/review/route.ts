import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Please review the following ${language} code and provide specific suggestions for improvement. Focus on:
                  1. Code quality and best practices
                  2. Potential bugs or issues & fix them
                  3. Performance optimizations
                  4. Security considerations
                  5. Readability and maintainability
                 
Code:
\`\`\`${language}
${code}
\`\`\`

Please provide your suggestions in a clear, concise format, provide the answers less descriptive except the code.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Split the response into individual suggestions
    const suggestions = text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get AI review" },
      { status: 500 }
    );
  }
}



