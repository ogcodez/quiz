
import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";

enum QuizView {
  INTRO,
  QUESTIONS,
  RESULTS
}

const Index = () => {
  const [currentView, setCurrentView] = useState<QuizView>(QuizView.INTRO);
  
  // Function to be passed to child components to update the current view
  const updateView = (view: QuizView) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Quiz Master</h1>
          <p className="text-white">Test your knowledge with our fun quizzes</p>
        </header>
        
        <main className="animate-fade-in">
          <QuizContainer onViewChange={updateView} />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Quiz Master. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
