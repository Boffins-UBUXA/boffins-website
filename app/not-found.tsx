import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-8xl lg:text-9xl font-bold text-primary/20">404</h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Page Not Found</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered
                the wrong URL.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Browse Services</span>
                </Link>
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
