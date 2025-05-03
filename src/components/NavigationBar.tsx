
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft } from 'lucide-react';

interface NavigationBarProps {
  onShowAllQuizzes: () => void;
  isVisible: boolean;
}

const NavigationBar = ({ onShowAllQuizzes, isVisible }: NavigationBarProps) => {
  const isMobile = useIsMobile();
  
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-4 left-4 z-10">
      <Button
        onClick={onShowAllQuizzes}
        variant="outline"
        size={isMobile ? "sm" : "default"}
        className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {isMobile ? "All" : "All Quizzes"}
      </Button>
    </div>
  );
};

export default NavigationBar;
