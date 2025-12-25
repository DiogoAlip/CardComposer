import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowRight, Github } from "lucide-react"
import { Link } from "react-router"

interface CtaSectionProps {
    title: string;
    subtitle: string;
    dark?: boolean;
}

export function CtaSection({title, subtitle, dark = false}: CtaSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className={`p-12 text-center ${dark ? "bg-gradient-to-r from-yellow-400/20 to-red-500/20 border border-yellow-400/30 rounded-lg" : "bg-gradient-to-br from-[#FAD126] to-[#FF564E] border-0"}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-white">
            {title}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2 bg-white text-secondary hover:bg-white/90" asChild>
              <Link to="/gamemode">
                Comenzar a Jugar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
                Ver en GitHub
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
