import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-transparent">
        <div className="text-xl font-serif font-bold text-foreground">ATLAS</div>
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
