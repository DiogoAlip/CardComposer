import type { Card, Rank } from "~/interface/card.interface";
import { getRankToValue } from "./getRankToValue";

interface Player {
    name: string;
    rank: Rank;
}

export const getMatchCards = (Player1: Player, Player2: Player) => {
    const player1Val = getRankToValue(Player1.rank);
    const player2Val = getRankToValue(Player2.rank);
    return {
        winner: player1Val > player2Val ? Player1 : Player2,
        score: Math.abs(player1Val - player2Val)
    };
}

interface Cards {
    FrontRow: Card[],
    BackRow: Card[]
}

export const evaluateMatchup = ({P1Cards, P2Cards}: {P1Cards: Cards, P2Cards: Cards}): typeof matchs => {

    const matchs = [] as {
        cardFromP1: "FrontRow" | "BackRow", 
        cardFromP2: "FrontRow" | "BackRow", 
        matchWinner: "P1" | "P2" | "None",
        score: number
    }[];

    for (let i = 0; i < 4; i++) {
        const P1Card = P1Cards.FrontRow[i].isIt ? P1Cards.FrontRow[i] : P1Cards.BackRow[i];
        const P2Card = P2Cards.FrontRow[i].isIt ? P2Cards.FrontRow[i] : P2Cards.BackRow[i];
        let matchScore = 0;

        if (!P1Card.isFaceUp || !P1Card.isIt) {
            matchScore += 0; 
            continue;
        }

        if (P2Card && P2Card.isIt && P2Card.isFaceUp) {
            const {winner, score} = getMatchCards(
                {name: "Oppnent", rank: P1Card.rank},
                {name: "Player", rank: P2Card.rank}
            );
            matchScore += winner.name === "Oppnent" ? score : -score;
            matchs.push({
                cardFromP1: P1Cards.FrontRow[i].isIt ? "FrontRow" : "BackRow",
                cardFromP2: P2Cards.FrontRow[i].isIt ? "FrontRow" : "BackRow",
                matchWinner: winner.name === "Oppnent" ? "P1" : "P2",
                score: matchScore
            })
        }       
        else if (P2Card && P2Card.isIt && !P2Card.isFaceUp) {
            matchScore += 0;
            matchs.push({
                cardFromP1: P1Cards.FrontRow[i].isIt ? "FrontRow" : "BackRow",
                cardFromP2: P2Cards.FrontRow[i].isIt ? "FrontRow" : "BackRow",
                matchWinner: "None",
                score: matchScore
            })
        } 
        else {
            matchScore += getRankToValue(P1Card.rank);
        }
    }
    return matchs;
};