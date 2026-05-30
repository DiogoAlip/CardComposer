import { Draggable } from "../Draggable.layout";
import type { filterFunctions, mapFunctions } from "~/interface/functions.type";

interface FunctionLibraryProps {
  mapFunctions: mapFunctions[];
  filterFunction?: filterFunctions;
  availableMapFunctions: string[];
  availableFilterFunctions: string[];
}

export function FunctionLibrary({
  mapFunctions,
  filterFunction,
  availableMapFunctions,
  availableFilterFunctions,
}: FunctionLibraryProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-2 w-1/2">
        <h3 className="text-primary font-bold text-center">Map Functions</h3>
        {availableMapFunctions.map(
          (key) =>
            !mapFunctions.includes(key as mapFunctions) && (
              <Draggable key={key} id={key} className="hover:scale-150">
                {key}
              </Draggable>
            ),
        )}
      </div>
      <div
        className={`flex flex-col gap-2 w-1/2 ${filterFunction ? "hidden" : ""}`}
      >
        <h3 className="text-primary font-bold text-center">Filter Functions</h3>
        {availableFilterFunctions.map((key) => (
          <Draggable key={key} id={key} className="hover:scale-150">
            {key}
          </Draggable>
        ))}
      </div>
    </div>
  );
}
