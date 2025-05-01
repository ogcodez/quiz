
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MessageCircle, Bot } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AiAssistantProps {
  currentQuestion: QuizQuestion | null;
  isIntro: boolean;
  isResults: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AiAssistant = ({ currentQuestion, isIntro, isResults }: AiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your Quiz Assistant. How can I help you?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock AI response function - in a real app, this would call an AI API
  const generateAiResponse = async (question: string, questionContext: QuizQuestion | null): Promise<string> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isIntro) {
      const introResponses = [
        "Ready to test your knowledge? Click the Start Quiz button when you're ready!",
        "This quiz covers general knowledge topics. Good luck!",
        "Remember, there's no time limit, so take your time to think about each answer.",
        "Feel free to ask me for help if you get stuck during the quiz."
      ];
      return introResponses[Math.floor(Math.random() * introResponses.length)];
    }
    
    if (isResults) {
      const resultResponses = [
        "Congratulations on completing the quiz! How do you feel about your score?",
        "Want to try again and see if you can improve your score?",
        "The best way to improve is to keep practicing and learning new facts.",
        "Which questions did you find most challenging?"
      ];
      return resultResponses[Math.floor(Math.random() * resultResponses.length)];
    }
    
    if (!questionContext) {
      return "I'm here to help with the quiz. Ask me anything!";
    }

    // Handle different types of user questions
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("hint") || lowerQuestion.includes("help") || lowerQuestion.includes("clue")) {
      // Provide a hint for the current question without giving away the answer
      const options = questionContext.options;
      const correctAnswer = questionContext.correctAnswer;
      
      // Eliminate one wrong option
      const wrongOptions = options.filter((_, idx) => idx !== correctAnswer);
      const eliminatedOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      
      return `Here's a hint: I can tell you that "${eliminatedOption}" is not the correct answer. Think carefully about the remaining options!`;
    } 
    else if (lowerQuestion.includes("explain") || lowerQuestion.includes("why")) {
      return "I can explain more after you've answered the question. For now, focus on what you know about the topic and make your best choice!";
    } 
    else {
      // General encouragement and suggestions
      const generalResponses = [
        `For this question about "${questionContext.question}", try to recall what you know about the topic.`,
        "Take your time to think about each option carefully.",
        "Trust your instincts, but also eliminate any options you know are incorrect.",
        "Remember, you can always come back to this question if you use the back button after answering later questions."
      ];
      
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    
    try {
      // Generate and add AI response
      const aiResponse = await generateAiResponse(userInput, currentQuestion);
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button className="h-14 w-14 rounded-full bg-gray-700 hover:bg-gray-600">
            <Bot className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 md:w-96 p-0 bg-gray-800 border border-gray-700 text-white"
        side="top"
        align="end"
      >
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="bg-gray-700 rounded-t-lg py-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Bot className="h-5 w-5 text-white" />
              Quiz Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[350px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2",
                        message.role === "user" 
                          ? "bg-gray-600 text-white" 
                          : "bg-gray-700 text-white"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-700 text-white">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-700">
                <form 
                  className="flex gap-2" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask for a hint or help..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={isLoading || !userInput.trim()} 
                    className="bg-gray-600 hover:bg-gray-500 text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default AiAssistant;
