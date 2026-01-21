import type { Card } from "~/interface/card.interface";
import type { mapFunctions, filterFunctions } from "~/interface/functions.type";

export const MapFunctions = ["swap", "faceUp", "faceDown", "flipOver", "none"];
export const FilterFunctions = ["isRed", "isBlack", "isUp", "isDown", "none"];

export function simulateMap(cards: {
  FrontRow: Card[];
  BackRow: Card[];
}, types: mapFunctions[]) {
    return types.reduce((currentCards, type) => {
        if (type === "swap") {
            return { 
                FrontRow: currentCards.BackRow, 
                BackRow: currentCards.FrontRow 
            };
        }

        const newFront = currentCards.FrontRow.map((card: Card) => {
            switch (type) {
                case "faceUp": 
                    return { ...card, isFaceUp: true };
                case "faceDown": 
                    return { ...card, isFaceUp: false };
                case "flipOver": 
                    return { ...card, isFaceUp: !card.isFaceUp };
                default: 
                    return card;
            }
        });

        return { ...currentCards, FrontRow: newFront };
    }, cards);
}

export function simulateFilter(FrontRow: Card[], type: filterFunctions) {
    return FrontRow.map((card: Card) => {
        if (type === "isRed")
            return card.color === "red" && card.isFaceUp ? card : {...card, isIt: false};
        if (type === "isBlack")
            return card.color === "black" && card.isFaceUp ? card : {...card, isIt: false};
        if (type === "isUp")
            return card.isFaceUp ? card : {...card, isIt: false};
        if (type === "isDown")
            return !card.isFaceUp ? card : {...card, isIt: false};
        return card;
    });
}