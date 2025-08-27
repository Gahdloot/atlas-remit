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



export default function TrackPaymentPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [paymentID, setPaymentID] = useState("")
  const [step, setStep] = useState("1") 
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
