import {create} from "zustand";
import type { Card } from "../interface/card.interface";
import getDeck from "../helpers/getDeck";

const initialCards = getDeck()
    .shuffleDeck()
    .slice(0,16)
    .map((card,index) => ({...card, isFaceUp: index%2 == 0 ? true : false}));

interface CardsStore {
    CardsFromPlayer1: {
        FrontRow: Card[],
        BackRow: Card[]
    };
    CardsFromPlayer2: {
        FrontRow: Card[],
        BackRow: Card[]
    };
    InitialCardsFromPlayer1: {
        FrontRow: Card[],
        BackRow: Card[]
    };
    InitialCardsFromPlayer2: {
        FrontRow: Card[],
        BackRow: Card[]
    };
    ShuffleCards: () => void;
    SwapFrontToBack: (player: 1 | 2) => void;
    SetCardsInOnePlayer: (player: 1 | 2, FrontRow: Card[], BackRow?: Card[]) => void;
    SetCardsInBothPlayers: (Player1Cards: Card[], Player2Cards: Card[]) => void;    
    SetInitialState: (player: 1 | 2) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
    CardsFromPlayer1: {
        FrontRow: initialCards.slice(0, 4),
        BackRow: initialCards.slice(4, 8).reverse(),
    },
    CardsFromPlayer2: {
        FrontRow: initialCards.slice(8, 12),
        BackRow: initialCards.slice(12, 16).reverse(),
    },
    InitialCardsFromPlayer1: {
        FrontRow: initialCards.slice(0, 4),
        BackRow: initialCards.slice(4, 8).reverse(),
    },
    InitialCardsFromPlayer2: {
        FrontRow: initialCards.slice(8, 12),
        BackRow: initialCards.slice(12, 16).reverse(),
    },
    ShuffleCards: () => {
        const newCards = getDeck().shuffleDeck();
        set({
            CardsFromPlayer1: {
                FrontRow: newCards.slice(0, 4),
                BackRow: newCards.slice(4, 8).reverse(),
            },
            CardsFromPlayer2: {
                FrontRow: newCards.slice(8, 12),
                BackRow: newCards.slice(12, 16).reverse(),
            },
        });
    },
    SwapFrontToBack: (player: 1 | 2) => {
        const state = useCardsStore.getState();
        if (player === 1) {
            const FrontRow = state.CardsFromPlayer1.FrontRow;
            const BackRow = state.CardsFromPlayer1.BackRow;
            set({CardsFromPlayer1: {FrontRow: BackRow, BackRow: FrontRow}});
        } else {
            const FrontRow = state.CardsFromPlayer2.FrontRow;
            const BackRow = state.CardsFromPlayer2.BackRow;
            set({CardsFromPlayer2: {FrontRow: BackRow, BackRow: FrontRow}});
        }
    },
    SetCardsInOnePlayer: (player: 1 | 2, FrontRow: Card[], BackRow?: Card[]) => {
        const state = useCardsStore.getState();
        if (player === 1) {
            const CardsFromPlayer1 = state.CardsFromPlayer1;
            set({
                CardsFromPlayer1: {
                    ...CardsFromPlayer1,
                    FrontRow: FrontRow,
                    BackRow: BackRow ?? CardsFromPlayer1.BackRow,
                }
            });
        } else {
            const CardsFromPlayer2 = state.CardsFromPlayer2;
            set({
                CardsFromPlayer2: {
                    ...CardsFromPlayer2,
                    FrontRow: FrontRow,
                    BackRow: BackRow ?? CardsFromPlayer2.BackRow,
                }
            });
        }
    },
    SetCardsInBothPlayers: (Player1Cards: Card[], Player2Cards: Card[]) => {
        set({
            CardsFromPlayer1: {
                FrontRow: Player1Cards.slice(0, 4),
                BackRow: Player1Cards.slice(4, 8),
            },
            CardsFromPlayer2: {
                FrontRow: Player2Cards.slice(0, 4),
                BackRow: Player2Cards.slice(4, 8),
            },
        });
    },
    SetInitialState: (player: 1 | 2) => {
        const state = useCardsStore.getState();
        if (player === 1) {
            const initialCardsFromPlayer1 = state.InitialCardsFromPlayer1;
            set({
                CardsFromPlayer1: {
                    FrontRow: initialCardsFromPlayer1.FrontRow,
                    BackRow: initialCardsFromPlayer1.BackRow,
                },
            });
        } else {
            const initialCardsFromPlayer2 = state.InitialCardsFromPlayer2;
            set({
                CardsFromPlayer2: {
                    FrontRow: initialCardsFromPlayer2.FrontRow,
                    BackRow: initialCardsFromPlayer2.BackRow,
                },
            });
        }
    },
}));