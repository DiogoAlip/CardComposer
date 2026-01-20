import type { Card, Rank } from "~/interface/card.interface";
import { simulateMap, simulateFilter } from "./card.functions";
import type { filterFunctions, mapFunctions } from "~/interface/functions.type";

const rankToValue = (rank: Rank): number => {
    const values: Record<string, number> = {
        "K": 13, "Q": 12, "J": 11, "10": 10, "9": 9, "8": 8,
        "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2, "A": 1,
    };
    return values[rank];
};

const evaluateHand = (frontRow: Card[]): number => {
    return frontRow.reduce((score, card) => {
        if (!card.isIt) return score - 5;
        if (!card.isFaceUp) return score + 1;
        return score + rankToValue(card.rank);
    }, 0);
};

const mapOptions: mapFunctions[] = ["swap", "faceUp", "faceDown", "flipOver", "none"];
const filterOptions: filterFunctions[] = ["isRed", "isBlack", "isUp", "isDown", "none"];

function getRandomMove(cards: { FrontRow: Card[], BackRow: Card[] }) {
    const randomMap = mapOptions[Math.floor(Math.random() * mapOptions.length)];
    const randomFilter = filterOptions[Math.floor(Math.random() * filterOptions.length)];
    return {
        score: -Infinity,
        finalCards: simulateMap(cards, [randomMap]),
        filter: randomFilter,
        map: [randomMap]
    };
}

interface BotProps {
    cards: { FrontRow: Card[], BackRow: Card[] },
    difficulty: string;
}

export function Bot ({cards, difficulty}: BotProps) {

    if (difficulty === "Easy") {
        return getRandomMove(cards);
    }

    let bestResult = {
        score: -Infinity,
        map: [] as mapFunctions[],
        filter: "none",
        finalCards: cards
    };

    filterOptions.forEach(filterFunc => {
        mapOptions.forEach(mapFunc1 => {
            mapOptions.forEach(mapFunc2 => {
                let tempCards = structuredClone(cards);
                
                tempCards = simulateMap(tempCards, [mapFunc1, mapFunc2]);
                
                tempCards = {...tempCards, FrontRow: simulateFilter(tempCards.FrontRow, filterFunc)};
                
                const currentScore = evaluateHand(tempCards.FrontRow);
                if (currentScore > bestResult.score) {
                    bestResult = {
                        score: currentScore,
                        map: mapFunc1 === "none" || mapFunc2 === "none" ? [] : [mapFunc1, mapFunc2],
                        filter: filterFunc,
                        finalCards: tempCards
                    };
                }
            })
        });
    });

    return {...bestResult};
}