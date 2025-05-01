
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
    <Card className="w-full max-w-md mx-auto animate-scale-in border-2 border-quiz-secondary bg-quiz-dark text-white">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg text-center">
        <CardTitle className="text-2xl font-bold text-quiz-gold animate-glow">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2 text-white">{getScoreMessage()}</h3>
          <p className="text-3xl font-bold text-quiz-gold mb-4 animate-glow">
            {result.correctAnswers} / {result.totalQuestions}
          </p>
          <Progress value={scorePercentage} className="h-2 bg-gray-700" indicatorClassName="bg-quiz-gold" />
          <p className="mt-2 text-sm text-quiz-light">Score: {scorePercentage}%</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold border-b border-quiz-secondary pb-2 text-quiz-gold">Answer Review:</h4>
          {result.answeredQuestions.map((answer, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md ${answer.isCorrect ? 'bg-quiz-correct/20' : 'bg-quiz-wrong/20'}`}
            >
              <div className="flex justify-between items-start">
                <p className="font-medium text-white">{index + 1}. {answer.question}</p>
                {answer.isCorrect ? 
                  <Check className="text-quiz-correct h-5 w-5 min-w-5 mt-1" /> : 
                  <X className="text-quiz-wrong h-5 w-5 min-w-5 mt-1" />
                }
              </div>
              <p className="text-sm mt-1 text-gray-300">
                <span className="font-medium">Your answer:</span> {answer.userAnswer}
              </p>
              {!answer.isCorrect && (
                <p className="text-sm text-quiz-correct mt-1">
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
          className="bg-quiz-secondary hover:bg-quiz-tertiary text-white px-8 py-2"
        >
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
