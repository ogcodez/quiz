
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
    <Card className="w-full max-w-md mx-auto animate-fade-in border-2 border-quiz-light">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm bg-white text-quiz-primary px-2 py-1 rounded-full">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <CardTitle className="text-xl font-medium">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup onValueChange={handleOptionChange} className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className={cn(
              "flex items-center border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors",
              selectedOption === index ? "border-quiz-primary bg-quiz-light/20" : ""
            )}>
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-quiz-primary" />
              <Label htmlFor={`option-${index}`} className="ml-3 flex-1 cursor-pointer">
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
          className="bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-2"
        >
          Next Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
