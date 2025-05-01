
import { QuizData } from "../types/quiz";

const mockQuizData: QuizData = {
  title: "General Knowledge Quiz",
  description: "Test your knowledge with this fun general knowledge quiz!",
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Osmium", "Oxygen", "Oganesson", "Gold"],
      correctAnswer: 1
    }
  ]
};

export const fetchQuizData = async (): Promise<QuizData> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuizData);
    }, 1000);
  });
};
