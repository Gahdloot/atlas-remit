"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import SVGIcon from "../ui/svg-wrapper"
import AtlasLogo from '@/public/svg/atlas-logo.svg'
interface PaymentSuccessStepProps {
  email?: string| null|undefined
  onTrackPayment?: () => void
}

export function PaymentSuccessStep({ email = "someone@example.com", onTrackPayment }: PaymentSuccessStepProps) {
  return (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-4 text-center">
  {/* Atlas Logo */}
  <Link href={'/'} className="mb-8">
    <SVGIcon icon={AtlasLogo} width={180} height={100} />
  </Link>

  <div className="relative w-18 h-18 bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-lg p-1">
    <p className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-2">
      <Check className="w-6 h-6 text-black" />
    </p>
  </div>

  {/* Success Message */}
  <div className="mb-12 max-w-md">
    <h2 className="text-lime-100 text-2xl font-work-sans-override font-semibold mb-4">Your payment has been initiated!</h2>
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
