import type { Card } from "~/interface/card.interface";
import { use, useEffect, useState } from "react";
import { evaluateMatchup } from "~/helpers/getMatch";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { MatchDeckLayout } from "../../ui/MatchDeck.ui";
import { GameRoundContext } from "~/context/GameRound.context";

interface MatchDialogProps {
    CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]}
    CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]}
    onFinish: () => void;
}

interface ScoreType {
    matchWinner: "P1" | "P2" | "None";
    points: number;
}

const stages = ["cards", "score", "code"];

export const MatchDialog = ({CardsFromPlayer1, CardsFromPlayer2, onFinish}: MatchDialogProps) => {
    const [isClient, setIsClient] = useState(false);
    const [score, setScore] = useState(Array(4).fill(null) as ScoreType[])
    const [stage, setStage] = useState(stages[0])
    const {nextGameRounds, gameRounds, addScore, player1, player2} = use(GameRoundContext);
    const matchs = evaluateMatchup({P1Cards: CardsFromPlayer1, P2Cards: CardsFromPlayer2})
    const P1matchs = matchs.filter((match) => match.matchWinner === "P1").reduce((acc, match) => acc + match.score, 0)
    const P2matchs = matchs.filter((match) => match.matchWinner === "P2").reduce((acc, match) => acc + match.score, 0)
    const winner = P1matchs > P2matchs ? player1.name : P2matchs > P1matchs ? player2.name : "Empate"

    const changeStage = (number: 1 | -1) => {
        const stageIndex = stages.indexOf(stage)
        setStage( stages[Math.abs(stageIndex + number % 3)] )
    }

    useEffect(() => {
        setIsClient(true)
    },[])
    
    useEffect(()=>{

        const time = setInterval(
            () => {
                if(score.every((score) => score !== null)) return;
                const nullValueIndex = score.findIndex((score) => score === null)
                if(nullValueIndex === -1) return;
                
                setScore(score.map(
                    (score, index) => index === nullValueIndex ? {
                        matchWinner: matchs[nullValueIndex].matchWinner,
                        points: matchs[nullValueIndex].score
                    } : score
                ))
            },
            1000*0.8
        )
        return () => {
            clearInterval(time)
        }
    },[score, stage])
    
    if (!isClient) return null;
    return (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-60">
            <div className="min-w-[600px] min-h-[400px] fixed bg-background border border-border rounded-lg px-8 py-4">
                <h1 className="text-primary font-bold mb-4 text-center">Match Dialog</h1>
                <hr />
                <div className="flex flex-col gap-4 py-4 w-full items-center">
                    <div className="absolute flex gap-2 right-8">
                        <SquareChevronLeft onClick={() => changeStage(-1)} className="hover:text-primary text-primary/70 w-[30px] h-[30px]"/>
                        {stage === "code"?
                            <Button
                                onClick={onFinish}
                                className="bg-background hover:bg-background hover:border-primary border-primary/70 hover:text-primary text-primary/70 h-[30px]"
                            >
                                Finish Review
                            </Button>:
                            <SquareChevronRight onClick={() => changeStage(1)} className="hover:text-primary text-primary/70 w-[30px] h-[30px]"/>
                        }
                    </div>
                    {
                        stage === stages[0] &&
                        <MatchDeckLayout
                            CardsFromPlayer1={CardsFromPlayer1}
                            CardsFromPlayer2={CardsFromPlayer2}
                            score={score}
                        />
                    }
                    {
                        stage === stages[1] &&
                        gameRounds.map((round) => (
                            <div key={`${round.round}${round.winner}`} className="py-2 w-full justify-center flex flex-row">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-bold text-lg">Round {round.round}</h1>
                                    {round.winner === null ?
                                    <h1 className="text-bold text-lg">{winner === "Empate" ? "Empate" : `Winner: ${winner}`}</h1> :
                                    <h1 className="text-bold text-lg">{round.winner != "None" ? `Winner: ${round.winner}` : "Empate"}</h1>
                                    }
                                    <hr className="w-full my-4"/>
                                    <div className="flex gap-10 py-1 w-full justify-around">
                                        <div className="flex flex-col justify-center items-center max-w-[100px]">
                                            <h1 className="text-bold text-accent text-2xl">{player2.name}</h1>
                                            <h1 className="text-bold text-accent text-2xl">{round.scorePerRound.player2 ? round.scorePerRound.player2 : P2matchs}</h1>
                                        </div>
                                        <div className="flex flex-col justify-center items-center max-w-[100px]">
                                            <h1 className="text-bold text-primary text-2xl">{player1.name}</h1>
                                            <h1 className="text-bold text-primary text-2xl">{round.scorePerRound.player1 ? round.scorePerRound.player1 : P1matchs}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        stage === stages[2] &&
                        <div className="flex flex-col gap-4 py-4 w-full items-center">
                            {/* TODO: Add match code per player */}
                        </div>

                    }
                </div>
            </div>
        </div>
    );
}