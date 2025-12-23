import { Card } from "../components/ui/card"

interface Feature {
  icon: React.ComponentType<{ className?: string }>,
  title: string,
  description: string
}

export function GameFeatures({features, title, subtitle}: {features: Feature[], title?: string, subtitle?: string}) {
  return (
    <section id="como-funciona" className="py-20 px-4 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          {title && 
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-white">
            {title}
          </h2>
          }
          {
          subtitle &&
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
          }
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
