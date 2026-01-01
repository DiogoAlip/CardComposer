import type { Card } from "~/helpers/getDeck";
import { useCardsStore } from "./cards.store";

export const SwapPrincipalPlayerCards = () => {
    const SwapFrontToBack = useCardsStore((state) => state.SwapFrontToBack);
}

export const startGame = () => {
    
}

type FlipAction = 
  | { flip: boolean; alternate?: never } 
  | { flip?: never; alternate: boolean };

export const flipFrontDeckCards = (player: 1 | 2, { flip, alternate }: FlipAction) => {
    const setCardsInOnePlayer = useCardsStore((state) => state.SetCardsInOnePlayer);
    const FrontRow = useCardsStore(
        (state) => player === 1 ?
        state.CardsFromPlayer1.FrontRow :
        state.CardsFromPlayer2.FrontRow
    );
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isFaceUp: (alternate ? !card.isFaceUp : flip) ?? card.isFaceUp,
        })
    );
    setCardsInOnePlayer(player, newFront);
}

export const extractByFlip = (player: 1 | 2, flip: boolean) => {
    const setCardsInOnePlayer = useCardsStore((state) => state.SetCardsInOnePlayer);
    const FrontRow = useCardsStore(
        (state) => player === 1 ?
        state.CardsFromPlayer1.FrontRow :
        state.CardsFromPlayer2.FrontRow
    );
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isIt: card.isFaceUp === flip,
        })
    );
    setCardsInOnePlayer(player, newFront);
}

export const extractByColor = (player: 1 | 2, color: "black" | "red") => {
    const setCardsInOnePlayer = useCardsStore((state) => state.SetCardsInOnePlayer);
    const FrontRow = useCardsStore(
        (state) => player === 1 ?
        state.CardsFromPlayer1.FrontRow :
        state.CardsFromPlayer2.FrontRow
    );
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isIt: card.color === color,
        })
    );
    setCardsInOnePlayer(player, newFront);
}