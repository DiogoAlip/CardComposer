import type { Route } from "./+types/tutorial.route";
import { HeroSection } from "~/ui/HeroSection.ui";
import { Navbar } from "~/ui/NavBar.ui";
import { Footer } from "~/ui/Footer.ui";
import { CtaSection } from "~/ui/CTASection.ui";
import { Play, Target, Trophy, Zap } from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CardComposer - Tutorial" },
        { name: "description", content: "Tutorial" },
    ];
}

const tutorialSteps = [
  {
    number: 1,
    title: "Preparate para el Ataque",
    description:
      "El mazo de cada jugador estará conformado por 8 cartas en 2 filas, pero solo podrás voltear y quitar la primera fila de tu mazo. Usando map y filter podras alterar y quitar cartas de la primera fila de tu mazo, con la funcion swap podras alternar entre fila delantera y la posterior.",
    icon: Target,
  },
  {
    number: 2,
    title: "Ejecuta las funciones",
    description:
      "Ejecuta las funciones que escribiste en el paso anterior y espera a que el otro jugador escriba las suyas, ninguno podra ver las funciones escritas del otro jugador hasta que culmine el tiempo establecido. Solo podrás ver el resultado de tus propias funciones.",
    icon: Play,
  },
  {
    number: 3,
    title: "Compara las cartas",
    description:
      "El sistema comparará las cartas de ambos jugadores por columnas, se restan los valores de las cartas y el jugador con la carta mayor gana los puntos. Si la carta delantera fue tachada y deja un espacio vacio, la carta trasera tomara su lugar y se compara. Si la carta esta boca abajo, se considerará como defensa y el resultado sera 0 sin puntaje para ningun jugador.",
    icon: Zap,
  },
  {
    number: 4,
    title: "Gana la partida",
    description:
      "Todo el proceso se repite en 3 rondas, donde en cada ronda se cambiará el mazo hasta el momento de comparar cartas. Ganara el jugador que tenga mayor puntaje acumulado durante las 3 rondas.",
    icon: Trophy,
  },
]

export default function Tutorial () {
    return (
        <div>
            <HeroSection
                colorTitle="Como jugar CardComposer"
                paragraph="Aprende paso a paso cómo dominar el juego de cartas de programación funcional"
            />
            <div className="px-8 md:px-24 flex flex-col gap-12">
              {tutorialSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-6 md:gap-12 items-start h-fit">
                    {/* Timeline connector */}
                    <div className="hidden md:flex flex-col items-center gap-4 self-stretch">
                      {/* Step circle */}
                      <div className="w-16 h-16 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                      
                      {/* Line to next step */}
                      {index < tutorialSteps.length - 1 && (
                        <div className="w-1 flex-1 bg-gradient-to-b from-yellow-400 to-red-500"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="border rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors h-fit">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-yellow-400">Paso {step.number}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <CtaSection
                title="¿Listo para jugar?"
                subtitle="Ahora que ya conoces las mecánicas básicas, es hora de poner a prueba tus habilidades contra otros jugadores"
            />
        </div>
    )
}