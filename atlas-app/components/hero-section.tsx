"use client"

import { Button } from "@/components/ui/button"
import { BadgeCheck, Check, GraduationCap } from "lucide-react"
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
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-transparent">
        <div className="text-xl font-bold text-lime-400">ATLAS</div>
        <nav className="hidden md:flex items-center space-x-12">
          <a href="#" className="text-foreground hover:text-lime-400 transition-colors">
            Home
          </a>
          <a href="#" className="text-foreground hover:text-lime-400 transition-colors">
            How to use
          </a>
          <a href="#" className="text-foreground hover:text-lime-400 transition-colors">
            Blog
          </a>
        </nav>
        <Button className="bg-lime-400 text-black hover:bg-lime-500 font-medium">
          Contact support
        </Button>
      </header>

      <div className="relative z-10 flex items-center px-6 lg:px-12 py-12 lg:py-24 min-h-[calc(100vh-200px)] max-w-7xl mx-auto ">
        <div className="max-w-2xl space-y-8">
          <div className="flex items-center gap-3 text-sm text-lime-100  bg-primary/20 px-4 py-2 rounded-full w-fit shadow-lime-50 shadow">
            <GraduationCap className="w-4 h-4" />
            <span>
              Tuition payment by ATLAS
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
            <Button onClick={() => {
              console.log("clcick")
              router.push("/get-started")
            }} size="lg" className="bg-lime-400 text-black hover:bg-lime-500 font-medium px-8 py-3 text-lg cursor-pointer">
              Get Started
            </Button>

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