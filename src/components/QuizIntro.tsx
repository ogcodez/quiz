
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
    <Card className="w-full max-w-md mx-auto animate-fade-in border-2 border-quiz-light">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">{quizData.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <CardDescription className="text-lg text-center mb-4">
          {quizData.description}
        </CardDescription>
        <div className="text-sm text-center mb-2">
          <p><span className="font-semibold">Number of questions:</span> {quizData.questions.length}</p>
          <p className="mt-1"><span className="font-semibold">Time:</span> No time limit</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={onStartQuiz} 
          className="bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-2 text-lg"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Start Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizIntro;
