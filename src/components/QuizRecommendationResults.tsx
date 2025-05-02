
import React from 'react';
import { motion } from 'framer-motion';
import { QuizType } from './QuizContainer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizRecommendationResultsProps {
  recommendedQuizType: QuizType;
  onAcceptQuiz: () => void;
  onShowAllQuizzes: () => void;
}

const QuizRecommendationResults = ({ 
  recommendedQuizType,
  onAcceptQuiz,
  onShowAllQuizzes
}: QuizRecommendationResultsProps) => {
  
  const getQuizName = (type: QuizType): string => {
    switch (type) {
      case QuizType.GENERAL_KNOWLEDGE:
        return "General Knowledge Quiz";
      case QuizType.MATH:
        return "Basic Math Quiz";
      case QuizType.CODING:
        return "Basic Coding Concepts Quiz";
      default:
        return "Quiz";
    }
  };
  
  const getQuizDescription = (type: QuizType): string => {
    switch (type) {
      case QuizType.GENERAL_KNOWLEDGE:
        return "Test your knowledge with this fun general knowledge quiz!";
      case QuizType.MATH:
        return "Challenge yourself with these fun math questions!";
      case QuizType.CODING:
        return "Test your understanding of fundamental programming concepts!";
      default:
        return "Take this quiz to test your knowledge!";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto border-2 border-gray-700 bg-gray-800 text-white">
        <CardHeader className="bg-gray-700 text-white rounded-t-lg text-center">
          <CardTitle className="text-2xl font-bold text-white">Your Quiz Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-3 text-white">Based on your responses, we recommend:</h3>
            <motion.div 
              className="p-4 bg-gray-700 rounded-lg mb-5"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">{getQuizName(recommendedQuizType)}</h2>
              <p className="text-gray-300">{getQuizDescription(recommendedQuizType)}</p>
            </motion.div>
            <p className="mt-3 text-gray-300">
              Would you like to start this quiz, or would you like to see all available quizzes?
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pb-6 pt-4">
          <Button 
            onClick={onShowAllQuizzes} 
            variant="outline"
            className="border-gray-500 text-white hover:bg-gray-700"
          >
            See All Quizzes
          </Button>
          <Button 
            onClick={onAcceptQuiz} 
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Start Recommended Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizRecommendationResults;
