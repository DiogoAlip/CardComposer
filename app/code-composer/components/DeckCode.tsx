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
import { GameSettingsContext } from "~/match/context/GameSettings.context";
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
    dialogOpen,
    playersName: { P1Name, P2Name },
  } = use(GameRoundContext);
  
  const { tutorialMode, tutorialStage, setTutorialMode, setTutorialStage } =
    use(GameSettingsContext);

  const [isRuned, setIsRuned] = useState(false);

  const MapFunctions = MapFunctionsWithNone.filter((func) => func !== "none");
  const FilterFunctions = FilterFunctionsWithNone.filter(
    (func) => func !== "none",
  );

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

  // Auto scroll to step explanation when sidebar is active
  useEffect(() => {
    if (tutorialMode && (tutorialStage === 1 || tutorialStage === 2)) {
      const workspace = document.querySelector(".custom-scrollbar");
      if (workspace) {
        workspace.scrollTo({ top: tutorialStage === 1 ? 0 : 300, behavior: "smooth" });
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
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-8 px-6 py-4 relative">
        <div className={`transition-all duration-300 ${tutorialMode && tutorialStage === 1 ? "ring-2 ring-emerald-500 rounded-xl p-2 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : ""}`}>
          <FunctionLibrary
            mapFunctions={mapFunctions}
            filterFunction={filterFunction}
            availableMapFunctions={MapFunctions}
            availableFilterFunctions={FilterFunctions}
          />
        </div>

        <div className={`flex-1 transition-all duration-300 ${tutorialMode && tutorialStage === 2 ? "ring-2 ring-emerald-500 rounded-xl p-2 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : ""}`}>
          <h3 className="text-primary font-bold mb-3">Program (Composition)</h3>
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
          />
        </div>

        {/* Tutorial Stage 1 Popup */}
        {tutorialMode && tutorialStage === 1 && (
          <div className="fixed top-24 left-[390px] w-80 bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl z-50 text-zinc-100 flex flex-col gap-3 backdrop-blur-md pointer-events-auto animate-in slide-in-from-left-5 duration-300">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
              <span className="text-xs font-bold uppercase text-emerald-400">Paso 2 de 5</span>
              <span className="text-xs text-zinc-500 font-medium">Biblioteca</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">1. Biblioteca de Funciones</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Arrastra bloques de esta biblioteca. Los morados son <strong>Mapas</strong> (cambian orden o estado de cartas). Los azules son <strong>Filtros</strong> (seleccionan qué cartas se verán afectadas).
              </p>
            </div>
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => setTutorialStage(0)}
                className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
              >
                Anterior
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setTutorialMode(false)}
                  className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                >
                  Omitir
                </button>
                <button
                  onClick={() => setTutorialStage(2)}
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tutorial Stage 2 Popup */}
        {tutorialMode && tutorialStage === 2 && (
          <div className="fixed bottom-24 left-[390px] w-80 bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl z-50 text-zinc-100 flex flex-col gap-3 backdrop-blur-md pointer-events-auto animate-in slide-in-from-left-5 duration-300">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
              <span className="text-xs font-bold uppercase text-emerald-400">Paso 3 de 5</span>
              <span className="text-xs text-zinc-500 font-medium">Programa</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">2. Espacio de Trabajo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Arrastra las funciones aquí para programar tu rutina. Presiona <strong>Run</strong> para previsualizar los cambios locales en tus cartas. Presiona <strong>Send Code</strong> para jugar contra el oponente.
              </p>
            </div>
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => setTutorialStage(1)}
                className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
              >
                Anterior
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setTutorialMode(false)}
                  className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                >
                  Omitir
                </button>
                <button
                  onClick={() => setTutorialStage(3)}
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
}
