import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-transparent ['#091301']">
        <Link href={'/'} className="mb-8 sm:mb-12">
          <Image 
            src={'/images/logo-new.png'}
            width={300}
            height={100}
            alt="Atlas"
            className="mx-auto w-auto h-12 sm:h-16"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            Home
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            How to use
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            Blog
          </a>
        </nav>
      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Contact Support</Button>
    </header>
  )
}
