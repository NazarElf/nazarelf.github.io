import Citizen from "./Citizen";
import { BiomeName, NPC } from "../types";

function CitizenList({ list, biome }: { list: NPC[], biome?: BiomeName }) {
    const conditions: [BiomeName, ...NPC[]] | undefined = biome ? [biome, ...list] : undefined
    return <div className="citizen-list">
        {list.map(npc =>
            <Citizen key={npc.name} npc={npc} list={conditions} />
        )}
    </div>
}

export default CitizenList;