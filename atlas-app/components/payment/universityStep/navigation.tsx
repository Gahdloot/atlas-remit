"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  prevStep: () => void;
  handleNext: () => void;
  isFormValid: boolean;
}

export function NavigationButtons({ prevStep, handleNext, isFormValid }: NavigationButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
      <Button
        onClick={prevStep}
        variant="ghost"
        className="flex-1 w-full py-6 md:flex-none bg-white text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        Go back
      </Button>
      <Button
        onClick={handleNext}
        className={cn(
          "flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold",
          isFormValid
            ? "bg-lime-500 hover:bg-lime-600 text-white"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        )}
        disabled={!isFormValid}
      >
        Next
      </Button>
    </div>
  );
}
