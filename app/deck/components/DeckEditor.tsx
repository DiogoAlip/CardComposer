import { useCallback, useEffect, useRef, useState, memo, use } from "react";
import { Menu } from "lucide-react";
import DeckLayout from "./DeckLayout";
import { useCardsStore } from "~/deck/store/cards.store";
import { DeckCode } from "@/code-composer/components/DeckCode";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { MatchDialog } from "~/match/components/MatchDialog";
import { GameSettingsContext } from "~/match/context/GameSettings.context";

export default memo(function DeckEditor() {
  const CardsFromPlayer1 = useCardsStore((state) => state.CardsFromPlayer1);
  const CardsFromPlayer2 = useCardsStore((state) => state.CardsFromPlayer2);
  const shuffleCards = useCardsStore((state) => state.ShuffleCards);
  const [width, setWidth] = useState(375);
  const [barIcon, setBarIcon] = useState(false);
  const isResizing = useRef(false);
  const { dialogOpen, setDialogOpen, gameRounds, resetGame } =
    use(GameRoundContext);
  
  const { tutorialMode, tutorialStage, setTutorialMode, setTutorialStage } =
    use(GameSettingsContext);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth > 350 && newWidth < 800) {
        setWidth(newWidth);
      }
    }
  }, []);

  const closeBar = useCallback(() => {
    setBarIcon((prev) => !prev);
  }, []);

  const onFinish = useCallback(() => {
    shuffleCards();
    setBarIcon(false);
    setDialogOpen(false);
    if (gameRounds.length >= 4) resetGame();
  }, [gameRounds]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    if (dialogOpen) {
      setBarIcon(true);
    }
  }, [dialogOpen]);

  return (
    <>
      <div className="flex h-screen relative">
        {barIcon && (
          <Menu
            onClick={closeBar}
            className="w-6 h-6 text-primary absolute top-4 left-4 z-20 cursor-pointer"
          />
        )}

        {dialogOpen && (
          <MatchDialog
            onFinish={onFinish}
            CardsFromPlayer1={CardsFromPlayer1}
            CardsFromPlayer2={CardsFromPlayer2}
          />
        )}

        <div
          style={{ width: `${width}px` }}
          className={`overflow-auto custom-scrollbar absolute lg:relative border-r border-border bg-black/85 p-4 h-full z-10 ${barIcon ? "hidden" : ""}`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 border-b border-border">
              <Menu onClick={closeBar} className="w-6 h-6 text-primary cursor-pointer" />
              <h3 className="text-primary font-bold mb-4">Deck Editor</h3>
            </div>
            <DeckCode
              CardsFromPlayer1={CardsFromPlayer1}
              CardsFromPlayer2={CardsFromPlayer2}
            />
          </div>
        </div>
        {!barIcon && (
          <div
            onMouseDown={startResizing}
            className="top-0 hidden lg:block right-0 w-1 h-full cursor-col-resize hover:bg-primary transition-colors z-10"
          />
        )}
        <div className={`flex-1 ${dialogOpen ? "z-10" : ""}`}>
          <DeckLayout
            CardsFromPlayer1={CardsFromPlayer1}
            CardsFromPlayer2={CardsFromPlayer2}
            showNames={barIcon}
          />
        </div>
      </div>

      {/* Stage 0 - Welcome Tutorial Stage */}
      {tutorialMode && tutorialStage === 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center pointer-events-auto">
          <div className="w-full max-w-md bg-zinc-900/95 border border-zinc-800 p-6 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200 text-zinc-100">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Introducción
              </span>
              <span className="text-xs text-zinc-500 font-medium">Tutorial de CardComposer</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-zinc-100 mb-1">
                ¡Bienvenido a CardComposer!
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Un juego de lógica y programación funcional. Tu objetivo es componer secuencias de funciones que manipulen tus cartas para obtener el mayor puntaje frente a tu oponente.
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => setTutorialMode(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-800 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-300"
              >
                Omitir
              </button>
              <button
                onClick={() => setTutorialStage(1)}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors cursor-pointer shadow-md shadow-emerald-900/35"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
