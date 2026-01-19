import type { Card, Rank } from "~/interface/card.interface";

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

function simulateMap(cards: { FrontRow: Card[], BackRow: Card[] }, type: string) {
    if (type === "swap") {
        return { FrontRow: cards.BackRow, BackRow: cards.FrontRow };
    }
    const newFront = cards.FrontRow.map((card: Card) => {
        if (type === "faceUp") return { ...card, isFaceUp: true };
        if (type === "faceDown") return { ...card, isFaceUp: false };
        if (type === "flipOver") return { ...card, isFaceUp: !card.isFaceUp };
        return card;
    });
    return { ...cards, FrontRow: newFront };
}

function simulateFilter(FrontRow: Card[], type: string) {
    const newFront = FrontRow.map((card: Card) => {
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
    
    return newFront;
}

const mapOptions: string[] = ["swap", "faceUp", "faceDown", "flipOver", "none"];
const filterOptions: string[] = ["isRed", "isBlack", "isUp", "isDown", "none"];

function getRandomMove(cards: { FrontRow: Card[], BackRow: Card[] }) {
    const randomMap = mapOptions[Math.floor(Math.random() * mapOptions.length)];
    const randomFilter = filterOptions[Math.floor(Math.random() * filterOptions.length)];
    return {
        score: -Infinity,
        finalCards: simulateMap(cards, randomMap),
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
        map: [] as string[],
        filter: "none",
        finalCards: cards
    };

    filterOptions.forEach(filterFunc => {
        mapOptions.forEach(mapFunc => {
            let tempCards = structuredClone(cards);

            tempCards = simulateMap(tempCards, mapFunc);

            tempCards = {...tempCards, FrontRow: simulateFilter(tempCards.FrontRow, filterFunc)};

            const currentScore = evaluateHand(tempCards.FrontRow);
            if (currentScore > bestResult.score) {
                bestResult = {
                    score: currentScore,
                    map: mapFunc === "none" ? [] : [mapFunc],
                    filter: filterFunc,
                    finalCards: tempCards
                };
            }
        });
    });

    return {...bestResult};
}