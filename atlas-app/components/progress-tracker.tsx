import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

const ProgressTracker = () => {
  const [currentStep, setCurrentStep] = useState(5); // Set to 5 to show completed state initially
  
  const steps = [
    {
      id: 1,
      title: "Payment initiated",
      description: "You have paid on ATLAS"
    },
    {
      id: 2,
      title: "Processing",
      description: "Payment is being verified and converted."
    },
    {
      id: 3,
      title: "In Transit",
      description: "Funds are being transferred to the institution"
    },
    {
      id: 4,
      title: "Funds delivered",
      description: "Institution have received payment"
    },
    {
      id: 5,
      title: "Confirmation",
      description: "Receipt available for download"
    }
  ];

  const handleStepChange = (stepId: React.SetStateAction<number>) => {
    setCurrentStep(stepId);
  };

  const isStepCompleted = (stepId: number) => stepId <= currentStep;

  return (
    <div className="max-w-7xl w-full">


    {/* Progress Steps - Always Horizontal */}
    <div className="relative mb-16">
        {/* Steps Container */}
        <div className="flex justify-between items-start relative z-10">
        {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center flex-1 relative">
            {/* Progress Line Between Steps */}
            {index < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 w-full h-1 bg-gray-800 z-0">
                <div 
                    className={`h-full transition-all duration-1000 ease-out ${
                    isStepCompleted(step.id + 1) ? 'bg-lime-400' : 'bg-gray-800'
                    }`}
                    style={{ width: '100%' }}
                />
                </div>
            )}
            
            {/* Step Circle */}
            {/* <div 
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-500 cursor-pointer relative z-10 ${
                isStepCompleted(step.id)
                    ? 'bg-lime-400 border-lime-400 shadow-lg shadow-lime-400/30'
                    : 'bg-gray-700 border-gray-600'
                }`}
                onClick={() => handleStepChange(step.id)}
            >
                {isStepCompleted(step.id) ? (
                <Check className="w-8 h-8 text-black font-bold" strokeWidth={3} />
                ) : (
                <Check className="w-8 h-8 text-gray-500" strokeWidth={2} />
                )}
            </div> */}
            <div
                className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1 transition-all duration-500 cursor-pointer z-10
                    ${isStepCompleted(step.id)
                    ? 'bg-accent/20 '
                    : 'bg-accent/20'
                    }`}
                onClick={() => handleStepChange(step.id)}
                >
                <div className={`rounded-full flex items-center justify-center shadow-lg p-2
                    ${isStepCompleted(step.id) ? 'bg-lime-400' : 'bg-gray-700'}
                `}>
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                </div>


            {/* Step Content */}
            <div className="text-center px-2">
                <h3 className={`font-medium text-lg mb-2 transition-colors duration-300 ${
                isStepCompleted(step.id) ? 'text-lime-100' : 'text-gray-400'
                }`}>
                {step.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isStepCompleted(step.id) ? 'text-lime-50' : 'text-gray-500'
                }`}>
                {step.description}
                </p>
            </div>
            </div>
        ))}
        </div>
    </div>

    {/* Download Button */}
    {currentStep === steps.length && (
        <div className="text-center mb-12">
        <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
            <span>Download Receipt</span>
            <Download className="w-5 h-5" />
        </button>
        </div>
    )}

    {/* Demo Controls */}
    <div className="text-center">
        <p className="text-gray-500 text-sm mb-4">Demo Controls - Click to test different stages</p>
        <div className="flex justify-center gap-3 flex-wrap">
        {steps.map((step) => (
            <button
            key={step.id}
            onClick={() => handleStepChange(step.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentStep === step.id
                ? 'bg-lime-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            >
            Step {step.id}
            </button>
        ))}
        </div>
    </div>
    </div>
  );
};

export default ProgressTracker;