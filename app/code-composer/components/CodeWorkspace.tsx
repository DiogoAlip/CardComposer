import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Check,
  Filter,
  Layers,
  X,
} from "lucide-react";
import type {
  filterFunctions,
  mapFunctions,
} from "~/code-composer/interfaces/functions.type";

const DEFAULT_MAP_FUNCTIONS: mapFunctions[] = [
  "swap",
  "faceUp",
  "faceDown",
  "flipOver",
];

const DEFAULT_FILTER_FUNCTIONS: filterFunctions[] = [
  "isRed",
  "isBlack",
  "isUp",
  "isDown",
];

interface CodeWorkspaceProps {
  mapFunctions: mapFunctions[];
  filterFunction?: filterFunctions;
  handleRemoveBlock: (instanceId: string) => void;
  onSelectFilter?: (func: filterFunctions) => void;
  onSelectMap?: (func: mapFunctions) => void;
  availableMapFunctions?: mapFunctions[];
  availableFilterFunctions?: filterFunctions[];
}

export function CodeWorkspace({
  mapFunctions = [],
  filterFunction,
  handleRemoveBlock,
  onSelectFilter,
  onSelectMap,
  availableMapFunctions = DEFAULT_MAP_FUNCTIONS,
  availableFilterFunctions = DEFAULT_FILTER_FUNCTIONS,
}: CodeWorkspaceProps) {
  const [filterAccordionOpen, setFilterAccordionOpen] = useState(false);
  const [mapAccordionOpen, setMapAccordionOpen] = useState(false);

  const handleFilterClick = (func: filterFunctions) => {
    if (onSelectFilter) {
      onSelectFilter(func);
    } else {
      if (filterFunction === func) {
        handleRemoveBlock(func);
      }
    }
  };

  const handleMapClick = (func: mapFunctions) => {
    if (mapFunctions.includes(func)) {
      handleRemoveBlock(func);
      return;
    }
    if (onSelectMap) {
      onSelectMap(func);
    }
  };

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-3 rounded-xl shadow-lg">
        <div className="font-mono text-zinc-200  rounded-xl">
          <p className="text-base my-2 mt-4 font-mono text-emerald-400 font-semibold">
            {"filter ("}
          </p>
          <div className="border border-zinc-800 rounded-lg overflow-hidden transition-all bg-zinc-950/40">
            <button
              type="button"
              onClick={() => setFilterAccordionOpen(!filterAccordionOpen)}
              className="w-full px-4 py-2.5 flex items-center justify-between bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors text-left text-sm font-medium text-zinc-200"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Filter Functions</span>
                <span className="text-xs text-zinc-500 font-normal">
                  (Select 1)
                </span>
              </div>
              {filterAccordionOpen ? (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {filterAccordionOpen && (
              <div className="p-3 grid grid-cols-2 gap-2 bg-zinc-950/20 border-t border-zinc-800/60">
                {availableFilterFunctions.map((func) => {
                  const isSelected = filterFunction === func;
                  return (
                    <button
                      key={func}
                      type="button"
                      onClick={() => handleFilterClick(func)}
                      className={`px-3 py-2 text-xs font-mono rounded-md border flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <span>{func}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <p className="text-base my-2 ml-8 font-mono text-cyan-400 font-semibold">
            {"map ("}
          </p>
          <div className="flex flex-col ml-8 gap-2">
            <div className="border border-zinc-800 rounded-lg overflow-hidden transition-all bg-zinc-950/40">
              <button
                type="button"
                onClick={() => setMapAccordionOpen(!mapAccordionOpen)}
                className="w-full px-4 py-2.5 flex items-center justify-between bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors text-left text-sm font-medium text-zinc-200"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Map Functions</span>
                  <span className="text-xs text-zinc-500 font-normal">
                    (Select multiple)
                  </span>
                </div>
                {mapAccordionOpen ? (
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                )}
              </button>

              {mapAccordionOpen && (
                <div className="p-3 grid gap-2 bg-zinc-950/20 border-t border-zinc-800/60">
                  {availableMapFunctions
                    .sort((func) => {
                      return mapFunctions.indexOf(func) >= 0
                        ? (mapFunctions.indexOf(func) + 1) * -1
                        : 1;
                    })
                    .map((func, index) => {
                      const isSelected = mapFunctions.includes(func);
                      console.log(mapFunctions.indexOf(func));
                      return (
                        <button
                          key={func}
                          type="button"
                          onClick={() => handleMapClick(func)}
                          className={`px-3 py-2 text-xs font-mono rounded-md border flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-zinc-800/40 border-zinc-800 text-zinc-500 opacity-60"
                              : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          <span>
                            {isSelected ? index + 1 + " " : ""}
                            {func}
                          </span>
                          {isSelected && (
                            <X className="w-3.5 h-3.5 text-red-400" />
                          )}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-base my-2 ml-8 font-mono text-cyan-400 font-semibold">
          {")"}
        </p>
        <p className="text-base my-2 font-mono text-emerald-400 font-semibold">
          {");"}
        </p>
      </div>
    </div>
  );
}
