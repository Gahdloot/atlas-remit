import type React from "react"
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#091301] rounded-2xl p-6  transition-colors">
      <div className="w-16 h-16 bg-accent/20 rounded-full mb-6 shadow-lg p-1 flex items-center justify-center">
         {icon}
      </div>
      {/* <div className="mb-4">{icon}</div> */}
      <h3 className="text-lime-50 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-medium leading-relaxed">{description}</p>
    </div>
  )
}
