"use client"

import { FeatureCard } from "@/components/about/feature-card"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function AboutPage() {
    const router = useRouter()
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section
      className="relative max-h-[70vh] text-white overflow-hidden rounded-br-[50px]"
      style={{
        backgroundImage: "url(/images/email-header.png)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
         <div
         className="px-6 py-20 text-center mt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-work-sans-override font-semibold mb-6 leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
            About ATLAS
            <br />
            <span className=" leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">by Oneremit</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Making global education payments simple and reliable.
          </p>
        </div>
      </div>

    </section>


      {/* Introduction Section */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-work-sans-override font-semibold mb-8 leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">Introduction</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            ATLAS is a simple, reliable platform built by Oneremit to make paying international school fees stress-free.
            Whether you're a student, parent, or education agent, ATLAS ensures your payments are processed quickly,
            transparently, and securely—so you can focus on education, not paperwork.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
              }
              title="For Students & Parents"
              description="Pay tuition and related fees directly to international schools with ease"
            />

            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              }
              title="For Agents & Institutions"
              description="Manage student payments with full transparency."
            />

            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              }
              title="Fast & Secure Payments"
              description="Powered by Oneremit, guaranteeing safe and timely transactions."
            />

            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
              }
              title="Clear Tracking"
              description="Get real-time updates and receipts for every payment you make."
            />
          </div>
        </div>
      </section>


      <section className="px-6 mb-12 lg:mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className=" bg-[#091301] rounded-3xl p-8 ">
              <h2 className="text-3xl font-work-sans-override font-semibold mb-6 text-lime-50">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To remove barriers in global education by making cross-border payments simple, reliable, and accessible
                to everyone.
              </p>
            </div>

            <div className=" bg-[#091301] rounded-3xl p-8 ">
              <h2 className="text-3xl font-work-sans-override font-semibold mb-6 text-lime-50">Our Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Empowering students, families, and institutions with seamless financial tools that keep education moving
                forward.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  )
}
