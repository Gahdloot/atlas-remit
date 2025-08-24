"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PaymentData } from "@/types/payment"

interface PaymentReceivedProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
}

export function PaymentReceivedStep({ paymentData, updatePaymentData, nextStep }: PaymentReceivedProps) {
  const handleContinue = () => {
    if (paymentData.email) {
      nextStep()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className=" bg-transparent w-full max-w-md border-0">
        <CardHeader className="text-center pb-4 font-bold text-4xl">
          <div className="text-accent font-serif font-bold text-5xl mb-4">ATLAS</div>
          <div className="space-y-2 ">
            <p className="text-foreground ">
              Hi there, <span className="text-accent">scholar!</span>
            </p>
            <p className="text-foreground  ">Welcome to ATLAS!</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Enter your email address. You'll get an email with a link to start the school fees payment process.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="kunleolad@gmail.com"
              value={paymentData.email}
              onChange={(e) => updatePaymentData({ email: e.target.value })}
              className="bg-input border-border text-white py-4 lg:py-7 mt-4 "
            />
          </div>
          <Button
            onClick={handleContinue}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-4 lg:py-6 mt-12 "
            disabled={!paymentData.email}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
