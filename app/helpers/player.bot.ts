import type { Card, Rank } from "~/interface/card.interface";
import { simulateMap, simulateFilter } from "./card.functions";
import type { filterFunctions, mapFunctions } from "~/interface/functions.type";
import { getRankToValue } from "./getRankToValue";
import { evaluateMatchup } from "./getMatch";

const evaluateHand = (frontRow: Card[]): number => {
    return frontRow.reduce((score, card) => {
        if (!card.isIt) return score - 5;
        if (!card.isFaceUp) return score + 1;
        return score + getRankToValue(card.rank);
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

    if (difficulty === "easy") {
        return getRandomMove(cards);
    }

    let bestResult = {
        score: -Infinity,
        map: [] as mapFunctions[],
        filter: "none",
        finalCards: cards
    };

    //When difficulty is "Normal"
    filterOptions.forEach(filterFunc => {
        mapOptions.forEach(mapFunc1 => {
            mapOptions.forEach(mapFunc2 => {
                let tempCards = structuredClone(cards);
                
                tempCards = simulateMap(tempCards, [mapFunc1, mapFunc2]);
                
                tempCards = {...tempCards, FrontRow: simulateFilter(tempCards.FrontRow, filterFunc)};
                
                const currentScore = difficulty === "advanced" ? 
                evaluateMatchup(tempCards.FrontRow, cards.FrontRow) :
                evaluateHand(tempCards.FrontRow);
                
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