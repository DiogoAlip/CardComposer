import { Droppable } from "@/shared/components/Droppable.layout";
import { DroppableButton } from "@/shared/components/DroppableButton";
import type {
  filterFunctions,
  mapFunctions,
} from "~/code-composer/interfaces/functions.type";

interface CodeWorkspaceProps {
  mapFunctions: mapFunctions[];
  filterFunction?: filterFunctions;
  handleRemoveBlock: (instanceId: string) => void;
}

export function CodeWorkspace({
  mapFunctions,
  filterFunction,
  handleRemoveBlock,
}: CodeWorkspaceProps) {
  return (
    <div className="flex-1">
      <p className="text-base my-2 mt-4">{"filter ("}</p>
      <div className="ml-8">
        <Droppable id="filterDroppable">
          {filterFunction ? (
            <DroppableButton
              key={filterFunction}
              instanceId={filterFunction}
              paragraph={filterFunction}
              handleRemoveBlock={() => handleRemoveBlock(filterFunction)}
            />
          ) : (
            <p className="text-sm text-gray-500 italic">
              Filter function here...
            </p>
          )}
        </Droppable>
      </div>
      <p className="text-base my-2 ml-8">{"map ("}</p>
      <div className="ml-16">
        <Droppable id="mapDroppable">
          <div className="flex flex-col gap-2">
            {mapFunctions.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                Map functions here...
              </p>
            )}
            {mapFunctions.map((block) => (
              <DroppableButton
                key={block}
                instanceId={block}
                paragraph={block}
                handleRemoveBlock={() => handleRemoveBlock(block)}
              />
            ))}
          </div>
        </Droppable>
      </div>
      <p className="text-base my-2 ml-8">{")"}</p>
      <p className="text-base my-2">{");"}</p>
    </div>
  );
}
