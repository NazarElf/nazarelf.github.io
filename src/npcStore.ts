import { create } from "zustand";
import data from "./availableCitizens.json";
import { BiomeName, Conditions, NPC, NpcName } from "./types";

const availableBiomes: BiomeName[] = [
  "Desert",
  "Forest",
  "Hallow",
  "Jungle",
  "Mushroom",
  "Ocean",
  "Snow",
  "Underground",
];
const availableNpc: NpcName[] = data.map((dat) => dat.name as NpcName);

interface Store {
  unsettled: NPC[];
  biomes: Conditions[];
  data: NPC[];
  addBiome: (biome: BiomeName) => void;
  moveNpc: (npc: NpcName, biomeIndex: number) => void;
  unsettleNpc: (npc: NpcName) => void;
  getNpcData: (npc: NpcName) => NPC;
  removeBiome: (biomeIndex: number) => void;
  getJson: () => string;
  loadJson: (json: Record<string, unknown>[]) => void;
  getStatus: () => number;
}

function transformData() {
  let npc: NPC[] = [];
  data.forEach((value) =>
    npc.push(
      new NPC(
        value.name as NpcName,
        value.loves as [BiomeName, ...NpcName[]],
        value.likes as [BiomeName, ...NpcName[]],
        value.dislikes as [BiomeName, ...NpcName[]],
        value.hates as [BiomeName, ...NpcName[]]
      )
    )
  );
  return npc;
}

function getNpcFromName(name: NpcName) {
  let res = data.find((value) => value.name === name);
  if (!res) throw new Error("Npc not found" + name);
  return new NPC(
    res.name as NpcName,
    res.loves as [BiomeName, ...NpcName[]],
    res.likes as [BiomeName, ...NpcName[]],
    res.dislikes as [BiomeName, ...NpcName[]],
    res.hates as [BiomeName, ...NpcName[]]
  );
}

export const useNpcStore = create<Store>((set, get) => ({
  unsettled: transformData().sort((a, b) => a.name.localeCompare(b.name)),
  biomes: [],
  data: transformData(),
  addBiome: (biome) =>
    set((state) => ({ biomes: [...state.biomes, { biome, npc: [] }] })),
  moveNpc: (npc, biomeIndex) =>
    set((state) =>
      state.biomes.findIndex((biome) =>
        biome.npc.some((curr) => curr.name === npc)
      ) === biomeIndex
        ? {}
        : {
            biomes: [
              ...state.biomes.map((biome, index) =>
                index === biomeIndex
                  ? {
                      biome: biome.biome,
                      npc: [...biome.npc, getNpcFromName(npc)],
                    }
                  : {
                      biome: biome.biome,
                      npc: biome.npc.filter((curr) => curr.name !== npc),
                    }
              ),
            ],
            unsettled: state.unsettled.filter((curr) => curr.name !== npc),
          }
    ),
  unsettleNpc: (npc) =>
    set((state) =>
      state.unsettled.some((curr) => curr.name === npc)
        ? {}
        : {
            unsettled: [...state.unsettled, getNpcFromName(npc)].sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
            biomes: [
              ...state.biomes.map((biome) => ({
                biome: biome.biome,
                npc: biome.npc.filter((curr) => curr.name !== npc),
              })),
            ],
          }
    ),
  getNpcData: (npc) => {
    let npcToReturn = get().data.find((curr) => (curr.name = npc));
    if (!npcToReturn) throw Error(`NPC "${npc}" not found`);
    return npcToReturn;
  },
  removeBiome: (biomeIndex) =>
    set((state) => {
      return {
        unsettled: [...state.unsettled, ...state.biomes[biomeIndex].npc].sort(
          (a, b) => a.name.localeCompare(b.name)
        ),
        biomes: state.biomes.filter((_, index) => index !== biomeIndex),
      };
    }),
  getJson: () => {
    return JSON.stringify(get().biomes);
  },
  loadJson: (json) =>
    set((state) => {
      const jsonIsAvailable = json.every(
        (element) =>
          Object.hasOwn(element, "biome") &&
          typeof element.biome === "string" &&
          availableBiomes.includes(element.biome as BiomeName) &&
          Object.hasOwn(element, "npc") &&
          Array.isArray(element.npc) &&
          element.npc.every(
            (el) =>
              (typeof el === "string" &&
                availableNpc.includes(el as NpcName)) ||
              (typeof el === "object" &&
                Object.hasOwn(el, "name") &&
                availableNpc.includes(el.name))
          )
      );
      if (!jsonIsAvailable) return {};
      let newJson = json as Array<{
        biome: BiomeName;
        npc:
          | Array<NpcName>
          | Array<{ name: NpcName } & Record<string, unknown>>;
      }>;
      return {
        biomes: newJson.map((element) => ({
          biome: element.biome,
          npc: element.npc.map((npc) =>
            getNpcFromName(typeof npc === "string" ? npc : npc.name)
          ),
        })),
        unsettled: state.unsettled.filter(
          (npc) =>
            !newJson.some((biome) =>
              biome.npc.some(
                (curr) =>
                  (typeof curr === "string" ? curr : curr.name) === npc.name
              )
            )
        ),
      };
    }),
  getStatus: () => {
    let biomes = get().biomes;
    let res = biomes.reduce(
      (prev, curr) =>
        curr.npc.reduce(
          (prevV, currNpc) =>
            currNpc.status(curr.biome, ...curr.npc.map((c) => c.name)) + prevV,
          0
        ) + prev,
      0
    );
    return res;
  },
}));
