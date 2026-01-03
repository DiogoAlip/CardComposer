import { flipFrontDeckCards, extractByFlip, extractByColor } from "~/store/cards.thunk"
import { useCardsStore } from "~/store/cards.store"
const {SwapFrontToBack} = useCardsStore.getState()

export const DeckMapFunctions = {
    faceUp: () => flipFrontDeckCards(1, {flip: true}),
    faceDown: () => flipFrontDeckCards(1, {flip: false}),
    flipOver: () => flipFrontDeckCards(1, {alternate: true}),
    swap: () => SwapFrontToBack(1),
}

export const DeckFilterFunctions = {
    isUp: () => extractByFlip(1, false),
    isDown: () => extractByFlip(1, true),
    isRed: () => extractByColor(1, "red"),
    isBlack: () => extractByColor(1, "black"),
}