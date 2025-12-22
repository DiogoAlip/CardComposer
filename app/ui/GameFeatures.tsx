import { Card } from "../components/ui/card"
import { Layers, Zap, Brain, Users } from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Composición Pura",
    description:
      "Cada carta representa una función pura. Combínalas para crear estrategias complejas sin efectos secundarios.",
  },
  {
    icon: Zap,
    title: "Transformaciones",
    description: "Usa map, filter y reduce en tiempo real. Aprende transformaciones de datos mientras juegas.",
  },
  {
    icon: Brain,
    title: "Inmutabilidad",
    description:
      "El estado del juego nunca muta. Cada jugada crea una nueva realidad, enseñando inmutabilidad de forma natural.",
  },
  {
    icon: Users,
    title: "Higher-Order Cards",
    description:
      "Cartas especiales que toman otras cartas como entrada, demostrando funciones de orden superior en acción.",
  },
]

export function GameFeatures() {
  return (
    <section id="como-funciona" className="py-20 px-4 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-white">
            Conceptos funcionales en cada jugada
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Cada mecánica del juego está diseñada para reforzar principios fundamentales de programación funcional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:border-accent/50 transition-colors bg-card border-border">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
