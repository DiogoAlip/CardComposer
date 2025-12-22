import { Button } from "../components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"
import { Link } from "react-router"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Updated badge colors for black background */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
            <Code2 className="h-4 w-4" />
            <span>Programación Funcional + Estrategia</span>
          </div>

          {/* Changed text color to white */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-white">
            Aprende a programar
            <br />
            <span className="bg-gradient-to-r from-[#FAD126] to-[#FF564E] bg-clip-text text-transparent">
              jugando cartas
            </span>
          </h1>

          {/* Updated paragraph color for better contrast */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Domina los conceptos de programación funcional mientras desarrollas estrategias ganadoras en un juego de
            cartas único e innovador.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/play">
                Jugar Ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="#como-funciona">Ver Cómo Funciona</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
