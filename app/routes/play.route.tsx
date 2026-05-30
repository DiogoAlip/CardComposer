import { Outlet } from "react-router";
import { GameRoundProvider } from "~/match/context/GameRound.context";

export default function PlayRoute() {
  return (
    <GameRoundProvider>
      <Outlet />
    </GameRoundProvider>
  );
}
