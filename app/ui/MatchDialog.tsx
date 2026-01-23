import type { Card } from "~/interface/card.interface";
import DeckCard from "~/components/custom/DeckCard";
import { useEffect, useState } from "react";

interface MatchDialogProps {
    CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]}
    CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]}
    onFinish: () => void;
}

const cardSize = {width: 50, height: 80};

export const MatchDialog = ({CardsFromPlayer1, CardsFromPlayer2, onFinish}: MatchDialogProps) => {
    
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true)
    },[])
    
    useEffect(()=>{
        const time = setInterval(
            () => onFinish(), 
            5000
        )
        return () => clearInterval(time)
    },[])
    
    if (!isClient) return null;
    return (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center">
            <div className="min-w-[600px] min-h-[400px] fixed bg-background border border-border rounded-lg px-8 py-4">
                <h1 className="text-primary font-bold mb-4 text-center">Match Dialog</h1>
                <hr />
                <div className="flex flex-col gap-4 py-10 w-full items-center">
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
                    <hr className="w-[80%]"/>
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