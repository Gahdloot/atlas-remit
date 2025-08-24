interface ArticleCardProps {
  title: string
  description: string
  date: string
  featured?: boolean
}

export function ArticleCard({ title, description, date, featured = false }: ArticleCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-green-900/40 to-green-800/60 rounded-2xl p-6 border border-green-800/30 ${featured ? "md:col-span-2 lg:col-span-3" : ""}`}
    >
      {/* <div className="flex items-center justify-center w-16 h-16 bg-lime-400 rounded-lg mb-6">
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21l3-3-3-3M14 3l3 3-3 3M4 12h16" />
        </svg>
      </div>

      <div className="text-gray-400 text-sm mb-3 uppercase tracking-wide">{date}</div>

      <h3 className={`text-white font-bold mb-4 ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>

      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      <button className="text-lime-400 hover:text-lime-300 transition-colors font-medium">Read More</button> */}
    </div>
  )
}
