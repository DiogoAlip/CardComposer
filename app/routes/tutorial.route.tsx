import { HeroSection } from "~/marketing/components/HeroSection.ui";
import { CtaSection } from "~/marketing/components/CTASection.ui";
import { Play, Target, Trophy, Zap } from "lucide-react";

const tutorialSteps = [
  {
    number: 1,
    title: "Preparate para el Ataque",
    description:
      "El mazo de cada jugador estará conformado por 8 cartas en 2 filas, pero solo podrás voltear y quitar la primera fila de tu mazo. Usando map y filter podras alterar y quitar cartas de la primera fila de tu mazo, con la funcion swap podras alternar entre fila delantera y la posterior.",
    icon: <Target className="w-8 h-8 text-black" />,
    image: "Step1.gif",
  },
  {
    number: 2,
    title: "Ejecuta las funciones",
    description:
      "Ejecuta las funciones que escribiste en el paso anterior y espera a que el otro jugador escriba las suyas, ninguno podra ver las funciones escritas del otro jugador hasta que culmine el tiempo establecido. Solo podrás ver el resultado de tus propias funciones.",
    icon: <Play className="w-8 h-8 text-black" />,
    image: "Step2.gif",
  },
  {
    number: 3,
    title: "Compara las cartas",
    description:
      "El sistema comparará las cartas de ambos jugadores por columnas, se restan los valores de las cartas y el jugador con la carta mayor gana los puntos. Si la carta delantera fue tachada y deja un espacio vacio, la carta trasera tomara su lugar y se compara. Si la carta esta boca abajo, se considerará como defensa y el resultado sera 0 sin puntaje para ningun jugador.",
    icon: <Zap className="w-8 h-8 text-black" />,
    image: "Step3.gif",
  },
  {
    number: 4,
    title: "Gana la partida",
    description:
      "Todo el proceso se repite en 3 rondas, donde en cada ronda se cambiará el mazo hasta el momento de comparar cartas. Ganara el jugador que tenga mayor puntaje acumulado durante las 3 rondas.",
    icon: <Trophy className="w-8 h-8 text-black" />,
    image: "Step4.png",
  },
];

export default function Tutorial() {
  return (
    <div>
      <HeroSection
        colorTitle="Como jugar CardComposer"
        paragraph="Aprende paso a paso cómo dominar el juego de cartas de programación funcional"
      />
      <div className="px-8 md:px-24 flex flex-col gap-12">
        {tutorialSteps.map(
          ({ icon, number, title, description, image }, index) => (
            <div key={index} className="flex gap-6 md:gap-12 items-start h-fit">
              <div className="hidden md:flex flex-col items-center gap-4 self-stretch">
                <div className="w-16 h-16 rounded-full bg-primary shrink-0 flex items-center justify-center">
                  {icon}
                </div>

                {index < tutorialSteps.length - 1 && (
                  <div className="w-1 flex-1 bg-linear-to-b from-yellow-400 to-red-500"></div>
                )}
              </div>

              <div className="border rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors h-fit">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold text-yellow-400">
                    Paso {number}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-yellow-400/50 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-white/70">{description}</p>
                <img className="mx-auto mt-8 w-full" src={`/${image}`} />
              </div>
            </div>
          ),
        )}
      </div>
      <CtaSection
        title="¿Listo para jugar?"
        subtitle="Ahora que ya conoces las mecánicas básicas, es hora de poner a prueba tus habilidades contra otros jugadores"
      />
    </div>
  );
}
