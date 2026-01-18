import { useState } from "react";
import type { Route } from "./+types/gamemode.route";
import {Navbar} from "~/ui/NavBar.ui";
import { Link, useNavigate } from "react-router";
import { Bot, Mail, DoorOpen, Clipboard, ArrowRight } from "lucide-react";
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
  const navigate = useNavigate();

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
      children: (
        <div className="flex flex-row gap-2">
          <Button
            className="w-28 bg-transparent text-white border-primary bg-black/50 hover:bg-black/30"
            onClick={() => navigate("/play/vs-computer/competitive")}
          >
            Competitivo
          </Button>
          <Button
            className="w-28 bg-transparent text-white border-primary bg-black/50 hover:bg-black/30"
            onClick={() => navigate("/play/vs-computer/easy")}
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
      children: (
        <div className="flex flex-col gap-2">
          <p className="text-white text-center">Código de invitación</p>
            <div className="flex flex-row text-center py-2 px-10 bg-black/50 rounded-lg">
              <p className="text-white">21K2-1A3J</p>
              <button className="relative hover:text-white/70" onClick={() => navigator.clipboard.writeText("21K2-1A3J")}>
                <span><Clipboard className="absolute bottom-1 top-1 left-4 h-4 w-4"/></span>
              </button>
            </div>
            <Link
              to="/play/invite"
              className="text-center flex flex-row items-center justify-center gap-2 rounded-lg py-2 px-4 bg-black/50 hover:bg-black/30"
            >
              <p className="text-white text-[16px] text-font-bold">Entrar a la Sala</p>
              <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      )
    },
    {
      id: "join",
      title: "Unirse a partida",
      description: "Accede a una partida existente usando un código de invitación compartido",
      icon: DoorOpen,
      children: (
        <Input
          placeholder="Código de invitación"
          className="bg-black/80 text-white border-primary text-center focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //function -> RoomComprober
              navigate("/play/join");
            }
          }}
        />
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