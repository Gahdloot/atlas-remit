interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = ["Payment details", "University", "Student's details", "Confirm and pay"]

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep - 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {index <= currentStep - 1 ? "✓" : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-12 h-0.5 mx-2 ${index < currentStep - 1 ? "bg-accent" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
