"use client"

import { useState } from "react"
import { WelcomeStep } from "@/components/payment/welcome-step"
import { UniversityStep } from "@/components/payment/university-step"
import { PaymentDetailsStep } from "@/components/payment/payment-details-step"
import { StudentDetailsStep } from "@/components/payment/student-details-step"
import { ConfirmPayStep } from "@/components/payment/confirm-pay-step"
import { StepIndicator } from "@/components/payment/step-indicator"
import Link from "next/link"


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
    { component: PaymentDetailsStep, title: "Payment details" },
    { component: UniversityStep, title: "University" },
    { component: StudentDetailsStep, title: "Student's details" },
    { component: ConfirmPayStep, title: "Confirm and pay" },
  ]
  

  const CurrentStepComponent = steps[currentStep].component

  const nextStep = () => {

    console.log(currentStep)
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
      {/* Left Dark Side - hidden on step 0 */}
      {currentStep !== 0 && (
        <div  className="w-1/3 hidden bg-card bg-gradient-to-t from-black via-[#081401] to-[#0c1903] text-white md:flex flex-col justify-between p-12">
          <div>
          <Link href="/">
            <div className="text-accent font-serif font-bold text-2xl mb-16 cursor-pointer">
              ATLAS
            </div>
          </Link>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
              A few clicks away
              <br />
              from completing
              <br />
              <span className="leading-tight bg-gradient-to-b from-lime-200 via-lime-300 to-green-500 bg-clip-text text-transparent">
                your payment.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Send faster, smarter and safer. Oneremit has
              <br />
              got you covered
            </p>
          </div>
        </div>
        </div>
      )}

      {/* Right White Side - full width if step 0 bg-[#f8f8f8]*/} 
      <div className={`${currentStep < 1  ? "w-full bg-card bg-gradient-to-t from-black via-[#081401] to-[#0c1903]" : "w-full lg:w-2/3  bg-[#eeebeb] "} flex flex-col`}>
        {/* Optional: step indicator header */}
        {currentStep !== 0 && (
          <div className="p-8 border-b border-gray-100 w-full lg:w-2/3 md:mx-auto">
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          </div>
        )}

        {/* Step Content */}
        <div className="flex-1 p-8">
          <div className="w-full lg:w-2/3 lg:mx-auto"> 
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
    </div>
  )
}
