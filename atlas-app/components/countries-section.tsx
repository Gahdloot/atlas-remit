import Image from "next/image"

export function CountriesSection() {
  const countries = [
    { name: "Canada", flag: "/canada-flag.png", active: true },
    { name: "United Kingdom", flag: "/uk-flag.png", active: false },
    { name: "United States of America", flag: "/usa-flag.png", active: false },
    { name: "United Arab Emirates", flag: "/uae-flag.png", active: false },
    { name: "China", flag: "/china-flag.png", active: false },
  ]

  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Payments to all{" "}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                major countries
              </span>
            </h2>
            <p className="text-gray-400 text-lg">One platform. Multiple countries. Seamless school fee payments.</p>
          </div>

          {/* Right Content - Countries List */}
          <div className="space-y-4">
            {countries.map((country, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  country.active ? "bg-lime-400 text-black" : "bg-green-900/30 text-white hover:bg-green-800/40"
                }`}
              >
                <Image
                  src={country.flag || "/placeholder.svg"}
                  alt={`${country.name} flag`}
                  width={30}
                  height={20}
                  className="rounded"
                />
                <span className="font-medium">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
