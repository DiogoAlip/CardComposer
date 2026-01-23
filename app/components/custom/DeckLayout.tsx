import { memo, useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/interface/card.interface";
import { use } from "react";
import { GameRoundContext } from "~/context/GameRound.context";
import { User, Bot } from "lucide-react"

interface DeckLayout {
  CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]};
  CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]};
  showNames: boolean;
}

export default memo(function DeckLayout({CardsFromPlayer1, CardsFromPlayer2, showNames}: DeckLayout) {
  const [isClient, setIsClient] = useState(false);
  const {player1, player2} = use(GameRoundContext);

  useEffect(() => {
    setIsClient(true)
  },[])

  if (!isClient) return (
    <div className="animate-pulse w-full h-[100vh] flex items-center justify-center">
      <h2 className="text-2xl">Cargando Mazo ...</h2>
    </div>
  );

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <div className="bg-black/95 h-[50%] w-full flex flex-row justify-center items-center">
      <div className="absolute top-4 right-4">
        {showNames && <div className="bg-primary/20 py-2 rounded-full flex flex-row gap-2 px-4 z-5">
        {
          player1.name === "Bot" ? (
            <>
              <h2 className="text-primary font-bold">Opponent</h2>
              <Bot className="w-6 h-6 text-primary"/>
            </>
            ) : (
              <h2 className="text-primary font-bold">{`Opponent (${player1.name})`}</h2>
            )
          }
        </div>}
      </div>
        <div className="grid grid-cols-4 gap-2">
          {CardsFromPlayer1.FrontRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
          {CardsFromPlayer1.BackRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="bg-white/10 h-[50%] w-full flex flex-row justify-center items-center">
      <div className="absolute top-[calc(50%+2rem)] right-4">
        {showNames && <div className="bg-primary/20 py-2 rounded-full flex flex-row gap-2 px-4 z-5">
        {
          player2.name === "Human" ? (
            <>
              <h2 className="text-primary font-bold">You</h2>
              <User className="w-6 h-6 text-primary"/>
            </>
            ) : (
              <h2 className="text-primary font-bold">{`Opponent (${player2.name})`}</h2>
            )
          }
        </div>}
      </div>
        <div className="grid grid-cols-4 gap-2">
          {CardsFromPlayer2.FrontRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
          {CardsFromPlayer2.BackRow.map((card, index) => (
            <DeckCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
})