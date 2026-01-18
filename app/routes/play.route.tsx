import { Outlet } from "react-router";
import { GameRoundProvider } from "~/context/GameRound.context";

export default function PlayRoute() {
  return (
    <GameRoundProvider>
      <Outlet />
    </GameRoundProvider>
  );
}
