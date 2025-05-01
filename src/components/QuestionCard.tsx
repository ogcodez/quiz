
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSubmit: (selectedOption: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  onBackClick: () => void;
}

const QuestionCard = ({ 
  question, 
  onAnswerSubmit, 
  currentQuestionIndex, 
  totalQuestions,
  onBackClick
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Reset selection when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleOptionChange = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswerSubmit(selectedOption);
      setSelectedOption(null); // Reset selection after submission
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in border-2 border-gray-700 bg-gray-800 text-white">
      <CardHeader className="bg-gray-700 text-white rounded-t-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {currentQuestionIndex > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-white hover:bg-gray-600"
                onClick={onBackClick}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <span className="text-sm text-white">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <span className="text-sm bg-gray-500 text-white px-2 py-1 rounded-full font-bold">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <CardTitle className="text-xl font-medium text-white">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup onValueChange={handleOptionChange} className="space-y-3" value={selectedOption !== null ? selectedOption.toString() : undefined}>
          {question.options.map((option, index) => (
            <div key={index} className={cn(
              "flex items-center border rounded-md p-3 transition-colors",
              selectedOption === index 
                ? "border-white bg-gray-700/30" 
                : "border-gray-700 hover:bg-gray-700/20"
            )}>
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-white" />
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
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2"
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Submit Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
