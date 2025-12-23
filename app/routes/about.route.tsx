import type { Route } from "./+types/about.route";
import { Navbar } from "~/ui/NavBar.ui";
import { Footer } from "~/ui/Footer.ui";
import { HeroSection } from "~/ui/HeroSection.ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CardComposer Creators" },
    { name: "description", content: "About the creators of CardComposer" },
  ];
}

const creators = [
  {
    name: "Maria Hwang",
    role: "Education Contenc Creator",
    description:
      "Doctorate of education (Ed.D.) at Teachers College, Columbia University in Instructional Technology and Media under the supervision of Charles Kinzer, focusing on persuasive messages for behavior change in a digital game environment.",
    image: "/professional-woman-developer-portrait.jpg",
  },
  {
    name: "Mark Santolucito",
    role: "Game Logic Designer",
    description:
      "Assistant Professor of Computer Science at Barnard College, Columbia University. PhD in Computer Science working on Program Synthesis and Computer Music at Yale.",
    image: "https://www.marksantolucito.com/me.jpg",
  },
  {
    name: "Diogo Alipazaga",
    role: "Software Developer",
    description:
      "Software Developer with expertise in React, Next.js, and TypeScript. Passionate about creating user-friendly and engaging interfaces.",
    image: "/professional-woman-designer.png",
  },
  {
    name: "Brian Pando",
    role: "Software Engineer",
    description:
      "",
    image: "/professional-man-educator-portrait.jpg",
  },
]

export default function Home() {
  return (
  <div className="min-h-screen ">
    <Navbar />
    <div className="container mx-auto px-4 py-16">
      <HeroSection
        title="Sobre los Creadores"
        paragraph="Conoce al equipo apasionado que está transformando la educación en programación funcional a través del juego"
      />
      <div className="space-y-12">
      {creators.map((creator, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6 rounded-lg bg-white/5 border border-[#4E586E]/30 hover:border-[#FFD428]/50 transition-all"
        >
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#FFD428]/30">
              <img src={creator.image || "/placeholder.svg"} alt={creator.name} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">{creator.name}</h2>
            <p className="text-[#FFD428] font-medium mb-3">{creator.role}</p>
            <p className="text-white/70 leading-relaxed">{creator.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
    <Footer />
  </div>
);
}
