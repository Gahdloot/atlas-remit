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
    image: "/images/home-section/user.png", 
  },
  {
    number: "2", 
    title: "FX rates",
    description: "Check live FX rates for conversion",
    image: "/images/home-section/arrow-reload-horizontal.png",
  },
  {
    number: "3",
    title: "Pay tuition",
    description: "Enter details and pay.",
    image: "/images/home-section/invoice-03.png",
  },
]


  return (
    <section
      style={{
        backgroundImage: "url(/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
       className="w-full rounded-t-[50px]">
        <div className="w-full md:max-w-4xl  mx-auto px-6 py-16  text-white ">

          <div className="flex flex-col items-center justify-center text-center mb-16">
            <p className="flex items-center gap-3 text-sm text-lime-100 bg-[#01120b] px-4 py-2 rounded-full w-fit shadow-lime-50 shadow mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>How to use</span>
            </p>

            <h2 className="text-4xl lg:text-5xl font-work-sans-override font-semibold mb-4 bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
              How Nexus works <br />
              <span>for tuition payments</span>
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto">
              Send tution payments confidentially with Nexus by Oneremit, you get secure, transparent rates, and fees design to save you money
            </p>
          </div>

          {/* Steps Section */}
          <div className="relative mb-16">
            <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative z-10">
                  {/* Step Circle with Image */}
                  <div className="relative w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
                    <div className="bg-lime-400 rounded-full flex items-center justify-center shadow-lg p-2">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={20}
                        height={20}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="font-semibold text-white mb-2 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-400 max-w-48 mx-auto">{step.description}</p>
                </div>
              ))}


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
          <div className="text-center">
            <Button size="lg" className="bg-lime-400 text-black hover:bg-lime-500 font-medium px-8 py-3 text-base">
              Start paying now!
            </Button>
          </div>


        </div>

      
    </section>
  )
}