import type { Card } from "~/interface/card.interface";
import DeckCard from "../components/custom/DeckCard"

const MatchCommonClass = "bg-background w-[50px] h-[50px] border-[1px] border-border rounded-lg p-auto flex items-center justify-center font-bold text-lg text-white animation tw-animate-pulse transition-colors transition-transform duration-300 ease-in-out"
const P1WonMatchClass = MatchCommonClass.replace("bg-background", "bg-accent transform-[translateY(-8px)]")
const P2WonMatchClass = MatchCommonClass.replace("bg-background", "bg-primary transform-[translateY(8px)]")

const cardSize = {width: 50, height: 80};

interface ScoreType {
    matchWinner: "P1" | "P2" | "None";
    points: number;
}

interface MatchDeckLayoutProps {
    CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]}
    CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]}
    score: ScoreType[]
}

export const MatchDeckLayout = ({CardsFromPlayer1, CardsFromPlayer2, score}:MatchDeckLayoutProps) => {
    return (
            <>
                <div className="grid grid-cols-4 gap-2">
                    {CardsFromPlayer1.FrontRow.map((card, index) => (
                        <DeckCard key={index} {...card} size={cardSize}/>
                    ))}
                    {CardsFromPlayer1.BackRow.map((card, index) => (
                        <DeckCard key={index} {...card} size={cardSize}/>
                    ))}
                </div>
                <hr className="w-[80%] my-4"/>
                <div className="w-full h-0 flex flex-col items-center absolute">
                    <div className="grid grid-cols-4 gap-2 pt-[calc(30%-3px)]">
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
                    {CardsFromPlayer2.BackRow.map((card, index) => (
                        <DeckCard key={index} {...card} size={cardSize}/>
                    ))}
                </div>
            </>
    )
}