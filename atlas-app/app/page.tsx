"use client"
import Footer from "@/components/footer";
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </main>
  )
}
