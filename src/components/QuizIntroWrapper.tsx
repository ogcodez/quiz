
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizData } from '@/types/quiz';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizIntroWrapperProps {
  quizData: QuizData;
  onStartQuiz: () => void;
  isLoading: boolean;
  onShowAllQuizzes: () => void;
}

const QuizIntroWrapper = ({ quizData, onStartQuiz, isLoading, onShowAllQuizzes }: QuizIntroWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto border-2 border-gray-700 bg-gray-800 text-white">
        <CardHeader className="bg-gray-700 text-white rounded-t-lg text-center">
          <CardTitle className="text-2xl font-bold text-white">{quizData.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="text-center mb-6">
            <p className="text-gray-300">{quizData.description}</p>
            <p className="text-sm mt-4 text-gray-400">{quizData.questions.length} questions</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pb-6 pt-4 gap-2">
          <Button
            onClick={onShowAllQuizzes}
            className="bg-gray-500 hover:bg-gray-600 text-white flex-1"
            disabled={isLoading}
          >
            See All Quizzes
          </Button>
          <Button
            onClick={onStartQuiz}
            className="bg-gray-500 hover:bg-gray-600 text-white flex-1"
            disabled={isLoading}
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizIntroWrapper;
