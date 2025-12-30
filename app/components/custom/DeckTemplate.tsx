import { DeckCard } from "../custom/DeckCard";

export default function DeckTemplate() {

    const CardsFromPlayer1Exmaple = [
        {
            suit: "♠",
            rank: "A",
            color: "black",
            isFaceUp: true,
            isIt: true
        },
        {
            suit: "♥",
            rank: "3",
            color: "red",
            isFaceUp: false,
            isIt: true
        },
        {
            suit: "♦",
            rank: "8",
            color: "red",
            isFaceUp: false,
            isIt: false
        },
        {
            suit: "♦",
            rank: "4",
            color: "red",
            isFaceUp: true,
            isIt: true
        },
        {
            suit: "♦",
            rank: "4",
            color: "red",
            isFaceUp: false,
            isIt: true
        }
    ]

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <div className="bg-black/95 h-[50%] w-full flex flex-row justify-center items-center">
      <div className="grid grid-cols-4 w-fit gap-2">
        {CardsFromPlayer1Exmaple.map((card, index) => (
            <DeckCard key={index} {...card} />
        ))}
      </div>
      </div>
      <div className="bg-white/5 h-[50%] w-full flex flex-row justify-center items-center">
        <div className="grid grid-cols-4 w-fit gap-2">
        {CardsFromPlayer1Exmaple.map((card, index) => (
            <DeckCard key={index} {...card} />
        ))}
        </div>
      </div>
    </div>
  );
}