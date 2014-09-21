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
    	this.race = "Unknown";
    	this.career = "Unknown";
    	this.template = "Unknown";
    	this.speed = 6;
    	this.size = "Medium";
    	this.origin = "Natural";
    	this.gender = "male";
    	this.npc = 0;
    	this.height = 155;
    	this.weight = 55;
    	this.hasLowVision = false;
    	this.hasDarkVision = false;
    	this.bonusSkill = 0;
    	this.bonusAtWill = 0;
    	this.bonusInitiative = 0;
    	this.bonusAttribute = 0;
    	this.vision = function () {
    		return (this.hasDarkVision) ? "Dark Vision" : (this.hasLowVision ? "Low Vision" : "Normal Vision");
    	};
    	// Our level stuff
    	this.level = level ? parseInt(level, 10) : 1;
    	this.modLevel = function () {
    		return Math.floor(this.level * 0.5);
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
    			this.defence[defence].value += 2;
    		}
    	};
        // Our skill stuff
    	this.skill = {};
    	this.addSkill = function (skill, key, value) {
    		this.skill[skill] = new Skill(key, value);
    	};
    	this.increaseSkill = function (skill, value) {
    		if (this.skill[skill]) {
    			this.skill[skill].value += 2;
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
    			text += key + " +" + this.resistance.get(key) + "<br />";
    		}
    		return text;
    	};
    	this.vulnerable = Storage();
    	this.immunity =  Storage();
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
    	// Racial stats (race, height (0-3), weight (0-3), random factor (1d4))
    	this.applyRacial = function (race, h, w, r) {
    		this.race = race;
    		switch (race) {
    		case 'Bugbear':
    			// Add onto our modifiers
    			this.increase("str", 2);
    			this.increase("dex", 2);
    			this.increaseSkill("stealth", 2);
    			this.increaseSkill("intimidate", 2);
    			this.hasLowVision = true;
    			this.height = calcWH(200, 220, h, r);
    			this.weight = calcWH(110, 135, w, r);
    			break;
    		case 'Dragonborn':
    			this.increase("str", 2);
    			this.increase("cha", 2);
    			this.increaseSkill("history", 2);
    			this.increaseSkill("intimidate", 2);
    			this.height = calcWH(190, 205, h, r);
    			this.weight = calcWH(100, 150, w, r);
    			break;
    		case 'Drow':
    			this.origin = "Fey";
    			this.hasDarkVision = true;
    			this.increase("dex", 2);
    			this.increase("cha", 2);
    			this.increaseSkill("stealth", 2);
    			this.increaseSkill("intimidate", 2);
    			this.height = calcWH(160, 180, h, r);
    			this.weight = calcWH(60, 80, w, r);
    			break;
    		case "Dwarf":
    			this.speed = 5;
    			this.increase("con", 2);
    			this.increase("wis", 2);
    			this.increaseSkill("dungeon", 2);
    			this.increaseSkill("endurance", 2);
    			this.height = calcWH(130, 145, h, r);
    			this.weight = calcWH(70, 100, w, r);
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
    			this.bonusSkill = 1;
    			this.resistance.set("charm", 5);
    			this.height = calcWH(165, 185, h, r);
    			this.weight = calcWH(60, 80, w, r);
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
    			this.height = calcWH(145, 185, h, r);
    			this.weight = calcWH(55, 75, w, r);
    			break;
			case "Gnoll":
				this.speed = 7;
				this.hasLowVision = true;
				this.increase("con", 2);
				this.increase("dex", 2);
				this.increaseSkill("intimidate", 2);
				this.height = calcWH(210, 230, h, r);
    			this.weight = calcWH(125, 145, w, r);
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
				this.height = calcWH(100, 115, h, r);
    			this.weight = calcWH(20, 35, w, r);
				break;
			case "Goblin":
				this.hasLowVision = true;
				this.size = "Small";
				this.increase("dex", 2);
				this.increase("cha", 2);
				this.increaseSkill("thievery", 2);
				this.increaseSkill("stealth", 2);
				this.increaseDefence("reflex", 1);
				this.height = calcWH(100, 115, h, r);
    			this.weight = calcWH(20, 30, w, r);
				break;
			case "Goliath":
				this.increase("str", 2);
				this.increase("con", 2);
				this.increaseSkill("athletics", 2);
				this.increaseSkill("nature", 2);
				this.increaseDefence("will", 1);
				this.height = calcWH(200, 230, h, r);
    			this.weight = calcWH(125, 155, w, r);
				break;
			case "Half-Elf":
				this.hasLowVision = true;
				this.increase("cha", 2);
				this.increase("con", 2);
				this.increaseSkill("diplomacy", 2);
				this.increaseSkill("insight", 2);
				this.height = calcWH(165, 190, h, r);
    			this.weight = calcWH(60, 85, w, r);
				break;
			case "Half-Orc":
				this.hasLowVision = true;
				this.increase("str", 2);
				this.increase("dex", 2);
				this.increaseSkill("endurance", 2);
				this.increaseSkill("intimidate", 2);
				this.height = calcWH(175, 195, h, r);
    			this.weight = calcWH(70, 105, w, r);
				break;
			case "Halfling":
				this.size = "Small";
				this.increase("cha", 2);
				this.increase("dex", 2);
				this.increaseSkill("acrobatics", 2);
				this.increaseSkill("thievery", 2);
				this.height = calcWH(115, 130, h, r);
    			this.weight = calcWH(35, 40, w, r);
    			this.resistance.set("fear", 5);
				break;
			case "Hobgoblin":
				heightMin = 180;
				heightMax = 195;
				weightMin = 85;
				weightMax = 110;
				skills.setAthletics(2);
				skills.setHistory(2);
				attributes.setCon(2);
				attributes.setCha(2);
				bonusInitiative = 2;
				hasLowVision = true;
				break;
			case 'Human':
				this.bonusSkill = 1;
				this.bonusAttribute = 2;
				this.bonusAtWill = 1;
				this.increaseDefence("fort", 1);
				this.increaseDefence("reflex", 1);
				this.increaseDefence("will", 1);
				this.height = calcWH(165, 190, h, r);
    			this.weight = calcWH(60, 100, w, r);
				break;
			case "Kobold":
				this.size = "Small";
				this.increase("dex", 2);
				this.increase("con", 2);
				this.increaseSkill("stealth", 2);
				this.increaseSkill("thievery", 2);
				this.increaseDefence("will", 1);
				this.height = calcWH(105, 120, h, r);
    			this.weight = calcWH(30, 35, w, r);
				break;
			case "Minotaur":
				heightMin = 210;
				heightMax = 230;
				weightMin = 145;
				weightMax = 160;
				attributes.setStr(2);
				attributes.setCon(2);
				skills.setNature(2);
				skills.setPerception(2);
				break;
			case "Orc":
				this.hasLowVision = true;
				this.increase("str", 2);
				this.increase("con", 2);
				this.height = calcWH(180, 195, h, r);
    			this.weight = calcWH(90, 105, w, r);
				break;
			case "Tiefling":
				this.hasLowVision = true;
				this.increase("int", 2);
				this.increase("cha", 2);
				this.increaseSkill("stealth", 2);
				this.increaseSkill("bluff", 2);
				this.resistance.set("fire", 5);
				this.height = calcWH(170, 195, h, r);
    			this.weight = calcWH(65, 110, w, r);
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
        create4E: (function (name, level, race, career, template, npc, str, con, dex, int, wis, cha) {
        	var temp = new Creature(name, level, npc);
        	temp.set("str", str);
        	temp.set("con", con);
        	temp.set("dex", dex);
        	temp.set("int", int);
        	temp.set("wis", wis);
        	temp.set("cha", cha);
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
        	temp.applyRacial(race, 1, 1, 1);
        	return temp;
        })
    };
})(window);