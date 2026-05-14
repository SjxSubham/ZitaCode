"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Codepen, Loader2, BrainCircuit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";

const categories = [
  { value: "React & Next.js", label: "React & Next.js" },
  { value: "TypeScript & JavaScript", label: "TypeScript & JavaScript" },
  { value: "Python & Django", label: "Python & Django" },
  { value: "System Design", label: "System Design" },
  { value: "DevOps & Docker", label: "DevOps & Docker" },
  { value: "Data Structures & Algorithms", label: "Algorithms & DSA" },
  { value: "Databases (SQL & NoSQL)", label: "Databases" },
];

const difficulties = [
  { value: "junior", label: "Junior Level" },
  { value: "mid-level", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];

interface QuizQuestion {
  question: string;
  answers: string[];
  correct_answer: string;
  category: string;
  difficulty: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("React & Next.js");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("mid-level");
  const [showCategorySelection, setShowCategorySelection] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use Mistral AI to generate hyper-relevant tech role questions on the fly!
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          difficulty: selectedDifficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to generate questions. AI service might be busy.",
        );
      }

      const data = await response.json();

      if (!data.results || !data.results.length) {
        throw new Error("No questions were generated. Please try again.");
      }

      // Shuffle answers for each generated question
      const transformedQuestions: QuizQuestion[] = data.results.map(
        (q: QuizQuestion) => {
          const allAnswers = [...q.answers].sort(() => Math.random() - 0.5);
          return {
            ...q,
            answers: allAnswers,
          };
        },
      );

      setQuestions(transformedQuestions);
      setShowCategorySelection(false);
    } catch (err: any) {
      setError(
        err.message || "Failed to load questions. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      fetchQuestions();
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct_answer;

      if (isCorrect) {
        setScore((prevScore) => prevScore + 10);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-[#0a0a0f]">
        <div className="relative">
          <BrainCircuit className="h-16 w-16 animate-pulse text-blue-500" />
          <Loader2 className="h-24 w-24 animate-spin text-purple-500 absolute -top-4 -left-4 opacity-50" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Generating Questions...
          </h2>
          <p className="text-gray-400">
            Our AI is crafting {selectedDifficulty} interview questions about{" "}
            {selectedCategory}
          </p>
        </div>
      </div>
    );
  }

  if (error && !showCategorySelection) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <Card className="w-full max-w-md bg-[#1a1a2e] border-white/10">
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-red-400">{error}</p>
            <Button
              onClick={() => setShowCategorySelection(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showCategorySelection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0
                  group-hover:opacity-100 transition-all duration-500 blur-xl"
              />
              <div
                className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
                ring-white/10 group-hover:ring-white/20 transition-all"
              >
                <div className="size-8 text-blue-400 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/Image...webp"
                    alt="ZitaCode"
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  ZitaCode
                </span>
                <span className="block text-xs text-blue-400/60 font-medium">
                  Tech Interview Prep
                </span>
              </div>
            </Link>
          </div>

          <Card className="w-full bg-[#1a1a2e] border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Configure Your Quiz
              </CardTitle>
              <p className="text-center text-sm text-gray-400">
                Powered by Mistral AI
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Topic / Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-[#0d0d14] border-white/10 focus:ring-blue-500">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Difficulty Level
                </label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger className="bg-[#0d0d14] border-white/10 focus:ring-blue-500">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    {difficulties.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 shadow-lg shadow-blue-500/20"
                onClick={handleStartQuiz}
                disabled={!selectedCategory || !selectedDifficulty || loading}
              >
                <BrainCircuit className="mr-2" size={20} /> Generate Interview
                Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full bg-[#1a1a2e] border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <p className="text-5xl font-extrabold text-blue-400 mb-2">
                    {score}
                  </p>
                  <p className="text-gray-300">Total Points Earned</p>
                </div>

                <p className="text-lg text-gray-400">
                  You answered {score / 10} out of {questions.length} questions
                  correctly!
                </p>

                <div className="pt-4 grid gap-3">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setScore(0);
                      setShowResult(false);
                      setSelectedAnswer(null);
                      setShowCategorySelection(true);
                    }}
                  >
                    Generate Another Quiz
                  </Button>
                  <Link href="/" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-white/10 hover:bg-white/10 py-6 text-white"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a2e] p-4 rounded-xl border border-white/10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <BrainCircuit className="text-blue-400" />
              {currentQuestion.category}
            </h1>
            <p className="text-gray-400 text-sm mt-1 capitalize">
              Difficulty: {currentQuestion.difficulty}
            </p>
          </div>
          <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <span className="text-sm text-blue-400 font-semibold">
              Score: {score}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#1a1a2e]" />
        </div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full bg-[#1a1a2e] border-white/10 text-white">
            <CardContent className="p-6 md:p-8 space-y-8">
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed font-mono">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base transition-all font-mono
                      ${
                        selectedAnswer === answer
                          ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                          : "bg-[#0d0d14] border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    onClick={() => handleAnswerSelect(answer)}
                  >
                    {answer}
                  </Button>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
