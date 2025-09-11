import React from 'react';
import { Download, Check } from 'lucide-react';

// Define the type for props
interface ProgressTrackerProps {
  status: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ status }) => {
  const steps = [
    {
      id: 1,
      title: "Payment initiated",
      description: "You have paid on Nexus",
      status: "initiated"
    },
    {
      id: 2,
      title: "Processing",
      description: "Payment is being verified and converted.",
      status: "processing"
    },
    {
      id: 3,
      title: "In Transit",
      description: "Funds are being transferred to the institution",
      status: "in-transit"
    },
    {
      id: 4,
      title: "Funds delivered",
      description: "Institution has received payment",
      status: "delivered"
    },
    {
      id: 5,
      title: "Confirmation",
      description: "Receipt available for download",
      status: "confirmed"
    }
  ];

  // Find the index of the current status
  const currentStep = steps.find(step => step.status === status)?.id || 1;

  const isStepCompleted = (stepId: number) => stepId <= currentStep;

  return (
    <div className="max-w-7xl w-full">
      <div className="relative mb-16">
        <div className="flex justify-between items-start relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center flex-1 relative">
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

              <div
                className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1 transition-all duration-500 cursor-pointer z-10
                ${isStepCompleted(step.id) ? 'bg-accent/20' : 'bg-accent/20'}`}
              >
                <div className={`rounded-full flex items-center justify-center shadow-lg p-2
                  ${isStepCompleted(step.id) ? 'bg-lime-400' : 'bg-gray-700'}
                `}>
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
              </div>

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

      {currentStep === steps.length && (
        <div className="text-center mb-12">
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
            <span>Download Receipt</span>
            <Download className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
