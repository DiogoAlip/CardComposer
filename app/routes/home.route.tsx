import type { Route } from "./+types/home.route";
import { Navbar } from "../ui/NavBar.ui"
import { HeroSection } from "../ui/HeroSection.ui"
import { GameFeatures } from "../ui/GameFeatures.ui"
import { FunctionalConcepts } from "../ui/FunctionalConcepts.ui"
import { CtaSection } from "../ui/CTASection.ui"
import { Footer } from "../ui/Footer.ui"
import { Layers, Zap, Brain, Users, Code2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CardComposer" },
    { name: "description", content: "Aprende programación funcional jugando" },
  ];
}

export default function Home() {
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
  return (
  <div className="min-h-screen">
    <HeroSection
      title="Aprende a programar"
      colorTitle="jugando cartas"
      paragraph="Domina los conceptos de programación funcional mientras desarrollas estrategias ganadoras en un juego de cartas único e innovador."
      addButtons={false}
      children={
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
          <Code2 className="h-4 w-4" />
          <span>Programación Funcional + Estrategia</span>
        </div>
      }
    />
    <GameFeatures features={features} title="Conceptos funcionales en cada jugada" subtitle="Cada mecánica del juego está diseñada para reforzar principios fundamentales de programación funcional"/>
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
