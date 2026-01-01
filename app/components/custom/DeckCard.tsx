import { memo } from "react";
import { Card } from "../ui/card";

export interface CardProps {
    rank: string;
    suit: string;
    isFaceUp: boolean;
    isIt: boolean;
    color: string;
}

export default memo(function DeckCard({rank, suit, isFaceUp, isIt, color}: CardProps) {
    if (isIt && !isFaceUp) {
        return (
            <Card className="w-[80px] h-[110px] flex flex-col bg-gradient-to-br from-primary to-accent">
            </Card>
        )
    }
    return (
        <Card
            className={`w-[80px] h-[110px] flex flex-col ${ isIt ? "bg-white/95" : "bg-transparent border-0"} ${color === "black" ? "text-black/85" : "text-accent"}`}
        >
            {isIt && <div className="flex flex-col items-center h-full justify-around">
                <p className="text-2xl">{rank}</p>
                <p className="text-2xl">{suit}</p>
            </div>}
        </Card>
    )
})