import DeckEditor from "~/components/custom/DeckEditor";
import { DificultyProvider } from "~/context/Dificulty.context";

export default function PlayVsComputerRoute() {
  
  return (
    <DificultyProvider>
      <DeckEditor />
    </DificultyProvider>
  );
}
