import { memo, useEffect } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/deck/interfaces/card.interface";
import { use } from "react";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { PlayerNameTag } from "~/deck/components/PlayerNameTag.ui";
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
    gameRounds,
  } = use(GameRoundContext);

  const { tutorialMode, tutorialStage } = use(GameSettingsContext);

  const countPoints = gameRounds.reduce(
    (acc, { scorePerRound }) => {
      const actualP1Points = scorePerRound.player1 || 0;
      const actualP2Points = scorePerRound.player2 || 0;
      return {
        P1Points: acc.P1Points + actualP1Points,
        P2Points: acc.P2Points + actualP2Points,
      };
    },
    { P1Points: 0, P2Points: 0 },
  );

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
          <p className="text-center sm:text-right">
            Puntos: {countPoints.P2Points}
          </p>
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
        className={`absolute ${showNames ? "block" : "hidden"} sm:block top-[calc(50%-1rem)] left-[calc(50%-44px)]`}
      >
        <div className="px-4 py-2 bg-primary rounded-full text-black text-lg">
          Round: {gameRounds.length}
        </div>
      </div>
      <div
        className={`bg-white/10 h-[50%] w-full flex flex-row justify-center items-center relative transition-all duration-300 ${tutorialMode && tutorialStage === 4 ? "ring-4 ring-inset ring-emerald-500 bg-emerald-500/5 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)] z-20" : ""}`}
      >
        <div
          className={`absolute ${showNames ? "block" : "hidden"} sm:block top-[calc(5%)] right-auto sm:right-6`}
        >
          <PlayerNameTag name={P1Name} firstPlayer={true} />
          <p className="text-center sm:text-right">
            Puntos: {countPoints.P1Points}
          </p>
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
