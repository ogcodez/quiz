
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizData } from "@/types/quiz";

interface QuizIntroProps {
  quizData: QuizData;
  onStartQuiz: () => void;
  isLoading: boolean;
}

const QuizIntro = ({ quizData, onStartQuiz, isLoading }: QuizIntroProps) => {
  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in border-2 border-gray-700 bg-gray-800 text-white">
      <CardHeader className="bg-gray-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center text-white animate-glow">{quizData.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <CardDescription className="text-lg text-center mb-4 text-white">
          {quizData.description}
        </CardDescription>
        <div className="text-sm text-center mb-2">
          <p><span className="font-semibold text-white">Number of questions:</span> <span className="text-white">{quizData.questions.length}</span></p>
          <p className="mt-1"><span className="font-semibold text-white">Time:</span> <span className="text-white">No time limit</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={onStartQuiz} 
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 text-lg animate-pulse-light"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Start Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizIntro;
