"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl mx-auto px-4">
      <div className="bg-primary/10 backdrop-blur-md rounded-[1.5rem] md:rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <Image src={"/svg/Nexus.svg"} alt={"nexus"} width={90} height={30} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white font-medium text-sm hover:text-lime-400 transition-colors">Home</Link>
            <Link href="/about" className="text-white font-medium text-sm hover:text-lime-400 transition-colors">About</Link>
            <a href="#" className="text-white font-medium text-sm hover:text-lime-400 transition-colors">How it works</a>

            {/* Desktop Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-100 hover:text-lime-400 transition-colors">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[300px] z-50">
                <Link href="/resources" className="block p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="font-bold text-sm text-gray-900">Blog</p>
                  <p className="text-sm text-gray-500">Insights, tips, and updates</p>
                </Link>
                <Link href="#" className="block p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="font-bold text-sm text-gray-900">Case Studies</p>
                  <p className="text-sm text-gray-500">Success stories and project highlights</p>
                </Link>
                <Link href="#" className="block p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="font-bold text-sm text-gray-900">Events</p>
                  <p className="text-sm text-gray-500">Global meetups and industry discussions</p>
                </Link>
              </div>
            </div>

            {/* Desktop Support Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-100 hover:text-lime-400 transition-colors">
                Support <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white rounded-lg shadow-lg text-gray-700 border border-gray-200 p-2 min-w-[200px] z-50">
                <Link href="#" className="block p-2 text-sm hover:bg-gray-50 rounded cursor-pointer">Help Center</Link>
                <Link href="#" className="block p-2 text-sm hover:bg-gray-50 rounded cursor-pointer">Contact Us</Link>
                <Link href="#" className="block p-2 text-sm hover:bg-gray-50 rounded cursor-pointer">Live Chat</Link>
              </div>
            </div>

            <button
              onClick={() => router.push("/track-payment")}
              className="text-lime-400 border text-sm border-lime-400 p-2 px-4 font-medium rounded-full"
            >
              Track Payment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-lime-400 hover:text-lime-300 hover:bg-lime-400/10 rounded-full p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700 flex flex-col space-y-3">
            <Link href="#" className="text-white hover:text-lime-400 transition-colors py-2">Home</Link>
            <Link href="#" className="text-white hover:text-lime-400 transition-colors py-2">About</Link>
            <Link href="#" className="text-white hover:text-lime-400 transition-colors py-2">How it works</Link>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("resources")}
                className="flex justify-between w-full text-white py-2 hover:text-lime-400 transition-colors items-center"
              >
                Resources <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "resources" && (
                <div className="pl-4 mt-2 flex flex-col space-y-1">
                  <Link href="/resources" className="text-white hover:text-lime-400 transition-colors py-1">Blog</Link>
                  <Link href="#" className="text-white hover:text-lime-400 transition-colors py-1">Case Studies</Link>
                  <Link href="#" className="text-white hover:text-lime-400 transition-colors py-1">Events</Link>
                </div>
              )}
            </div>

            {/* Mobile Support Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("support")}
                className="flex justify-between w-full text-white py-2 hover:text-lime-400 transition-colors items-center"
              >
                Support <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openDropdown === "support" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "support" && (
                <div className="pl-4 mt-2 flex flex-col space-y-1">
                  <Link href="#" className="text-white hover:text-lime-400 transition-colors py-1">Help Center</Link>
                  <Link href="#" className="text-white hover:text-lime-400 transition-colors py-1">Contact Us</Link>
                  <Link href="#" className="text-white hover:text-lime-400 transition-colors py-1">Live Chat</Link>
                </div>
              )}
            </div>

            <Button
              onClick={() => router.push("/track-payment")}
              className="text-white border hover:bg-lime-500 font-medium rounded-full mt-4"
            >
              Track Payment
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
