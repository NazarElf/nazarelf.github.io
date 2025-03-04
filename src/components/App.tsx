//import React from 'react';
import { useState } from 'react';
import { allBiomes, BiomeName, NpcName } from '../types';
import Biome from './Biome';
import CitizenList from './CitizenList';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import '../assets/css/app.css'
import { Droppable } from './Droppable';
import { useNpcStore } from '../npcStore';
import SerializerOptions from './SerilizerOptions';
import OverallStats from './OverallStats';

const dictionary = new Map<number, BiomeName>()
allBiomes.forEach((name, index) => { dictionary.set(index + 1, name) })

function App() {
  const [isAdding, setAdding] = useState(false)
  const { biomes, unsettled, addBiome, moveNpc, unsettleNpc } = useNpcStore()

  const isAddingClick = () => {
    setAdding(true)
  }
  const selectChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdding(false)
    let value = Number(e.currentTarget.value);
    if (!value)
      return
    let biome = dictionary.get(value)
    if (!biome)
      return
    addBiome(biome)
  }


  function handleDragEnd(event: DragEndEvent) {
    if (event.over && !Number.isNaN(Number(event.over.id))) {
      let npc = event.active.id as NpcName
      moveNpc(npc, Number(event.over.id))
    }
    if (event.over && (Number.isNaN(Number(event.over.id)) || event.over.id === null)) {
      let npc = event.active.id as NpcName
      unsettleNpc(npc)
    }
  }


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='main'>
        <div className='available-npc'>
          <Droppable>
            <CitizenList list={unsettled} />
          </Droppable></div>
        <div className="conditions-list-wrapper">
          <div className="conditions-list">
            {biomes.map((biome, index) => <Biome key={index} biome={biome.biome} biomeIndex={index} npc={biome.npc} />)}
            {isAdding ?
              <select onChange={selectChanges}>
                <option>-- select biome to add --</option>
                {Array.from(dictionary.entries()).map(biomeOption => <option key={biomeOption[0]} value={biomeOption[0]}>{biomeOption[1]}</option>)}
              </select> :
              <button onClick={isAddingClick} className='default-button'>+</button>
            }
          </div>
        </div>
        <OverallStats />
        <SerializerOptions />
      </div>
    </DndContext>
  );
}

export default App;
