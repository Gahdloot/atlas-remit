"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface PaymentSuccessStepProps {
  email?: string
  onTrackPayment?: () => void
}

export function PaymentSuccessStep({ email = "someone@example.com", onTrackPayment }: PaymentSuccessStepProps) {
  return (
    <div className="min-h-screen fixed top-0  flex flex-col items-center justify-center px-4 text-center">
      {/* Atlas Logo */}
      <Link href={'/'} className=" mb-8">
        <Image 
          src={'/images/logo.png'}
          width={400}
          height={100}
          alt="Atlas"
        />
      </Link>

      <div className="relative w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
        <p className="bg-lime-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg p-2">
        <Check className="w-8 h-8 text-black" />
        </p>
      </div>

      {/* Success Message */}
      <div className="mb-12 max-w-md">
        <h2 className="text-lime-100 text-2xl font-semibold mb-4">Your payment has been initiated!</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          We've started processing your payment. You'll receive an update shortly at{" "}
          <span className="text-lime-500 font-medium">{email}</span>
        </p>
      </div>

      {/* Track Payment Button */}
      <Button
        onClick={onTrackPayment}
        className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-3 rounded-lg text-base cursor-pointer"
      >
        Track Payment
      </Button>
    </div>
  )
}
