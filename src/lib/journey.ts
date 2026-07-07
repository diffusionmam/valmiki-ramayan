import type { KandaSlug } from "./kanda-meta";

export interface JourneyWaypoint {
  id: string;
  name: string;
  nameDevanagari: string;
  x: number;
  y: number;
  order: number;
  description: string;
  significance: string;
  markerColor: string;
  kanda: KandaSlug;
  sarga: number;
}

export interface River {
  name: string;
  path: string;
}

export interface Region {
  name: string;
  x: number;
  y: number;
}

// viewBox 0 0 1000 700

export const JOURNEY_WAYPOINTS: JourneyWaypoint[] = [
  {
    id: "ayodhya",
    name: "Ayodhya",
    nameDevanagari: "अयोध्या",
    x: 440,
    y: 180,
    order: 1,
    description:
      "The capital of the Solar dynasty on the banks of the Sarayu river, where King Dasharatha ruled and Rama was born. The epic begins and ends here — Rama's coronation marks both the promise and the fulfillment of his journey.",
    significance: "The starting point — birth and coronation",
    markerColor: "#0E7C7B",
    kanda: "bala",
    sarga: 6,
  },
  {
    id: "chitrakoot",
    name: "Chitrakoot",
    nameDevanagari: "चित्रकूट",
    x: 460,
    y: 270,
    order: 2,
    description:
      "The forest hermitage where Rama, Sita, and Lakshmana spent their first years of exile. Bharata came here to plead with Rama to return, and received his sandals to rule as regent. The meeting of the brothers is one of the epic's most emotional scenes.",
    significance: "The farewell — Bharata's devotion",
    markerColor: "#4338CA",
    kanda: "ayodhya",
    sarga: 73,
  },
  {
    id: "dandaka",
    name: "Dandaka Forest",
    nameDevanagari: "दण्डकारण्य",
    x: 500,
    y: 360,
    order: 3,
    description:
      "The vast and fearsome forest stretching across central India, inhabited by sages performing penance and demons who tormented them. Rama, Sita, and Lakshmana wandered here for ten years, protecting sages and encountering Surpanakha, whose mutilation triggered the war.",
    significance: "The wilderness — ten years of wandering",
    markerColor: "#166534",
    kanda: "aranya",
    sarga: 1,
  },
  {
    id: "panchavati",
    name: "Panchavati",
    nameDevanagari: "पञ्चवटी",
    x: 540,
    y: 430,
    order: 4,
    description:
      "The hermitage by the Godavari river, shaded by five banyan trees. Here Sita was abducted by Ravana in disguise, and the aged vulture king Jatayu fought valiantly to save her, falling with broken wings but living to tell Rama what had happened.",
    significance: "The turning point — Sita's abduction",
    markerColor: "#9F1239",
    kanda: "aranya",
    sarga: 43,
  },
  {
    id: "kishkindha",
    name: "Kishkindha",
    nameDevanagari: "किष्किन्धा",
    x: 430,
    y: 510,
    order: 5,
    description:
      "The monkey kingdom deep in the hills, where Rama befriended Hanuman and forged an alliance with Sugriva. After helping Sugriva defeat his brother Vali, Rama waited here through the monsoon while search parties scoured the earth for Sita.",
    significance: "The alliance — meeting Hanuman",
    markerColor: "#B45309",
    kanda: "kishkindha",
    sarga: 1,
  },
  {
    id: "rameshwaram",
    name: "Rameshwaram",
    nameDevanagari: "रामेश्वरम्",
    x: 620,
    y: 560,
    order: 6,
    description:
      "The southernmost shore of India, where Rama worshipped Lord Shiva by the sea. From here the Vanara army began building the bridge of stones across the ocean — a feat of devotion and engineering that made the invasion of Lanka possible.",
    significance: "The shore — bridge to Lanka",
    markerColor: "#1D4ED8",
    kanda: "yuddha",
    sarga: 22,
  },
  {
    id: "ram-setu",
    name: "Ram Setu",
    nameDevanagari: "रामसेतु",
    x: 730,
    y: 575,
    order: 7,
    description:
      "The legendary bridge of stones inscribed with Rama's name, built by Nala and the Vanara army across the shallow strait. The stones floated by the power of Rama's devotion, creating a path for an army of thousands to cross to Lanka.",
    significance: "The crossing — the bridge of stone",
    markerColor: "#475569",
    kanda: "yuddha",
    sarga: 25,
  },
  {
    id: "lanka",
    name: "Lanka",
    nameDevanagari: "लङ्का",
    x: 840,
    y: 560,
    order: 8,
    description:
      "The golden city of Ravana on the island across the ocean. Hanuman leapt here to find Sita in the Ashoka grove, and the great war was fought on its shores — culminating in Ravana's fall and Sita's fire ordeal before the return to Ayodhya.",
    significance: "The destination — war and redemption",
    markerColor: "#6B21A8",
    kanda: "sundara",
    sarga: 1,
  },
];

export const ROUTE_PATH: string = JOURNEY_WAYPOINTS.map(
  (w) => `${w.order === 1 ? "M" : "L"} ${w.x} ${w.y}`
).join(" ");

export const RIVERS: River[] = [
  {
    name: "Sarayu",
    path: "M 400 120 C 430 140, 440 160, 450 200 C 460 240, 455 280, 440 320",
  },
  {
    name: "Ganga",
    path: "M 300 100 C 380 130, 470 140, 560 150 C 650 160, 720 170, 780 180",
  },
  {
    name: "Godavari",
    path: "M 480 380 C 510 400, 530 420, 545 440 C 560 460, 570 480, 580 510",
  },
];

export const REGIONS: Region[] = [
  { name: "Kosala", x: 400, y: 160 },
  { name: "Dandaka", x: 520, y: 330 },
  { name: "Vanara Kingdom", x: 400, y: 490 },
  { name: "Lanka", x: 850, y: 540 },
];
