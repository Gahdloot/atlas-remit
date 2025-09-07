"use client"

import { useState, Suspense } from "react"
import { UniversityStep } from "@/components/payment/university-step"
import { PaymentDetailsStep } from "@/components/payment/payment-details-step"
import { ConfirmPayStep } from "@/components/payment/confirm-pay-step"
import { StepIndicator } from "@/components/payment/step-indicator"
import { CreditCard, School, CheckCircle, Home } from "lucide-react"
import Link from "next/link"
import { PaymentData } from "@/types/payment"
import { defaultPaymentData } from "@/lib/defaults/payment"
import { AmountAndRateStep } from "@/components/payment/amount-and-rate-step"
import Image from "next/image"



export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentData, setPaymentData] = useState<PaymentData>(defaultPaymentData)

  const steps = [
      { component: PaymentDetailsStep, title: "Payment details", icon: CreditCard , IconImage: "/images/home-section/user.png"},
      { component: UniversityStep, title: "University", icon: School, IconImage: "/images/home-section/school.png" },
      { component: AmountAndRateStep, title: "Amount and Rate", icon: Home, IconImage: "/images/home-section/arrow-reload-horizontal.png" },
      { component: ConfirmPayStep, title: "Confirm and pay", icon: CheckCircle, IconImage: "/images/home-section/invoice-03.png" },
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
  {/* Left Side - Fixed */}
  <div
    className="hidden md:flex flex-col justify-between p-12 text-white fixed top-0 left-0 h-screen w-1/3"
    style={{
      backgroundImage: "url('/images/background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="relative h-full">
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Image 
            src={'/images/logo-new.png'}
            width={150}
            height={100}
            alt="Atlas"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center h-full">
        <div>
          <h1 className="text-4xl font-semibold font-work-sans-override leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
            A few clicks away
            <br />
            from completing
            <br />
            <span className="leading-tight bg-gradient-to-b from-lime-200 via-lime-300 to-green-500 bg-clip-text text-transparent">
              your payment.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Send faster, smarter and safer.{" "}
            <span className="text-white">ATLAS has</span>
            <br />
            <span className="text-white">got you covered.</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side - Push with margin */}
  <div className="w-full md:ml-[33.333%] bg-[#f8f8f8] flex flex-col">
    {/* Step Indicator */}
    <div className="md:p-8 border-b border-gray-100 w-full lg:w-2/3 md:mx-auto">
      <StepIndicator
        currentStep={currentStep}
        steps={steps.map(({ title, icon, IconImage }) => ({
          title,
          icon,
          IconImage,
        }))}
      />
    </div>

    {/* Step Content */}
    <div className="flex-1 p-8">
      <div className="w-full lg:w-2/3 lg:mx-auto">
        <Suspense fallback={null}>
          <CurrentStepComponent
            paymentData={paymentData}
            updatePaymentData={updatePaymentData}
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
          />
        </Suspense>
      </div>
    </div>
  </div>
</div>

  )
}
