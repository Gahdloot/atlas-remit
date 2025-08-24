// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { PaymentData } from "@/types/payment"
// import Image from "next/image"

// interface WelcomeStepProps {
//   paymentData: PaymentData
//   updatePaymentData: (data: Partial<PaymentData>) => void
//   nextStep: () => void
// }

// export function WelcomeStep({ paymentData, updatePaymentData, nextStep }: WelcomeStepProps) {
//   const handleContinue = () => {
//     if (paymentData.email) {
//       nextStep()
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-[70vh]">
//       <Card className=" bg-transparent w-full max-w-md border-0">
//         <CardHeader className="text-center pb-4 font-bold text-4xl">
//           <div className=" mb-8">
//             <Image 
//               src={'/images/logo-new.png'}
//               width={400}
//               height={100}
//               alt="Atlas"
//             />
//           </div>
//           <div className="space-y-2 ">
//             <p className="text-foreground ">
//               Hi there, <span className="text-accent">scholar!</span>
//             </p>
//             <p className="text-foreground  ">Welcome to ATLAS!</p>
//           </div>
//           <p className="text-sm text-muted-foreground mt-4">
//             Enter your email address. You'll get an email with a link to start the school fees payment process.
//           </p>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-medium text-muted-foreground">Email</label>
//             <Input
//               type="email"
//               placeholder="kunleolad@gmail.com"
//               value={paymentData.email}
//               onChange={(e) => updatePaymentData({ email: e.target.value })}
//               className="bg-input border-border text-white py-4 lg:py-7 mt-4 "
//             />
//           </div>
//           <Button
//             onClick={handleContinue}
//             className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-4 lg:py-6 mt-12 "
//             disabled={!paymentData.email}
//           >
//             Continue
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PaymentData } from "@/types/payment"
import Image from "next/image"

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <Card className="bg-transparent w-full max-w-sm sm:max-w-md border-0 mx-auto">
        <CardHeader className="text-center pb-6 px-4 sm:px-6">
          {/* Logo */}
          <div className="mb-8 sm:mb-12">
            <Image 
              src={'/images/logo-new.png'}
              width={300}
              height={100}
              alt="Atlas"
              className="mx-auto w-auto h-12 sm:h-16"
              priority
            />
          </div>

          {/* Welcome Text */}
          <div className="space-y-1 mb-6">
            <h1 className="text-white text-2xl sm:text-3xl font-normal leading-tight">
              Hi there, <span className="text-lime-400">scholar!</span>
            </h1>
            <h2 className="text-white text-2xl sm:text-3xl font-normal">
              Welcome to ATLAS!
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed px-2">
            Enter your email to get a secure link and start your tuition payment.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-4 sm:px-6">
          {/* Email Input */}
          <div className="space-y-3">
            <label className="text-gray-400 text-sm font-medium block text-left">
              Email
            </label>
            <Input
              type="email"
              placeholder="kunlead03@gmail.com"
              value={paymentData.email}
              onChange={(e) => updatePaymentData({ email: e.target.value })}
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

          {/* Continue Button */}
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
              "
              disabled={!paymentData.email}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}