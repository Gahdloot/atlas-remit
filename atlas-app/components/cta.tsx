"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CTA() {
    const router = useRouter()
  return (
    <>
      <section 
            className="relative max-w-6xl mx-auto text-white overflow-hidden rounded-[50px] "
            style={{
                backgroundImage: "url(/images/email-header.png)",
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
            }}
            >
            <div className="absolute inset-0 bg-gradient-to-tl from-black via-black/10 to-transparent"></div>

            <div className="relative z-10 flex items-center px-6 lg:px-12 py-12  max-w-7xl mx-auto  mt-8 ">
                <div className="w-full lg:w-[450px] space-y-8 ">
                <div className="relative">
                    <h1 className="relative text-4xl font-bold mb-6  leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
                    What If Tution Payments{" "}
                    <span className="">
                        Where This Easy?
                    </span>
                    </h1>
                </div>

                <p className="text-gray-300 text-sm mb-8 max-w-2xl leading-relaxed">
                    Students, parents, sponsors—whoever pays the fees can now do it in minutes with ATLAS and enjoy instant
                    payments, unbeatable rates, and zero hidden charges.
                </p>

                <div className="space-y-4">
                    <div className=" flex items-center space-x-2">
                    <Button onClick={() => {
                        console.log("clcick")
                        router.push("/get-started")
                        }} size="lg" className="bg-lime-400 text-black hover:bg-lime-500 font-medium px-8 py-3 text-sm cursor-pointer">
                        Pay Tuition
                        </Button>
                        <Button onClick={() => {
                        console.log("clcick")
                        router.push("/get-started")
                        }} size="lg" 
                        // variant="outline"
                        className=" text-white  px-8 py-3 text-sm bg-transparent hover:bg-transparent border border-lime-100 cursor-pointer">
                            Learn more
                        </Button>
                    </div>
                    

                </div>
                </div>
            </div>
        </section>
    </>
  )
}
