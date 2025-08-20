import { School } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = ["Payment details", "University", "Student's details", "Confirm and pay"]

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Connecting lines */}
        <div className="absolute top-4 left-12 right-12 h-0.5 bg-gray-200">
          <div
            className="h-full bg-lime-500 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100}%` }}
          />
        </div>

        {Array.from({ length: stepLabels.length }, (_, index) => {
          const stepNumber = index + 1 // Start from step 1 (Payment details)
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isActive = isCompleted || isCurrent

          return (
            <div key={index} className="flex flex-col items-center text-center flex-1">
              {/* Step circle with multiple rings for active state */}
              <div className="relative mb-4">
                {/* Outer ring for active state */}
                {isActive && <div className="absolute inset-0 w-16 h-16 rounded-full bg-lime-100 -m-4" />}
                {/* Middle ring for active state */}
                {isActive && <div className="absolute inset-0 w-12 h-12 rounded-full bg-lime-200 -m-2" />}
                {/* Main circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                    isActive ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <School className="w-4 h-4" />
                </div>
              </div>

              {/* Step label */}
              <span
                className={`text-sm font-medium max-w-[120px] leading-tight ${
                  isCurrent ? "text-gray-900 font-semibold" : isCompleted ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {stepLabels[index]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile View - Simple progress bars */}
      <div className="flex md:hidden gap-2">
        {Array.from({ length: stepLabels.length }, (_, index) => {
          const stepNumber = index + 1 // Start from step 1 (Payment details)
          const isActive = stepNumber <= currentStep

          return <div key={index} className={`h-1 flex-1 rounded-full ${isActive ? "bg-lime-500" : "bg-gray-300"}`} />
        })}
      </div>
    </>
  )
}
