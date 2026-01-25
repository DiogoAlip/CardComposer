import { useParams, useNavigate } from "react-router";
import { use, useEffect, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Play, SendHorizonal, Trash } from 'lucide-react';
import { Draggable } from './Draggable.layout';
import { Droppable } from './Droppable.layout';
import { DroppableButton } from './DroppableButton';
import { Button } from '../ui/button';
import { resetCode } from '../../store/cards.thunk';
import { Bot } from '~/helpers/player.bot';
import { useCardsStore } from '~/store/cards.store';
import {
  MapFunctions as MapFunctionsWithNone,
  FilterFunctions as FilterFunctionsWithNone,
  simulateMap,
  simulateFilter
} from '~/helpers/card.functions';
import type { filterFunctions, mapFunctions } from "~/interface/functions.type";
import type { Card } from "~/interface/card.interface";
import { GameRoundContext } from '~/context/GameRound.context';

interface DeckCodeProps {
  CardsFromPlayer1: {FrontRow: Card[], BackRow: Card[]}
  CardsFromPlayer2: {FrontRow: Card[], BackRow: Card[]}
}

export function DeckCode({CardsFromPlayer1, CardsFromPlayer2}: DeckCodeProps) {
  const [mapFunctions, setMapFunctions] = useState<string[]>([]);
  const [filterFunction, setFilterFunction] = useState<string>();
  const [isClient, setIsClient] = useState(false);
  const {SetCardsInOnePlayer} = useCardsStore()
  const navigate = useNavigate()
  const {dificulty, room} = useParams();
  const {setDialogOpen, setBothPlayersNames} = use(GameRoundContext);
  const [ isRuned, setIsRuned ] = useState(false)
  
  const MapFunctions = MapFunctionsWithNone.filter((func) => func !== 'none')
  const FilterFunctions = FilterFunctionsWithNone.filter((func) => func !== 'none')
  
  useEffect(() => {
    setIsClient(true)
  },[])
  
  useEffect(() => {
    if(mapFunctions.length === 0 || !filterFunction?.length){
      setIsRuned(false)
    }
    resetCode()
    setIsRuned(false)
  },[mapFunctions, filterFunction])

  useEffect(() => {
    const dificultyValidator = dificulty === 'easy' || dificulty === 'normal' || dificulty === 'advanced'
    if (!dificultyValidator && !room) {
      navigate('/play')
    }else{
      if(!room){
        setBothPlayersNames({player1: 'Bot', player2: 'Human'})
      }
    }
  }, [])
  
  if (!isClient) return null;
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (
      over &&
      over.id === 'mapDroppable' &&
      MapFunctions.includes(active.id.toString())
    ) {
      setMapFunctions((prev) => [...prev, active.id.toString()]);
    } else if (
      over &&
      over.id === 'filterDroppable' &&
      !filterFunction?.length &&
      FilterFunctions.includes(active.id.toString())
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
    const MapedCards = simulateMap(CardsFromPlayer2, mapFunctions as mapFunctions[])
    const FilteredCards = simulateFilter(MapedCards.FrontRow, filterFunction as filterFunctions)
    SetCardsInOnePlayer(2, FilteredCards, MapedCards.BackRow)
    setIsRuned(true)
  }

  function sendCode (){
    if(mapFunctions.length === 0 || !filterFunction?.length){
      console.log("No map functions or filter function", "Is necesary to have at least one map function and one filter function")
      return
    }
    if(!isRuned){
      runCode()
    }
    if (dificulty) {
      const { FrontRow, BackRow } = CardsFromPlayer1
      const { finalCards } = Bot({
        cards: {
          FrontRow,
          BackRow
        },
        difficulty: dificulty
      })
      SetCardsInOnePlayer(1, finalCards.FrontRow, finalCards.BackRow)

    }else if (room){
      console.log(`TODO: No connection to ${room}`)
    }
    setDialogOpen(true)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex flex-col gap-8 px-6 py-4'>        
        <div className='flex flex-row gap-2 w-full'>
          <div className='flex flex-col gap-2 w-1/2'>
            <h3 className="text-primary font-bold text-center">Map Functions</h3>
            {MapFunctions.map((key) => !mapFunctions.includes(key) && (
              <Draggable key={key} id={key} className='hover:scale-150'>
                {key}
              </Draggable>
            ))}
          </div>
          <div className={`flex flex-col gap-2 w-1/2 ${filterFunction ? 'hidden' : ''}`}>
            <h3 className="text-primary font-bold text-center">Filter Functions</h3>
            {FilterFunctions.map((key) => (
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
  
  