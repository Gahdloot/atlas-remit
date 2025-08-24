"use client"
import { HeroSection } from "@/components/hero-section"
import { TrustIndicators } from "@/components/trust-indicators"
import { HowItWorks } from "@/components/how-it-works"
import { useGetTestListQuery } from '@/store/api/schoolPaymentSlice';

export default function HomePage() {

  const { 
    data: response, 
    error, 
    isLoading 
  } = useGetTestListQuery({ });


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading payment requests</div>;

  const paymentRequests = response?.data?.results || [];



  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TrustIndicators />
      <HowItWorks />
      <footer className="mt-16 pt-8 max-w-7xl mx-auto py-20">
        <div className="text-xl font-bold text-lime-400">ATLAS</div>
      </footer>
    </main>
  )
}
