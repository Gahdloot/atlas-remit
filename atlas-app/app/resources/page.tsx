"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ArticleCard } from "@/components/resouces/article-card";
import CTA from "@/components/cta";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("BLOG")
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = ["BLOG", "CASE STUDIES", "EVENTS"]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section
      className="relative max-h-[80vh] text-white overflow-hidden rounded-br-[50px]"
      style={{
        backgroundImage: "url(/images/email-header.png)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >

    <section className=" py-20">
        <div className="px-6 lg:px-12 py-12 lg:py-24 min-h-[calc(100vh-200px)] max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-work-sans-override font-semibold mb-6 leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">
            The Nexus
            <br />
            <span className="">Knowledge Base</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">
            Built for students, parents, and partners who want reliable answers, practical guides, and global insights.
          </p>

          {/* Search Bar */}
          {/* <div className="flex max-w-md">
            <input
              type="text"
              placeholder="Search for an article, event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
            />
            <Button className="bg-lime-400 text-black hover:bg-lime-500 px-6 py-3 rounded-l-none rounded-r-lg">
              Search
            </Button>
          </div> */}
        </div>
      </section>

    </section>


      {/* Tab Navigation */}
      <section className="px-6 py-4 bg-[#091301]">
        <div className="max-w-6xl mx-auto">
          <div className="flex space-x-8 ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-medium transition-colors ${
                  activeTab === tab ? "text-lime-400 " : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-work-sans-override font-semibold mb-8  leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">Featured Articles</h2>

          <ArticleCard
            title="Deadline Coming? How to Get School Fees paid on Time"
            description="When your child's tuition deadline is days away, every hour counts. In this episode, we break down why overseas school fee deadlines are stricter than you think and how delays can lead to blocked classes, late fees, or other problems."
            date="AUGUST 22, 2025"
            featured={true}
          />

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <span className="text-gray-400">1/3</span>
            <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Other Articles */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-work-sans-override font-semibold mb-8  leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent">Other Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <ArticleCard
                key={index}
                title="Tuition Payment Options for Students Abroad"
                description="When your child's tuition deadline is days away, every hour counts. In this episode, we break down why overseas school fee deadlines are s..."
                date="AUGUST 22, 2025"
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <span className="text-gray-400">1/3</span>
            <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>


      <CTA />
      <Footer />
    </main>
  )
}
