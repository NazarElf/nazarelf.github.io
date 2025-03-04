
import CitizenList from "./CitizenList";
import { BiomeName, NPC } from "../types";
import { Droppable } from "./Droppable";
import { conditions } from "../functions";
import TrashIcon from "../assets/Trash_Slot.png";
import { useNpcStore } from "../npcStore";

type Conditions = {
    biome: BiomeName,
    biomeIndex: number,
    npc?: NPC[]
}

function precise(num: number) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000
}

function Biome({ biome, biomeIndex, npc }: Conditions) {

    const {removeBiome} = useNpcStore()
    const calculated = conditions(biome, ...(npc ?? []))
    return <div className="biome">
        <div className="biome-title">{biome}</div>
        <Droppable id={biomeIndex}>
            <CitizenList list={npc ?? []} biome={biome} />
        </Droppable>
        <div className="biome-footer">
            <div className="biome-calculations">
                {precise(calculated)}
            </div>
            <img className="biome-trash" src={TrashIcon} alt="trash icon" onClick={() => removeBiome(biomeIndex)}/>
        </div>
    </div>
}

export default Biome;