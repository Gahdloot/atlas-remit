"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { PaymentData } from "@/app/payment/page"
import { StepIndicator } from "./step-indicator"

interface ConfirmPayStepProps {
  paymentData: PaymentData
  prevStep: () => void
  currentStep: number
}

export function ConfirmPayStep({ paymentData, prevStep, currentStep }: ConfirmPayStepProps) {
  const handlePayNow = () => {
    // Handle payment processing
    console.log("Processing payment...", paymentData)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 min-h-[70vh]">
      {/* Left side - Dark background with text */}
      <div className="bg-background flex flex-col justify-center space-y-6 p-8">
        <h1 className="text-4xl font-serif font-bold text-foreground leading-tight">
          A few clicks away from completing your payment.
        </h1>
        <p className="text-muted-foreground">Send faster, smarter and safer. Oneremit has got you covered!</p>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="pb-4">
            <StepIndicator currentStep={currentStep} totalSteps={4} />

            <div className="space-y-2 mt-6">
              <h2 className="text-xl font-semibold text-foreground">
                Confirm and <span className="text-accent">pay</span>
              </h2>
              <p className="text-sm text-muted-foreground">Review payment and pay</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payer Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Payer</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Full name</p>
                  <p className="text-foreground">{paymentData.payerName || "Adenike Adebisi"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email address</p>
                  <p className="text-foreground">{paymentData.email || "someone@example.com"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID type</p>
                  <p className="text-foreground">{paymentData.identityType || "Drivers License"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry date</p>
                  <p className="text-foreground">{paymentData.expirationDate || "10-10-26"}</p>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Payment</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount to be paid</p>
                  <p className="text-foreground">NGN {paymentData.amountNGN || "23,102,978.23"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount in CAD</p>
                  <p className="text-foreground">CAD {paymentData.amountCAD || "20,000.00"}</p>
                </div>
              </div>
            </div>

            {/* Student Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Student</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Full name</p>
                  <p className="text-foreground">
                    {paymentData.studentFirstName} {paymentData.studentLastName || "Adenike Adebisi"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Student ID</p>
                  <p className="text-foreground">{paymentData.studentId || "BOG-18-1595"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID type</p>
                  <p className="text-foreground">{paymentData.studentIdentityType || "Passport"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry date</p>
                  <p className="text-foreground">{paymentData.studentExpiryDate || "17-02-28"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                Go back
              </Button>
              <Button onClick={handlePayNow} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Pay now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
