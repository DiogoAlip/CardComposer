import { useState, use } from "react";
import DeckEditor from "~/deck/components/DeckEditor";
import { GameSettingsContext } from "~/match/context/GameSettings.context";
import { X, Settings } from "lucide-react";

export default function PlayVsComputerRoute() {
  const [isOpen, setIsOpen] = useState(true);
  const { tutorialMode, setTutorialMode } = use(GameSettingsContext);

  return (
    <>
      <DeckEditor />
      {isOpen && (
        <div className="flex flex-row gap-4 fixed bottom-6 right-6 z-50 items-center bg-zinc-900/90 border border-zinc-800 text-zinc-100 py-3 pl-5 pr-4 rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setTutorialMode(!tutorialMode);
            }}
            className={`text-sm font-semibold select-none transition-all duration-300 px-3 py-1.5 rounded-lg border ${
              tutorialMode
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                : "text-rose-400 bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20 hover:text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
            }`}
          >
            {tutorialMode
              ? "Modo Tutorial Activado"
              : "Modo Tutorial Desactivado"}
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white transition-colors p-0.5 rounded-full hover:bg-zinc-800 cursor-pointer animate-pulse"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Cerrar"
          className="fixed bottom-6 right-6 z-50 items-center bg-zinc-900 border border-zinc-800 hover:text-zinc-100 text-zinc-400  p-4 hover:bg-zinc-800 cursor-pointer px-4 rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="transition-colors rounded-full cursor-pointer">
            <Settings size={24} />
          </div>
        </button>
      )}
    </>
  );
}
