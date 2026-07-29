import type { Card, Rank } from "~/deck/interfaces/card.interface";
import { simulateMap, simulateFilter } from "@/deck/helpers/card.functions";
import type { filterFunctions, mapFunctions } from "~/code-composer/interfaces/functions.type";
import { getRankToValue } from "@/deck/helpers/getRankToValue";
import { evaluateMatchup } from "@/match/helpers/getMatch";
import type { difficultyType } from "~/player/interfaces/difficulty.type";

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
    P1Cards: { FrontRow: Card[], BackRow: Card[] },
    P2Cards?: { FrontRow: Card[], BackRow: Card[] },
    difficulty: difficultyType;
}

export function Bot ({P1Cards, P2Cards, difficulty}: BotProps) {

    if (difficulty === "easy") {
        return getRandomMove(P1Cards);
    }

    let bestResult = {
        score: -Infinity,
        map: [] as mapFunctions[],
        filter: "none" as filterFunctions,
        finalCards: P1Cards
    };

    //When difficulty is "Normal"
    filterOptions.forEach(filterFunc => {
        mapOptions.forEach(mapFunc1 => {
            mapOptions.forEach(mapFunc2 => {
                let tempCards = structuredClone(P1Cards);
                
                tempCards = simulateMap(tempCards, [mapFunc1, mapFunc2]);
                
                tempCards = {...tempCards, FrontRow: simulateFilter(tempCards.FrontRow, filterFunc)};
                
                const currentScore = difficulty === "advanced" ? 
                evaluateMatchup({P1Cards: tempCards, P2Cards: P2Cards ?? P1Cards}).reduce(
                    (matchScore, match) => matchScore + (match.matchWinner === "P1" ? match.score : -match.score), 0
                ) :
                evaluateHand(tempCards.FrontRow);

                if (currentScore > bestResult.score) {
                    bestResult = {
                        score: currentScore,
                        map: [mapFunc1, mapFunc2].filter(m => m !== "none"),
                        filter: filterFunc,
                        finalCards: tempCards
                    };
                }
            })
        });
    });

    return {...bestResult};
}