
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answeredQuestions: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}
