import { Car } from "lucide-react";
import { Card } from "../ui/card";

export default function DeckTemplate() {

    const CardsFromPlayer1Exmaple = [
        {
            suit: "♠",
            rank: "A",
            color: "black",
            isFaceUp: false
        }
    ]

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <div className="bg-black/95 h-[50%] w-full flex flex-row justify-center items-center">
        {CardsFromPlayer1Exmaple.map((card, index) => (
            <Card key={index} className="w-[100px] h-[140px] flex flex-col">
                <div className="flex flex-col items-center h-full justify-around">
                    <p className="text-4xl">{card.rank}</p>
                    <p className="text-4xl">{card.suit}</p>
                </div>
            </Card>
        ))}
      </div>
      <div className="bg-white/5 h-[50%] w-full flex flex-row justify-center items-center">
        {CardsFromPlayer1Exmaple.map((card, index) => (
            <Card key={index} className="w-[100px] h-[140px] flex flex-col">
                <div className="flex flex-col items-center h-full justify-around">
                    <p className="text-4xl">{card.rank}</p>
                    <p className="text-4xl">{card.suit}</p>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}