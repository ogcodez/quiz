
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizResult } from "@/types/quiz";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface QuizResultsProps {
  result: QuizResult;
  onRestartQuiz: () => void;
  onTryAnotherQuiz: () => void;
}

const QuizResults = ({ result, onRestartQuiz, onTryAnotherQuiz }: QuizResultsProps) => {
  const scorePercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  const getScoreMessage = () => {
    if (scorePercentage >= 80) return "Excellent!";
    if (scorePercentage >= 60) return "Good job!";
    if (scorePercentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto border-2 border-gray-700 bg-gray-800 text-white">
        <CardHeader className="bg-gray-700 text-white rounded-t-lg text-center">
          <CardTitle className="text-2xl font-bold text-white">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 text-white">{getScoreMessage()}</h3>
            <p className="text-3xl font-bold text-white mb-4">
              {result.correctAnswers} / {result.totalQuestions}
            </p>
            <Progress value={scorePercentage} className="h-2 bg-gray-900" />
            <p className="mt-2 text-sm text-white">Score: {scorePercentage}%</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold border-b border-gray-700 pb-2 text-white">Answer Review:</h4>
            {result.answeredQuestions.map((answer, index) => (
              <motion.div 
                key={index} 
                className={`p-3 rounded-md ${answer.isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-white">{index + 1}. {answer.question}</p>
                  {answer.isCorrect ? 
                    <Check className="text-green-400 h-5 w-5 min-w-5 mt-1" /> : 
                    <X className="text-red-400 h-5 w-5 min-w-5 mt-1" />
                  }
                </div>
                <p className="text-sm mt-1 text-gray-300">
                  <span className="font-medium">Your answer:</span> {answer.userAnswer}
                </p>
                {!answer.isCorrect && (
                  <p className="text-sm text-green-400 mt-1">
                    <span className="font-medium">Correct answer:</span> {answer.correctAnswer}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pb-6 pt-4 gap-2">
          <Button 
            onClick={onRestartQuiz} 
            className="bg-gray-500 hover:bg-gray-600 text-white flex-1"
          >
            Try Again
          </Button>
          <Button 
            onClick={onTryAnotherQuiz} 
            className="bg-gray-600 hover:bg-gray-700 text-white flex-1"
          >
            Try Another Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizResults;
