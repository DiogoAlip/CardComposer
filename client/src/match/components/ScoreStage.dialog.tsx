import type { RoundInterface } from "~/match/context/GameRound.context";

interface ScoreStageProps {
  gameRounds: RoundInterface[];
  P1Name: string;
  P2Name: string;
  P1TotalScore: number;
  P2TotalScore: number;
  GameWinner: string;
}

export function ScoreStage({
  gameRounds,
  P1Name,
  P2Name,
  P1TotalScore,
  P2TotalScore,
  GameWinner,
}: ScoreStageProps) {
  return (
    <>
      {gameRounds.map(
        (round) =>
          round.isMatched && (
            <div
              key={`${round.round}${round.winner}`}
              className="w-full justify-center flex flex-col"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="w-fit px-4">
                  <h1 className="text-bold text-lg">Round {round.round}</h1>
                  {round.winner === null ? (
                    <h1 className="text-bold text-lg">
                      {round.winner === "Empate"
                        ? "Empate"
                        : `Winner: ${round.winner}`}
                    </h1>
                  ) : (
                    <h1 className="text-bold text-lg">
                      {round.winner != "None"
                        ? `Winner: ${round.winner}`
                        : "Empate"}
                    </h1>
                  )}
                </div>
                <div className="flex flex-row gap-8 py-1 w-fit justify-around px-4">
                  <div className="flex flex-col justify-center items-center max-w-[100px]">
                    <h1 className="text-bold text-accent text-xl">{P1Name}</h1>
                    <h1 className="text-bold text-accent text-xl">
                      {round.scorePerRound.player1}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center items-center max-w-[100px]">
                    <h1 className="text-bold text-primary text-xl">{P2Name}</h1>
                    <h1 className="text-bold text-primary text-xl">
                      {round.scorePerRound.player2}
                    </h1>
                  </div>
                </div>
              </div>
              <hr className="w-full my-4" />
            </div>
          ),
      )}
      {gameRounds.length === 4 && (
        <div className="px-4 w-full flex flex-row items-center justify-between animate-pulse">
          <div className="flex flex-col justify-center items-center max-w-[100px]">
            <h1 className="text-bold text-accent text-xl">{P1Name}</h1>
            <h1 className="text-bold text-accent text-xl">{P1TotalScore}</h1>
          </div>
          <div className="w-fit px-4">
            {GameWinner === "Empate" ? (
              <h1 className="text-bold text-lg">Empate</h1>
            ) : (
              <h1 className="text-bold text-lg">
                {GameWinner === P1Name ? (
                  <span className="text-accent">{P1Name} </span>
                ) : (
                  <span className="text-primary">{P2Name} </span>
                )}
                is the Winner
              </h1>
            )}
          </div>
          <div className="flex flex-col justify-center items-center max-w-[100px]">
            <h1 className="text-bold text-primary text-xl">{P2Name}</h1>
            <h1 className="text-bold text-primary text-xl">{P2TotalScore}</h1>
          </div>
        </div>
      )}
    </>
  );
}
