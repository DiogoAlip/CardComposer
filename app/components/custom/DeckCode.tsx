import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { DraggableFunction } from './DraggableFunction';
import { Droppable } from './Droppable';
import { DeckMapFunctions } from '../../helpers/getFunctions';

interface ProgramBlock {
  instanceId: string;
  functionKey: string;
}

export function DeckCode() {
  const functionKeys = Object.keys(DeckMapFunctions);
  const [program, setProgram] = useState<ProgramBlock[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && over.id === 'droppable') {
      const newBlock: ProgramBlock = {
        instanceId: `${active.id}-${Date.now()}`,
        functionKey: active.id.toString(),
      };
      setProgram((prev) => [...prev, newBlock]);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex flex-row gap-8 p-6 bg-black/50 rounded-xl'>
        
        <div className='flex flex-col gap-2 w-1/3'>
          <h3 className="text-primary font-bold">Funciones Disponibles</h3>
          {functionKeys.map((key) => (
            <DraggableFunction key={key} id={key}>
              {key}
            </DraggableFunction>
          ))}
        </div>

        <div className='flex-1'>
          <h3 className="text-secondary font-bold mb-2">Programa (Composición)</h3>
          <Droppable id="droppable">
            <div className="flex flex-col gap-2">
              {program.length === 0 && (
                <p className="text-sm text-gray-500 italic">Arrastra funciones aquí...</p>
              )}
              {program.map((block) => (
                <div 
                  key={block.instanceId} 
                  className="p-3 bg-secondary/20 border border-secondary rounded shadow-sm text-white"
                >
                  {block.functionKey}
                </div>
              ))}
            </div>
          </Droppable>
          
          {program.length > 0 && (
            <button 
              onClick={() => setProgram([])}
              className="mt-4 text-xs text-red-400 hover:underline"
            >
              Limpiar secuencia
            </button>
          )}
        </div>

      </div>
    </DndContext>
  );
}
  
  