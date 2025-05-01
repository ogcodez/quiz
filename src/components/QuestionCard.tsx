
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSubmit: (selectedOption: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionCard = ({ 
  question, 
  onAnswerSubmit, 
  currentQuestionIndex, 
  totalQuestions 
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const handleOptionChange = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswerSubmit(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in border-2 border-quiz-secondary bg-quiz-dark text-white">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-quiz-light">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm bg-quiz-gold text-quiz-dark px-2 py-1 rounded-full font-bold">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <CardTitle className="text-xl font-medium text-quiz-gold">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup onValueChange={handleOptionChange} className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className={cn(
              "flex items-center border rounded-md p-3 transition-colors",
              selectedOption === index 
                ? "border-quiz-gold bg-quiz-primary/30" 
                : "border-quiz-secondary hover:bg-quiz-primary/20"
            )}>
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-quiz-gold" />
              <Label htmlFor={`option-${index}`} className="ml-3 flex-1 cursor-pointer text-white">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button 
          onClick={handleSubmit} 
          disabled={selectedOption === null}
          className="bg-quiz-secondary hover:bg-quiz-tertiary text-white px-8 py-2"
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Submit Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
