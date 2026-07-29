import { useState, createContext } from "react";
import type { ReactNode } from "react";

interface GameSettingsIntreface {
  tutorialMode: boolean;
  tutorialStage: number;
  setTutorialMode: (mode: boolean) => void;
  setTutorialStage: (stage: number) => void;
}

export const GameSettingsContext = createContext({} as GameSettingsIntreface);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialMode, setTutorialMode] = useState(true);
  const [tutorialStage, setTutorialStage] = useState(0);

  return (
    <GameSettingsContext
      value={{ tutorialMode, setTutorialMode, tutorialStage, setTutorialStage }}
    >
      {children}
    </GameSettingsContext>
  );
};
