import { memo, useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import type { Card } from "~/interface/card.interface";
import { use } from "react";
import { GameRoundContext } from "~/context/GameRound.context";
import { User, Bot } from "lucide-react"
import { PlayerNameTag } from "~/ui/PlayerNameTag.ui";

interface DeckLayout {
  CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]};
  CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]};
  showNames: boolean;
}

export default memo(function DeckLayout({CardsFromPlayer1, CardsFromPlayer2, showNames}: DeckLayout) {
  const [isClient, setIsClient] = useState(false);
  const {player1, player2} = use(GameRoundContext);
  console.log(showNames)

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
      <div className={`absolute ${showNames ? "block" : "hidden"} sm:block top-0 sm:top-4 right-auto sm:right-6`}>
        <PlayerNameTag name={player1.name} firstPlayer={false}/>
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
      <div className={`absolute ${showNames ? "block" : "hidden"} sm:block top-[calc(50%)] sm:top-[calc(50%+2rem)] right-auto sm:right-6`}>
        <PlayerNameTag name={player2.name} firstPlayer={true}/>
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