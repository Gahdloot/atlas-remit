import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustIndicators } from "@/components/trust-indicators"
import { HowItWorks } from "@/components/how-it-works"
import { LoginModal } from "@/components/login-modal"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* <Header />  */}
      <HeroSection />
      <TrustIndicators />
      <HowItWorks />
      <footer className="mt-16 pt-8 max-w-7xl mx-auto py-20">
        <div className="text-xl font-bold text-lime-400">ATLAS</div>
      </footer>
    </main>
  )
}
