import { Button } from "../components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"
import { Link } from "react-router"

interface HeroSectionProps {
  title: string;
  colorTitle?: string;
  paragraph?: string;
  addButtons?: false;
  children?: React.ReactNode;
}

export function HeroSection({title, colorTitle, paragraph, addButtons, children}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Updated badge colors for black background */}
          {children}

          {/* Changed text color to white */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-white">
            {title}
            <br />
            <span className="bg-gradient-to-r from-[#FAD126] to-[#FF564E] bg-clip-text text-transparent">
              {colorTitle}
            </span>
          </h1>

          {/* Updated paragraph color for better contrast */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            {paragraph}
          </p>

          {addButtons && <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/play">
                Jugar Ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="#como-funciona">Ver Cómo Funciona</Link>
            </Button>
          </div>}
        </div>
      </div>
    </section>
  )
}
