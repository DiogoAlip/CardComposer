import type { Route } from "./+types/home";
import { Navbar } from "../ui/NavBar.ui"
import { HeroSection } from "../ui/HeroSection"
import { GameFeatures } from "../ui/GameFeatures"
import { FunctionalConcepts } from "../ui/FunctionalConcepts"
import { CtaSection } from "../ui/CTASection"
import { Footer } from "../ui/Footer"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  <div className="min-h-screen">
  <Navbar />
      <HeroSection />
      <GameFeatures />
      <FunctionalConcepts />
      <CtaSection />
      <Footer />
  </div>
  );
}
