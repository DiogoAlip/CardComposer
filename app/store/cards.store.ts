import {create} from "zustand";
import type { Card } from "../helpers/getDeck";
import getDeck from "../helpers/getDeck";

const initialCards = getDeck().shuffleDeck();

interface CardsStore {
    CardsFromPlayer1: Card[];
    CardsFromPlayer2: Card[];
    ShuffleCards: () => void;
}

const useCardsStore = create<CardsStore>((set) => ({
    CardsFromPlayer1: initialCards.slice(0, 8),
    CardsFromPlayer2: initialCards.slice(8, 16),
    ShuffleCards: () => {
        const newCards = getDeck().shuffleDeck();
        set({
            CardsFromPlayer1: newCards.slice(0, 8),
            CardsFromPlayer2: newCards.slice(8, 16),
        });
    },
}));