import { Outlet } from "react-router";
import { GameRoundProvider } from "~/match/context/GameRound.context";
import { GameSettingsProvider } from "~/match/context/GameSettings.context";

export default function PlayRoute() {
  return (
    <GameSettingsProvider>
      <GameRoundProvider>
        <Outlet />
      </GameRoundProvider>
    </GameSettingsProvider>
  );
}
