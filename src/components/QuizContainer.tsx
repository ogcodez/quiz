import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommenderQuiz, fetchGeneralKnowledgeQuiz, fetchMathQuiz, fetchCodingQuiz } from "@/services/quizService";
import { QuizResult, QuizQuestion, QuizData } from "@/types/quiz";
import QuizIntroWrapper from "./QuizIntroWrapper";
import QuestionCard from "./QuestionCard";
import QuizResults from "./QuizResults";
import QuizRecommendationResults from "./QuizRecommendationResults";
import QuizCarousel from "./QuizCarousel";
import AiAssistant from "./AiAssistant";
import NavigationBar from "./NavigationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export enum QuizState {
  INTRO,
  IN_PROGRESS,
  COMPLETED,
  CAROUSEL
}

export enum QuizType {
  RECOMMENDER = "recommender",
  GENERAL_KNOWLEDGE = "general-knowledge",
  MATH = "math",
  CODING = "coding"
}

interface QuizContainerProps {
  onViewChange?: (view: number) => void;
}

const QuizContainer = ({ onViewChange }: QuizContainerProps) => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [activeQuizType, setActiveQuizType] = useState<QuizType>(QuizType.RECOMMENDER);
  const [recommendedQuizType, setRecommendedQuizType] = useState<QuizType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (onViewChange) {
      onViewChange(quizState);
    }
  }, [quizState, onViewChange]);

  // Fetch the active quiz data based on the quiz type
  const { data: activeQuizData, isLoading: activeQuizLoading, isError: activeQuizError } = useQuery({
    queryKey: ["quizData", activeQuizType],
    queryFn: () => {
      switch (activeQuizType) {
        case QuizType.RECOMMENDER:
          return fetchRecommenderQuiz();
        case QuizType.GENERAL_KNOWLEDGE:
          return fetchGeneralKnowledgeQuiz();
        case QuizType.MATH:
          return fetchMathQuiz();
        case QuizType.CODING:
          return fetchCodingQuiz();
        default:
          return fetchRecommenderQuiz();
      }
    }
  });

  // Pre-fetch other quiz data for the carousel
  const { data: generalKnowledgeQuiz } = useQuery({
    queryKey: ["quizData", QuizType.GENERAL_KNOWLEDGE],
    queryFn: fetchGeneralKnowledgeQuiz
  });

  const { data: mathQuiz } = useQuery({
    queryKey: ["quizData", QuizType.MATH],
    queryFn: fetchMathQuiz
  });

  const { data: codingQuiz } = useQuery({
    queryKey: ["quizData", QuizType.CODING],
    queryFn: fetchCodingQuiz
  });

  const { data: recommenderQuiz } = useQuery({
    queryKey: ["quizData", QuizType.RECOMMENDER],
    queryFn: fetchRecommenderQuiz
  });

  // Function to determine the recommended quiz based on user answers
  const determineRecommendedQuiz = (answers: number[]): QuizType => {
    // Count frequencies of answers
    const answerCounts = [0, 0, 0, 0]; // general, math, coding, general (last is just for index alignment)
    
    answers.forEach(answer => {
      if (answer >= 0 && answer < 4) {
        answerCounts[answer]++;
      }
    });
    
    // Find the most frequent answer
    let maxCount = -1;
    let recommendedIndex = 0;
    
    answerCounts.forEach((count, index) => {
      if (count > maxCount) {
        maxCount = count;
        recommendedIndex = index;
      }
    });
    
    // Map index to quiz type
    switch (recommendedIndex) {
      case 0:
        return QuizType.GENERAL_KNOWLEDGE;
      case 1:
        return QuizType.MATH;
      case 2:
        return QuizType.CODING;
      default:
        return QuizType.GENERAL_KNOWLEDGE;
    }
  };

  const startQuiz = (quizType: QuizType = activeQuizType) => {
    setActiveQuizType(quizType);
    setQuizState(QuizState.IN_PROGRESS);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
  };

  const handleAnswerSubmit = (selectedOption: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    
    if (currentQuestionIndex < (activeQuizData?.questions.length || 0) - 1) {
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
    if (!activeQuizData) return;
    
    if (activeQuizType === QuizType.RECOMMENDER) {
      // For recommender quiz, determine the recommended next quiz
      const recommended = determineRecommendedQuiz(answers);
      setRecommendedQuizType(recommended);
      setQuizState(QuizState.COMPLETED);
      return;
    }
    
    // For regular quizzes, calculate the score
    let correctCount = 0;
    const answeredQuestions = activeQuizData.questions.map((q, index) => {
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
      totalQuestions: activeQuizData.questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / activeQuizData.questions.length) * 100),
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
    startQuiz(activeQuizType);
  };

  const showQuizCarousel = () => {
    setQuizState(QuizState.CAROUSEL);
  };

  const acceptRecommendedQuiz = () => {
    if (recommendedQuizType) {
      startQuiz(recommendedQuizType);
    }
  };

  // Get current question for AI Assistant
  const getCurrentQuestion = (): QuizQuestion | null => {
    if (quizState === QuizState.IN_PROGRESS && activeQuizData) {
      return activeQuizData.questions[currentQuestionIndex];
    }
    return null;
  };

  if (activeQuizLoading) {
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

  if (activeQuizError) {
    return (
      <div className="text-center p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p>There was a problem loading the quiz. Please try again later.</p>
      </div>
    );
  }

  if (!activeQuizData) return null;

  const allQuizzes = [
    { type: QuizType.RECOMMENDER, data: recommenderQuiz },
    { type: QuizType.GENERAL_KNOWLEDGE, data: generalKnowledgeQuiz },
    { type: QuizType.MATH, data: mathQuiz },
    { type: QuizType.CODING, data: codingQuiz },
  ].filter(q => q.data !== undefined) as { type: QuizType, data: QuizData }[];

  return (
    <div className="container max-w-4xl mx-auto p-4 relative">
      <NavigationBar 
        onShowAllQuizzes={showQuizCarousel} 
        isVisible={quizState === QuizState.IN_PROGRESS || quizState === QuizState.COMPLETED} 
      />
      
      {quizState === QuizState.INTRO && (
        <QuizIntroWrapper 
          quizData={activeQuizData} 
          onStartQuiz={() => startQuiz(activeQuizType)} 
          isLoading={activeQuizLoading}
          onShowAllQuizzes={showQuizCarousel}
        />
      )}
      
      {quizState === QuizState.IN_PROGRESS && (
        <QuestionCard
          question={activeQuizData.questions[currentQuestionIndex] as QuizQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          userAnswers={userAnswers}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={activeQuizData.questions.length}
          onBackClick={handleBackClick}
          showBackButton={currentQuestionIndex > 0}
        />
      )}
      
      {quizState === QuizState.COMPLETED && activeQuizType === QuizType.RECOMMENDER && recommendedQuizType && (
        <QuizRecommendationResults 
          recommendedQuizType={recommendedQuizType} 
          onAcceptQuiz={acceptRecommendedQuiz}
          onShowAllQuizzes={showQuizCarousel}
        />
      )}
      
      {quizState === QuizState.COMPLETED && activeQuizType !== QuizType.RECOMMENDER && quizResult && (
        <QuizResults 
          result={quizResult} 
          onRestartQuiz={restartQuiz} 
          onTryAnotherQuiz={showQuizCarousel} 
        />
      )}

      {quizState === QuizState.CAROUSEL && (
        <QuizCarousel 
          quizzes={allQuizzes} 
          onStartQuiz={startQuiz} 
        />
      )}

      {/* AI Assistant - available on all pages */}
      <AiAssistant 
        currentQuestion={getCurrentQuestion()} 
        isIntro={quizState === QuizState.INTRO}
        isResults={quizState === QuizState.COMPLETED}
        isCarousel={quizState === QuizState.CAROUSEL}
      />
    </div>
  );
};

export default QuizContainer;
