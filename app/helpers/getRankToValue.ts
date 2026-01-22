import type { Rank } from "~/interface/card.interface";

export const getRankToValue = (rank: Rank): number => {
    const values: Record<string, number> = {
        "K": 13, "Q": 12, "J": 11, "10": 10, "9": 9, "8": 8,
        "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2, "A": 1,
    };
    return values[rank];
};