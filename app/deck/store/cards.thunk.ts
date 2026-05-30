import { useCardsStore } from "./cards.store";

export const startGame = () => {
    
}

type FlipAction = 
  | { flip: boolean; alternate?: never } 
  | { flip?: never; alternate: boolean };

export const flipFrontDeckCards = (player: 1 | 2, { flip, alternate }: FlipAction) => {
    const SetCardsInOnePlayer = useCardsStore.getState().SetCardsInOnePlayer;
    const CardsFromPlayer1 = useCardsStore.getState().CardsFromPlayer1;
    const CardsFromPlayer2= useCardsStore.getState().CardsFromPlayer2;
    const FrontRow = player === 1 ? CardsFromPlayer1.FrontRow : CardsFromPlayer2.FrontRow;
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isFaceUp: (alternate ? !card.isFaceUp : flip) ?? card.isFaceUp,
        })
    );
    SetCardsInOnePlayer(player, newFront);
}

export const extractByFlip = (player: 1 | 2, flip: boolean) => {
    const SetCardsInOnePlayer = useCardsStore.getState().SetCardsInOnePlayer;
    const CardsFromPlayer1 = useCardsStore.getState().CardsFromPlayer1;
    const CardsFromPlayer2= useCardsStore.getState().CardsFromPlayer2;
    const FrontRow = player === 1 ? CardsFromPlayer1.FrontRow : CardsFromPlayer2.FrontRow;
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isIt: card.isFaceUp === flip,
        })
    );
    SetCardsInOnePlayer(player, newFront);
}

export const extractByColor = (player: 1 | 2, color: "black" | "red") => {
    const SetCardsInOnePlayer = useCardsStore.getState().SetCardsInOnePlayer;
    const CardsFromPlayer1 = useCardsStore.getState().CardsFromPlayer1;
    const CardsFromPlayer2= useCardsStore.getState().CardsFromPlayer2;
    const FrontRow = player === 1 ? CardsFromPlayer1.FrontRow : CardsFromPlayer2.FrontRow;
    const newFront = FrontRow.map(
        (card) => ({
            ...card,
            isIt: card.color === color,
        })
    );
    SetCardsInOnePlayer(player, newFront);
}

export const resetCode = () => {
    const SetInitialState = useCardsStore.getState().SetInitialState;
    SetInitialState(2);
}