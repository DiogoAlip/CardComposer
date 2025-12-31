import DeckTemplate from "~/components/custom/DeckTemplate";
import { useCardsStore } from "~/store/cards.store";

export default function PlayVsComputerRoute() {
  const CardsFromPlayer1 = useCardsStore((state) => state.CardsFromPlayer1);
  const CardsFromPlayer2 = useCardsStore((state) => state.CardsFromPlayer2);
  
  return (
    <div>
      <DeckTemplate
        CardsFromPlayer1={CardsFromPlayer1}
        CardsFromPlayer2={CardsFromPlayer2}
      />
    </div>
  );
}
