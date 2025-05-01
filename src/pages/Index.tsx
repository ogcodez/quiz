
import QuizContainer from "@/components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-quiz-dark mb-2">Quiz Wizard</h1>
          <p className="text-gray-600">Test your knowledge with our interactive quizzes</p>
        </header>
        
        <main>
          <QuizContainer />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Quiz Wizard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
