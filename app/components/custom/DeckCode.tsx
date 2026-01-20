import { useEffect, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Draggable } from './Draggable.layout';
import { Droppable } from './Droppable.layout';
import { DroppableButton } from './DroppableButton';
import { DeckMapFunctions, DeckFilterFunctions } from '../../helpers/getFunctions';
import { Button } from '../ui/button';
import { Play, SendHorizonal, Trash } from 'lucide-react';
import { resetCode } from '../../store/cards.thunk';
import { useParams } from "react-router";
import { Bot } from '~/helpers/player.bot';
import { useCardsStore } from '~/store/cards.store';

export function DeckCode() {
  const mapFunctionKeys = Object.keys(DeckMapFunctions);
  const filterFunctionKeys = Object.keys(DeckFilterFunctions);
  const [mapFunctions, setMapFunctions] = useState<string[]>([]);
  const [filterFunction, setFilterFunction] = useState<string>();
  const [isClient, setIsClient] = useState(false);
  const {SetCardsInOnePlayer, CardsFromPlayer1} = useCardsStore()
  const {dificulty} = useParams();
  
  useEffect(() => {
    setIsClient(true)
  },[])
  
  useEffect(() => {
    if(mapFunctions.length === 0 || !filterFunction?.length){
      resetCode()
    }
  },[mapFunctions, filterFunction])
  
  if (!isClient) return null;
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (
      over &&
      over.id === 'mapDroppable' &&
      mapFunctionKeys.includes(active.id.toString())
    ) {
      setMapFunctions((prev) => [...prev, active.id.toString()]);
    } else if (
      over &&
      over.id === 'filterDroppable' &&
      !filterFunction?.length &&
      filterFunctionKeys.includes(active.id.toString())
    ) {
      setFilterFunction(active.id.toString());
    }
  }

  function handleRemoveBlock(instanceId: string) {
    if (filterFunction === instanceId) {
      setFilterFunction(undefined);
    } else {
      setMapFunctions((prev) => prev.filter((block) => block !== instanceId));
    }
  }

  function runCode (){
    const mapFunctionsForEject = mapFunctions.map((key) => DeckMapFunctions[key as keyof typeof DeckMapFunctions]);
    const filterFunctionForEject = filterFunction ? DeckFilterFunctions[filterFunction as keyof typeof DeckFilterFunctions] : null;
    
    filterFunctionForEject?.()
    mapFunctionsForEject.map((func) => {
      func()
    })
  }

  function sendCode (){
    
    if (dificulty) {
      const { FrontRow, BackRow } = CardsFromPlayer1
      const { finalCards, map, filter } = Bot({
        cards: {
          FrontRow,
          BackRow
        },
        difficulty: dificulty
      })
      SetCardsInOnePlayer(1, finalCards.FrontRow, finalCards.BackRow)
      console.log(map, filter)
    }else{
      console.log('TODO: No connection to server')
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex flex-col gap-8 px-6 py-4'>        
        <div className='flex flex-row gap-2 w-full'>
          <div className='flex flex-col gap-2 w-1/2'>
            <h3 className="text-primary font-bold text-center">Map Functions</h3>
            {mapFunctionKeys.map((key) => !mapFunctions.includes(key) && (
              <Draggable key={key} id={key} className='hover:scale-150'>
                {key}
              </Draggable>
            ))}
          </div>
          <div className={`flex flex-col gap-2 w-1/2 ${filterFunction ? 'hidden' : ''}`}>
            <h3 className="text-primary font-bold text-center">Filter Functions</h3>
            {filterFunctionKeys.map((key) => (
              <Draggable key={key} id={key} className='hover:scale-150'>
                {key}
              </Draggable>
            ))}
          </div>
        </div>

        <div className='flex-1'>
          <h3 className="text-primary font-bold mb-3">Program (Composition)</h3>
          {(mapFunctions.length > 0 || !!filterFunction?.length) && (
            <div className='flex flex-row gap-4'>
              <Button 
                onClick={() => {
                  setMapFunctions([])
                  setFilterFunction('')
                }}
                className="text-xs border text-red-400 bg-transparent hover:text-black hover:bg-red-400 border-red-400 rounded px-2 py-1"
              >
                <Trash/>
                <p className='text-sm'>Clear</p>
              </Button>
              <Button
                onClick={runCode}
                className='text-xs border text-green-400 bg-transparent hover:text-black hover:bg-green-400 border-green-400 rounded px-2 py-1'
              >
                <Play/>
                <p className='text-sm'>Run</p>
              </Button>
              <Button
                className='text-xs border text-cyan-500 bg-transparent hover:text-black hover:bg-cyan-500 border-cyan-500 rounded px-2 py-1'
                onClick={sendCode}
              >
                <SendHorizonal/>
                <p className='text-sm'>Send</p>
              </Button>
            </div>
          )}
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
                <p className="text-sm text-gray-500 italic">Filter function here...</ p>
              )}
            </Droppable>
          </div>
          <p className="text-base my-2 ml-8">{"map ("}</p>
          <div className="ml-16">
            <Droppable id="mapDroppable">
              <div className="flex flex-col gap-2">
                {mapFunctions.length === 0 && (
                  <p className="text-sm text-gray-500 italic">Map functions here...</p>
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
      </div>
    </DndContext>
  );
}
  
  