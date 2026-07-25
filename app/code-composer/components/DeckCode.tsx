import { useParams, useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { resetCode } from "@/deck/store/cards.thunk";
import { Bot } from "~/player/helpers/player.bot";
import { useCardsStore } from "~/deck/store/cards.store";
import {
  MapFunctions as MapFunctionsWithNone,
  FilterFunctions as FilterFunctionsWithNone,
  simulateMap,
  simulateFilter,
} from "~/deck/helpers/card.functions";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { GameSettingsContext } from "~/match/context/GameSettings.context";
import type {
  filterFunctions,
  mapFunctions,
} from "~/code-composer/interfaces/functions.type";
import type { Card } from "~/deck/interfaces/card.interface";
import type { difficultyType } from "~/player/interfaces/difficulty.type";
import { evaluateMatchup } from "~/match/helpers/getMatch";

import { CodeActions } from "./CodeActions";
import { CodeWorkspace } from "./CodeWorkspace";
import { TutorialPopup } from "~/shared/components/TutorialPopup";

interface DeckCodeProps {
  CardsFromPlayer1: { FrontRow: Card[]; BackRow: Card[] };
  CardsFromPlayer2: { FrontRow: Card[]; BackRow: Card[] };
}

export function DeckCode({
  CardsFromPlayer1,
  CardsFromPlayer2,
}: DeckCodeProps) {
  const [mapFunctions, setMapFunctions] = useState<mapFunctions[]>([]);
  const [filterFunction, setFilterFunction] = useState<filterFunctions>();
  const { SetCardsInOnePlayer } = useCardsStore();
  const navigate = useNavigate();
  const { dificulty, room } = useParams();
  const {
    setBothPlayersNames,
    newGameRound,
    dialogOpen,
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);

  const { tutorialMode, tutorialStage } = use(GameSettingsContext);

  const [isRuned, setIsRuned] = useState(false);

  const MapFunctions = MapFunctionsWithNone.filter(
    (func) => func !== "none",
  ) as mapFunctions[];
  const FilterFunctions = FilterFunctionsWithNone.filter(
    (func) => func !== "none",
  ) as filterFunctions[];

  useEffect(() => {
    resetCode();
    setIsRuned(false);
  }, [mapFunctions, filterFunction]);

  useEffect(() => {
    const dificultyValidator =
      dificulty === "easy" ||
      dificulty === "normal" ||
      dificulty === "advanced";
    if (!dificultyValidator && !room) {
      navigate("/play");
    } else {
      if (!room) {
        setBothPlayersNames({ player1: "Bot", player2: "Human" });
      }
    }
  }, []);

  function handleSelectFilter(func: filterFunctions) {
    setFilterFunction((prev) => (prev === func ? undefined : func));
  }

  function handleSelectMap(func: mapFunctions) {
    setMapFunctions((prev) => {
      if (prev.includes(func)) return prev;
      return [...prev, func];
    });
  }

  function handleRemoveBlock(instanceId: string) {
    if (filterFunction === instanceId) {
      setFilterFunction(undefined);
    } else {
      setMapFunctions((prev) => prev.filter((block) => block !== instanceId));
    }
  }

  // Auto scroll to step explanation when sidebar is active
  useEffect(() => {
    if (tutorialMode && (tutorialStage === 1 || tutorialStage === 2)) {
      const workspace = document.querySelector(".custom-scrollbar");
      if (workspace) {
        workspace.scrollTo({
          top: tutorialStage === 1 ? 0 : 300,
          behavior: "smooth",
        });
      }
    }
  }, [tutorialStage, tutorialMode]);

  function runCode() {
    const MapedCards = simulateMap(
      CardsFromPlayer2,
      mapFunctions as mapFunctions[],
    );
    const FilteredCards = simulateFilter(
      MapedCards.FrontRow,
      filterFunction as filterFunctions,
    );
    SetCardsInOnePlayer(2, FilteredCards, MapedCards.BackRow);
    setIsRuned(true);
    return { FrontRow: FilteredCards, BackRow: MapedCards.BackRow };
  }

  function sendCode() {
    if (mapFunctions.length === 0 || !filterFunction?.length) {
      console.log(
        "No map functions or filter function",
        "Is necesary to have at least one map function and one filter function",
      );
      return;
    }
    const P2CardsAfterRun = !isRuned ? runCode() : CardsFromPlayer2;
    if (dificulty) {
      const { FrontRow: P1FrontRow, BackRow: P1BackRow } = CardsFromPlayer1;
      const { FrontRow: P2FrontRow, BackRow: P2BackRow } = P2CardsAfterRun;
      const { finalCards, map, filter } = Bot({
        P1Cards: {
          FrontRow: P1FrontRow,
          BackRow: P1BackRow,
        },
        P2Cards: {
          FrontRow: P2FrontRow,
          BackRow: P2BackRow,
        },
        difficulty: dificulty as difficultyType,
      });
      SetCardsInOnePlayer(1, finalCards.FrontRow, finalCards.BackRow);

      const matchs = evaluateMatchup({
        P1Cards: finalCards,
        P2Cards: P2CardsAfterRun,
      });
      const P1matchs = matchs
        .filter((match) => match.matchWinner === "P1")
        .reduce((acc, match) => acc + match.score, 0);
      const P2matchs = matchs
        .filter((match) => match.matchWinner === "P2")
        .reduce((acc, match) => acc + match.score, 0);
      const winner =
        P1matchs > P2matchs ? P1Name : P2matchs > P1matchs ? P2Name : "Empate";

      newGameRound({
        winner: winner,
        P1score: P1matchs,
        P2score: P2matchs,
        P1code: { mapFunctions: map, filterFunction: filter },
        P2code: { mapFunctions, filterFunction },
      });
    } else if (room) {
      console.log(`TODO: No connection to ${room}`);
    }
  }

  function clearCode() {
    setMapFunctions([]);
    setFilterFunction(undefined);
    resetCode();
  }

  useEffect(() => {
    if (!dialogOpen) clearCode();
  }, [dialogOpen]);

  return (
    <div className="flex flex-col gap-8 px-6 py-4 relative">
      <div
        className={`flex-1 transition-all duration-300 ${
          tutorialMode && (tutorialStage === 1 || tutorialStage === 2)
            ? "ring-2 ring-emerald-500 rounded-xl p-2 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            : ""
        }`}
      >
        <CodeActions
          onClear={clearCode}
          onRun={runCode}
          onSend={sendCode}
          show={mapFunctions.length > 0 || !!filterFunction?.length}
        />
        <CodeWorkspace
          mapFunctions={mapFunctions}
          filterFunction={filterFunction}
          handleRemoveBlock={handleRemoveBlock}
          onSelectFilter={handleSelectFilter}
          onSelectMap={handleSelectMap}
          availableMapFunctions={MapFunctions}
          availableFilterFunctions={FilterFunctions}
        />
      </div>

      {/* Tutorial Stage 1 Popup */}
      <TutorialPopup stage={1} />

      {/* Tutorial Stage 2 Popup */}
      <TutorialPopup stage={2} />
    </div>
  );
}
