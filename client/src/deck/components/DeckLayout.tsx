import { memo, useEffect } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/deck/interfaces/card.interface";
import { use } from "react";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { PlayerNameTag } from "~/player/components/PlayerNameTag.ui";
import { GameSettingsContext } from "~/match/context/GameSettings.context";
import { TutorialPopup } from "~/shared/components/TutorialPopup";

interface DeckLayoutProps {
  CardsFromPlayer1: { FrontRow: Card[]; BackRow: Card[] };
  CardsFromPlayer2: { FrontRow: Card[]; BackRow: Card[] };
  showNames: boolean;
}

export default memo(function DeckLayout({
  CardsFromPlayer1,
  CardsFromPlayer2,
  showNames,
}: DeckLayoutProps) {
  const {
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);

  const { tutorialMode, tutorialStage } = use(GameSettingsContext);

  useEffect(() => {}, [tutorialMode, tutorialStage]);

  return (
    <div className="flex flex-col h-screen w-full relative">
      <div
        className={`bg-black/95 h-[50%] w-full flex flex-row justify-center items-center relative transition-all duration-300 ${tutorialMode && tutorialStage === 3 ? "ring-4 ring-inset ring-emerald-500 bg-emerald-500/5 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)] z-20" : ""}`}
      >
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
      <div
        className={`bg-white/10 h-[50%] w-full flex flex-row justify-center items-center relative transition-all duration-300 ${tutorialMode && tutorialStage === 4 ? "ring-4 ring-inset ring-emerald-500 bg-emerald-500/5 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)] z-20" : ""}`}
      >
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
      <TutorialPopup stage={3} />

      {/* Tutorial Stage 4 Overlay Box (Player's deck) */}
      <TutorialPopup stage={4} />
    </div>
  );
});
