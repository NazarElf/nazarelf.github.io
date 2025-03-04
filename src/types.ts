export type NpcName =
  | "Guide"
  | "Merchant"
  | "Nurse"
  | "Demolitionist"
  | "DyeTrader"
  | "Angler"
  | "Zoologist"
  | "Dryad"
  | "Painter"
  | "Golfer"
  | "ArmsDealer"
  | "Tavernkeep"
  | "Stylist"
  | "GoblinTinkerer"
  | "WitchDoctor"
  | "Clothier"
  | "Mechanic"
  | "PartyGirl"
  | "Wizard"
  | "TaxCollector"
  | "Truffle"
  | "Pirate"
  | "Steampunker"
  | "Cyborg"
  | "Santa"
  | "Princess";
export type BiomeName =
  | "Forest"
  | "Ocean"
  | "Desert"
  | "Hallow"
  | "Underground"
  | "Jungle"
  | "Snow"
  | "Mushroom";

export const allBiomes: BiomeName[] = [
  "Forest",
  "Ocean",
  "Desert",
  "Hallow",
  "Underground",
  "Jungle",
  "Snow",
  "Mushroom",
];

export class NPC {
  name: NpcName;
  loves: Array<BiomeName | NpcName>;
  likes: Array<BiomeName | NpcName>;
  dislikes: Array<BiomeName | NpcName>;
  hates: Array<BiomeName | NpcName>;
  constructor(
    name: NpcName,
    loves: Array<BiomeName | NpcName>,
    likes: Array<BiomeName | NpcName>,
    dislikes: Array<BiomeName | NpcName>,
    hates: Array<BiomeName | NpcName>
  ) {
    this.name = name;
    this.loves = loves;
    this.likes = likes;
    this.dislikes = dislikes;
    this.hates = hates;
  }
  status(...another: [BiomeName, ...NpcName[]]) {
    let biome = another[0];
    let biomeBonus = 1;

    if (this.loves.includes(biome)) biomeBonus = loveBonus;
    if (this.likes.includes(biome)) biomeBonus = likeBonus;
    if (this.dislikes.includes(biome)) biomeBonus = dislikeBonus;
    if (this.hates.includes(biome)) biomeBonus = hateBonus;

    let populationBonus =
      another.length <= 3 ? 1.05 : another.length >= 5 ? 0.95 : 1;

    if (this.loves.some((rel) => another.slice(1).includes(rel)))
      return biomeBonus * loveBonus * populationBonus;
    if (this.likes.some((rel) => another.slice(1).includes(rel)))
      return biomeBonus * likeBonus * populationBonus;
    if (this.dislikes.some((rel) => another.slice(1).includes(rel)))
      return biomeBonus * dislikeBonus * populationBonus;
    if (this.hates.some((rel) => another.slice(1).includes(rel)))
      return biomeBonus * hateBonus * populationBonus;
    return 1 * biomeBonus * populationBonus;
  }
}
const loveBonus = 1.14;
const likeBonus = 1.06;
const dislikeBonus = 1 - 0.06;
const hateBonus = 1 - 0.14;

export const lessThanTwo = 1.05;
export const moreThanThree = 1 - 0.05;

export type Conditions = {
  biome: BiomeName;
  npc: NPC[];
};
