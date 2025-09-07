import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ResourcesSection() {
  const articles = [
    {
      title: "Deadline Coming? How to Get School Fees paid on Time",
      description:
        "When your child's tuition deadline is days away, every hour counts. In this episode, we break down why overseas school fee deadlines are...",
      image: "/students-with-backpacks-outdoors.png",
    },
    {
      title: "Article Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
      image: "/students-with-backpacks-outdoors.png",
    },
  ]

  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-sm text-lime-100 bg-[#01120b] px-4 py-2 rounded-full w-fit mb-8">
          <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
          <span>Resources</span>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Latest on Tuition Payment</h2>
            <p className="text-gray-400 text-lg">
              Guides and resources designed to simplify the way you pay school fees.
            </p>
          </div>
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
            Read more Articles
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="bg-green-900/20 border-green-800/30 overflow-hidden">
              <div className="aspect-video relative">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{article.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
