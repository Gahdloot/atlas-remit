import { Card, CardContent } from "@/components/ui/card"
import { Church, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ExchangeRatesSection() {
  return (
    <div className="relative h-96 md:h-[450px] rounded-[40px] overflow-hidden mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/images/home-section/smile-face.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark gradient overlay - from transparent at top to dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div> */}

      {/* Institution icon overlay */}
      <div className="absolute bottom-36 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-10">
        <div className="p-2 bg-lime-400 rounded-full flex items-center justify-center">
        {/* <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center"> */}
          {/* <TrendingUp className="w-5 h-5 text-black" /> */}
          <Church className="w-5 h-5 text-black text-light" />
        </div>
      </div>

      {/* Exchange Rate Cards - positioned at bottom center */}
      <div className="absolute w-full bottom-6 left-1/2 transform -translate-x-1/2 gap-4 grid grid-cols-2 px-6 z-10">
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl">
          <CardContent className="">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">₦</span>
                </div>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">C</span>
                </div>
              </div>
              <span className="text-sm font-bold text-black">NGN/CAD</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium text-gray-500">Canadian Dollar</div>
              <div className="font-bold text-black text-lg">₦1,510.17</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl">
          <CardContent className="">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">₦</span>
                </div>
                <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">£</span>
                </div>
              </div>
              <span className="text-sm font-bold text-black">NGN/GBP</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium text-gray-500">British Pound</div>
              <div className="font-bold text-black text-lg">₦1,834.82</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
