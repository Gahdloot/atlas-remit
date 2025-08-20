"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentSuccessProps {
  email?: string
  onClose?: () => void
}

export function PaymentSuccess({ email = "someone@example.com", onClose }: PaymentSuccessProps) {
    const router = useRouter()


    const handleGotItClick = () => {
    router.push("/")  // Navigate to homepage
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {/* ATLAS Branding */}
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold text-lime-400">ATLAS</h1>
      </div>
      {/* Success Icons */}
      <div className="flex items-center justify-center mb-8">
        {/* Desktop: Show both icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Green circle with checkmark */}
          <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center relative">
            <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-black" strokeWidth={3} />
            </div>
          </div>
        </div>
        {/* Mobile: Show only green checkmark */}
        <div className="md:hidden">
          <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center relative">
            <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-black" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center max-w-md mx-auto mb-8">
        <h2 className="text-white text-2xl font-semibold mb-4">You're all set!</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          Your payment has been initiated. Feedback will be sent to you via email{" "}
          <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      {/* Got it Button */}
      <Button
        onClick={handleGotItClick}
        className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-3 rounded-lg text-base"
      >
        Got it!
      </Button>
    </div>
  )
}
