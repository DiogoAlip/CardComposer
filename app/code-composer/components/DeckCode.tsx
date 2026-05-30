import { useParams, useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
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
import type {
  filterFunctions,
  mapFunctions,
} from "~/code-composer/interfaces/functions.type";
import type { Card } from "~/deck/interfaces/card.interface";
import type { difficultyType } from "~/player/interfaces/difficulty.type";
import { evaluateMatchup } from "~/match/helpers/getMatch";

import { FunctionLibrary } from "./FunctionLibrary";
import { CodeActions } from "./CodeActions";
import { CodeWorkspace } from "./CodeWorkspace";

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
    gameRounds,
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);
  const [isRuned, setIsRuned] = useState(false);

  const MapFunctions = MapFunctionsWithNone.filter((func) => func !== "none");
  const FilterFunctions = FilterFunctionsWithNone.filter(
    (func) => func !== "none",
  );

  useEffect(() => {
    if (mapFunctions.length === 0 || !filterFunction?.length) {
      resetCode();
    }
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (
      over &&
      over.id === "mapDroppable" &&
      MapFunctions.includes(active.id.toString() as mapFunctions)
    ) {
      setMapFunctions((prev) => [
        ...prev,
        active.id.toString() as mapFunctions,
      ]);
    } else if (
      over &&
      over.id === "filterDroppable" &&
      !filterFunction?.length &&
      FilterFunctions.includes(active.id.toString() as filterFunctions)
    ) {
      setFilterFunction(active.id.toString() as filterFunctions);
    }
  }

  function handleRemoveBlock(instanceId: string) {
    if (filterFunction === instanceId) {
      setFilterFunction(undefined);
    } else {
      setMapFunctions((prev) => prev.filter((block) => block !== instanceId));
    }
  }

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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-8 px-6 py-4">
        <FunctionLibrary
          mapFunctions={mapFunctions}
          filterFunction={filterFunction}
          availableMapFunctions={MapFunctions}
          availableFilterFunctions={FilterFunctions}
        />

        <div className="flex-1">
          <h3 className="text-primary font-bold mb-3">Program (Composition)</h3>
          <CodeActions
            onClear={() => {
              setMapFunctions([]);
              setFilterFunction(undefined);
              resetCode();
            }}
            onRun={runCode}
            onSend={sendCode}
            show={mapFunctions.length > 0 || !!filterFunction?.length}
          />
          <CodeWorkspace
            mapFunctions={mapFunctions}
            filterFunction={filterFunction}
            handleRemoveBlock={handleRemoveBlock}
          />
        </div>
      </div>
    </DndContext>
  );
}
