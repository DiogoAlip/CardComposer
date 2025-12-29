export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  color: string;
  isFaceUp: boolean;
}

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default function getDeck() {
  const baseDeck: Card[] = 
    SUITS.flatMap(suit => 
      RANKS.map(rank => ({ 
        suit, 
        rank, 
        color: suit === "♠" || suit === "♣" ? "black" : "red", 
        isFaceUp: false 
      }))
    );

  const shuffleDeck = () => {
    return [...baseDeck].sort(() => Math.random() - 0.5);
  };

  return {
    shuffleDeck,
    baseDeck,
    SUITS,
    RANKS
  };
}