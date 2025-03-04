import { BiomeName, NPC } from "./types";

export function relationship(npc: NPC, relTo: Array<NPC>, biome: BiomeName) {
  let npcWithData = npc;
  if (!npcWithData) throw new Error("npc not found: " + relTo);
  return 1 *
    npcWithData.status(biome, ...relTo.map((curr) => curr.name));
}

export function conditions(biome: BiomeName, ...rest: NPC[]) {
  let sum = 0;
  rest.forEach((npc) => {
    sum += relationship(npc, rest, biome);
  });
  return sum;
}
