/*===========================================
 * The DnD system - This will handle the instantiation of our variables (including drawing)
 *===========================================
 */
var DnD = (function (window) {
	/**
	 * Calculate weight and height of species
	 */
	// Internal function to calcular 
	function calcWH(min, max, a, random) {
		a = a ? a : 0;
		random = random ? random : 0;
    	return Math.floor(parseInt(min, 10)+(((parseInt(max, 10)-parseInt(min, 10))/4)*parseInt(a, 10))+((((parseInt(max, 10)-parseInt(min, 10))/8)*parseInt(random, 10))));
    };
    /**
     * Storage Object
     */
    function Storage() {
        // Stores all of the attributes
        this.attributes = {};
        this.reset = function () {
            attributes = {};
        };
        this.get = function (key) {
            if (this.attributes[key]) {
                return this.attributes[key];
            }
            return 0;
        };
        this.set = function (key, value) {
            this.attributes[key] = parseInt(value, 10);
        };
        this.increase = function (key, value) {
        	if (this.attributes[key]) {
                this.attributes[key] += parseInt(value, 10);
            } else {
            	this.attributes[key] = parseInt(value, 10);
            }
        };
    };
    /**
     * Stores the specific skill set
     */
    function Skill(key, value) {
    	this.key = key ? key : "wis";
    	this.value = parseInt(value,10);
    }
    /**
     * Stores the specific defences
     */
    function Defence(key1, key2, value) {
    	this.attribute1 = key1 ? key1 : "str";
    	this.attribute2 = key2 ? key2 : "con";
    	this.value = parseInt(value,10);
    }
    /**
     * Creatures object
     */
    function Creature(name, level, npc) {
    	// The name and details of the creature
    	this.name = name ? name : "Unknown";
    	this.npc = npc;
    	this.race = "Unknown";
    	this.career = "Unknown";
    	this.template = "Unknown";
    	this.speed = 6;
    	this.size = "Medium";
    	this.origin = "Natural";
    	this.gender = "male";
    	this.height = 155;
    	this.weight = 55;
    	this.hasLowVision = false;
    	this.hasDarkVision = false;
    	this.bonusSkill = 0;
    	this.bonusAtWill = 0;
    	this.bonusInitiative = 0;
    	this.ap = 0;
    	this.regenerate = 0;
    	this.preferred = ["str", "con"];
    	this.vision = function () {
    		return (this.hasDarkVision) ? "Dark Vision" : (this.hasLowVision ? "Low Vision" : "Normal Vision");
    	};
    	this.initiative = function () {
    		return this.modLevel() + this.mod("dex") + this.bonusInitiative;
    	};
    	this.actionPoint = function () {
    		if (!this.npc) {
    			return 1;
    		}
    		return this.ap;
    	};
    	// The health stuff
    	this.hpBase = 10;
		this.hpLevel = 4;
		this.spdBase = 0;
		this.savingThrow = 0;
		this.hp = function () {
			var hp = 1;
			if (this.npc) {
				var segment = (this.hpBase / 2) + 2;
				hp = this.get("con") + ((level+1) * segment);
			} else {
				hp = this.hpBase + this.get("con") + ((level - 1) * this.hpLevel);
			}
			switch (this.template) {
			case "Standard":
				break;
			case "Minion":
				hp = 1;
				break;
			case "Solo":
				hp = hp * 5;
				break;
			default:
				hp = hp * 2;
				break;
			}
			return hp;
		};
		this.bloodied = function () {
			return Math.floor(this.hp() / 2);
		};
		this.surge = (function () {
			return Math.floor(this.hp() * 0.25 + ((this.race === "Dragonborn") ? this.mod("con") : 0));
		});
		this.surgePerDay = (function () {
			if (this.npc) {
				return 0;
			}
			return (this.spdBase + this.mod("con"));
		});
    	// Our level stuff
    	this.level = level ? parseInt(level, 10) : 1;
    	this.modLevel = function () {
    		return Math.floor(this.level * 0.5);
    	};
    	// The bonus level stuff
    	this.levelUp = function () {
    		// Calculate the scores to be added to the two top preferences
    		var scores = (this.level > 3 ? 1 : 0) + (this.level > 7 ? 1 : 0) + Math.floor(Math.abs(this.level - 4) / 10) + Math.floor(Math.abs(this.level - 8) / 10);
    		var extra = Math.floor(Math.abs(this.level - 1) / 10);
    		for (ability in this.attributes) {
    			this.attributes[ability] += extra;
    			if (ability === this.preferred[0] || ability === this.preferred[1]) {
    				this.attributes[ability] += scores; 
    			}
    			
    		}
    	};
    	// Returns our attribute modifiers
        this.mod = function (key) {
            if (this.attributes[key]) {
                return Math.floor((this.attributes[key] - 10) / 2);
            }
            return 0;
        };
        this.attack = function (key) {
        	if (this.attributes[key]) {
                return this.mod(key) + this.modLevel();
            }
            return 0;
    	};
        // Returns our Defences
        this.defence = {};
        this.addDefence = function (defence, key1, key2, value) {
        	this.defence[defence] = new Defence(key1, key2, value);
        };
        this.getDefence = function (defence) {
        	return 10 + this.defence[defence].value + this.modLevel() + (this.mod(this.defence[defence].attribute1) > this.mod(this.defence[defence].attribute2) ? this.mod(this.defence[defence].attribute1) : this.mod(this.defence[defence].attribute2));
        };
        this.increaseDefence = function (defence, value) {
    		if (this.defence[defence]) {
    			this.defence[defence].value += value;
    		}
    	};
    	this.bonusAC = 0;
    	this.ac = function () {
    		return 10 + parseInt(this.bonusAC, 10) + this.modLevel() + parseInt(this.armour.ac, 10) + parseInt(this.armour.enchantment, 10) + parseInt((this.armour.light ? (this.mod("dex") > this.mod("int") ? this.mod("dex") : this.mod("int")) : 0));
    	};
        // Our skill stuff
    	this.skill = {};
    	this.addSkill = function (skill, key, value) {
    		this.skill[skill] = new Skill(key, value);
    	};
    	this.increaseSkill = function (skill, value) {
    		if (this.skill[skill]) {
    			this.skill[skill].value += value;
    		}
    	};
    	this.getSkill = function (skill) {
    		return this.mod(this.skill[skill].key) + this.modLevel() + this.skill[skill].value;
    	};
    	// Our resistances, vulnerabilities and immunities
    	this.resistance =  new Storage();
    	this.getResists = function () {
    		var text = "";
    		for (var key in this.resistance.attributes) {
    			text += key + " +" + (this.resistance.get(key) + this.modLevel()) + "<br />";
    		}
    		return text;
    	};
    	this.vulnerable = new Storage();
    	this.getVulnerable = function () {
    		var text = "";
    		for (var key in this.vulnerable.attributes) {
    			text += key + " (Double Damage)<br />";
    		}
    		return text;
    	};
    	this.immunity = new Storage();
    	this.getImmune = function () {
    		var text = "";
    		for (var key in this.immunity.attributes) {
    			text += key + " (No Damage)<br />";
    		}
    		return text;
    	};
    	// XP stats
    	this.xp = function () {
    		var base =100+(25*Math.max(this.level-1))+(25*Math.max(0,this.level-5))+(50*Math.max(0,this.level-9))+(100*Math.max(0,this.level-13))+(200*Math.max(0,this.level-17))+(550*Math.max(0,this.level-21))+(1050*Math.max(0,this.level-25))+(2000*Math.max(0,this.level-29))+(4000*Math.max(0,this.level-33))+(8000*Math.max(0,this.level-37));
    		switch (this.template) {
    		case "Standard":
    			break;
    		case "Minion":
    			base = Math.round(base/4);
    			break;
    		case "Solo":
    			base = base*5;
    			break;
    		default:
    			base = base*2;
    			break;
    		}
    		return base;
    	};
    	// Armour Stats
    	this.armour = {
    		name: "Armour",
    		type: "Cloth",
    		ac: 0,
    		enchantment: 0,
			light: 1,
			check: 0,
			speed: 0,
			price: 1,
			weight: 4,
			properties: {}
    	};
    	this.getArmourPower = function () {
    		var text = "";
    		for (power in this.armour.properties) {
    			text += "<p><b>" + power + "</b><br />" + this.armour.properties[power] + "</p>";
    		}
    		return text;
    	};
		this.applyArmour = function (name, type, enchantment) {
			this.armour.name = name;
			this.armour.type = type;
			this.armour.enchantment = parseInt(enchantment,10);
			switch (type) {
			case "Leather":
				this.armour.ac = 2;
				this.armour.light = 1;
				this.armour.check = 0;
				this.armour.speed = 0;
				this.armour.price = 25;
				this.armour.weight = 15;
				break;
			case "Studded leather":
				this.armour.ac = 3;
				this.armour.light = 1;
				this.armour.check = 0;
				this.armour.speed = 0;
				this.armour.price = 35;
				this.armour.weight = 28;
				this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
				break;
			case "Hide":
				this.armour.ac = 3;
				this.armour.light = 1;
				this.armour.bonus = 1;
				this.armour.check = -1;
				this.armour.speed = 0;
				this.armour.price = 30;
				this.armour.weight = 25;
				break;
			case "Ring mail":
				this.armour.ac = 3;
				this.armour.light = 1;
				this.armour.check = -1;
				this.armour.speed = 0;
				this.armour.price = 40;
				this.armour.weight = 30;
				this.armour.properties["Durable"] = "On first hit, reduce damage by 2 (plus enchantment bonus). The property is lost until repaired";
				break;
			case "Chainmail":
				this.armour.ac = 6;
				this.armour.bonus = 0;
				this.armour.check = -1;
				this.armour.speed = -1;
				this.armour.price = 40;
				this.armour.weight = 40;
				break;
			case "Banded mail":
				this.armour.ac = 6;
				this.armour.light = 0;
				this.armour.check = -1;
				this.armour.speed = -1;
				this.armour.price = 55;
				this.armour.weight = 35;
				this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
				break;
			case "Scale":
				this.armour.ac = 7;
				this.armour.light = 0;
				this.armour.bonus = 0;
				this.armour.check = 0;
				this.armour.speed = -1;
				this.armour.price = 45;
				this.armour.weight = 45;
				break;
			case "Splint mail":
				this.armour.ac = 7;
				this.armour.light = 0;
				this.armour.check = -2;
				this.armour.speed = -1;
				this.armour.price = 50;
				this.armour.weight = 55;
				this.armour.properties["Durable"] = "On first hit, reduce damage by 3 (plus 2 times the enchantment bonus). The property is lost until repaired";
				break;
			case "Plate":
				this.armour.ac = 8;
				this.armour.light = 0;
				this.armour.bonus = 0;
				this.armour.check = -2;
				this.armour.speed = -1;
				this.armour.price = 50;
				this.armour.weight = 50;
				break;
			case "Spiked plate":
				this.armour.ac = 8;
				this.armour.light = 0;
				this.armour.check = -3;
				this.armour.speed = -1;
				this.armour.price = 55;
				this.armour.weight = 60;
				this.armour.properties["Barbed"] = "Creature take 2 + half your level when you grab or escape the grab";
				break;
			case "Full plate":
				this.armour.ac = 8;
				this.armour.light = 0;
				this.armour.check = -1;
				this.armour.speed = -1;
				this.armour.price = 65;
				this.armour.weight = 60;
				this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
				break;
			default:
				this.armour.ac = 0;
				this.armour.light = 1;
				this.armour.check = 0;
				this.armour.speed = 0;
				this.armour.price = 1;
				this.armour.weight = 4;
				this.armour.properties = {};
				break;
			};
		};
		// Powers and Feats
		this.getAtWill = (function () {
			return 2 + this.bonusAtWill;
		});
		this.getFeats = (function () {
			return (this.npc) ? 0 : 1 + Math.floor(this.level/2) + Math.floor((this.level-1)/10) + ((this.race === "Human") ? 1: 0);
		});
		this.getEncounter = (function () {
			if (this.level > 2 && this.level < 7) {
				return 2;
			} else if (this.level >= 7 && this.level < 11) {
				return 3;
			} else if (this.level >= 11) {
				return 4;
			}
			return 1;
		});
		this.getDaily = (function () {
			var multi = (this.career === "Wizard") ? 2 : 1;
			if (this.level > 4 && this.level < 9) {
				return 2 * multi;
			} else if (this.level >= 9 && this.level < 21) {
				return 3 * multi;
			} else if (this.level >= 21) {
				return 4 * multi;
			}
			return 1 * multi;
		});
		this.getUtility = (function () {
			var multi = (this.career === "Wizard") ? 2 : 1;
			if (this.level > 1 && this.level < 6) {
				return 1 * multi;
			} else if (this.level >= 6 && this.level < 10) {
				return 2 * multi;
			} else if (this.level >= 10 && this.level < 12) {
				return 3 * multi;
			} else if (this.level >= 12 && this.level < 16) {
				return 5 * multi;
			} else if (this.level >= 16 && this.level < 22) {
				return 5 * multi;
			} else if (this.level >= 22 && this.level < 26) {
				return 6 * multi;
			} else if (this.level >= 26) {
				return 7 * multi;
			}
			return 0;
		});
    	// Racial stats (race, height (0-3), weight (0-3), random factor (1d4))
    	this.applyRacial = function (race, h, w) {
    		this.race = race;
    		switch (race) {
    		case 'Bugbear':
    			// Add onto our modifiers
    			this.increase("str", 2);
    			this.increase("dex", 2);
    			this.increaseSkill("stealth", 2);
    			this.increaseSkill("intimidate", 2);
    			this.hasLowVision = true;
    			this.height = calcWH(200, 220, h);
    			this.weight = calcWH(110, 135, w);
    			break;
    		case 'Dragonborn':
    			this.increase("str", 2);
    			this.increase("cha", 2);
    			this.increaseSkill("history", 2);
    			this.increaseSkill("intimidate", 2);
    			this.height = calcWH(190, 205, h);
    			this.weight = calcWH(100, 150, w);
    			break;
    		case 'Drow':
    			this.origin = "Fey";
    			this.hasDarkVision = true;
    			this.increase("dex", 2);
    			this.increase("cha", 2);
    			this.increaseSkill("stealth", 2);
    			this.increaseSkill("intimidate", 2);
    			this.height = calcWH(160, 180, h);
    			this.weight = calcWH(60, 80, w);
    			break;
    		case "Dwarf":
    			this.speed = 5;
    			this.increase("con", 2);
    			this.increase("wis", 2);
    			this.increaseSkill("dungeon", 2);
    			this.increaseSkill("endurance", 2);
    			this.height = calcWH(130, 145, h);
    			this.weight = calcWH(70, 100, w);
    			this.hasLowVision = true;
    			this.resistance.set("poison", 5);
    			break;
    		case "Eladrin":
    			this.origin = "Fey";
    			this.increase("dex", 2);
    			this.increase("int", 2);
    			this.increaseSkill("arcana", 2);
    			this.increaseSkill("history", 2);
    			this.hasLowVision = true;
    			this.bonusSkill += 1;
    			this.resistance.set("charm", 5);
    			this.height = calcWH(165, 185, h);
    			this.weight = calcWH(60, 80, w);
    			this.increaseDefence("will", 1);
    			break;
    		case "Elf":
    			this.origin = "Fey";
    			this.speed = 7;
    			this.hasLowVision = true;
    			this.increase("dex", 2);
    			this.increase("wis", 2);
    			this.increaseSkill("nature", 2);
    			this.increaseSkill("perception", 2);
    			this.height = calcWH(145, 185, h);
    			this.weight = calcWH(55, 75, w);
    			break;
			case "Gnoll":
				this.speed = 7;
				this.hasLowVision = true;
				this.increase("con", 2);
				this.increase("dex", 2);
				this.increaseSkill("intimidate", 2);
				this.height = calcWH(210, 230, h);
    			this.weight = calcWH(125, 145, w);
				break;
			case "Gnome":
				this.origin = "Fey";
				this.speed = 5;
				this.hasLowVision = true;
				this.size = "Small";
				this.increase("int", 2);
				this.increase("cha", 2);
				this.increaseSkill("arcana", 2);
				this.increaseSkill("stealth", 2);
				this.resistance.set("illusion", 5);
				this.height = calcWH(100, 115, h);
    			this.weight = calcWH(20, 35, w);
				break;
			case "Goblin":
				this.hasLowVision = true;
				this.size = "Small";
				this.increase("dex", 2);
				this.increase("cha", 2);
				this.increaseSkill("thievery", 2);
				this.increaseSkill("stealth", 2);
				this.increaseDefence("reflex", 1);
				this.height = calcWH(100, 115, h);
    			this.weight = calcWH(20, 30, w);
				break;
			case "Goliath":
				this.increase("str", 2);
				this.increase("con", 2);
				this.increaseSkill("athletics", 2);
				this.increaseSkill("nature", 2);
				this.increaseDefence("will", 1);
				this.height = calcWH(200, 230, h);
    			this.weight = calcWH(125, 155, w);
				break;
			case "Half-Elf":
				this.hasLowVision = true;
				this.increase("cha", 2);
				this.increase("con", 2);
				this.increaseSkill("diplomacy", 2);
				this.increaseSkill("insight", 2);
				this.height = calcWH(165, 190, h);
    			this.weight = calcWH(60, 85, w);
				break;
			case "Half-Orc":
				this.hasLowVision = true;
				this.increase("str", 2);
				this.increase("dex", 2);
				this.increaseSkill("endurance", 2);
				this.increaseSkill("intimidate", 2);
				this.height = calcWH(175, 195, h);
    			this.weight = calcWH(70, 105, w);
				break;
			case "Halfling":
				this.size = "Small";
				this.increase("cha", 2);
				this.increase("dex", 2);
				this.increaseSkill("acrobatics", 2);
				this.increaseSkill("thievery", 2);
				this.height = calcWH(115, 130, h);
    			this.weight = calcWH(35, 40, w);
    			this.resistance.set("fear", 5);
				break;
			case "Hobgoblin":
				this.increase("con", 2);
				this.increase("cha", 2);
				this.increaseSkill("athletics", 2);
				this.increaseSkill("history", 2);
				this.bonusInitiative += 2;
				this.hasLowVision = true;
				this.height = calcWH(180, 195, h);
    			this.weight = calcWH(85, 110, w);
				break;
			case 'Human':
				this.bonusSkill += 1;
				this.bonusAtWill += 1;
				this.increase(this.preferred[0], 2);
				this.increaseDefence("fort", 1);
				this.increaseDefence("reflex", 1);
				this.increaseDefence("will", 1);
				this.height = calcWH(165, 190, h);
    			this.weight = calcWH(60, 100, w);
				break;
			case "Kobold":
				this.size = "Small";
				this.increase("dex", 2);
				this.increase("con", 2);
				this.increaseSkill("stealth", 2);
				this.increaseSkill("thievery", 2);
				this.increaseDefence("will", 1);
				this.height = calcWH(105, 120, h);
    			this.weight = calcWH(30, 35, w);
				break;
			case "Minotaur":
				this.increase("str", 2);
				this.increase("con", 2);
				this.increaseSkill("nature", 2);
				this.increaseSkill("perception", 2);
				this.height = calcWH(210, 230, h);
    			this.weight = calcWH(145, 160, w);
				break;
			case "Orc":
				this.hasLowVision = true;
				this.increase("str", 2);
				this.increase("con", 2);
				this.height = calcWH(180, 195, h);
    			this.weight = calcWH(90, 105, w);
				break;
			case "Tiefling":
				this.hasLowVision = true;
				this.increase("int", 2);
				this.increase("cha", 2);
				this.increaseSkill("stealth", 2);
				this.increaseSkill("bluff", 2);
				this.resistance.set("fire", 5);
				this.height = calcWH(170, 195, h);
    			this.weight = calcWH(65, 110, w);
				break;
    		};
		};
		// Apply class stats
		this.applyClass = function (career) {
    		this.career = career;
    		switch (career) {
    		// Base Player Classes
			case "Cleric":
				this.increaseSkill("religion", 5);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 12;
				this.hpLevel = 5;
				this.spdBase = 7;
				break;
			case "Fighter":
				this.increaseDefence("fort", 2);
				if (this.npc) {
					this.bonusSkill += 2;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 15;
				this.hpLevel = 6;
				this.spdBase = 9;
				break;
			case "Paladin":
				this.increaseSkill("religion", 5);
				this.increaseDefence("fort", 1);
				this.increaseDefence("reflex", 1);
				this.increaseDefence("will", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 15;
				this.hpLevel = 6;
				this.spdBase = 10;
				break;
			case "Ranger":
				this.increaseSkill("dungeon", 5);
				this.increaseSkill("nature", 5);
				this.increaseDefence("fort", 1);
				this.increaseDefence("reflex", 1);
				if (!this.npc) {
					this.bonusSkill += 3;
				}
				this.hpBase = 12;
				this.hpLevel = 5;
				this.spdBase = 6;
				break;
			case "Rogue":
				this.increaseSkill("stealth", 5);
				this.increaseSkill("thievery", 5);
				this.increaseDefence("reflex", 2);
				if (!this.npc) {
					this.bonusSkill += 4;
				}
				this.hpBase = 12;
				this.hpLevel = 5;
				this.spdBase = 6;
				break;
			case "Warlock":
				this.increaseDefence("will", 1);
				this.increaseDefence("reflex", 1);
				if (this.npc) {
					this.bonusSkill += 2;
				} else {
					this.bonusSkill += 4;
				}
				this.hpBase = 12;
				this.hpLevel = 5;
				this.spdBase = 6;
				break;
			case "Warlord":
				this.increaseDefence("fort", 1);
				this.increaseDefence("will", 1);
				if (this.npc) {
					this.bonusSkill += 2;
				} else {
					this.bonusSkill += 4;
				}
				this.hpBase = 12;
				this.hpLevel = 5;
				this.spdBase = 7;
				break;
			case "Wizard":
				this.increaseSkill("arcana", 5);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			// NPC Classes
			case "Aristocrat":
				this.increaseSkill("diplomacy", 5);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Artisan":
				this.increaseSkill("dungeon", 5);
				this.increaseDefence("fort", 1);
				this.increaseDefence("will", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Commoner":
				this.increaseSkill("streetwise", 5);
				this.increaseDefence("fort", 1);
				this.increaseDefence("reflex", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Courtesan":
				this.increaseSkill("insight", 5);
				this.increaseDefence("will", 1);
				this.increaseDefence("reflex", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Criminal":
				this.increaseSkill("thievery", 5);
				this.increaseDefence("reflex", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Healer":
				this.increaseSkill("heal", 5);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Labourer":
				this.increaseSkill("endurance", 5);
				this.increaseDefence("fort", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Merchant":
				this.increaseSkill("insight", 5);
				this.increaseDefence("will", 1);
				this.increaseDefence("reflex", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Priest":
				this.increaseSkill("religion", 5);
				this.increaseDefence("will", 1);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Scholar":
				this.increaseSkill("history", 5);
				this.increaseDefence("will", 1);
				if (this.npc) {
					this.bonusSkill += 2;
				} else {
					this.bonusSkill += 4;
				}
				this.hpBase = 10;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			// Warrior Classes
			case "Artillery":
				this.increaseSkill("perception", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 8;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Brute":
				this.increaseSkill("athletics", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 16;
				this.hpLevel = 5;
				this.spdBase = 7;
				break;
			case "Controller":
				this.increaseSkill("perception", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 12;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Lurker":
				this.increaseSkill("stealth", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				this.bonusInitiative += 4;
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 8;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Skirmisher":
				this.increaseSkill("athletics", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				this.bonusInitiative += 2;
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 12;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
			case "Soldier":
				this.increaseSkill("endurance", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				this.bonusInitiative += 2;
				if (this.npc) {
					this.bonusSkill += 1;
				} else {
					this.bonusSkill += 3;
				}
				this.hpBase = 12;
				this.hpLevel = 4;
				this.spdBase = 6;
				break;
    		}
		};
		// Template
    	this.applyTemplate = function (template) {
    		this.template = template;
    		switch (template) {
    		case 'Minion':
    			break;
    		case 'Solo':
    			this.ap = 1;
    			this.bonusAtWill += 1;
    			this.savingThrow += 5;
    			break;
    		case "Acolyte":
    			this.origin += " (demon)";
    			this.resistance.increase("fire", 5);
    			this.resistance.increase("necrotic", 5);
    			this.resistance.increase("disease", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("will", 2);
    			break;
    		case "Adept of Frost":
    			this.origin += " (elemental)";
    			this.resistance.increase("cold", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
    			break;
    		case "Adept of Flame":
    			this.origin += " (elemental)";
    			this.resistance.increase("fire", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
    			break;
			case "Adept of Lightning":
				this.origin += " (elemental)";
    			this.resistance.increase("lightning", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				break;
			case "Adept of Thunder":
				this.origin += " (elemental)";
    			this.resistance.increase("thunder", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("will", 2);
				this.increaseDefence("reflex", 2);
				break;
			case "Battle Champion":
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				break;
			case "Bodyguard":
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 4);
				this.increaseDefence("reflex", 1);
				this.increaseDefence("will", 1);
				break;
			case "Death Knight":
				this.origin += " (undead)";
				this.hasDarkVision = true;
				this.immunity.set("disease", 1);
				this.immunity.set("poison", 1);
				this.resistance.increase("necrotic", 5);
				this.vulnerable.increase("radiant", 10);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 4);
				this.increaseDefence("will", 2);
				break;
			case "Death Master":
				this.origin += " (shadow)";
				this.hasDarkVision = true;
				this.resistance.increase("necrotic", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("will", 2);
				break;
			case "Demagogue":
				this.savingThrow += 2;
				this.ap = 1;
				this.resistance.increase("charm", 5);
				this.resistance.increase("fear", 5);
				this.increaseDefence("fort", 2);
				this.increaseDefence("will", 4);
				break;
			case "Devastator":
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("reflex", 2);
				break;
			case 'Feyborn':
				this.origin += " (fey)";
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				break;
			case "Lich":
				this.origin += " (undead)";
				this.hasDarkVision = true;
				this.immunity.set("disease", 1);
				this.immunity.set("poison", 1);
				this.resistance.increase("necrotic", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.regenerate = 10;
				this.increaseDefence("fort", 4);
				this.increaseDefence("will", 4);
				break;
			case "Mummy Champion":
				this.origin += " (undead)";
				this.hasDarkVision = true;
				this.immunity.set("disease", 1);
				this.immunity.set("poison", 1);
				this.resistance.increase("necrotic", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.regenerate = 10;
				this.increaseDefence("fort", 2);
				this.increaseDefence("will", 4);
				break;
			case "Mummy Lord":
				this.origin += " (undead)";
				this.hasDarkVision = true;
				this.immunity.set("disease", 1);
				this.immunity.set("poison", 1);
				this.resistance.increase("necrotic", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.regenerate = 10;
				this.increaseDefence("fort", 2);
				this.increaseDefence("will", 4);
				break;
			case "Savage Berserker":
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 4);
				this.regenerate = 10;
				break;
			case "Shadowborn":
				this.origin += " (shadow)";
				this.hasDarkVision = true;
				this.savingThrow += 2;
				this.ap = 1;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				break;
			case "Vampire Lord":
				this.origin += " (undead)";
				this.hasDarkVision = true;
				this.immunity.set("disease", 1);
				this.immunity.set("poison", 1);
				this.resistance.increase("necrotic", 5);
				this.vulnerable.increase("radiant", 5);
				this.savingThrow += 2;
				this.ap = 1;
				this.regenerate = 10;
				this.increaseDefence("fort", 2);
				this.increaseDefence("reflex", 2);
				this.increaseDefence("will", 2);
				break;
			default:
				this.ap = 1;
				this.savingThrow += 2;
				break;
    		};
		};
    };
    Creature.prototype = new Storage();
    /**
     * Return our public API
     */
    return {
        blank: new Creature(),
        create4E: (function (name, level, race, career, template, npc, attributes, preferences, height, weight) {
        	var temp = new Creature(name, level, npc);
        	temp.set("str", attributes[0]);
        	temp.set("con", attributes[1]);
        	temp.set("dex", attributes[2]);
        	temp.set("int", attributes[3]);
        	temp.set("wis", attributes[4]);
        	temp.set("cha", attributes[5]);
        	temp.preferred = preferences;
        	temp.addDefence("fort", "str", "con", 0);
        	temp.addDefence("reflex", "dex", "int", 0);
        	temp.addDefence("will", "wis", "cha", 0);
        	temp.addSkill("acrobatics", "dex", 0);
        	temp.addSkill("arcana", "int", 0);
        	temp.addSkill("athletics", "str", 0);
        	temp.addSkill("bluff", "cha", 0);
        	temp.addSkill("diplomacy", "cha", 0);
        	temp.addSkill("dungeon", "wis", 0);
        	temp.addSkill("endurance", "con", 0);
        	temp.addSkill("heal", "wis", 0);
        	temp.addSkill("history", "int", 0);
        	temp.addSkill("insight", "wis", 0);
        	temp.addSkill("intimidate", "cha", 0);
        	temp.addSkill("nature", "wis", 0);
        	temp.addSkill("perception", "wis", 0);
        	temp.addSkill("religion", "int", 0);
        	temp.addSkill("stealth", "dex", 0);
        	temp.addSkill("streetwise", "cha", 0);
        	temp.addSkill("thievery", "dex", 0);
        	temp.applyRacial(race, height, weight);
        	temp.applyClass(career);
        	temp.applyTemplate(template);
        	temp.levelUp();
        	return temp;
        }),
        serialise: (function (creature) {
        	// The attributes are not saved when stringified, so we create a temporary storage space for it
        	if (creature.attributes) {
        		creature.abilities = creature.attributes;
        	}
        	return JSON.stringify(creature);
        }),
        deserialise: (function (creature) {
        	var hydrated = JSON.parse(creature);
        	if (hydrated !== null && typeof hydrated === 'object') {
	        	var toReturn = new Creature(hydrated.name, hydrated.level, hydrated.npc);
	        	for (key in hydrated) {
	        		if (typeof hydrated[key] === "object") {
	        			switch (key) {
	        			case 'abilities':
	        				for (attribute in hydrated[key]) {
	        					toReturn.set(attribute, hydrated[key][attribute]);
	        				}
	        				break;
	        			case 'defence':
	        				for (defence in hydrated[key]) {
	        					toReturn.addDefence(defence, hydrated[key][defence].attribute1, hydrated[key][defence].attribute1, hydrated[key][defence].value);
	        				}
	        				break;
	        			case 'immunity':
	        				for (immunity in hydrated[key].attributes) {
	        					toReturn.immunity.set(immunity, hydrated[key].attributes[immunity]);
	        				}
	        				break;
	        			case 'resistance':
	        				for (resist in hydrated[key].attributes) {
	        					toReturn.resistance.set(resist, hydrated[key].attributes[resist]);
	        				}
	        				break;
	        			case 'skill':
	        				for (skill in hydrated[key]) {
	        					toReturn.addSkill(skill, hydrated[key][skill].key, hydrated[key][skill].value);
	        				}
	        				break;
	        			case 'vulnerable':
	        				for (vuln in hydrated[key].attributes) {
	        					toReturn.vulnerable.set(vuln, hydrated[key].attributes[vuln]);
	        				}
	        				break;
	        			default:
	        				toReturn[key] = hydrated[key];
	        			}
	        		} else {
	        			toReturn[key] = hydrated[key];
	        		}
	        	}
	        	return toReturn;
        	}
        	return null;
        })
    };
})(window);