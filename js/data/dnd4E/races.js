var Race = {
  "Aasimar": {
    "description": "Race of humanoids who have Angelic blood. They bear physical features of their Celestial origins that differ from individual to individual",
    "attributes": { "wis": 2, "cha": 2 },
    "skills": { "diplomacy": 2, "insight": 2 },
    "resistances": { "necrotic": 5, "radiant": 5 },
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Immortal",
    "speed": 6,
    "bonus": {},
    "conception": {
    	"gestation": 270,
    	"conception": 0.2,
    	"crossbreed": { "Goliath": "Aasimar", "Half-Elf": "Aasimar", "Half-Orc": "Aasimar",	"Human": "Aasimar",	"Orc": "Aasimar" }
    },
    "height": { "max": 200, "min": 190 },
    "weight": { "max": 120, "min": 90 },
    "age": { "adult": 60, "average": 200, "limit": 250 },
    "properties": {
      "majesty": "You gain a +1 bonus to all defenses against attacks made by bloodied creatures"
    },
    "powers": {
      "divineheritage": {
      	"name": "Divine Heritage",
        "usage": "Encounter - Free Action",
        "target": "You",
        "effect": "On your next skill roll, add a bonus equal to your WIS mod",
        "special": ""
      }
    }
  },
  "Bugbear": {
    "description": "Largest and toughest of the goblinoid races, but not generally the smartest",
    "attributes": { "str": 2, "dex": 2 },
    "skills": { "intimidate": 2, "stealth": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 210,
    	"conception": 0.8,
    	"heat": 1,
    	"crossbreed": { "Hobgoblin": "Bugbear", "Goblin": "Hobgoblin" }
    },
    "height": { "max": 220, "min": 200 },
    "weight": { "max": 135, "min": 110 },
    "age": { "adult": 15, "average": 50, "limit": 60 },
    "properties": {
      "resilience": "When you use your second wind ability, you gain additional temporary hit points equal to your Constitution modfier plus 1/2 your level."
    },
    "powers": {
      "predatoryeye": {
      	"name": "Predatory Eye",
        "usage": "Encounter - Minor Action - Melee",
        "target": "You",
        "effect": "If you have combat advantage against a target, you deal +1d6 damage (+2d6 at 11th, +3d6 at 21st)",
        "special": ""
      }
    }
  },
  "Doppelganger": {
    "description": "Creatures that can change their form. They are superb at stealth, spying and assassination.",
    "attributes": { "int": 2, "cha": 2 },
    "skills": { "bluff": 2, "insight": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": { "will": 1 },
    "origin": "Natural",
    "speed": 6,
    "bonus": {},
    "conception": {
    	"gestation": 270,
    	"conception": 0.2,
    	"crossbreed": { "Goliath": "Doppelganger", "Half-Elf": "Doppelganger", "Half-Orc": "Doppelganger", "Human": "Doppelganger", "Orc": "Doppelganger" }
    },
    "height": { "max": 180, "min": 170 },
    "weight": { "max": 80, "min": 60 },
    "age": { "adult": 20, "average": 70, "limit": 100 },
    "properties": {
      "charmer": "+5 racial bonus to saving throws against charm effects"
    },
    "powers": {
      "changeshape": {
      	"name": "Change Shape",
        "usage": "At Will (Polymorph) - Minor Action",
        "target": "You",
        "effect": "You can alter your physical form to take on the appearance of any Medium humanoid, including a unique individual",
        "special": ""
      }
    }
  },
  "Dragonborn": {
    "description": "Proud, ancient and honorable warriors born from dragon blood",
    "attributes": { "str": 2, "cha": 2 },
    "skills": { "history": 2, "intimidate": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 6,
    "bonus": { "surge_value_bonus": 1 },
    "conception": {
    	"gestation": 300,
    	"conception": 0.1,
    	"crossbreed": {}
    },
    "height": { "max": 205, "min": 190 },
    "weight": { "max": 150, "min": 100 },
    "age": { "adult": 20, "average": 70, "limit": 100 },
    "properties": {
      "fury": "When you are bloodied, you gain a +1 racial bonus to attack rolls"
    },
    "powers": {
      "dragonbreath": {
      	"name": "Dragon's Endurance",
        "usage": "Encounter (Acid/Cold/Fire/Lightning/Poison)- Minor Action - Close Burst 3",
        "target": "All creatures in area",
        "effect": "STR/CON/DEX vs Reflex. On a hit, 1d6 + CON mod (2d6 at 11th, 3d6 at 21st) of damage of the selected type",
        "special": "Choose a damage type and attack attribute when you create your character. These two choices remain through the character's life"
      }
    }
  },
  "Drow": {
    "description": "Dark Elves who reside under the earth. Arrogant, perverse and are willing to do anything for wealth or power",
    "attributes": { "dex": 2, "cha": 2 },
    "skills": { "intimidate": 2, "stealth": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Fey",
    "speed": 6,
    "bonus": { "darkvision": 1 },
    "conception": {
    	"gestation": 720,
    	"conception": 0.05,
    	"crossbreed": { "Eladrin": "Eladrin", "Elf": "Elf", "Half-Elf": "Half-Elf", "Half-Orc": "Half-Elf",	"Human": "Half-Elf"	}
    },
    "height": { "max": 185, "min": 145 },
    "weight": { "max": 75,  "min": 55 },
    "age": { "adult": 40, "average": 200, "limit": 250 },
    "properties": {
      "trance": "Rather than sleep, you enter a meditative state known as a trance. You spend 4 hours in this state to gain the same benefits of a 6-hour extended rest. While in a trance, you are fully aware of your surroundings and notice events and enemies as normal",
      "step": "You ignore difficult terrain when you shift"
    },
    "powers": {
      "drowlitheness": {
        "name": "Drow Litheness",
        "usage": "Encounter - Free Action",
        "target": "You",
        "effect": "On your next attack roll, add a bonus equal to your DEX mod",
        "special": ""
      }
    }
  },
  "Dwarf": {
    "description": "Masters of crafting. Loves the mountains and their clans. Tough, gruff, stout and unyielding.",
    "attributes": { "con": 2, "wis": 2 },
    "skills": { "dungeon": 2, "endurance": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 5,
    "bonus": { "lowvision": 1, "no_armour_penalty": 1 },
    "conception": {
    	"gestation": 360,
    	"conception": 0.1,
    	"crossbreed": { "Duegar": "Dwarf" }
    },
    "height": { "max": 145, "min": 130 },
    "weight": { "max": 100, "min": 70 },
    "age": { "adult": 30, "average": 150, "limit": 200 },
    "properties": {
      "iron_stomach": "+5 racial bonus to saving throws against poison",
      "resilience": "You can use your second wind as a minor action instead of a standard action",
      "weapon": "You gain proficiency with the throwing hammer and the warhammer",
      "stand": "When an effect forces you to move (pull, push, slide), you can move 1 square less than the effect specifies. When an effect would knock you prone, immediately make a saving throw to avoid falling prone"
    },
    "powers": {}
  },
  "Duegar": {
    "description": "Dark Dwarves who live deep underground. They hate the light, and are considered belligerant, hardy and unyielding.",
    "attributes": { "con": 2, "int": 2 },
    "skills": { "dungeon": 2, "intimidate": 2 },
    "resistances": { "cold": 5 },
    "vulnerabilities": { "radiant": 5 },
    "immunities": {},
    "defences": { },
    "origin": "Natural",
    "speed": 5,
    "bonus": { "darkvision": 1, "no_armour_penalty": 1 },
    "conception": {
    	"gestation": 360,
    	"conception": 0.1,
    	"crossbreed": { "Dwarf": "Duegar"}
    },
    "height": { "max": 145, "min": 130},
    "weight": { "max": 100, "min": 70 },
    "age": { "adult": 30, "average": 150, "limit": 200 },
    "properties": {
      "speed": "Heavy loads do not affect your normal speed. Difficult terrain or magical affects still affect your speed",
      "stand": "When an effect forces you to move (pull, push, slide), you can move 1 square less than the effect specifies. When an effect would knock you prone, immediately make a saving throw to avoid falling prone"
    },
    "powers": {}
  },
  "Eladrin": {
    "description": "Strong ties to magic, long-lived, graceful and mysterious",
    "attributes": { "dex": 2, "int": 2 },
    "skills": { "arcana": 2, "history": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": { "will": 1 },
    "origin": "Fey",
    "speed": 6,
    "bonus": { "lowvision": 1, "skills": 1 },
    "conception": {
    	"gestation": 900,
    	"conception": 0.05,
    	"crossbreed": {	"Drow": "Drow",	"Elf": "Elf", "Half-Elf": "Half-Elf", "Half-Orc": "Half-Elf", "Human": "Half-Elf" }
    },
    "height": { "max": 185, "min": 165},
    "weight": { "max": 80, "min": 60 },
    "age": { "adult": 100, "average": 350, "limit": 400 },
    "properties": {
      "weapon": "You gain proficiency with the longsword",
      "charm": "You gain a +5 racial bonus to saving throws against charm effects",
      "trance": "Rather than sleep, you enter a meditative state known as a trance. You spend 4 hours in this state to gain the same benefits of a 6-hour extended rest. While in a trance, you are fully aware of your surroundings and notice events and enemies as normal"
    },
    "powers": {
      "feystep": {
      	"name": "Fey Step",
        "usage": "Encounter (Teleportation)- Move Action",
        "target": "You",
        "effect": "Teleport up to 5 squares",
        "special": ""
      }
    }
  },
  "Elf": {
    "description": "Quick, quiet, and wary hunters with strong ties to forests and nature.",
    "attributes": { "dex": 2, "wis": 2 },
    "skills": { "nature": 2, "perception": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Fey",
    "speed": 7,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 720,
    	"conception": 0.05,
    	"crossbreed": { "Drow": "Drow", "Eladrin": "Eladrin", "Half-Elf": "Half-Elf", "Half-Orc": "Half-Elf", "Human": "Half-Elf" }
    },
    "height": { "max": 185, "min": 145},
    "weight": { "max": 75, "min": 55 },
    "age": { "adult": 40, "average": 200, "limit": 250 },
    "properties": {
      "weapon": "You gain proficiency with the longbow and the shortbow",
      "awareness": "You grant non-elf allies within 5 squares a +1 bonus to Perception checks",
      "step": "You ignore difficult terrain when you shift"
    },
    "powers": {
      "elvenaccuracy": {
        "name": "Elven Accuracy",
        "usage": "Encounter - Free Action",
        "target": "You",
        "effect": "Re-roll an attack roll. Use the second roll, even if it is lower",
        "special": ""
      }
    }
  },
  "Gnoll": {
    "description": "Hyena-like humaniods, they are ferocious raiders and travel in packs",
    "attributes": { "con": 2, "dex": 2 },
    "skills": { "intimidate": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 7,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 180,
    	"conception": 0.3,
    	"heat": 1,
    	"crossbreed": {}
    },
    "height": { "max": 220, "min": 210},
    "weight": { "max": 125, "min": 110 },
    "age": { "adult": 15, "average": 50, "limit": 60 },
    "properties": {
      "bloodfury": "While you are bloodied, you gain a +2 bonus to damage rolls. This increases to a +4 bonus at 21st level",
      "pack": "When two or more of your allies are adjacent to an enemy, you deal an extra +2 damage on melee attacks"
    },
    "powers": {
      "ferociouscharge": {
        "name": "Ferocious Charge",
        "usage": "Encounter - Standard Action",
        "target": "You",
        "effect": "You charge and deal an extra 2 damage on a successful attack. Increase to 4 at 11th, 6 at 21st",
        "special": ""
      }
    }
  },
  "Gnome": {
    "description": "Sly tricksters with a penchant for invention.",
    "attributes": { "int": 2, "cha": 2 },
    "skills": { "arcana": 2, "stealth": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Fey",
    "speed": 5,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 390,
    	"conception": 0.15,
    	"crossbreed": {}
    },
    "height": { "max": 115, "min": 100},
    "weight": { "max": 30, "min": 20 },
    "age": { "adult": 30, "average": 150, "limit": 200 },
    "properties": {
      "trickster": "Once per round, you can use the cantrip Ghost Sound as a minor action",
      "reactive": "If you have cover or concealment when you make an initiative check, you can make a stealth check",
      "cunning": "You gain a +5 saving throw against illusions"
    },
    "powers": {
      "fadeaway": {
      	"name": "Fade Away",
        "usage": "Encounter (Illusion) - Immediate Reaction",
        "target": "You",
        "effect": "When you take damage, you become invisible until you attack or until the end of your next turn",
        "special": ""
      }
    }
  },
  "Goblin": {
    "description": "Smallest but most numerous of the goblinoid races",
    "attributes": { "dex": 2, "cha": 2 },
    "skills": { "stealth": 2, "thievery": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": { "reflex": 1 },
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 120,
    	"conception": 0.5,
    	"crossbreed": { "Bugbear": "Hobgoblin", "Hobgoblin": "Goblin" }
    },
    "height": { "max": 115, "min": 100},
    "weight": { "max": 30, "min": 20 },
    "age": { "adult": 5, "average": 35, "limit": 40 },
    "properties": {
      "resistant": "You have a +5 bonus on saving throws against poison and disease"
    },
    "powers": {
      "goblintactics": {
      	"name": "Goblin Tactics",
        "usage": "At Will - Immediate Reaction",
        "target": "You",
        "effect": "When you are missed by a melee attack, shift one square",
        "special": ""
      }
    }
  },
  "Goliath": {
    "description": "Tribal nomads of the mountains who are tough and strong.",
    "attributes": { "str": 2, "con": 2 },
    "skills": { "athletics": 2, "nature": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": { "will": 1 },
    "origin": "Natural",
    "speed": 6,
    "bonus": {},
    "conception": {
    	"gestation": 210,
    	"conception": 0.3,
    	"crossbreed": {
    		"Aasimar": "Aasimar",
    		"Doppelganger": "Doppelganger",
    		"Half-Elf": "Half-Elf",
    		"Half-Orc": "Half-Orc",
    		"Human": "Human",
    		"Orc": "Orc",
    		"Tiefling": "Tiefling"
    	}
    },
    "height": { "max": 230, "min": 200},
    "weight": { "max": 155, "min": 125 },
    "age": { "adult": 15, "average": 60, "limit": 70 },
    "properties": {
      "athlete": "When you make an Athletics check, roll twice and use either result"
    },
    "powers": {
      "stonesendurance": {
      	"name": "Stone's Endurance",
        "usage": "Encounter - Minor Action",
        "target": "You",
        "effect": "You gain resist 5 to all damage till the end of your next turn (Resist 10 at Level 11, Resist 15 at Level 21)",
        "special": ""
       }
    }
  },
  "Half-Elf": {
    "description": "Half-Human, Half-Elf that combines the best features of both",
    "attributes": { "con": 2, "cha": 2 },
    "skills": { "diplomacy": 2, "insight": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 540,
    	"conception": 0.15,
    	"crossbreed": { "Aasimar": "Aasimar", "Doppelganger": "Doppelganger", "Drow": "Half-Elf", "Eladrin": "Half-Elf", "Elf": "Half-Elf",	"Goliath": "Goliath", "Half-Orc": "Half-Orc", "Human": "Half-Elf", "Orc": "Half-Orc", "Tiefling": "Tiefling" }
    },
    "height": { "max": 190, "min": 165},
    "weight": { "max": 85, "min": 60 },
    "age": { "adult": 25, "average": 90, "limit": 120 },
    "properties": {
      "dilettante": "Choose a 1st level At-Will attack power from a class different to yours. You can use that power as an encounter power",
      "heritage": "You can take feats that have either elf or human as a pre-requisite",
      "diplomacy": "You grant allies within 10 squares of you a +1 racial bonus to Diplomacy checks"
    },
    "powers": {}
  },
  "Half-Orc": {
    "description": "Half Human, Half Orc who are are shunned by both. Have human resolve with orc savagery.",
    "attributes": { "str": 2, "dex": 2 },
    "skills": { "endurance": 2, "intimidate": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 240,
    	"conception": 0.25,
    	"crossbreed": { "Aasimar": "Aasimar", "Doppelganger": "Doppelganger", "Drow": "Half-Elf", "Eladrin": "Half-Elf", "Elf": "Half-Elf",	"Goliath": "Goliath", "Half-Elf": "Half-Elf", "Human": "Half-Orc", "Orc": "Half-Orc", "Tiefling": "Tiefling" }
    },
    "height": { "max": 195, "min": 175},
    "weight": { "max": 105, "min": 70 },
    "age": { "adult": 15, "average": 50, "limit": 60 },
    "properties": {
      "resilience": "The first time you are bloodied, you gain 5 temporary hit points (increased to 10 at 11th, 15 at 21st)",
      "swift": "You gain a +2 bonus to speed when charging"
    },
    "powers": {
      "furiousassault": {
      	"name": "Furious Assault",
        "usage": "Encounter - Free Action",
        "target": "You",
        "effect": "When you hit an enemy, deal an extra 1[W] damage if it is a weapon attack, or 1d8 extra damage if it isn't",
        "special": ""
      }
    }
  },
  "Halfling": {
    "description": "Quick, resourceful and courageous despite their small stature",
    "attributes": { "dex": 2, "cha": 2 },
    "skills": { "acrobatics": 2, "thievery": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": {},
    "conception": {
    	"gestation": 270,
    	"conception": 0.20,
    	"crossbreed": {}
    },
    "height": { "max": 120, "min": 110},
    "weight": { "max": 40, "min": 35 },
    "age": { "adult": 20, "average": 75, "limit": 100 },
    "properties": {
      "bold": "You gain a +5 racial bonus to saving throws against Fear",
      "reaction": "You gain a +2 racial bonus to AC against opportunity attacks"
    },
    "powers": {
      "secondchance": {
      	"name": "Second Chance",
        "usage": "Encounter - Immediate Interrupt",
        "target": "You",
        "effect": "When an attack hits you, Force an enemy to roll the attack again. The enemy uses the second roll",
        "special": ""
      }
    }
  },
  "Hobgoblin": {
    "description": "Goblinoid, but more aggressive, intelligent and organized than Bugbears or Goblins",
    "attributes": { "con": 2, "cha": 2 },
    "skills": { "athletics": 2, "history": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1, "initiative": 1 },
    "conception": {
    	"gestation": 210,
    	"conception": 0.4,
    	"crossbreed": { "Bugbear": "Bugbear", "Goblin": "Goblin" }
    },
    "height": { "max": 195, "min": 180},
    "weight": { "max": 110, "min": 85 },
    "age": { "adult": 10, "average": 40, "limit": 50 },
    "properties": {
      "pack": "When two or more of your allies are adjacent to an enemy, you deal an extra +2 damage on melee attacks"
    },
    "powers": {
      "hobgoblinresistance": {
      	"name": "Hobgoblin Resistance",
        "usage": "Encounter - Immediate Reaction",
        "target": "You",
        "effect": "When you suffer from an effect that a save can end, Make a saving throw against that effect",
        "special": ""
      }
    }
  },
  "Human": {
    "description": "The most numerous civilised species; pragmatic, driven and ambitious",
    "attributes": {},
    "skills": {},
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": { "fortitude": 1, "reflex": 1, "will": 1 },
    "origin": "Normal",
    "speed": 6,
    "bonus": { "attributes": 2, "skills": 1, "feat": 1, "atwills": 1 },
    "conception": {
    	"gestation": 270,
    	"conception": 0.2,
    	"crossbreed": { "Aasimar": "Aasimar", "Doppelganger": "Doppelganger", "Drow": "Half-Elf", "Eladrin": "Half-Elf", "Elf": "Half-Elf",	"Goliath": "Goliath", "Half-Elf": "Half-Elf", "Half-Orc": "Half-Orc", "Orc": "Half-Orc", "Tiefling": "Tiefling"	}
    },
    "height": { "max": 190, "min": 165},
    "weight": { "max": 100, "min": 60 },
    "age": { "adult": 20, "average": 75, "limit": 100 },
    "properties": {},
    "powers": {}
  },
  "Kobold": {
    "description": "A small reptilian race that reveres Dragons. They are cautious of other races and will do anything to ensure the survival of their tribe",
    "attributes": {
      "con": 2,
      "dex": 2
    },
    "skills": { "stealth": 2, "thievery": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": {},
    "conception": {
    	"gestation": 120,
    	"conception": 0.5,
    	"crossbreed": {}
    },
    "height": { "max": 115, "min": 100},
    "weight": { "max": 35, "min": 30 },
    "age": { "adult": 12, "average": 35, "limit": 45 },
    "properties": {
      "trapsense": "You gain a +2 bonus to defenses against traps"
    },
    "powers": {
      "shifty": {
      	"name": "Shifty",
        "usage": "At Will - Minor Action",
        "target": "You",
        "effect": "You shift 1 square",
        "special": ""
      }
    }
  },
  "Longtooth Shifter": {
    "description": "Ferocious hunters of the wild. Descended from Lycanthropes, they look half-wolf and half-man",
    "attributes": { "str": 2, "wis": 2 },
    "skills": { "athletics": 2, "endurance": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 210,
    	"conception": 0.3,
    	"heat": 1,
    	"crossbreed": { "Razorclaw Shifter": "Razorclaw Shifter" }
    },
    "height": { "max": 180, "min": 170},
    "weight": { "max": 85, "min": 60 },
    "age": { "adult": 20, "average": 75, "limit": 100 },
    "properties": {
      "pack": "When two or more of your allies are adjacent to an enemy, you deal an extra +2 damage on melee attacks"
    },
    "powers": {
      "longtoothshifting": {
      	"name": "Longtooth Shifting",
        "usage": "Encounter (Healing) - Minor Action",
        "target": "You",
        "effect": "When you are bloodied, until the end of the encounter you gain a +2 bonus to damage rolls. In addition, while you are bloodied you gain 2 regeneration (4 on 11th, 6 on 21st)",
        "special": ""
      }
    }
  },
  "Minotaur": {
    "description": "Bull-like humaniods, these savage creatures are caught between violence and conscience",
    "attributes": { "str": 2, "con": 2 },
    "skills": { "nature": 2, "perception": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 6,
    "bonus": { "surge_bonus": 1 },
    "conception": {
    	"gestation": 360,
    	"conception": 0.3,
    	"heat": 1,
    	"crossbreed": {}
    },
    "height": { "max": 230, "min": 200},
    "weight": { "max": 155, "min": 125 },
    "age": { "adult": 15, "average": 50, "limit": 60 },
    "properties": {
      "ferocity": "When you reach 0 hit points or fewer, you can make a melee basic attack as an immediate interrupt",
      "charge": "You have a +2 bonusto AC against opportunity attacks you provoke during a charge"
    },
    "powers": {
      "goringcharge": {
      	"name": "Goring Charge",
        "usage": "Encounter - Standard Action - Melee",
        "target": "One Creature",
        "effect": "STR/CON/DEX + (4, 6 at 11th, 8 at 21st) vs AC. On hit, 1d6 + STR/CON/DEX mod, and you knock the target prone (2d6 at 11th, 3d6 at 21st)",
        "special": "You charge and gore the enemy with your horns"
      }
    }
  },
  "Orc": {
    "description": "Plague upon the civilised world, and they fight among themselves for food and treasure",
    "attributes": { "str": 2, "con": 2 },
    "skills": { "athletics": 2, "intimidate": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Normal",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 180,
    	"conception": 0.4,
    	"crossbreed": {	"Aasimar": "Aasimar", "Doppelganger": "Doppelganger", "Goliath": "Goliath",	"Half-Elf": "Half-Orc",	"Half-Orc": "Half-Orc",	"Human": "Half-Orc", "Tiefling": "Tiefling"	}
    },
    "height": { "max": 195, "min": 180},
    "weight": { "max": 105, "min": 90 },
    "age": { "adult": 10, "average": 40, "limit": 50 },
    "properties": {
      "swift": "You gain a +2 bonus to speed when charging"
    },
    "powers": {
      "warriorssurge": {
      	"name": "Warrior's Surge",
        "usage": "Encounter (Healing)- Standard Action - Melee",
        "target": "One Creature",
        "effect": "STR vs AC. On hit, 1[W] + STR mod, and you can spend a healing surge. At 21st level, 2[W]",
        "special": ""
      }
    }
  },
  "Razorclaw Shifter": {
    "description": "Mobile, agile hunters from the wilds. Descended from Lycanthropes, they look half-wolf and half-man",
    "attributes": { "dex": 2, "wis": 2 },
    "skills": { "acrobatics": 2, "stealth": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 210,
    	"conception": 0.3,
    	"heat": 1,
    	"crossbreed": { "Longtooth Shifter": "Longtooth Shifter" }
    },
    "height": { "max": 180, "min": 170},
    "weight": { "max": 85, "min": 60 },
    "age": { "adult": 20, "average": 75, "limit": 100
    },
    "properties": {
      "hunt": "You gain a +1 racial bonus to attack rolls against bloodied foes"
    },
    "powers": {
      "razorclawshifting": {
        "name": "Razorclaw Shifting",
        "usage": "Encounter - Minor Action",
        "target": "You",
        "effect": "When you are bloodied, Until the end of the encounter your speed increases by 2, and you gain a +1 bonus to AC and Reflex",
        "special": ""
      }
    }
  },
  "Revenant": {
    "description": "Souls of the dead returned to life by the Raven Queen as representatives of the Raven Queen's power",
    "attributes": { "con": 2, "dex": 2 },
    "skills": { "endurance": 2, "intimidate": 2 },
    "resistances": {},
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Undead",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "height": { "max": 190, "min": 165},
    "weight": { "max": 100, "min": 60 },
    "age": { "adult": 1, "average": 20, "limit": 30 },
    "properties": {
      "past": "Select the race of your past life. You can take feats, paragon paths, and epic desitinies that have that race as a pre-requisite",
      "vitality": "Whenever you drop to 0 hit points or fewer, you are dying but you can choose to remain conscious until you attempt your first death saving throw. If you remain concious, you can take only one standard action before you attempt your first death saving throw"
    },
    "powers": {
      "darkreaping": {
      	"name": "Dark Reaping",
        "usage": "Encounter (Necrotic)- Immediate Reaction",
        "target": "One Creature",
        "effect": "When a creature within 5 squares of you is reduced to 0 hit points, One creature you hit with an attack before the end of your next turn takes an additional 1d8 + CON mod necrotic damage",
        "special": ""
      }
    }
  },
  "Tiefling": {
    "description": "Ancient race tainted by Infernal blood",
    "attributes": { "int": 2, "cha": 2 },
    "skills": { "bluff": 2, "stealth": 2 },
    "resistances": { "fire": 5 },
    "vulnerabilities": {},
    "immunities": {},
    "defences": {},
    "origin": "Natural",
    "speed": 6,
    "bonus": { "lowvision": 1 },
    "conception": {
    	"gestation": 270,
    	"conception": 0.2,
    	"crossbreed": { "Goliath": "Tiefling", "Half-Elf": "Tiefling", "Half-Orc": "Tiefling", "Human": "Tiefling", "Orc": "Tiefling" }
    },
    "height": { "max": 195, "min": 170},
    "weight": { "max": 110, "min": 65 },
    "age": { "adult": 20, "average": 75, "limit": 100 },
    "properties": {
      "bloodhunt": "You gain a +1 racial bonus to attack rolls against bloodied foes"
    },
    "powers": {
      "infernalwrath": {
        "name": "Infernal Wrath",
        "usage": "Encounter (Fire)- Free Action - Immediate Reaction - Close Burst 10",
        "target": "The triggering enemy in burst",
        "effect": "When an enemy hits you within 10 squares of you, the target takes 1d6+(INT or CHA) mod fire damage. At 11th 2d6, at 21st 3d6.",
        "special": "At character creation choose either INT or CHA as the damage modifier. This choice stays for the character duration." 
      }
    }
  }
};