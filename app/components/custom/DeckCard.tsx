import { memo } from "react";
import { Card } from "../ui/card";

export interface CardProps {
    rank: string;
    suit: string;
    isFaceUp: boolean;
    isIt: boolean;
    color: string;
    size?: { width: number; height: number; }
}

export default memo(function DeckCard({rank, suit, isFaceUp, isIt, color, size}: CardProps) {
    const { width, height } = size || { width: 80, height: 110 };
    const textSize = width < 70 ? "text-xl" : "text-2xl";
    const paddingTop = width < 70 ? "py-2" : "";

    if (isIt && !isFaceUp) {
        return (
            <Card 
                style={{ width, height }}
                className={`flex flex-col bg-gradient-to-br from-primary to-accent`}
            >
            </Card>
        )
    }

    return (
        <Card
            style={{ width, height }}
            className={`flex flex-col ${ isIt ? "bg-white/95" : "bg-transparent border-0"} ${color === "black" ? "text-black/85" : "text-accent"} ${paddingTop}`}
        >
            {
            isIt &&
            <div className="flex flex-col items-center h-full justify-around">
                <p className={textSize}>{rank}</p>
                <p className={textSize}>{suit}</p>
            </div>
            }
        </Card>
    )
})