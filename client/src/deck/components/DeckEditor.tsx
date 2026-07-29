import { useCallback, useEffect, useRef, useState, memo, use } from "react";
import { PanelLeftOpen } from "lucide-react";
import DeckLayout from "./DeckLayout";
import { useCardsStore } from "~/deck/store/cards.store";
import { DeckCode } from "@/code-composer/components/DeckCode";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { MatchDialog } from "~/match/components/MatchDialog";
import { TutorialPopup } from "~/shared/components/TutorialPopup";

export default memo(function DeckEditor() {
  const CardsFromPlayer1 = useCardsStore((state) => state.CardsFromPlayer1);
  const CardsFromPlayer2 = useCardsStore((state) => state.CardsFromPlayer2);
  const shuffleCards = useCardsStore((state) => state.ShuffleCards);
  const [width, setWidth] = useState(375);
  const [barIcon, setBarIcon] = useState(false);
  const isResizing = useRef(false);
  const { dialogOpen, setDialogOpen, gameRounds, resetGame } =
    use(GameRoundContext);

  // const startResizing = useCallback((e: React.MouseEvent) => {
  //   e.preventDefault();
  //   isResizing.current = true;
  // }, []);

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
          <PanelLeftOpen
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
          className={`overflow-auto absolute lg:relative border-r border-border bg-black/85 p-4 h-full z-10 ${barIcon ? "hidden" : ""}`}
          // custom-scrollbar
        >
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 border-b border-border">
              <PanelLeftOpen
                onClick={closeBar}
                className="w-6 h-6 text-primary cursor-pointer"
              />
              <h3 className="text-primary font-bold mb-4">Deck Editor</h3>
            </div>
            <DeckCode
              CardsFromPlayer1={CardsFromPlayer1}
              CardsFromPlayer2={CardsFromPlayer2}
            />
          </div>
        </div>
        <div className={`flex-1 ${dialogOpen ? "z-10" : ""}`}>
          <DeckLayout
            CardsFromPlayer1={CardsFromPlayer1}
            CardsFromPlayer2={CardsFromPlayer2}
            showNames={barIcon}
          />
        </div>
      </div>

      {/* Stage 0 - Welcome Tutorial Stage */}
      <TutorialPopup stage={0} />
    </>
  );
});
