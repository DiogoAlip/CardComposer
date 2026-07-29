import type { Card } from "~/deck/interfaces/card.interface";
import { use, useEffect, useState } from "react";
import { evaluateMatchup } from "~/match/helpers/getMatch";
import { MatchDeckLayout } from "@/match/components/MatchDeck.ui";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { StageNavigator } from "@/shared/components/StageNavigator.dialog";
import { ScoreStage } from "./ScoreStage.dialog";
import { CodeStage } from "@/code-composer/components/CodeStage.dialog";

interface MatchDialogProps {
  CardsFromPlayer1: { FrontRow: Card[]; BackRow: Card[] };
  CardsFromPlayer2: { FrontRow: Card[]; BackRow: Card[] };
  onFinish: () => void;
}

interface ScoreType {
  matchWinner: "P1" | "P2" | "None";
  points: number;
}

const stages = ["cards", "score", "code"];

export const MatchDialog = ({
  CardsFromPlayer1,
  CardsFromPlayer2,
  onFinish,
}: MatchDialogProps) => {
  const [score, setScore] = useState(Array(4).fill(null) as ScoreType[]);
  const [stage, setStage] = useState(stages[0]);
  const {
    gameRounds,
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);
  const matchs = evaluateMatchup({
    P1Cards: CardsFromPlayer1,
    P2Cards: CardsFromPlayer2,
  });
  const P1TotalScore = gameRounds.reduce(
    (acc, round) => acc + round.scorePerRound.player1,
    0,
  );
  const P2TotalScore = gameRounds.reduce(
    (acc, round) => acc + round.scorePerRound.player2,
    0,
  );
  const GameWinner =
    P1TotalScore === P2TotalScore
      ? "Empate"
      : P1TotalScore > P2TotalScore
        ? P1Name
        : P2Name;

  const changeStage = (number: 1 | -1) => {
    const stageIndex = stages.indexOf(stage);
    const nextIndex = (stageIndex + number + stages.length) % stages.length;
    setStage(stages[nextIndex]);
  };

  useEffect(() => {
    const time = setInterval(() => {
      if (score.every((score) => score !== null)) return;
      const nullValueIndex = score.findIndex((score) => score === null);
      if (nullValueIndex === -1) return;

      setScore(
        score.map((score, index) =>
          index === nullValueIndex
            ? {
                matchWinner: matchs[nullValueIndex].matchWinner,
                points: matchs[nullValueIndex].score,
              }
            : score,
        ),
      );
    }, 1000 * 0.8);
    return () => {
      clearInterval(time);
    };
  }, [score, stage]);

  return (
    <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-60">
      <div className="min-w-150 min-h-100 fixed bg-background border border-border rounded-lg px-8 py-4">
        <h1 className="text-primary font-bold mb-4 text-center">
          Match Dialog
        </h1>
        <hr />
        <div className="flex flex-col gap-4 py-4 w-full items-center">
          <StageNavigator
            onPrev={() => changeStage(-1)}
            onNext={() => changeStage(1)}
            onFinish={onFinish}
            isLastStage={stage === "code"}
          />

          {stage === "cards" && (
            <MatchDeckLayout
              CardsFromPlayer1={CardsFromPlayer1}
              CardsFromPlayer2={CardsFromPlayer2}
              score={score}
            />
          )}

          {stage === "score" && (
            <ScoreStage
              gameRounds={gameRounds}
              P1Name={P1Name}
              P2Name={P2Name}
              P1TotalScore={P1TotalScore}
              P2TotalScore={P2TotalScore}
              GameWinner={GameWinner}
            />
          )}

          {stage === "code" && (
            <CodeStage
              P1Name={P1Name}
              P2Name={P2Name}
              gameRounds={gameRounds}
            />
          )}
        </div>
      </div>
    </div>
  );
};
