import { HeroSection } from "@/marketing/components/HeroSection.ui";
import { GameFeatures } from "@/marketing/components/GameFeatures.ui";
import { FunctionalConcepts } from "@/marketing/components/FunctionalConcepts.ui";
import { CtaSection } from "@/marketing/components/CTASection.ui";
import { Layers, Zap, Brain, Users, Code2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      Icon: Layers,
      title: "Composición de Rutinas",
      description:
        "Diseña secuencias visuales de manipulación de cartas combinando funciones puras de forma intuitiva.",
    },
    {
      Icon: Zap,
      title: "Transformaciones Progresivas",
      description:
        "Usa map y filter para voltear, intercambiar o cambiar el estado de las cartas en tiempo real.",
    },
    {
      Icon: Brain,
      title: "Inmutabilidad Nativa",
      description:
        "Cada jugada crea un nuevo estado del juego, demostrando cómo los datos nunca mutan en la programación funcional.",
    },
    {
      Icon: Code2,
      title: "Programación Visual",
      description:
        "Construye 'programas' mediante drag-and-drop para dominar la lógica de funciones de orden superior.",
    },
  ];
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Aprende a programar"
        colorTitle="jugando cartas"
        paragraph="Diseña rutinas visuales de manipulación de cartas y domina la programación funcional. Crea programas mediante drag-and-drop para transformar tu mazo con secuencias lógicas y estratégicas."
        addButtons={false}
        children={
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
            <Code2 className="h-4 w-4" />
            <span>Programación Funcional + Estrategia Visual</span>
          </div>
        }
      />
      <GameFeatures
        features={features}
        title="Conceptos funcionales en cada jugada"
        subtitle="Cada mecánica del juego está diseñada para reforzar principios fundamentales de programación funcional"
      />
      <FunctionalConcepts
        title="Programación funcional en acción"
        subtitle="Cada concepto se traduce directamente en mecánicas de juego intuitivas"
      />
      <CtaSection
        title="¿Listo para dominar la programación funcional?"
        subtitle="Únete a miles de desarrolladores que están aprendiendo FP de la manera más divertida posible"
      />
    </div>
  );
}
