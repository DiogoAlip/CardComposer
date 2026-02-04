import type { Card } from "~/interface/card.interface";
import { use, useEffect, useState } from "react";
import { evaluateMatchup } from "~/helpers/getMatch";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { MatchDeckLayout } from "../../ui/MatchDeck.ui";
import { GameRoundContext } from "~/context/GameRound.context";
import { ComposeCode } from "~/ui/ComposeCode.ui";

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
    const {gameRounds, playersName:{P1Name, P2Name}} = use(GameRoundContext);
    const matchs = evaluateMatchup({P1Cards: CardsFromPlayer1, P2Cards: CardsFromPlayer2})
    const P1TotalScore = gameRounds.reduce((acc, round) => acc + round.scorePerRound.player1, 0)
    const P2TotalScore = gameRounds.reduce((acc, round) => acc + round.scorePerRound.player2, 0)
    const GameWinner = P1TotalScore === P2TotalScore ? "Empate" : (P1TotalScore > P2TotalScore ? P1Name : P2Name)

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
                        <>
                        {gameRounds.map((round) => round.isMatched && (
                            <div key={`${round.round}${round.winner}`} className="w-full justify-center flex flex-col">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="w-fit px-4">
                                        <h1 className="text-bold text-lg">Round {round.round}</h1>
                                        {round.winner === null ?
                                            <h1 className="text-bold text-lg">{round.winner === "Empate" ? "Empate" : `Winner: ${round.winner}`}</h1> :
                                            <h1 className="text-bold text-lg">{round.winner != "None" ? `Winner: ${round.winner}` : "Empate"}</h1>
                                        }
                                    </div>
                                    <div className="flex flex-row gap-8 py-1 w-fit justify-around px-4">
                                        <div className="flex flex-col justify-center items-center max-w-[100px]">
                                            <h1 className="text-bold text-accent text-xl">{P1Name}</h1>
                                            <h1 className="text-bold text-accent text-xl">{round.scorePerRound.player1}</h1>
                                        </div>
                                        <div className="flex flex-col justify-center items-center max-w-[100px]">
                                            <h1 className="text-bold text-primary text-xl">{P2Name}</h1>
                                            <h1 className="text-bold text-primary text-xl">{round.scorePerRound.player2}</h1>
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full my-4"/>
                            </div>
                        ))}
                        {gameRounds.length === 4 && ((
                            <div className="px-4 w-full flex flex-row items-center justify-between animate-pulse">
                                <div className="flex flex-col justify-center items-center max-w-[100px]">
                                    <h1 className="text-bold text-accent text-xl">{P1Name}</h1>
                                    <h1 className="text-bold text-accent text-xl">{P1TotalScore}</h1>
                                </div>
                                <div className="w-fit px-4">
                                    {
                                        GameWinner === "Empate" ?
                                        <h1 className="text-bold text-lg">Empate</h1> :
                                        <h1 className="text-bold text-lg">
                                            {   
                                                GameWinner === P1Name ?
                                                <span className="text-accent">{P1Name} </span> :
                                                <span className="text-primary">{P2Name} </span>
                                            }
                                            is the Winner
                                        </h1>
                                    }
                                </div>
                                <div className="flex flex-col justify-center items-center max-w-[100px]">
                                    <h1 className="text-bold text-primary text-xl">{P2Name}</h1>
                                    <h1 className="text-bold text-primary text-xl">{P2TotalScore}</h1>
                                </div>
                            </div>
                        ))}
                        </>
                    }
                    {
                        stage === stages[2] &&
                        <div className="flex flex-col gap-4 py-4 w-full items-center">
                            <h1 className="text-center w-full text-bold text-accent text-xl">{P1Name}</h1>
                            <div className="w-[300px] flex flex-col gap-2">
                                <ComposeCode
                                    mapFunctions={gameRounds[gameRounds.length-2]?.codePerRound.player1.mapFunctions}
                                    filterFunction={gameRounds[gameRounds.length-2]?.codePerRound.player1.filterFunction}
                                />
                            </div>
                            <hr className="w-full my-4"/>
                            <h1 className="text-center w-full text-bold text-primary text-xl">{P2Name}</h1>
                            <div className="w-[300px] flex flex-col gap-2">
                                <ComposeCode
                                    mapFunctions={gameRounds[gameRounds.length-2]?.codePerRound.player2.mapFunctions}
                                    filterFunction={gameRounds[gameRounds.length-2]?.codePerRound.player2.filterFunction}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}