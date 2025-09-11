"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="px-6 py-16   mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href={'/'} className=" mb-2">
                <Image 
                    src={"/svg/Nexus.svg"}
                    width={100}
                    height={40}
                    alt="Atlas"
                    className=" w-auto "
                    priority
                />
                </Link>
              <p className="text-gray-400 text-sm mb-6 mt-2">
                Fast transfers. Lower fees. Total security. Nexus by Oneremit makes paying tuition abroad easy.
              </p>
              {/* <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">Partnered with:</span>
                <Image 
                    src={'/images/maple-education-canada.png'}
                    width={80}
                    height={30}
                    alt="Atlas"
                    className=" "
                    priority
                />
              </div> */}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-white font-semibold mb-4">FEATURES</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Get Quote
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Track Payment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pay Tuition
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lime-400 hover:text-lime-300 transition-colors">
                    support@oneremit.co
                  </a>
                </li>
              </ul>
              <Button className="bg-lime-400 text-black hover:bg-lime-500 mt-4 px-6">Pay tuition now</Button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">Copyright 2025. ATLAS by Oneremit. All Rights Reserved</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                AML Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Banner */}
      <div className="py-8 text-center">
        <Image
            src="/images/footer-banner.png"
            alt="Turning Miles Into Seconds for Tuition Payments"
            width={1200}
            height={300}
            className="mx-auto w-full max-w-4xl h-auto object-contain"
        />
    </div>

    </>
  )
}
