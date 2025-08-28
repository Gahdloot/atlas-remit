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
      { component: PaymentDetailsStep, title: "Payment details", icon: CreditCard },
      { component: UniversityStep, title: "University", icon: School },
      { component: AmountAndRateStep, title: "Amount and Rate", icon: Home },
      { component: ConfirmPayStep, title: "Confirm and pay", icon: CheckCircle },
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
      {/* Left Side */}
      <div
        className="w-1/3 hidden text-white md:flex flex-col justify-between p-12"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen relative">
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

          <div className="flex items-center justify-center min-h-screen">
            <div className=""> {/* or text-left if you prefer */}
              <div className="">
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
                  got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`w-full lg:w-2/3 bg-[#eeebeb] flex flex-col`}
      >
        {/* Step Indicator */}
        {(
          <div className="md:p-8 border-b border-gray-100 w-full lg:w-2/3 md:mx-auto">
            <StepIndicator
            currentStep={currentStep}
            steps={steps.slice(0).map(({ title, icon }) => ({ title, icon }))}
          />

          </div>
        )}


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
