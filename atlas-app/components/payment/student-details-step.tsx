"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PaymentData } from "@/app/payment/page"
import { StepIndicator } from "./step-indicator"

interface StudentDetailsStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
  prevStep: () => void
  currentStep: number
}

export function StudentDetailsStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: StudentDetailsStepProps) {
  const handleNext = () => {
    nextStep()
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
                Student's <span className="text-accent">details</span>
              </h2>
              <p className="text-sm text-muted-foreground">Enter student's details and ID details</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">First name</label>
                <Input
                  placeholder="Adenike"
                  value={paymentData.studentFirstName}
                  onChange={(e) => updatePaymentData({ studentFirstName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Last name</label>
                <Input
                  placeholder="Adebisi"
                  value={paymentData.studentLastName}
                  onChange={(e) => updatePaymentData({ studentLastName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Student ID</label>
              <Input
                placeholder="BOG-14-11363"
                value={paymentData.studentId}
                onChange={(e) => updatePaymentData({ studentId: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Identity type</label>
                <Select
                  value={paymentData.studentIdentityType}
                  onValueChange={(value) => updatePaymentData({ studentIdentityType: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Passport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers-license">Drivers License</SelectItem>
                    <SelectItem value="national-id">National ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Expiry date</label>
                <Input
                  placeholder="12-10-28"
                  value={paymentData.studentExpiryDate}
                  onChange={(e) => updatePaymentData({ studentExpiryDate: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Upload identity document (for payer)</label>
              <div className="border-2 border-dashed border-accent bg-accent/10 rounded-lg p-4 text-center">
                <div className="text-accent text-sm">📄 drivers license.jpg</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                Go back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
