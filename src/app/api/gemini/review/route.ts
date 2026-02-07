import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite-001",
];

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.",
          errorType: "MISSING_API_KEY",
        },
        { status: 500 },
      );
    }

    const prompt = `Please review the following ${language} code and provide specific suggestions for improvement. Focus on:
                  1. Time Complexity & Space Complexity
                  2. Code quality and best practices
                  3. Potential bugs or issues & fix them
                  4. Performance optimizations
                  5. Security considerations
                  6. Readability and maintainability

Code:
\`\`\`${language}
${code}
\`\`\`

Please provide your suggestions in a clear, concise format, provide the answers less descriptive except the code.`;

    // Try each model until one works
    let lastError: Error | null = null;
    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const suggestions = [text];
        return NextResponse.json({ suggestions });
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        const errorMessage = lastError.message;

        if (
          errorMessage.includes("404") ||
          errorMessage.includes("not found")
        ) {
          console.log(`Model ${modelName} not available, trying next...`);
          continue;
        }

        throw error;
      }
    }

    throw lastError || new Error("All models failed");
  } catch (error: unknown) {
    console.error("Error in Gemini API:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("Too Many Requests")
    ) {
      return NextResponse.json(
        {
          error:
            "API quota exceeded. Your free tier limit has been reached. Please wait for the quota to reset (usually daily) or upgrade to a paid plan at https://ai.google.dev/pricing",
          errorType: "QUOTA_EXCEEDED",
        },
        { status: 429 },
      );
    }

    if (
      errorMessage.includes("401") ||
      errorMessage.includes("API key") ||
      errorMessage.includes("invalid")
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid API key. Please check your GEMINI_API_KEY in the environment variables.",
          errorType: "INVALID_API_KEY",
        },
        { status: 401 },
      );
    }

    if (
      errorMessage.includes("rate limit") ||
      errorMessage.includes("too many requests")
    ) {
      return NextResponse.json(
        {
          error: "Rate limit reached. Please wait a moment and try again.",
          errorType: "RATE_LIMITED",
        },
        { status: 429 },
      );
    }

    if (
      errorMessage.includes("not found") ||
      errorMessage.includes("404") ||
      errorMessage.includes("models/")
    ) {
      return NextResponse.json(
        {
          error:
            "No available AI models found. Please try again later or contact support.",
          errorType: "MODEL_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    if (
      errorMessage.includes("fetch") ||
      errorMessage.includes("network") ||
      errorMessage.includes("ECONNREFUSED")
    ) {
      return NextResponse.json(
        {
          error:
            "Network error. Unable to connect to the Gemini API. Please check your internet connection.",
          errorType: "NETWORK_ERROR",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to get AI review. Please try again later.",
        errorType: "UNKNOWN_ERROR",
      },
      { status: 500 },
    );
  }
}
