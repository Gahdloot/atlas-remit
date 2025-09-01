import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import Image from "next/image"
{/* <Check /> */}

export default function ExchangeRatesSection() {
  return (
    <div className="relative h-96 md:h-[450px] rounded-[40px] mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full rounded-[40px]"
        style={{
          backgroundImage: "url(/images/home-section/smile-face.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark gradient overlay - from transparent at top to dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

      <div className="absolute w-full bottom-6 left-1/2 transform -translate-x-1/2 space-y-4  px-6 z-10 text-sm">
        <p className="flex items-center gap-2 p-3 w-fit justify-start text-lime-50  bg-[#19230f] rounded-3xl">
          <div className="relative w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mx-auto shadow-lg p-1">
            <div className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-1">
              <Check className="w-2 h-2 object-contain text-green-700" />
            </div>
          </div>
            <p>Payment initiated</p>
        </p>

        <p className="flex items-center gap-2 p-3 w-fit justify-start text-lime-50  bg-[#19230f] rounded-3xl">
          <div className="relative w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mx-auto shadow-lg p-1">
            <div className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-1">
              <Check className="w-2 h-2 object-contain text-green-700" />
            </div>
          </div>
            <p>Estimated time of arrival is within 2-3 business days</p>
        </p>

        <div className="flex items-center gap-2 p-3 w-fit justify-start text-lime-50  bg-[#19230f] rounded-3xl">
          <div className="relative w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mx-auto shadow-lg p-1">
            <div className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-1">
              <Check className="w-2 h-2 object-contain text-green-700" />
            </div>
          </div>
          <p>Funds delivered to institution</p>
        </div>
        
      </div>
      {/* <div className="absolute w-full bottom-6 left-1/2 transform -translate-x-1/2  px-6 z-10 text-sm">
        
        
      </div>
      <div className="absolute w-full bottom-6 left-1/2 transform -translate-x-1/2  px-6 z-10 text-sm">
        
        
      </div> */}

      {/* Exchange Rate Cards - positioned at bottom center */}
      {/* <div className="absolute w-fit -top-12 right-2  z-10 border-2 border-gray-200 rounded-3xl bg-white/95 shadow-2xl">
        <Card className=" bg-inherit backdrop-blur-md border-0  p-6 max-w-sm mx-auto ">
          <CardContent className="p-0 space-y-3">
            <div>
              <p className="text-gray-500 text-sm mb-2">Amount due</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-black">15,000</span>
                <span className="text-gray-400 text-lg font-sm">CAD</span>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">You will pay</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-lime-500">22,650,000</span>
                <span className="text-gray-400 text-medium font-sm">NGN</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl shadow p-2">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 bg-green-600 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">₦</span>
                  </div>
                  <div className="w-7 h-7 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">🍁</span>
                  </div>
                </div>
                <span className=" text-sm text-black">NGN/CAD</span>
              </div>
              <span className="text-medium text-black">₦1,510.17</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-600 text-xs">
                Saving up to <span className="text-lime-500 font-semibold">15%</span> on conversion
              </span>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <div className="absolute w-fit right-3  -top-12 right-  max-w-xs">
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardContent className=" space-y-4">
            {/* Amount Due Section */}
            <div>
              <p className="text-gray-500 text-sm mb-1">Amount due</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-black">15,000</span>
                <span className="text-gray-400 text-lg">CAD</span>
              </div>
            </div>

            {/* You Will Pay Section */}
            <div>
              <p className="text-gray-500 text-sm mb-1">You will pay</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-lime-500">22,650,000</span>
                <span className="text-gray-400 text-medium">NGN</span>
              </div>
            </div>

            {/* Currency Pair Section */}
            <div className="flex items-center gap-4 justify-between bg-gray-50 rounded-2xl p-3">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 bg-green-600 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">₦</span>
                  </div>
                  <div className="w-7 h-7 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white">🍁</span>
                  </div>
                </div>
                <span className="text-sm font-sm text-black">NGN/CAD</span>
              </div>
              <span className="text-sm font-medium text-black">₦1,510.17</span>
            </div>

            {/* Savings Section */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-600 text-xs">
                Saving up to <span className="text-lime-500 font-medium">15%</span> on conversion
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
