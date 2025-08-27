"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useTrackPaymentMutation } from "@/store/api/schoolPaymentSlice"
import Link from "next/link"
import { Check, Download } from "lucide-react"
import ProgressTracker from "@/components/progress-tracker"

type PaymentStatus = "initiated" | "processing" | "transit" | "delivered" | "confirmed"

const PaymentProgress = ({ currentStatus, paymentId }: { currentStatus: PaymentStatus; paymentId: string }) => {
  const steps = [
    {
      id: "initiated",
      title: "Payment initiated",
      description: "You have paid on ATLAS",
    },
    {
      id: "processing",
      title: "Processing",
      description: "Payment is being verified and converted.",
    },
    {
      id: "transit",
      title: "In Transit",
      description: "Funds are being transferred to the institution",
    },
    {
      id: "delivered",
      title: "Funds delivered",
      description: "Institution have received payment",
    },
    {
      id: "confirmed",
      title: "Confirmation",
      description: "Receipt available for download",
    },
  ]

  const getStepIndex = (status: PaymentStatus) => {
    return steps.findIndex((step) => step.id === status)
  }

  const currentIndex = getStepIndex(currentStatus)

  return (
    <div className="w-full max-w-7xl max-w- mx-auto px-4">
      {/* Mobile Progress - Vertical */}
      <div className="block lg:hidden">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex
            const isActive = index === currentIndex

            return (
              <div key={step.id} className="flex items-start gap-4">
                {/* Progress Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted ? "bg-lime-400 border-lime-400" : "bg-gray-700 border-gray-600"}
                  `}
                  >
                    <Check className={`w-6 h-6 ${isCompleted ? "text-black" : "text-gray-400"}`} />
                  </div>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-0.5 h-16 mt-2 transition-all duration-300
                      ${index < currentIndex ? "bg-lime-400" : "bg-gray-600"}
                    `}
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <h3 className={`font-semibold text-lg mb-1 ${isCompleted ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${isCompleted ? "text-gray-300" : "text-gray-500"}`}>{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop Progress - Horizontal */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between w-full ">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex
            const isActive = index === currentIndex

            return (
              <div key={step.id} className="flex flex-col items-center text-center max-w-48">
                {/* Progress Circle */}
                <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
                        <div className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-2">
                            <Check className={`w-8 h-8 ${isCompleted ? "text-black" : "text-gray-400"}`} />
                        </div>
                    </div>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-32 h-1 transition-all duration-300
                      ${index < currentIndex ? "bg-lime-400" : "bg-gray-600"}
                    `}
                    />
                  )}
                </div>

                {/* Step Content */}
                
              </div>
            // <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            //     <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            //         <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            //             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            //         </svg>
            //     </span>
            // </li>
            )
          })}
        </div>

        <div className="flex items-center justify-between w-full bg-red-500">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex
            const isActive = index === currentIndex
            return (
                <div>
                    <h3 className={`font-semibold text-lg mb-2 ${isCompleted ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isCompleted ? "text-gray-300" : "text-gray-500"}`}>
                    {step.description}
                    </p>
            </div>
            )
          })}
        </div>
      </div>

      {/* Download Receipt Button - Only show when confirmed */}
      {currentStatus === "confirmed" && (
        <div className="flex justify-center mt-8">
          <Button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold h-12 px-8 rounded-lg flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Receipt
          </Button>
        </div>
      )}
    </div>
  )
}

export default function TrackPaymentPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [paymentID, setPaymentID] = useState("")
  const [step, setStep] = useState("3") // Added step 3 for progress tracking
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("confirmed") // Mock status for demo
  const [trackPayment, { isLoading, error }] = useTrackPaymentMutation()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleContinue = async () => {
    if (!validateEmail(email) || !paymentID.trim()) {
      alert("Please enter a valid email address and payment ID.")
      return
    }

    try {
        const payload = {
            email:email,
            payment_reference:paymentID
        }
      await trackPayment(payload).unwrap()
      setStep("3") 
    } catch (err) {
      console.error("Failed to track payment:", err)
      alert("Something went wrong. Please try again.")
    }
  }



  return (
    <div className="min-h-screen flex">
      <div
        className={`w-full flex flex-col`}
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1 p-8">
          <div className="w-full lg:w-2/3 lg:mx-auto">
            {step === "3" ? (
              <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
                {/* Logo */}
                <Link href={"/"} className="mb-12">
                  <Image
                    src={"/images/logo-new.png"}
                    width={300}
                    height={100}
                    alt="Atlas"
                    className="mx-auto w-auto h-12 sm:h-16"
                    priority
                  />
                </Link>

                {/* Payment Progress */}
                {/* <PaymentProgress currentStatus={paymentStatus} paymentId={paymentID} /> */}
                <ProgressTracker />

                {/* Back Button */}
                <div className="mt-8">
                  <Button
                    onClick={() => setStep("1")}
                    variant="outline"
                    className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
                  >
                    Track Another Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
                <Card className="bg-transparent w-full max-w-sm sm:max-w-md border-0 mx-auto">
                  <CardHeader className="text-center pb-6 px-4 sm:px-6">
                    <Link href={"/"} className="mb-8 sm:mb-12">
                      <Image
                        src={"/images/logo-new.png"}
                        width={300}
                        height={100}
                        alt="Atlas"
                        className="mx-auto w-auto h-12 sm:h-16"
                        priority
                      />
                    </Link>
                    {step == "1" ? (
                      <>
                        <div className="space-y-1 mb-6">
                          <h1 className="text-white text-2xl sm:text-3xl font-normal leading-tight">
                            Hi there, <span className="text-lime-200">scholar!</span>
                          </h1>
                          <h2 className="text-white text-2xl sm:text-3xl font-normal">Track your tuition payment</h2>
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                            Enter your email and payment ID to track your payment
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        
                      </>
                    )}
                  </CardHeader>
                  {step == "1" ? (
                    <CardContent className="space-y-6 px-4 sm:px-6">
                      <div className="space-y-3">
                        <label className="text-gray-400 text-sm font-medium block text-left">Email</label>
                        <Input
                          type="email"
                          placeholder="kunlearo3@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="
                            bg-transparent 
                            border-2 
                            border-lime-400 
                            rounded-lg 
                            text-white 
                            placeholder:text-gray-500
                            h-12 
                            sm:h-14 
                            px-4
                            text-base
                            focus:border-lime-300
                            focus:ring-lime-400/20
                            focus:ring-2
                          "
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-gray-400 text-sm font-medium block text-left">Payment ID</label>
                        <Input
                          type="text"
                          placeholder="ATL20230909-923c"
                          value={paymentID}
                          onChange={(e) => setPaymentID(e.target.value)}
                          className="
                            bg-transparent 
                            border-2 
                            border-lime-400 
                            rounded-lg 
                            text-white 
                            placeholder:text-gray-500
                            h-12 
                            sm:h-14 
                            px-4
                            text-base
                            focus:border-lime-300
                            focus:ring-lime-400/20
                            focus:ring-2
                          "
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          onClick={handleContinue}
                          className="
                              w-full 
                              bg-lime-400 
                              hover:bg-lime-500 
                              text-black 
                              font-semibold 
                              h-12 
                              sm:h-14 
                              rounded-lg
                              text-base
                              transition-colors
                              duration-200
                              cursor-pointer
                            "
                          disabled={!validateEmail(email) || !paymentID.trim() || isLoading}
                        >
                          {isLoading ? "Tracking..." : "Continue"}
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    <></>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
