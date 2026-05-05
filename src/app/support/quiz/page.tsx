'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Codepen, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ThemeToggleButton from '@/components/ThemeToggleButton';
import Link from 'next/link';


const categories = [
  { value: 'Linux', label: 'Linux' },
  { value: 'DevOps', label: 'DevOps' },
  // { value: 'Networking', label: 'Networking' }, // not working
  { value: 'Code', label: 'Programming' }, 
  // { value: 'Cloud', label: 'Cloud' },  // not working
  { value: 'Docker', label: 'Docker' },
  // { value: 'Kubernetes', label: 'Kubernetes' },   // not working
];

const programmingTags = [
  { value: 'PHP', label: 'PHP' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Laravel', label: 'Laravel' },
  // { value: 'React', label: 'React' },
  // { value: 'Node.js', label: 'Node.js' },
  // { value: 'Java', label: 'Java' },
  // { value: 'C++', label: 'C++' },
];

interface QuizQuestion {
  id: number;
  question: string;
  description: string | null;
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e: string | null;
    answer_f: string | null;
  };
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
    answer_e_correct: string;
    answer_f_correct: string;
  };
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showCategorySelection, setShowCategorySelection] = useState(true);

  const fetchQuestions = async (category: string, tag?: string) => {
    setLoading(true);
    try {
      let url = `https://quizapi.io/api/v1/questions?apiKey=${process.env.NEXT_PUBLIC_QUIZ_API_KEY}&limit=20&category=${category}`;
      if (tag) {
        url += `&tags=${tag}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
      setShowCategorySelection(false);
    } catch (err) {
      setError('Failed to load questions. Please try again later.');
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      if (selectedCategory === 'Code' && selectedTag) {
        fetchQuestions(selectedCategory, selectedTag);
      } else {
        fetchQuestions(selectedCategory);
      }
    }
  };

  const handleAnswerSelect = (answerKey: string) => {
    setSelectedAnswer(answerKey);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = currentQuestion.correct_answers[`answer_${selectedAnswer}_correct` as keyof QuizQuestion['correct_answers']] === 'true';
      
      if (isCorrect) {
        setScore(prevScore => prevScore + 10);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showCategorySelection) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <Link href="/" className="flex items-center gap-3 group relative">
    
    <div
      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
        group-hover:opacity-100 transition-all duration-500 blur-xl"
    />

    
    <div
      className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
      ring-white/10 group-hover:ring-white/20 transition-all"
    >
      <Codepen className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
    </div>

    <div className="flex flex-col">
      <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
        ZitaCode
      </span>
      <span className="block text-xs text-blue-400/60 font-medium">
        Online Code Editor
      </span>
    </div>
  </Link>
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-center">Select Quiz Options</CardTitle>
                <ThemeToggleButton />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCategory === 'Code' && (
                <Select onValueChange={setSelectedTag}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a programming language" />
                  </SelectTrigger>
                  <SelectContent>
                    {programmingTags.map((tag) => (
                      <SelectItem key={tag.value} value={tag.value}>
                        {tag.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button 
                className="w-full" 
                onClick={handleStartQuiz}
                disabled={!selectedCategory || (selectedCategory === 'Code' && !selectedTag)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
                      <Link href="/" className="flex items-center gap-3 group relative">
    
    <div
      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
        group-hover:opacity-100 transition-all duration-500 blur-xl"
    />

    
    <div
      className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
      ring-white/10 group-hover:ring-white/20 transition-all"
    >
      <Codepen className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
    </div>

    <div className="flex flex-col">
      <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
        ZitaCode
      </span>
      <span className="block text-xs text-blue-400/60 font-medium">
        Online Code Editor
      </span>
    </div>
  </Link>
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-center">Quiz Completed!</CardTitle>
                <ThemeToggleButton />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <p className="text-4xl font-bold text-primary">{score} points</p>
                <p className="text-lg">You answered {score / 20} out of {questions.length} questions correctly!</p>
                <Button onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setShowResult(false);
                  setSelectedAnswer(null);
                  setSelectedTag('');
                  setShowCategorySelection(true);
                }}>
                  Try Again
                </Button>
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Technical Quiz - {selectedCategory}
              {selectedTag && ` (${selectedTag})`}
              {/* {` - ${selectedDifficulty}`} */}
            </h1>
            <div className="text-lg font-semibold">Score: {score}</div>
          </div>
          <ThemeToggleButton />
        </div>

        <Progress value={progress} className="h-2" />

        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full bg-background/80 dark:bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">{currentQuestion.question}</p>
              
              <div className="space-y-3">
                {Object.entries(currentQuestion.answers)
                  .filter(([_, value]) => value !== null)
                  .map(([key, value]) => (
                    <Button
                      key={key}
                      variant={selectedAnswer === key ? "default" : "outline"}
                      className="w-full justify-start hover:bg-primary/10 dark:hover:bg-primary/20"
                      onClick={() => handleAnswerSelect(key)}
                    >
                      {value}
                    </Button>
                  ))}
              </div>

              <Button
                className="w-full"
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 