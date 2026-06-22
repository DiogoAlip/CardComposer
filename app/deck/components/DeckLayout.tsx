import { memo } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/deck/interfaces/card.interface";
import { use } from "react";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { PlayerNameTag } from "~/player/components/PlayerNameTag.ui";
import { GameSettingsContext } from "~/match/context/GameSettings.context";

interface DeckLayout {
  CardsFromPlayer1: { FrontRow: Card[]; BackRow: Card[] };
  CardsFromPlayer2: { FrontRow: Card[]; BackRow: Card[] };
  showNames: boolean;
}

export default memo(function DeckLayout({
  CardsFromPlayer1,
  CardsFromPlayer2,
  showNames,
}: DeckLayout) {
  const {
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);
  
  const { tutorialMode, tutorialStage, setTutorialMode, setTutorialStage } =
    use(GameSettingsContext);

  return (
    <div className="flex flex-col h-[100vh] w-full relative">
      <div className={`bg-black/95 h-[50%] w-full flex flex-row justify-center items-center relative transition-all duration-300 ${tutorialMode && tutorialStage === 3 ? "ring-4 ring-inset ring-emerald-500 bg-emerald-500/5 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)] z-20" : ""}`}>
        <div
          className={`absolute ${showNames ? "block" : "hidden"} sm:block top-0 sm:top-4 right-auto sm:right-6`}
        >
          <PlayerNameTag name={P2Name} firstPlayer={false} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CardsFromPlayer1.FrontRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
          {CardsFromPlayer1.BackRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
        </div>
      </div>
      <div className={`bg-white/10 h-[50%] w-full flex flex-row justify-center items-center relative transition-all duration-300 ${tutorialMode && tutorialStage === 4 ? "ring-4 ring-inset ring-emerald-500 bg-emerald-500/5 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)] z-20" : ""}`}>
        <div
          className={`absolute ${showNames ? "block" : "hidden"} sm:block top-[calc(50%)] sm:top-[calc(50%+2rem)] right-auto sm:right-6`}
        >
          <PlayerNameTag name={P1Name} firstPlayer={true} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CardsFromPlayer2.FrontRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
          {CardsFromPlayer2.BackRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Tutorial Stage 3 Overlay Box (Opponent's deck) */}
      {tutorialMode && tutorialStage === 3 && (
        <div className="fixed top-24 right-8 w-80 bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl z-50 text-zinc-100 flex flex-col gap-3 backdrop-blur-md pointer-events-auto animate-in slide-in-from-right-5 duration-300">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <span className="text-xs font-bold uppercase text-emerald-400">Paso 4 de 5</span>
            <span className="text-xs text-zinc-500 font-medium">Oponente</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-100 mb-1">3. Cartas del Oponente (Arriba)</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Esta es la baraja del oponente (Bot). Sus cartas también se modificarán por sus funciones programadas. Al final de la ronda, se comparan las cartas correspondientes que queden boca arriba.
            </p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <button
              onClick={() => setTutorialStage(2)}
              className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
            >
              Anterior
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setTutorialMode(false)}
                className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
              >
                Omitir
              </button>
              <button
                onClick={() => setTutorialStage(4)}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Stage 4 Overlay Box (Player's deck) */}
      {tutorialMode && tutorialStage === 4 && (
        <div className="fixed bottom-24 right-8 w-80 bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl z-50 text-zinc-100 flex flex-col gap-3 backdrop-blur-md pointer-events-auto animate-in slide-in-from-right-5 duration-300">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <span className="text-xs font-bold uppercase text-emerald-400">Paso 5 de 5</span>
            <span className="text-xs text-zinc-500 font-medium">Jugador</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-100 mb-1">4. Tu Zona de Juego</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Esta es tu baraja. Tienes 4 cartas en la Fila Frontal y 4 en la Fila Trasera. Las funciones que programes se aplicarán sobre la Fila Frontal filtrada. ¡Diseña tu código para dejar tus cartas más altas boca arriba!
            </p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <button
              onClick={() => setTutorialStage(3)}
              className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
            >
              Anterior
            </button>
            <button
              onClick={() => setTutorialMode(false)}
              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
