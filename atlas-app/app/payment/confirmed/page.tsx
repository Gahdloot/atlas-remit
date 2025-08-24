"use client"

import { PaymentSuccessStep } from "@/components/payment/payment-success"



export default function PaymentPage() {



  return (

    // 
     <div className="min-h-screen flex">

      {/* Right Side */}
      <div
        className={`w-full flex flex-col`}
        style={
          {
            backgroundImage: "url('/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        }
      >
        {/* Step Content */}
        <div className="flex-1 p-8">
          <div className="w-full lg:w-2/3 lg:mx-auto">
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            
            <PaymentSuccessStep />
          </div>
          
            
          </div>
        </div>
      </div>
    </div>
  )
}
