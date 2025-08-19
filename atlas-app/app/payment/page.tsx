"use client"

import { useState } from "react"
import { WelcomeStep } from "@/components/payment/welcome-step"
import { UniversityStep } from "@/components/payment/university-step"
import { PaymentDetailsStep } from "@/components/payment/payment-details-step"
import { StudentDetailsStep } from "@/components/payment/student-details-step"
import { ConfirmPayStep } from "@/components/payment/confirm-pay-step"
import { StepIndicator } from "@/components/payment/step-indicator"

export type PaymentData = {
  email: string
  university: string
  countryFrom: string
  countryTo: string
  amountNGN: string
  amountCAD: string
  payerName: string
  identityType: string
  expirationDate: string
  studentFirstName: string
  studentLastName: string
  studentId: string
  studentIdentityType: string
  studentExpiryDate: string
}

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentData, setPaymentData] = useState<PaymentData>({
    email: "",
    university: "",
    countryFrom: "",
    countryTo: "",
    amountNGN: "",
    amountCAD: "",
    payerName: "",
    identityType: "",
    expirationDate: "",
    studentFirstName: "",
    studentLastName: "",
    studentId: "",
    studentIdentityType: "",
    studentExpiryDate: "",
  })

  const steps = [
    { component: WelcomeStep, title: "Welcome" },
    { component: UniversityStep, title: "University" },
    { component: PaymentDetailsStep, title: "Payment details" },
    { component: StudentDetailsStep, title: "Student's details" },
    { component: ConfirmPayStep, title: "Confirm and pay" },
  ]

  const CurrentStepComponent = steps[currentStep].component

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updatePaymentData = (data: Partial<PaymentData>) => {
    setPaymentData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Dark Side */}
      {currentStep !== 0 && (
        <div className="w-1/2 bg-background text-white flex flex-col justify-between p-12">
          <div>
            <div className="text-accent font-serif font-bold text-2xl mb-16">ATLAS</div>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                A few clicks away
                <br />
                from completing
                <br />
                <span className="text-accent">your payment.</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Send faster, smarter and safer. Oneremit has
                <br />
                got you covered
              </p>
            </div>
          </div>

          {currentStep === 2 && (
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                D
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                <img src="/abstract-profile.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right Side - bg changes if currentStep === 1 */}
      <div
        className={`${
          currentStep === 0 ? "w-full" : "w-1/2"
        } ${currentStep === 1 ? "bg-background text-white" : "bg-white"} flex flex-col`}
      >
        {/* Step Indicator Header */}
        {currentStep > 0 && (
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">Start payment</div>
            </div>
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          </div>
        )}

        {/* Step Content */}
        <div className="flex-1 p-8">
          <CurrentStepComponent
            paymentData={paymentData}
            updatePaymentData={updatePaymentData}
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  )
}
