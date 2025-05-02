
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QuizQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSubmit: (selectedOption: number) => void;
  userAnswers: number[];
  currentQuestionIndex: number;
  totalQuestions: number;
  onBackClick: () => void;
  showBackButton: boolean;
}

const QuestionCard = ({
  question,
  onAnswerSubmit,
  userAnswers,
  currentQuestionIndex,
  totalQuestions,
  onBackClick,
  showBackButton
}: QuestionCardProps) => {
  // Make sure we don't preselect an option when navigating to a new question
  // Use local state to track the current selection in this component
  const [selectedOption, setSelectedOption] = useState<number | null>(
    userAnswers[currentQuestionIndex] !== undefined ? userAnswers[currentQuestionIndex] : null
  );

  const handleOptionSelect = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswerSubmit(selectedOption);
      // Reset selected option for the next question
      setSelectedOption(null);
    }
  };

  // Update selected option when navigating between questions
  // This is needed to show the previously selected answer when going back
  // But we ensure it's null when moving to a new question forward
  useEffect(() => {
    setSelectedOption(userAnswers[currentQuestionIndex] !== undefined ? 
      userAnswers[currentQuestionIndex] : null);
  }, [currentQuestionIndex, userAnswers]);

  return (
    <motion.div
      key={`question-${currentQuestionIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-2 border-gray-700 bg-gray-800 text-white">
        <CardHeader className="bg-gray-700 rounded-t-lg pb-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-300">Question {currentQuestionIndex + 1} of {totalQuestions}</div>
            <div className="px-3 py-1 bg-gray-600 text-white text-xs rounded-full">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </div>
          </div>
          <CardTitle className="text-xl mt-3 text-white">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <RadioGroup 
            value={selectedOption !== null ? selectedOption.toString() : undefined} 
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`} 
                  className="text-white border-gray-400"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-white flex-grow cursor-pointer py-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between py-4">
          {showBackButton ? (
            <Button 
              onClick={onBackClick}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>
          ) : (
            <div></div>
          )}
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
