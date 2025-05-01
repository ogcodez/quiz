
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizResult } from "@/types/quiz";
import { Check, X } from "lucide-react";

interface QuizResultsProps {
  result: QuizResult;
  onRestartQuiz: () => void;
}

const QuizResults = ({ result, onRestartQuiz }: QuizResultsProps) => {
  const scorePercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  const getScoreMessage = () => {
    if (scorePercentage >= 80) return "Excellent!";
    if (scorePercentage >= 60) return "Good job!";
    if (scorePercentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in border-2 border-quiz-light">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg text-center">
        <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2">{getScoreMessage()}</h3>
          <p className="text-3xl font-bold text-quiz-primary mb-4">
            {result.correctAnswers} / {result.totalQuestions}
          </p>
          <Progress value={scorePercentage} className="h-2 bg-gray-100" />
          <p className="mt-2 text-sm text-gray-600">Score: {scorePercentage}%</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold border-b pb-2">Answer Review:</h4>
          {result.answeredQuestions.map((answer, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md ${answer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <div className="flex justify-between items-start">
                <p className="font-medium">{index + 1}. {answer.question}</p>
                {answer.isCorrect ? 
                  <Check className="text-green-500 h-5 w-5 min-w-5 mt-1" /> : 
                  <X className="text-red-500 h-5 w-5 min-w-5 mt-1" />
                }
              </div>
              <p className="text-sm mt-1">
                <span className="font-medium">Your answer:</span> {answer.userAnswer}
              </p>
              {!answer.isCorrect && (
                <p className="text-sm text-green-700 mt-1">
                  <span className="font-medium">Correct answer:</span> {answer.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6 pt-4">
        <Button 
          onClick={onRestartQuiz} 
          className="bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-2"
        >
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
