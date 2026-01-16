import { Children, useEffect, useState } from "react";
import type { Route } from "./+types/gamemode.route";
import {Navbar} from "~/ui/NavBar.ui";
import { Link } from "react-router";
import { Bot, Mail, DoorOpen, X, Clipboard } from "lucide-react";
import { CardGameMode } from "~/ui/CardGameMode.ui";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Game Mode" },
    { name: "description", content: "Game Mode" },
  ];
}

export default function GameMode() {
  const [gameModeSelected, setGameModeSelected] = useState<string>("");
  const handleGameMode = (gameModeId: string) => {
    return () => {
      setGameModeSelected(gameModeId);
    }
  }
  
  const cancelGameMode = () => {
    setGameModeSelected("");
  }
  
  const gameModes = [
    {
      id: "vs-computer",
      title: "Solo",
      description: "Desafía al Bot y demuestra tu dominio de la programación funcional",
      icon: Bot,
      href: "/play/vs-computer",
      children: (
        <div className="flex flex-col gap-2">
          <Button
            className="bg-transparent text-white border-primary bg-black/50 hover:bg-black/30"
            onClick={cancelGameMode}
          >
            Avanzado
          </Button>
          <Button
            className="bg-transparent text-white border-primary bg-black/50 hover:bg-black/30"
            onClick={cancelGameMode}
          >
            Normal
          </Button>
          <Button
            className="bg-transparent text-white border-primary bg-black/50 hover:bg-black/30"
            onClick={cancelGameMode}
          >
            Facil
          </Button>
        </div>
      )
    },
    {
      id: "invite",
      title: "Invitar jugador",
      description: "Reta a un amigo a jugar mediante un enlace de invitación",
      icon: Mail,
      href: "/play/invite",
      children: (
        <>
          <p className="text-white/70">Código de invitación</p>
          <div className="flex flex-row text-center py-2 px-8 bg-black/50 rounded-lg">
            <p className="text-white">21K2-1A3J</p>
            <button className="relative hover:text-white/70">
              <span><Clipboard className="absolute bottom-1 top-1 left-2 h-4 w-4"/></span>
            </button>
          </div>
        </>
      )
    },
    {
      id: "join",
      title: "Unirse a partida",
      description: "Accede a una partida existente usando un código de invitación compartido",
      icon: DoorOpen,
      href: "/play/join",
      children: (
        <Input placeholder="Código de invitación" className="bg-black/80 text-white border-primary text-center focus:border-primary" />
      )
    },
  ]

  return (
  <>
  <Navbar />
  <div className="min-h-screen bg-black flex flex-col">
    <main className="flex-1 pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Elije tu modo de juego</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Selecciona cómo deseas jugar y comienza tu aventura en CardComposer
          </p>
        </div>

          
        <div className={`${gameModeSelected.length ? "flex flex-col justify-center items-center" : "grid md:grid-cols-3 gap-6 mb-12"}`}>
          {gameModes.map((mode) => {
            if (gameModeSelected.length && mode.id !== gameModeSelected) {
              return null;
            }
            return (
              <CardGameMode
                mode={mode}
                gameModeSelected={gameModeSelected}
                handleGameMode={handleGameMode}
                cancelGameMode={cancelGameMode}
                key={mode.id}
                children={mode.children}
              />
          )
            })}
          </div>
        </div>
      </main>
    </div>
    </>
  )
}