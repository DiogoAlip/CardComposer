import { Card } from "@/shared/ui/card"

const concepts = [
  {
    title: "Funciones Puras",
    code: "flip(card) => newCard",
    description: "Cada transformación crea una nueva versión de la carta sin alterar la original.",
    color: "border-l-chart-1",
  },
  {
    title: "Composición",
    code: "sequence([swap, flipOver])",
    description: "Encadena múltiples manipulaciones para crear rutinas de cartas complejas.",
    color: "border-l-chart-2",
  },
  {
    title: "Inmutabilidad",
    code: "nextDeck = map(deck, faceUp)",
    description: "El mazo original nunca muta; cada jugada produce una nueva realidad del juego.",
    color: "border-l-chart-3",
  },
  {
    title: "Orden Superior",
    code: "filter(deck, isRed)",
    description: "Usa funciones que operan sobre otras funciones para refinar tu estrategia.",
    color: "border-l-chart-4",
  },
]

export function FunctionalConcepts({title, subtitle}: {title: string, subtitle: string}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-white">{title}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {concepts.map((concept, index) => (
            <Card key={index} className={`p-6 border-l-4 ${concept.color} border-border hover:border-accent transition-colors duration-300`}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-white">{concept.title}</h3>
                  <span className="text-xs font-mono text-white/60 px-2 py-1 bg-primary/10 rounded">FP</span>
                </div>
                <code className="block text-sm font-mono bg-white/5 text-white p-3 rounded border border-border">
                  {concept.code}
                </code>
                <p className="text-white/70 text-sm">{concept.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
