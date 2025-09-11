import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoginModal() {
  return (
    <div className="fixed top-20 right-6 w-80 z-10">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="text-sm font-serif font-bold text-foreground mb-1">Nexus</div>
          <div className="space-y-1">
            <p className="text-foreground">
              Hi there, <span className="text-accent">scholar!</span>
            </p>
            <p className="text-foreground font font-semibold">Welcome to Nexus!</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your email address to get started with your tuition payment journey.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="scholar@gmail.com" className=" border-border text-foreground" />
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Continue</Button>
        </CardContent>
      </Card>
    </div>
  )
}
