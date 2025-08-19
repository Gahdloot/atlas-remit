"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { PaymentData } from "@/app/payment/page"

interface WelcomeStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
}

export function WelcomeStep({ paymentData, updatePaymentData, nextStep }: WelcomeStepProps) {
  const handleContinue = () => {
    if (paymentData.email) {
      nextStep()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md border-0">
        <CardHeader className="text-center pb-4">
          <div className="text-accent font-serif font-bold text-xl mb-4">ATLAS</div>
          <div className="space-y-2">
            <p className="text-foreground text-lg">
              Hi there, <span className="text-accent">scholar!</span>
            </p>
            <p className="text-foreground font-semibold text-lg">Welcome to ATLAS!</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Enter your email address. You'll get an email with a link to start the school fees payment process.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="kunleolad@gmail.com"
              value={paymentData.email}
              onChange={(e) => updatePaymentData({ email: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <Button
            onClick={handleContinue}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={!paymentData.email}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
