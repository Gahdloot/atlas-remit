// "use client"

// import { PaymentSuccessStep } from "@/components/payment/payment-success"
// import { useRouter, useSearchParams } from "next/navigation"


// export default function PaymentPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const onTrackPayment = () => {
//     router.push("/track-payment")
//   }

//   return (

//     // 
//      <div className="min-h-screen flex">

//       {/* Right Side */}
//       <div
//         className={`w-full flex flex-col`}
//         style={
//           {
//             backgroundImage: "url('/images/background.png')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }
//         }
//       >
//         {/* Step Content */}
//         <div className="flex-1 p-8">
//           <div className="w-full lg:w-2/3 lg:mx-auto">
//           <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            
//             <PaymentSuccessStep email={email} onTrackPayment={onTrackPayment}/>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { Suspense } from "react"
import { PaymentSuccessStep } from "@/components/payment/payment-success"
import { useRouter, useSearchParams } from "next/navigation"

function PaymentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const onTrackPayment = () => {
    router.push("/track-payment")
  }

  return (
    <div className="min-h-screen flex">
      {/* Right Side */}
      <div
        className={`w-full flex flex-col`}
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Step Content */}
        <div className="flex-1 p-8">
          <div className="w-full lg:w-2/3 lg:mx-auto">
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
              <PaymentSuccessStep email={email} onTrackPayment={onTrackPayment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}
