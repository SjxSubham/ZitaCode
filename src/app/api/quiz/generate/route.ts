import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, difficulty } = body;

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Mistral API key not configured" },
        { status: 500 },
      );
    }

    const client = new Mistral({ apiKey });

    const prompt = `Generate exactly 10 highly relevant multiple-choice quiz questions for a Software Engineering role about ${category} at a ${difficulty} difficulty level.
Output ONLY valid JSON in the exact following format (array of objects), without any markdown formatting, backticks, or extra text:
[
  {
    "question": "What is the primary purpose of...",
    "answers": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option B",
    "category": "${category}",
    "difficulty": "${difficulty}"
  }
]`;

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      responseFormat: { type: "json_object" },
    });

    const content = response.choices?.[0].message.content || "[]";

    let contentStr = "";
    if (typeof content === "string") {
      contentStr = content;
    } else if (
      Array.isArray(content) &&
      content.length > 0 &&
      "text" in content[0]
    ) {
      contentStr = (content[0] as any).text;
    }

    // Clean up any potential markdown if mistral still adds it
    if (contentStr.startsWith("\`\`\`json")) {
      contentStr = contentStr.replace(/\`\`\`json\n|\`\`\`/g, "");
    }

    let questions = JSON.parse(contentStr || "[]");
    // Mistral might wrap in an object like { questions: [...] }
    if (questions.questions && Array.isArray(questions.questions)) {
      questions = questions.questions;
    }

    return NextResponse.json({ results: questions });
  } catch (error: any) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 500 },
    );
  }
}
