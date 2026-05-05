import { NextResponse } from "next/server";

export interface ExecutionRequest {
  language: string;
  code: string;
}

export interface ExecutionResponse {
  output: string;
  error: string | null;
}

const WANDBOX_COMPILERS: Record<string, string> = {
  javascript: "nodejs-18.20.4",
  typescript: "typescript-5.6.2",
  python: "cpython-3.10.15",
  java: "openjdk-jdk-22+36",
  go: "go-1.23.2",
  rust: "rust-1.82.0",
  cpp: "gcc-13.2.0",
  csharp: "dotnetcore-8.0.402",
  ruby: "ruby-3.4.1",
  swift: "swift-6.0.1",
  c: "gcc-13.2.0-c",
};

const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";

function preprocessCode(language: string, code: string): string {
  let executionCode = code;

  if (language === "java") {
    // Wandbox saves code as prog.java, which conflicts with 'public class Main'
    executionCode = executionCode.replace(/public\s+class/g, "class");
  }

  return executionCode;
}

export async function POST(req: Request) {
  try {
    const body: ExecutionRequest = await req.json();
    const { language, code } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: "Language and code are required." },
        { status: 400 }
      );
    }

    const compiler = WANDBOX_COMPILERS[language] || WANDBOX_COMPILERS["javascript"];
    const processedCode = preprocessCode(language, code);

    const response = await fetch(WANDBOX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: processedCode,
        compiler: compiler,
      }),
    });

    if (!response.ok) {
      throw new Error(`External API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const exitCode = parseInt(data.status, 10);
    const stdout = data.program_output || "";
    const stderr = data.program_error || data.compiler_error || "";

    // Handle execution/compilation failures
    if (exitCode !== 0 && stderr) {
      return NextResponse.json({
        output: stdout,
        error: stderr,
      });
    }

    // Success
    return NextResponse.json({
      output: (stdout || stderr).trim(),
      error: null,
    });
  } catch (error: any) {
    console.error("Execution API Error:", error);
    return NextResponse.json(
      { output: "", error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
