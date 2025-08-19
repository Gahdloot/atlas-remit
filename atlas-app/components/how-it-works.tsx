import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Mail, Repeat, CreditCard, User } from "lucide-react"
import Image from "next/image"
import ExchangeRatesSection from "./exchange-rates-section"

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Email address",
      description: "Send link to email address.",
      icon: User,
    },
    {
      number: "2", 
      title: "FX rates",
      description: "Check live FX rates for conversion",
      icon: Repeat,
    },
    {
      number: "3",
      title: "Pay tuition",
      description: "Enter details and pay.",
      icon: CreditCard,
    },
  ]

  return (
    <section className="w-full md:max-w-4xl  mx-auto px-6 py-16 bg-black text-white">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <p className="flex items-center gap-3 text-sm text-lime-100 bg-primary/20 px-4 py-2 rounded-full w-fit shadow-lime-50 shadow mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>How to use</span>
        </p>

        <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
          How ATLAS works <br />
          <span>for tuition payments</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          ATLAS helps international students pay tuition fees securely with better exchange rates and lower fees than
          traditional banks.
        </p>
      </div>

      {/* Steps Section */}
      <div className="relative mb-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center relative z-10">
                {/* Step Circle with Icon */}
                <div className="relative w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
                  <p className="bg-lime-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg p-2">
                  <IconComponent className="w-7 h-7 text-black" />
                  </p>
                  
                </div>

                {/* Step Content */}
                <h3 className="font-semibold text-white mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-gray-400 max-w-48 mx-auto">{step.description}</p>
              </div>
            );
          })}

          {/* Connecting Arrows */}
          <div className="hidden md:block absolute top-2 left-1/5 transform translate-x-8 w-36 h-12 z-0">
            <Image
              src="/images/home-section/arrow.svg"
              alt="Arrow"
              width={150}
              height={48}
              className="object-contain opacity-60"
            />
          </div>
          <div className="hidden md:block absolute top-2 right-1/5 transform -translate-x-8 h-12 z-0  w-36">
            <Image
              src="/images/home-section/arrow.svg"
              alt="Arrow"
              width={300}
              height={50}
              className="object-contain opacity-60"
            />
          </div>
        </div>
      </div>

      <ExchangeRatesSection />

      {/* Image and Exchange Rates Section */}
      <div className="relative h-  rounded-3xl overflow-hidden mb-8  bg-pink-600" >
        {/* Student Image - Full width background */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 relative overflow-hidden"
            style={{
                backgroundImage: "url(/images/home-section/smile-face.png)",
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
              }}>
              {/* Background blur pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/60 via-green-400/40 to-green-600/60"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-green-300/40 rounded-full blur-2xl"></div>
              
              
            </div>
          </div>
          
          {/* Institution icon overlay - positioned like in your image */}
          <div className="absolute bottom-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        {/* Exchange Rate Cards - positioned at bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    🇳🇬🇨🇦
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">NGN/CAD</div>
                  <div className="text-xs text-gray-500">Canadian Dollar</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-black text-xl">₦1,510.17</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    🇳🇬🇬🇧
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">NGN/GBP</div>
                  <div className="text-xs text-gray-500">British Pound</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-black text-xl">₦1,834.82</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="text-center">
        <Button size="lg" className="bg-lime-400 text-black hover:bg-lime-500 font-medium px-8 py-3 text-base">
          Start paying now!
        </Button>
      </div>

      
    </section>
  )
}