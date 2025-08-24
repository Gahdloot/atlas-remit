"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection() {
  const router = useRouter()
  return (
    <section
      className="relative min-h-screen text-white overflow-hidden rounded-br-[50px]"
      style={{
        backgroundImage: "url(/images/home-section/student-hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header integrated within hero section */}


      <div className="relative z-10 flex items-center px-6 lg:px-12 py-12 lg:py-24 min-h-[calc(100vh-200px)] max-w-7xl mx-auto ">
        <div className="max-w-2xl space-y-8 mt-12">
          <div className="flex items-center gap-3 text-sm text-lime-50  bg-primary/20 px-4 py-2 rounded-full w-fit shadow-lime-50 ">
            <GraduationCap className="w-4 h-4" />
            <span>
              ATLAS by Oneremit
            </span>
            
          </div>

          <div className="relative">
            <h1 className="relative text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
              Send tuition money{" "}
              <span className="">
                across borders easily
              </span>
            </h1>
          </div>

          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            ATLAS helps international students pay tuition fees securely with better exchange rates and lower fees than
            traditional banks.
          </p>

          <div className="space-y-4">
            <div className=" flex items-center space-x-2">
              <Button onClick={() => {
                  console.log("clcick")
                  router.push("/get-started")
                  // router.push("/get-started")
                }} size="lg" className="bg-lime-400 text-black hover:bg-lime-500 font-medium px-8 py-3 text-sm cursor-pointer">
                  Pay tution now
                </Button>
                <Button onClick={() => {
                  console.log("clcick")
                  router.push("/get-started")
                  // router.push("/get-started")
                }} size="lg" className="bg-white text-black  font-medium px-4 py-4 text-sm cursor-pointer hover:bg-white">
                  <Image 
                  src={'/images/invoice.png'} 
                  height={16}
                  width={16}
                  alt=""
                  />
                  <span>
                    Get a Quote
                  </span>
                </Button>
            </div>
            

            <div className="flex items-center gap-3 text-sm text-gray-300 bg-transparent px-4 py-2 rounded-full w-fit">
              <div className="w-5 h-5  flex items-center justify-center">
                <Image
                src="/images/home-section/check-swift.png"
                height={16}
                width={16}
                alt="checj"
                />
              </div>
              No credit cards needed
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}