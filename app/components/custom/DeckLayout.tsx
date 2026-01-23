import { memo, useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/interface/card.interface";

interface DeckLayout {
  CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]};
  CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]};
}

export default memo(function DeckLayout({CardsFromPlayer1, CardsFromPlayer2}: DeckLayout) {
  const [isClient, setIsClient] = useState(false);

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