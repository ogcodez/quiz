
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizData } from "@/services/quizService";
import { QuizResult, QuizQuestion } from "@/types/quiz";
import QuizIntro from "./QuizIntro";
import QuestionCard from "./QuestionCard";
import QuizResults from "./QuizResults";
import AiAssistant from "./AiAssistant";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

enum QuizState {
  INTRO,
  IN_PROGRESS,
  COMPLETED
}

interface QuizContainerProps {
  onViewChange?: (view: number) => void;
}

const QuizContainer = ({ onViewChange }: QuizContainerProps) => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (onViewChange) {
      onViewChange(quizState);
    }
  }, [quizState, onViewChange]);

  const { data: quizData, isLoading, isError } = useQuery({
    queryKey: ["quizData"],
    queryFn: fetchQuizData
  });

  const startQuiz = () => {
    setQuizState(QuizState.IN_PROGRESS);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleAnswerSubmit = (selectedOption: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newUserAnswers);
    }
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = (answers: number[]) => {
    if (!quizData) return;
    
    let correctCount = 0;
    const answeredQuestions = quizData.questions.map((q, index) => {
      const isCorrect = answers[index] === q.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        question: q.question,
        userAnswer: q.options[answers[index]],
        correctAnswer: q.options[q.correctAnswer],
        isCorrect
      };
    });
    
    const result: QuizResult = {
      totalQuestions: quizData.questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / quizData.questions.length) * 100),
      answeredQuestions
    };
    
    setQuizResult(result);
    setQuizState(QuizState.COMPLETED);
    
    const scoreMessage = result.score >= 80 ? "Great job!" : 
                        result.score >= 50 ? "Good effort!" : 
                        "Keep practicing!";
    
    toast({
      title: "Quiz Completed",
      description: `${scoreMessage} You scored ${result.score}%`,
    });
  };

  const restartQuiz = () => {
    setQuizState(QuizState.INTRO);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
  };

  // Get current question for AI Assistant
  const getCurrentQuestion = (): QuizQuestion | null => {
    if (quizState === QuizState.IN_PROGRESS && quizData) {
      return quizData.questions[currentQuestionIndex];
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-5/6 mb-6" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-10 w-1/2 mx-auto" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p>There was a problem loading the quiz. Please try again later.</p>
      </div>
    );
  }

  if (!quizData) return null;

  return (
    <div className="container max-w-4xl mx-auto p-4">
      {quizState === QuizState.INTRO && (
        <QuizIntro quizData={quizData} onStartQuiz={startQuiz} isLoading={isLoading} />
      )}
      
      {quizState === QuizState.IN_PROGRESS && (
        <QuestionCard
          question={quizData.questions[currentQuestionIndex] as QuizQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          userAnswers={userAnswers}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizData.questions.length}
          onBackClick={handleBackClick}
        />
      )}
      
      {quizState === QuizState.COMPLETED && quizResult && (
        <QuizResults result={quizResult} onRestartQuiz={restartQuiz} />
      )}

      {/* AI Assistant - available on all pages */}
      <AiAssistant 
        currentQuestion={getCurrentQuestion()} 
        isIntro={quizState === QuizState.INTRO}
        isResults={quizState === QuizState.COMPLETED}
      />
    </div>
  );
};

export default QuizContainer;
