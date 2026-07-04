import type { KandaSlug } from "./kanda-meta";

export interface KandaArc {
  /** Arc name, e.g. "Forest Sojourn". */
  name: string;
  /** Inclusive start sarga number. */
  start: number;
  /** Inclusive end sarga number. */
  end: number;
  /** One-line description of this arc. */
  description: string;
}

export interface KandaKeyMoment {
  /** Moment title, e.g. "Birth of Rama". */
  title: string;
  /** One-line description. */
  description: string;
  /** Recommended sarga to read. */
  sarga: number;
}

export interface KandaArcData {
  arcs: KandaArc[];
  moments: KandaKeyMoment[];
}

/**
 * Narrative arc groupings and key moments for each kanda, derived from
 * the well-known structure of Valmiki's Ramayana. Sarga ranges are
 * approximate and based on the standard critical edition mapping.
 */
export const KANDA_ARCS: Record<KandaSlug, KandaArcData> = {
  bala: {
    arcs: [
      {
        name: "Origin of the Epic",
        start: 1,
        end: 5,
        description:
          "Sage Narada recounts Rama's story to Valmiki, who receives divine guidance to compose the epic.",
      },
      {
        name: "The City of Ayodhya",
        start: 6,
        end: 16,
        description:
          "Ayodhya's splendor, King Dasharatha's reign, and the lineage of the Solar dynasty.",
      },
      {
        name: "The Birth of the Princes",
        start: 17,
        end: 22,
        description:
          "The fire ritual, the birth of Rama and his brothers, and their sacred naming.",
      },
      {
        name: "Education and Youth",
        start: 23,
        end: 31,
        description:
          "Vishvamitra's arrival, the education of the princes, and the slaying of demons.",
      },
      {
        name: "Ahalya's Redemption",
        start: 32,
        end: 33,
        description:
          "Rama restores the sage's wife Ahalya from her curse — a moment of compassion.",
      },
      {
        name: "The Court of Janaka",
        start: 34,
        end: 67,
        description:
          "The journey to Mithila, the court of King Janaka, and the legends of Shiva's bow.",
      },
      {
        name: "Breaking of the Bow & Marriage",
        start: 68,
        end: 77,
        description:
          "Rama breaks the divine bow of Shiva, wins Sita's hand, and the wedding celebrations.",
      },
    ],
    moments: [
      {
        title: "Birth of Rama",
        description:
          "The divine birth of the four princes to King Dasharatha and his queens.",
        sarga: 18,
      },
      {
        title: "Breaking of Shiva's Bow",
        description:
          "Rama lifts and breaks the unbreakable bow of Shiva, winning Sita's hand in marriage.",
        sarga: 75,
      },
      {
        title: "The Divine Wedding",
        description:
          "The sacred marriage of Rama and Sita, uniting two great dynasties.",
        sarga: 77,
      },
      {
        title: "Parashurama's Challenge",
        description:
          "The confrontation between Rama and the sage-warrior Parashurama.",
        sarga: 76,
      },
    ],
  },

  ayodhya: {
    arcs: [
      {
        name: "Coronation Preparations",
        start: 1,
        end: 12,
        description:
          "King Dasharatha announces Rama's coronation, and the city rejoices.",
      },
      {
        name: "Kaikeyi's Boons",
        start: 13,
        end: 20,
        description:
          "Queen Kaikeyi, swayed by Manthara, demands her boons — Bharata's coronation and Rama's exile.",
      },
      {
        name: "Rama's Acceptance",
        start: 21,
        end: 34,
        description:
          "Rama accepts exile with grace, Sita insists on joining, and Lakshmana accompanies them.",
      },
      {
        name: "The Departure",
        start: 35,
        end: 42,
        description:
          "The heart-wrenching farewell as Rama, Sita, and Lakshmana leave Ayodhya.",
      },
      {
        name: "Dasharatha's Grief",
        start: 43,
        end: 58,
        description:
          "King Dasharatha's anguish and his recounting of his past sins to Kausalya.",
      },
      {
        name: "Bharata's Return",
        start: 59,
        end: 72,
        description:
          "Bharata returns to Ayodhya, rejects the throne, and sets out to find Rama.",
      },
      {
        name: "Meeting at Chitrakoot",
        start: 73,
        end: 90,
        description:
          "Bharata pleads with Rama to return, receives his sandals, and rules as regent.",
      },
      {
        name: "Death of Dasharatha",
        start: 91,
        end: 108,
        description:
          "King Dasharatha's final days, his memories of Rama, and his passing.",
      },
      {
        name: "The Forest Awaits",
        start: 109,
        end: 119,
        description:
          "Rama, Sita, and Lakshmana depart Chitrakoot for the deep forest of Dandaka.",
      },
    ],
    moments: [
      {
        title: "The Coronation Announced",
        description:
          "King Dasharatha declares Rama as his successor, and Ayodhya celebrates.",
        sarga: 2,
      },
      {
        title: "Kaikeyi's Demand",
        description:
          "Kaikeyi demands Rama's exile and Bharata's coronation — the turning point of the epic.",
        sarga: 14,
      },
      {
        title: "Sita's Resolve",
        description:
          "Sita insists on accompanying Rama to the forest, refusing to stay behind.",
        sarga: 27,
      },
      {
        title: "Bharata's Devotion",
        description:
          "Bharata refuses the throne and takes Rama's sandals to rule as regent.",
        sarga: 85,
      },
    ],
  },

  aranya: {
    arcs: [
      {
        name: "Forest Sojourn",
        start: 1,
        end: 10,
        description:
          "Rama, Sita, and Lakshmana enter the Dandaka forest and visit the hermitages of sages.",
      },
      {
        name: "Encounters with Sages",
        start: 11,
        end: 18,
        description:
          "The visits to Sage Sharabhanga, Agastya's hermitage, and the sage's counsel.",
      },
      {
        name: "The Golden Deer",
        start: 43,
        end: 48,
        description:
          "Sita's desire for the golden deer, Rama's pursuit, and Maricha's deception.",
      },
      {
        name: "Sita's Abduction",
        start: 49,
        end: 56,
        description:
          "Ravana tricks Sita, abducts her in his aerial chariot, and Jatayu's valiant attempt to save her.",
      },
      {
        name: "The Search Begins",
        start: 57,
        end: 75,
        description:
          "Rama and Lakshmana discover Jatayu's dying words and set out to find Sita.",
      },
    ],
    moments: [
      {
        title: "The Hermitage of Agastya",
        description:
          "Rama visits the great sage Agastya and receives divine weapons for his journey.",
        sarga: 11,
      },
      {
        title: "The Golden Deer",
        description:
          "Sita is captivated by a magical golden deer — Rama gives chase, unknowing of the trap.",
        sarga: 43,
      },
      {
        title: "Sita's Abduction",
        description:
          "Ravana, disguised as a sage, seizes Sita and carries her away in his chariot.",
        sarga: 52,
      },
      {
        title: "Jatayu's Sacrifice",
        description:
          "The aged vulture king Jatayu fights Ravana to save Sita and falls, but lives to tell Rama.",
        sarga: 51,
      },
    ],
  },

  kishkindha: {
    arcs: [
      {
        name: "Meeting Hanuman",
        start: 1,
        end: 4,
        description:
          "Rama and Lakshmana meet Hanuman, who introduces them to the monkey king Sugriva.",
      },
      {
        name: "Alliance with Sugriva",
        start: 5,
        end: 12,
        description:
          "Rama and Sugriva forge a pact — Rama will help Sugriva reclaim his throne.",
      },
      {
        name: "The Duel of the Brothers",
        start: 13,
        end: 25,
        description:
          "The battle between Sugriva and Vali, and Rama's decisive arrow.",
      },
      {
        name: "Rains and Waiting",
        start: 26,
        end: 30,
        description:
          "The monsoon season passes while Sugriva's forces prepare for the search.",
      },
      {
        name: "The Search for Sita",
        start: 31,
        end: 45,
        description:
          "Sugriva dispatches search parties in all directions, including Hanuman's southward band.",
      },
      {
        name: "Sampati's Revelation",
        start: 46,
        end: 60,
        description:
          "The vulture Sampati reveals that Sita is in Lanka, and Hanuman resolves to leap the ocean.",
      },
      {
        name: "Hanuman's Resolve",
        start: 61,
        end: 67,
        description:
          "The Vanaras reach the ocean shore and Hanuman prepares for his great leap.",
      },
    ],
    moments: [
      {
        title: "Meeting Hanuman",
        description:
          "Rama and Lakshmana encounter Hanuman — the beginning of the epic's most devoted friendship.",
        sarga: 3,
      },
      {
        title: "Vali's Fall",
        description:
          "Rama fulfills his promise to Sugriva by striking Vali from behind — a morally complex moment.",
        sarga: 17,
      },
      {
        title: "Sampati's News",
        description:
          "The vulture Sampati reveals Sita's location in Lanka, igniting the search.",
        sarga: 56,
      },
      {
        title: "Hanuman's Resolve",
        description:
          "Hanuman, empowered by the Vanaras' encouragement, prepares to leap across the ocean.",
        sarga: 66,
      },
    ],
  },

  sundara: {
    arcs: [
      {
        name: "The Great Leap",
        start: 1,
        end: 3,
        description:
          "Hanuman makes his legendary leap across the ocean to Lanka.",
      },
      {
        name: "Entering Lanka",
        start: 4,
        end: 14,
        description:
          "Hanuman observes Lanka's splendor, meets the guardian goddess, and enters the city at night.",
      },
      {
        name: "Searching the Palace",
        start: 15,
        end: 30,
        description:
          "Hanuman searches Ravana's palace, sees the demon king in his grandeur, and roams the inner chambers.",
      },
      {
        name: "Finding Sita",
        start: 31,
        end: 40,
        description:
          "Hanuman discovers Sita in the Ashoka grove, surrounded by demonesses, radiant in her sorrow.",
      },
      {
        name: "Sita's Sorrow and Resolve",
        start: 41,
        end: 50,
        description:
          "Hanuman witnesses Sita's grief, offers his services, and she gives him her chudamani (hair ornament).",
      },
      {
        name: "Hanuman's Wrath",
        start: 51,
        end: 58,
        description:
          "Hanuman destroys the Ashoka grove, is captured, and his tail is set ablaze.",
      },
      {
        name: "Burning of Lanka",
        start: 59,
        end: 64,
        description:
          "Hanuman escapes with his burning tail and sets Lanka aflame, then returns to Rama.",
      },
      {
        name: "Return to Rama",
        start: 65,
        end: 68,
        description:
          "Hanuman reports to Rama, presents Sita's jewel, and the plan for war is set in motion.",
      },
    ],
    moments: [
      {
        title: "The Great Leap",
        description:
          "Hanuman leaps across the hundred-league ocean, aided by his divine heritage.",
        sarga: 1,
      },
      {
        title: "Finding Sita",
        description:
          "Hanuman finds Sita in the Ashoka grove, radiant even in sorrow, devoted to Rama.",
        sarga: 31,
      },
      {
        title: "Sita's Token",
        description:
          "Sita gives Hanuman her chudamani jewel as proof of their meeting and her devotion.",
        sarga: 44,
      },
      {
        title: "Burning of Lanka",
        description:
          "With his burning tail, Hanuman sets Lanka ablaze — a warning to Ravana.",
        sarga: 59,
      },
    ],
  },

  yuddha: {
    arcs: [
      {
        name: "March to the Shore",
        start: 1,
        end: 12,
        description:
          "Rama and the Vanara army march to the ocean shore, and Vibhishana defects from Lanka.",
      },
      {
        name: "Building the Bridge",
        start: 13,
        end: 25,
        description:
          "The construction of the Ram Setu bridge across the ocean, and the army crosses to Lanka.",
      },
      {
        name: "First Battles",
        start: 26,
        end: 45,
        description:
          "The opening battles — the fall of Prahasta, and Ravana's growing fury.",
      },
      {
        name: "Indrajit's Wrath",
        start: 46,
        end: 60,
        description:
          "Indrajit, Ravana's son, unleashes the Nagaastra (serpent weapon) and traps Rama and Lakshmana.",
      },
      {
        name: "Kumbhakarna Awakened",
        start: 61,
        end: 73,
        description:
          "The giant Kumbhakarna is roused from sleep and wreaks havoc before his fall.",
      },
      {
        name: "Indrajit's Fall",
        start: 74,
        end: 85,
        description:
          "Lakshmana battles and defeats Indrajit, avenging the serpent weapon's humiliation.",
      },
      {
        name: "Ravana's Final Stand",
        start: 86,
        end: 100,
        description:
          "Rama and Ravana clash in a great duel. Ravana falls to Rama's divine arrow.",
      },
      {
        name: "Sita's Ordeal",
        start: 101,
        end: 110,
        description:
          "Sita enters the fire to prove her purity, and Agni himself bears witness to her virtue.",
      },
      {
        name: "Return to Ayodhya",
        start: 111,
        end: 120,
        description:
          "The Pushpaka vimana carries Rama, Sita, and the Vanaras back to Ayodhya.",
      },
      {
        name: "Coronation of Rama",
        start: 121,
        end: 128,
        description:
          "Rama is crowned king of Ayodhya, beginning the golden age of Rama Rajya.",
      },
    ],
    moments: [
      {
        title: "Vibhishana's Defection",
        description:
          "Ravana's righteous brother Vibhishana seeks Rama's refuge and joins the Vanara cause.",
        sarga: 10,
      },
      {
        title: "The Ram Setu",
        description:
          "The Vanara army builds a bridge of stones across the ocean to Lanka.",
        sarga: 22,
      },
      {
        title: "Ravana's Fall",
        description:
          "Rama strikes Ravana with the Brahmastra — the demon king falls at last.",
        sarga: 95,
      },
      {
        title: "Sita's Fire Ordeal",
        description:
          "Sita walks through fire to prove her purity, and the Fire God himself protects her.",
        sarga: 105,
      },
      {
        title: "Coronation of Rama",
        description:
          "Rama is crowned king of Ayodhya — the dawn of Rama Rajya, the age of righteousness.",
        sarga: 128,
      },
    ],
  },
};
