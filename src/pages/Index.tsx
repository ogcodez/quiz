
import { useState } from "react";
import { motion } from "framer-motion";
import QuizContainer, { QuizState } from "@/components/QuizContainer";

const Index = () => {
  const [currentView, setCurrentView] = useState<QuizState>(QuizState.INTRO);
  
  // Function to be passed to child components to update the current view
  const updateView = (view: QuizState) => {
    setCurrentView(view);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.header 
          className="mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className={`text-5xl font-bold text-white mb-2 ${currentView === QuizState.INTRO || currentView === QuizState.CAROUSEL ? 'animate-glow' : ''}`}>Quiz Master</h1>
          <p className="text-white">Test your knowledge with our fun quizzes</p>
        </motion.header>
        
        <main className="animate-fade-in">
          <QuizContainer onViewChange={updateView} />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Quiz Master. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default Index;
