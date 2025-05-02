
import { QuizData } from "../types/quiz";

const quizGeneralKnowledge: QuizData = {
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

const quizRecommender: QuizData = {
  title: "Find Your Next Quiz",
  description: "Answer these questions to discover which quiz you should try next!",
  questions: [
    {
      id: 1,
      question: "Which subject do you enjoy the most?",
      options: ["History", "Math", "Technology", "Science"],
      correctAnswer: 0 // No correct answer, can be interpreted differently
    },
    {
      id: 2,
      question: "What do you usually prefer doing in your free time?",
      options: ["Reading trivia", "Solving puzzles", "Building things", "None of the above"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Which of these best describes you?",
      options: ["Curious", "Analytical", "Logical", "Creative"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "Pick a favorite activity:",
      options: ["Watching documentaries", "Doing mental math", "Writing code", "Drawing or painting"],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "Which would you rather be?",
      options: ["Historian", "Mathematician", "Software Developer", "Artist"],
      correctAnswer: 0
    }
  ]
};

const mathQuiz: QuizData = {
  title: "Basic Math Quiz",
  description: "Challenge yourself with these fun math questions!",
  questions: [
    {
      id: 1,
      question: "What is 12 × 8?",
      options: ["96", "108", "84", "92"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Solve: 15 + 6 ÷ 3",
      options: ["7", "17", "21", "19"],
      correctAnswer: 1 // 15 + (6 / 3) = 15 + 2 = 17
    },
    {
      id: 4,
      question: "Which of the following is a prime number?",
      options: ["4", "6", "9", "13"],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "What is 25% of 80?",
      options: ["20", "22", "18", "24"],
      correctAnswer: 0
    }
  ]
};

const codingQuiz: QuizData = {
  title: "Basic Coding Concepts Quiz",
  description: "Test your understanding of fundamental programming concepts!",
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Tool Multi Language",
        "None of the above"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which symbol is used to start a comment in JavaScript?",
      options: ["//", "#", "/*", "--"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Which data type is used to represent true or false?",
      options: ["String", "Integer", "Boolean", "Array"],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What is the output of `console.log(2 + '2')` in JavaScript?",
      options: ["22", "4", "Error", "undefined"],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "Which keyword is used to define a constant in JavaScript?",
      options: ["var", "let", "const", "define"],
      correctAnswer: 2
    }
  ]
};

export const fetchRecommenderQuiz = async (): Promise<QuizData> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizRecommender);
    }, 1000);
  });
};

export const fetchGeneralKnowledgeQuiz = async (): Promise<QuizData> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizGeneralKnowledge);
    }, 1000);
  });
};

export const fetchMathQuiz = async (): Promise<QuizData> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mathQuiz);
    }, 1000);
  });
};

export const fetchCodingQuiz = async (): Promise<QuizData> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(codingQuiz);
    }, 1000);
  });
};
