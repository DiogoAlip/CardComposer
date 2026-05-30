import { ComposeCode } from "~/code-composer/components/ComposeCode.ui";
import type { RoundInterface } from "~/match/context/GameRound.context";

interface CodeStageProps {
  P1Name: string;
  P2Name: string;
  gameRounds: RoundInterface[];
}

export function CodeStage({ P1Name, P2Name, gameRounds }: CodeStageProps) {
  const lastRound = gameRounds[gameRounds.length - 2];

  return (
    <div className="flex flex-col gap-4 py-4 w-full items-center">
      <h1 className="text-center w-full text-bold text-accent text-xl">
        {P1Name}
      </h1>
      <div className="w-[300px] flex flex-col gap-2">
        <ComposeCode
          mapFunctions={lastRound?.codePerRound.player1.mapFunctions}
          filterFunction={lastRound?.codePerRound.player1.filterFunction}
        />
      </div>
      <hr className="w-full my-4" />
      <h1 className="text-center w-full text-bold text-primary text-xl">
        {P2Name}
      </h1>
      <div className="w-[300px] flex flex-col gap-2">
        <ComposeCode
          mapFunctions={lastRound?.codePerRound.player2.mapFunctions}
          filterFunction={lastRound?.codePerRound.player2.filterFunction}
        />
      </div>
    </div>
  );
}
