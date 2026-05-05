export interface ExecutionRequest {
  language: string;
  code: string;
}

export interface ExecutionResponse {
  output: string;
  error: string | null;
}

class ExecutionService {
  /**
   * Executes the provided code using the internal backend API.
   */
  public async executeCode({
    language,
    code,
  }: ExecutionRequest): Promise<ExecutionResponse> {
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.error) {
        return {
          output: data.output || "",
          error: data.error,
        };
      }

      // Success
      return {
        output: data.output,
        error: null,
      };
    } catch (error: any) {
      console.error("ExecutionService Error:", error);
      return {
        output: "",
        error:
          error.message || "An unexpected error occurred during execution.",
      };
    }
  }
}

export const executionService = new ExecutionService();
