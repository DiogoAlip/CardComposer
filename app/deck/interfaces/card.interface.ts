export interface Card {
  suit: Suit;
  rank: Rank;
  color: "black" | "red";
  isFaceUp: boolean;
  isIt: boolean;
}

export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";