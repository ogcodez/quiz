
import QuizContainer from "@/components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-quiz-dark to-black py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-quiz-gold mb-2 animate-glow">Quiz Master</h1>
          <p className="text-quiz-light">Test your knowledge with our millionaire-style quizzes</p>
        </header>
        
        <main className="animate-fade-in">
          <QuizContainer />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Quiz Master. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
