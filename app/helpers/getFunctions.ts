import { flipFrontDeckCards, extractByFlip, extractByColor } from "~/store/cards.thunk"
import { useCardsStore } from "~/store/cards.store"
const SwapFrontToBack = useCardsStore.getState().SwapFrontToBack

export const DeckMapFunctions = {
    "faceUp": () => flipFrontDeckCards(2, {flip: true}),
    "faceDown": () => flipFrontDeckCards(2, {flip: false}),
    "flipOver": () => flipFrontDeckCards(2, {alternate: true}),
    "swap": () => SwapFrontToBack(2),
}

export const DeckFilterFunctions = {
    "isUp": () => extractByFlip(2, false),
    "isDown": () => extractByFlip(2, true),
    "isRed": () => extractByColor(2, "red"),
    "isBlack": () => extractByColor(2, "black"),
}