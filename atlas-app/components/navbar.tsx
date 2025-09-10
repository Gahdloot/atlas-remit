"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/public/svg/Nexus.svg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl mx-auto px-4">
      <div className="bg-primary/10 backdrop-blur-md rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} >
            <Image
              src={"/svg/Nexus.svg"}
              alt={"nexus"}
              width={90}
              height={30}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white font-medium text-sm hover:text-lime-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white font-medium text-sm hover:text-lime-400 transition-colors"
            >
              About
            </Link>
            <a
              href="#"
              className="text-white font-medium text-sm hover:text-lime-400 transition-colors"
            >
              How it works
            </a>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-100 hover:text-lime-400 transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px]">
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-3 cursor-pointer">
                  <Link href="/resources">
                    <p className="font-medium text-gray-900">Blog</p>
                    <p className="text-sm text-gray-500">
                      Insights, tips, and updates
                    </p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-3 cursor-pointer">
                  <Link href={"#"}>
                    <p className="font-medium text-gray-900">Case Studies</p>
                    <p className="text-sm text-gray-500">
                      Success stories and project highlights
                    </p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-3 cursor-pointer">
                  <Link href="#">
                    <p className="font-medium text-gray-900">Events</p>
                    <p className="text-sm text-gray-500">
                      Global meetups and industry discussions
                    </p>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-100 hover:text-lime-400 transition-colors">
                Support
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-2 cursor-pointer">
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-2 cursor-pointer">
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 rounded p-2 cursor-pointer">
                  Live Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:block">
              <button
                onClick={() => router.push("/track-payment")}
                className="text-lime-400 border text-sm border-lime-400 p-2 px-4 g-transparent font-medium rounded-full "
              >
                Track Payment
              </button>
            </div>
          </div>

          {/* Desktop CTA Button */}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-lime-400 hover:text-lime-300 hover:bg-lime-400/10 rounded-full p-2"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-white hover:text-lime-400 transition-colors py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-lime-400 transition-colors py-2"
              >
                About
              </a>
              <a
                href="#"
                className="text-white hover:text-lime-400 transition-colors py-2"
              >
                How it works
              </a>
              <a
                href="#"
                className="text-white hover:text-lime-400 transition-colors py-2"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-white hover:text-lime-400 transition-colors py-2"
              >
                Support
              </a>
              <Button
                onClick={() => router.push("/track-payment")}
                className="text-white border  hover:bg-lime-500 font-medium rounded-full mt-4"
              >
                Track Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
