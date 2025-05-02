
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageCircle, X } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiAssistantProps {
  currentQuestion: QuizQuestion | null;
  isIntro: boolean;
  isResults: boolean;
  isCarousel?: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ 
  currentQuestion,
  isIntro,
  isResults,
  isCarousel = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ 
    role: "assistant", 
    content: "Hi! I'm your quiz assistant. How can I help you?" 
  }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add a contextual message when the quiz state changes
    if (isIntro) {
      addContextMessage("You're about to start a quiz. I can help explain how the quiz works if you have questions.");
    } else if (isResults) {
      addContextMessage("You've completed the quiz. Need any clarification about your results?");
    } else if (isCarousel) {
      addContextMessage("You're browsing our quiz selection. I can help you decide which quiz might be most interesting for you.");
    } else if (currentQuestion) {
      // Don't add a new message each time if we're already on questions
      if (!messages.some(m => m.content.includes("If you need a hint"))) {
        addContextMessage("If you need a hint or have a question about this quiz question, just ask me!");
      }
    }
  }, [isIntro, isResults, isCarousel, currentQuestion?.id]);

  const addContextMessage = (content: string) => {
    setMessages(prev => {
      // Check if the last message is from the assistant and not identical to new content
      if (prev.length > 0 && 
          prev[prev.length - 1].role === "assistant" && 
          prev[prev.length - 1].content !== content) {
        return [...prev, { role: "assistant", content }];
      } else if (prev.length === 1 && prev[0].role === "assistant" && prev[0].content.startsWith("Hi! I'm your quiz")) {
        // If we only have the intro message, update it
        return [prev[0], { role: "assistant", content }];
      }
      return prev;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    setIsLoading(true);
    
    // Simulate AI response based on context
    setTimeout(() => {
      const response = generateResponse(input, currentQuestion, isIntro, isResults, isCarousel);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
    
    setInput("");
  };

  const generateResponse = (
    question: string, 
    currentQuestion: QuizQuestion | null,
    isIntro: boolean,
    isResults: boolean,
    isCarousel: boolean
  ): string => {
    // Simple logic to generate contextual responses
    question = question.toLowerCase();
    
    // Handle quiz question related queries
    if (currentQuestion) {
      if (question.includes("hint") || question.includes("help")) {
        return `Here's a hint: ${generateHint(currentQuestion)}`;
      }
      
      if (question.includes("correct answer") || question.includes("solution")) {
        return "I can't give you the correct answer directly, but I can provide hints to help you figure it out!";
      }
    }
    
    // Handle intro related queries
    if (isIntro) {
      if (question.includes("how") && question.includes("work")) {
        return "The quiz will present you with multiple-choice questions. Select your answer and click 'Next' to proceed. At the end, you'll get your score and feedback on each question.";
      }
      
      if (question.includes("type") && question.includes("quiz")) {
        return "This is a quiz that will recommend other quizzes based on your interests and preferences. After answering a few questions, you'll get a personalized recommendation!";
      }
    }
    
    // Handle result related queries
    if (isResults) {
      if (question.includes("score") || question.includes("result")) {
        return "Your score is calculated based on the number of correct answers. Don't worry if it's not perfect - quizzes are a great way to learn!";
      }
      
      if (question.includes("retry") || question.includes("try again")) {
        return "Yes, you can retry the quiz by clicking the 'Try Again' button. You can also try other quizzes we offer by clicking 'Try Another Quiz'.";
      }
    }

    // Handle carousel related queries
    if (isCarousel) {
      if (question.includes("recommend") || question.includes("suggest")) {
        return "We have several quizzes available: General Knowledge for trivia lovers, Math for those who enjoy numbers and calculations, and Coding for tech enthusiasts. The Quiz Recommender can also help you find the perfect match!";
      }
      
      if (question.includes("difference")) {
        return "Each quiz focuses on different topics. General Knowledge covers various facts, Math tests numerical skills, and Coding explores programming concepts. Try the one that matches your interests!";
      }
    }

    // Generic fallback responses
    const fallbacks = [
      "I'm here to help with the quiz. Could you clarify what you'd like to know?",
      "That's an interesting question. Would you like some guidance on the current quiz?",
      "I'm your quiz assistant. I can help explain questions, provide hints, or give information about how the quiz works.",
      "Let me know if you need any clarification about the quiz format or content."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const generateHint = (question: QuizQuestion): string => {
    // Generate contextual hints based on the question content
    const text = question.question.toLowerCase();
    
    if (text.includes("capital")) {
      return "Think about famous European cities and their countries.";
    } else if (text.includes("planet")) {
      return "Consider the colors associated with each planet in our solar system.";
    } else if (text.includes("mona lisa")) {
      return "This famous painting was created during the Renaissance period.";
    } else if (text.includes("ocean")) {
      return "Consider which ocean covers the largest area of Earth's surface.";
    } else if (text.includes("element") || text.includes("symbol")) {
      return "Remember the periodic table and common chemical symbols.";
    } else if (text.includes("math") || text.includes("calculate") || text.includes("solve")) {
      return "Break down the problem step by step and follow the order of operations.";
    } else if (text.includes("html")) {
      return "Think about what these letters might stand for in web development.";
    } else if (text.includes("javascript") || text.includes("code")) {
      return "Consider the basic syntax and common patterns in programming.";
    } else {
      return "Think carefully about the question and consider what you already know about this topic.";
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 p-0 bg-gray-600 hover:bg-gray-700 text-white shadow-lg"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 z-40"
          >
            <Card className="border-2 border-gray-700 bg-gray-800 text-white shadow-xl">
              <CardHeader className="bg-gray-700 rounded-t-lg pb-3 pt-3">
                <CardTitle className="text-lg text-white">Quiz Assistant</CardTitle>
              </CardHeader>
              <CardContent className="p-3 h-64 overflow-y-auto flex flex-col space-y-3">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.role === "user" 
                        ? "ml-auto bg-gray-600" 
                        : "bg-gray-700"
                    } p-2 rounded-lg max-w-[80%]`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="bg-gray-700 p-2 rounded-lg max-w-[80%]">
                    <div className="flex space-x-1">
                      <Skeleton className="h-2 w-2 rounded-full bg-gray-500" />
                      <Skeleton className="h-2 w-2 rounded-full bg-gray-500" />
                      <Skeleton className="h-2 w-2 rounded-full bg-gray-500" />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-700 p-3">
                <div className="flex w-full space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for help..."
                    className="flex-grow bg-gray-700 border-gray-600 text-white resize-none min-h-[40px] max-h-20"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
