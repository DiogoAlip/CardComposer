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

export const evaluateMatchup = (botFront: Card[], playerFront: Card[]): number => {
    let totalScore = 0;

    for (let i = 0; i < 4; i++) {
        const botCard = botFront[i];
        const playerCard = playerFront[i];

        if (!botCard.isFaceUp || !botCard.isIt) {
            totalScore += 0; 
            continue;
        }

        if (playerCard && playerCard.isIt && playerCard.isFaceUp) {
            const {winner, score} = getMatchCards(
                {name: "Bot", rank: botCard.rank},
                {name: "Player", rank: playerCard.rank}
            );
            totalScore += winner.name === "Bot" ? score : -score;
        }       
        else if (playerCard && playerCard.isIt && !playerCard.isFaceUp) {
            totalScore += 0;
        } 
        else {
            totalScore += getRankToValue(botCard.rank);
        }
    }

    return totalScore;
};