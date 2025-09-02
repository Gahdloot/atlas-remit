import { School } from "lucide-react"
import Image from "next/image";

interface StepIndicatorProps {
  currentStep: number
  steps: { title: string; icon: React.ComponentType<any>, IconImage:any }[]
}


export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Connecting lines */}
        <div className="absolute top-4 left-12 right-12 h-0.5 bg-gray-200">
          <div
            className="h-full bg-lime-500 transition-all duration-300"
            style={{
            width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%`,
          }}
          />
        </div>

        {steps.map(({ title, icon: Icon, IconImage }, index) => {
          const stepNumber = index + 0
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isActive = isCompleted || isCurrent

          return (
            <div key={index} className="flex flex-col items-center text-center flex-1">
              <div className="relative mb-4">
                {isActive && <div className="absolute inset-0 w-16 h-16 rounded-full bg-lime-100 -m-4" />}
                {isActive && <div className="absolute inset-0 w-12 h-12 rounded-full bg-lime-200 -m-2" />}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                    isActive ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <Image 
                  src={IconImage} 
                  height={10} 
                  width={10}
                  alt={'icons'} 
                  className="w-4 h-4" />
                </div>
              </div>
              {/* <span
                className={`text-sm font-medium max-w-[120px] leading-tight ${
                  isCurrent ? "text-gray-900 font-semibold" : isCompleted ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {title}
              </span> */}
            </div>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden gap-2">
        {steps.map((_, index) => {
          const stepNumber = index + 0
          const isActive = stepNumber <= currentStep
          return (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${isActive ? "bg-lime-500" : "bg-gray-300"}`}
            />
          )
        })}
      </div>
    </>
  )
}

