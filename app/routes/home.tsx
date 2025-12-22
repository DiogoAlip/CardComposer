import type { Route } from "./+types/home";
import { Navbar } from "../ui/NavBar.ui"
import { HeroSection } from "../ui/HeroSection"
import { GameFeatures } from "../ui/GameFeatures"
import { FunctionalConcepts } from "../ui/FunctionalConcepts"
import { CtaSection } from "../ui/CTASection"
import { Footer } from "../ui/Footer"
import { Layers, Zap, Brain, Users } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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
    <Navbar />
    <HeroSection />
    <GameFeatures features={features} title="Conceptos funcionales en cada jugada" subtitle="Cada mecánica del juego está diseñada para reforzar principios fundamentales de programación funcional"/>
    <FunctionalConcepts
      title="Programación funcional en acción"
      subtitle="Cada concepto se traduce directamente en mecánicas de juego intuitivas"
    />
    <CtaSection
      title="¿Listo para dominar la programación funcional?"
      subtitle="Únete a miles de desarrolladores que están aprendiendo FP de la manera más divertida posible"
    />
    <Footer />
  </div>
  );
}
