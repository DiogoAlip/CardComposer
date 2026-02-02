import type { Card } from "~/interface/card.interface";
import DeckCard from "~/components/custom/DeckCard";
import { useEffect, useState } from "react";
import { evaluateMatchup } from "~/helpers/getMatch";

interface MatchDialogProps {
    CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]}
    CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]}
    onFinish: () => void;
}
const MatchCommonClass = "bg-background w-[50px] h-[50px] border-[3px] border-border rounded-lg p-auto flex items-center justify-center font-bold text-lg text-white animation tw-animate-pulse transition-colors transition-transform duration-300 ease-in-out"
const P1WonMatchClass = MatchCommonClass.replace("bg-background", "bg-accent transform-[translateY(-8px)]")
const P2WonMatchClass = MatchCommonClass.replace("bg-background", "bg-primary transform-[translateY(8px)]")

const cardSize = {width: 50, height: 80};

interface ScoreType {
    matchWinner: "P1" | "P2" | "None";
    points: number;
}

export const MatchDialog = ({CardsFromPlayer1, CardsFromPlayer2, onFinish}: MatchDialogProps) => {
    const [isClient, setIsClient] = useState(false);
    const [score, setScore] = useState(Array(4).fill(null) as ScoreType[])
    const matchs = evaluateMatchup({P1Cards: CardsFromPlayer1, P2Cards: CardsFromPlayer2})

    useEffect(() => {
        setIsClient(true)
    },[])
    
    useEffect(()=>{

        const time = setInterval(
            () => {
                if(score.every((score) => score !== null)) onFinish()
                const nullValueIndex = score.findIndex((score) => score === null)
                if(nullValueIndex === -1) return
                
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
    },[score])
    
    if (!isClient) return null;
    return (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-60">
            <div className="min-w-[600px] min-h-[400px] fixed bg-background border border-border rounded-lg px-8 py-4">
                <h1 className="text-primary font-bold mb-4 text-center">Match Dialog</h1>
                <hr />
                <div className="flex flex-col gap-4 py-4 w-full items-center">
                    <div className="grid grid-cols-4 gap-2">
                        {CardsFromPlayer1.FrontRow.map((card, index) => (
                            <DeckCard key={index} {...card} size={cardSize}/>
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {CardsFromPlayer1.BackRow.map((card, index) => (
                            <DeckCard key={index} {...card} size={cardSize}/>
                        ))}
                    </div>
                    <hr className="w-[80%] my-4"/>
                    <div className="w-full h-0 flex flex-col items-center absolute">
                        <div className="grid grid-cols-4 gap-2 pt-[calc(30%+5px)]">
                            {score.map((score, index) => (
                                <div key={index} className="flex items-center text-center gap-2">
                                    {score?.matchWinner === "P1" || score?.matchWinner === "P2" ?
                                    <h1 className={score?.matchWinner === "P1" ? P1WonMatchClass : P2WonMatchClass}>{score?.points}</h1>:
                                    <h1 className={MatchCommonClass}>{score?.points}</h1>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {CardsFromPlayer2.FrontRow.map((card, index) => (
                            <DeckCard key={index} {...card} size={cardSize}/>
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {CardsFromPlayer2.BackRow.map((card, index) => (
                            <DeckCard key={index} {...card} size={cardSize}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}