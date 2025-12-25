import { useState } from "react";
import type { Route } from "./+types/gamemode.route";
import {Navbar} from "~/ui/NavBar.ui";
import { Link } from "react-router";
import { Footer } from "~/ui/Footer.ui";
import { Card } from "~/components/ui/card";
import { BrainCircuit, Share2, UserPlus } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Game Mode" },
    { name: "description", content: "Game Mode" },
  ];
}

const gameModes = [
  {
    id: "vs-computer",
    title: "Solo",
    description: "Desafía la inteligencia artificial y demuestra tu dominio de la programación funcional",
    icon: BrainCircuit,
    href: "/play/vs-computer",
  },
  {
    id: "invite",
    title: "Invitar jugador",
    description: "Reta a un amigo a jugar mediante un enlace de invitación",
    icon: Share2,
    href: "/play/invite",
  },
  {
    id: "join",
    title: "Unirse a partida",
    description: "Accede a una partida existente usando un código de invitación compartido",
    icon: UserPlus,
    href: "/play/join",
  },
]

export default function GameMode() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Elige tu modo de juego</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Selecciona cómo deseas jugar y comienza tu aventura en FuncCards
            </p>
          </div>

          {/* Game Mode Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {gameModes.map((mode) => {
              const IconComponent = mode.icon

              return (
                <Link key={mode.id} to={mode.href} className="group cursor-pointer">
                  <Card
                    className={`p-8 h-full border-2 transition-all duration-300 border-white/10 bg-white/5 hover:border-[#FFD428] hover:bg-white/10`}
                  >
                    <div className="flex flex-col h-full justify-center items-center">
                      {/* Icon */}
                      <div
                        className="mb-6 p-4 rounded-full w-fit transition-all duration-300 bg-gradient-to-br from-[#FAD126] to-[#FF564E]"
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3
                        className="text-2xl font-bold mb-3 text-balance text-white"
                      >
                        {mode.title}
                      </h3>
                      <p className="text-sm mb-6 flex-1 text-white/60">
                        {mode.description}
                      </p>

                      {/* Arrow indicator */}
                      <div
                        className="text-sm font-semibold flex items-center gap-2 transition-all duration-300 text-[#FFD428] group-hover:translate-x-2"
                      >
                        Comenzar
                        <span>→</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
    </>
  )
}