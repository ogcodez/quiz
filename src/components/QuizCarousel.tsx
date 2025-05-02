
import React from 'react';
import { motion } from 'framer-motion';
import { QuizType } from './QuizContainer';
import { QuizData } from '@/types/quiz';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface QuizCarouselProps {
  quizzes: { type: QuizType; data: QuizData }[];
  onStartQuiz: (quizType: QuizType) => void;
}

const QuizCarousel = ({ quizzes, onStartQuiz }: QuizCarouselProps) => {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-bold text-white mb-2 animate-glow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Choose a Quiz
        </motion.h2>
        <p className="text-gray-300">Select from our collection of quizzes</p>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {quizzes.map((quiz) => (
            <CarouselItem key={quiz.type} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.div
                variants={item}
                className="h-full"
              >
                <Card className="border-2 border-gray-700 bg-gray-800 text-white h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{quiz.data.title}</CardTitle>
                    <CardDescription className="text-gray-300">{quiz.data.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-300 mb-2">
                      {quiz.data.questions.length} questions
                    </p>
                    {quiz.type === QuizType.RECOMMENDER ? (
                      <p className="text-sm text-gray-300">
                        Find out which quiz matches your interests
                      </p>
                    ) : (
                      <p className="text-sm text-gray-300">
                        Test your knowledge and see how well you score
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      onClick={() => onStartQuiz(quiz.type)}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-2">
          <CarouselPrevious className="relative static left-0 right-0 translate-y-0 mx-1" />
          <CarouselNext className="relative static left-0 right-0 translate-y-0 mx-1" />
        </div>
      </Carousel>
    </motion.div>
  );
};

export default QuizCarousel;
