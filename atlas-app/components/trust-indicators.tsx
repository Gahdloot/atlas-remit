import Image from "next/image"

export function TrustIndicators() {
  const partners = [
    { name: "VFC", logo: "/images/home-section/vfd.png" },
    { name: "Sunbeth", logo: "/images/home-section/sunbeth.png" },
    { name: "Copart", logo: "/images/home-section/copart.png" },
    { name: "Circle", logo: "/images/home-section/circle.png" },
    { name: "Lead", logo: "/images/home-section/lead.png" },
    { name: "Diamond", logo: "/images/home-section/diamond.png" },
    { name: "AA", logo: "/images/home-section/aa.png" },
  ]

  return (
    <section className="w-full px-12 py-16">
      <div className="flex items-center justify-between space-x-8 opacity-60 flex-wrap">
        {partners.map((partner, index) => (
          <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={80}
              height={40}
              className="object-contain max-h-12 w-auto"
            />
          </div>
        ))}
      </div>
    </section>
  )
}