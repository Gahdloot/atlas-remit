"use client"

import { Button } from "@/components/ui/button"
import type { PaymentData } from "@/app/payment/page"
import { PaymentModal } from "./payment-modal"
import { useState } from "react"
import { PaymentSuccess } from "@/components/payment/payment-success"

interface ConfirmPayStepProps {
  paymentData: PaymentData
  prevStep: () => void
  nextStep: () => void
  currentStep: number
}

export function ConfirmPayStep({ paymentData, prevStep, currentStep , nextStep}: ConfirmPayStepProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePayNow = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-[70vh]">
      {/* Right side - Form */}
      <div className="space-y-3">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Confirm and <span className="leading-tight bg-gradient-to-tl from-lime-500 via-lime-600 to-green-700 bg-clip-text text-transparent">pay</span>
          </h1>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="text-sm text-muted-foreground">Review payment and pay</p>
          </div>
        </div>


        <div className="space-y-2 bg-white p-4 mt-4 md:mt-6">
            {/* Payer Section */}
            <div className="space-y-3">
              <h3 className="font-semibold  text-gray-800 mb-2">Payer</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Full name</p>
                  <p className=" text-gray-600">{paymentData.payerName || "Adenike Adebisi"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Email address</p>
                  <p className=" text-gray-600">{paymentData.email || "someone@example.com"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">ID type</p>
                  <p className=" text-gray-600">{paymentData.identityType || "Drivers License"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Expiry date</p>
                  <p className=" text-gray-600">{paymentData.expirationDate || "10-10-26"}</p>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-3">
              <h3 className="font-semibold  text-gray-800 mb-2">Payment</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Amount to be paid</p>
                  <p className=" text-gray-600">NGN {paymentData.amountNGN || "23,102,978.23"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Amount in CAD</p>
                  <p className=" text-gray-600">CAD {paymentData.amountCAD || "20,000.00"}</p>
                </div>
              </div>
            </div>

            {/* Student Section */}
            <div className="space-y-3">
              <h3 className="font-semibold  text-gray-800 mb-2">Student</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Full name</p>
                  <p className=" text-gray-600">
                    {paymentData.studentFirstName} {paymentData.studentLastName || "Adenike Adebisi"}
                  </p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Student ID</p>
                  <p className=" text-gray-600">{paymentData.studentId || "BOG-18-1595"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">ID type</p>
                  <p className=" text-gray-600">{paymentData.studentIdentityType || "Passport"}</p>
                </div>
                <div className=" border-b border-gray-100 space-y-1 py-3">
                  <p className="text-muted-foreground">Expiry date</p>
                  <p className=" text-gray-600">{paymentData.studentExpiryDate || "17-02-28"}</p>
                </div>
              </div>
            </div>
        </div>

      <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
        <Button
          onClick={prevStep}
          variant="ghost"
          className="flex-1 w-full py-6 md:flex-none bg-white text-base font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          Go back
        </Button>
        <Button
          onClick={handlePayNow}
          className="flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold bg-lime-500 hover:bg-lime-600 text-gray-700"
        >
          Pay now
        </Button>
      </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amountNGN="18,934.23"
        nextStep={nextStep}
        amountCAD={paymentData.amountCAD || "20,000"}
      />
    </div>
  )
}
