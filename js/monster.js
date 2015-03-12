/**
 *  Handles a variety of Monster functions
 */
var Monster = new function () {
	var config = {
		"ac":	"10+armr+bonus_ac",
		"armo": [
			{
				"name": "breastplate",
				"ac": 4,
				"limit": 6,
				"description": "Fitted single-piece steel torso with hardened leather elsewhere. Medium armour that is stronger than the classical cuirass"
			},
			{
				"name": "cuirass",
				"ac": 2,
				"limit": 4,
				"description": "Fitted single-piece bronze or iron torso with hardened leather elsewhere. Medium armour that protects the vital organs but can be restrictive"
			},
			{
				"name": "lamellar",
				"ac": 1,
				"limit": 3,
				"description": "Lacquered and hardened leather scales connected together in parrallel rows by rivets and lace. Light weight, cheap and quick to make. Weak to piercing, slashing could sever the lace, and generally not very durable."
			},
			{
				"name": "mail",
				"ac": 3,
				"limit": 5,
				"description": "Iron chains linked together over a padded undergarment. Medium armour that allowed more flexibility than other armour. Relatively inexpensive but requires a large amount of time to create. Weakness to piercing."
			},
			{
				"name": "none",
				"ac": 0,
				"limit": 4,
				"description": "No armour"
			},
			{
				"name": "plate",
				"ac": 6,
				"limit": 8,
				"description": "Full suit of iron plated armour. Heavy armour that is protects against all damage types, and still provides adequate manuervability"
			},
			{
				"name": "scale",
				"ac": 5,
				"limit": 7,
				"description": "Metal strips with iron on the inside and steel on the outside, held together with leather straps and worn with a padded undergarment. Heavy Armour that offers decent protection against all damage types but still has some exposed weak areas"
			}
		],
		"armr": "armo+modifier_dexterity",
		"attr": {
			"strength": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
			"dexterity": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
			"constitution": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
			"intelligence": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
			"wisdom": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
			"charisma": {
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)"
			},
		},
		"bonu":	["ac","hp"],
		"cr":{
			"defence": [
			    "if (hp<85) { Math.round(((hp/10)/14)*100)/100; } else if (hp<400) { Math.floor((hp-70)/15)+1; } else { Math.floor(((hp-355)/45)+20) }",
			    "$+(((a_c-(13+Math.floor(Math.abs($-1)/3)))/2)|0)",
			    "if ($>1) { Math.floor($); } else { $; }"
			],
			"offence": [
			    "if ($<14) { Math.round(($/16)*100)/100; } else if ($<123) { Math.floor(($-8)/6); } else { Math.floor((($-122)/18)+19) }",
			    "if ($<1) { $+((((prof+attribute)-((($)*2)))/2)|0); } else { $+((((prof+attribute)-(((($+1)/3)|0)+4))/2)|0); }",
			    //"if ($>1) { Math.floor($); } else { $; }"
			],
			"final": "(defence+offence)/2"
		},
		"hp":	"if (level>0) { leveldsize*type+(level*modifier_constitution)+bonus_hp } else { 1+modifier_constitution+bonus_hp }",
		"lang": ["abyssal","aquan","auran","celestial","common","draconic","druidic","dwarven","elven","giant","gnome","goblin","gnoll","halfling","ignan","infernal","orc","sylvan","terran","undercommon"],
		"prof": "if (level>0) { Math.floor((level-1)/4)+2 } else { 0 }",
		"skil": {
			"acrobatics": {
				"base": "dexterity",
				"description": "Balancing, Diving, Flipping, Jumping, Rolling, Tumbling"
			},
			"animals": {
				"base": "wisdom",
				"description": "You are trained to work with animals, and can teach them tricks"
			},
			"arcana": {
				"base": "intelligence",
				"description": "You studied ancient mysteries, magic, symbols, constructs, dragons and magical beasts"
			},
			"athletics": {
				"base": "strength",
				"description": "Breaking obstacles, Climbing, Jumping, Pulling, Pushing, Restraining"
			},
			"appraise": {
				"base": "intelligence",
				"description": "You can evaluate the monetary value of an object"
			},
			"bluff": {
				"base": "charisma",
				"description": "Usually an opposed check to insight. Fool, Lie, Mislead"
			},
			"brawling": {
				"base": "strength",
				"description": "You are a canny street-fighter. This is used to avoid lengthy non-lethal encounters"
			},
			"diplomacy": {
				"base": "charisma",
				"description": "Convince, Influence, Persuade, Negotiate, Resolve"
			},
			"engineering": {
				"base": "intelligence",
				"description": "You studied the science and math behind buildings, bridges, machines and fortifications"
			},
			"heal": {
				"base": "wisdom",
				"description": "You are skilled at tending to wounds and ailments, and have extensive medical knowledge"
			},
			"history": {
				"base": "intelligence",
				"description": "You studied wars, colonies, migrations, foundings of cities, and major events"
			},
			"insight": {
				"base": "wisdom",
				"description": "You are skilled at detecting falsehoods and true intentions"
			},
			"intimidate": {
				"base": "charisma",
				"description": "Hostility, Threats, Violence"
			},
			"investigation": {
				"base": "intelligence",
				"description": "You are can find clues and deduce their meaning"
			},
			"nature": {
				"base": "intelligence",
				"description": "You studied animals, fey, monsters, plants, seasons, cycles, weather and terrain"
			},
			"perception": {
				"base": "wisdom",
				"description": "You are aware of your surroundings and are alert to danger. This also covers the five senses of sight, hearing, touch, taste and smell"
			},
			"perform": {
				"base": "charisma",
				"description": "You are skilled at a form of entertainment such as singing, acting, comedy, dance, oratory, and juggling"
			},
			"religion": {
				"base": "intelligence",
				"description": "You studied deities, mythic history, ecclesiastic tradition, holy symbols, and the undead"
			},
			"sleight": {
				"base": "dexterity",
				"description": "Picking pockets, drawing hidden weapons, and taking actions without notice"
			},
			"stealth": {
				"base": "dexterity",
				"description": "Avoid detection, Hiding, Moving silently"
			},
			"survival": {
				"base": "wisdom",
				"description": "You are skilled in surviving in the wilderness. You can find trails, tracks, food and water"
			},
			"swim": {
				"base": "strength",
				"description": "You are skilled at swimming"
			},
		},
		"sens": ["blindsight","darkvision","tremorsense"],
		"size": [["tiny",4],
		         ["small",6],
		         ["medium",8],
		         ["large",10],
		         ["huge",12],
		         ["gargantuan",20]],
		"spdy": ["fly","speed","swim"],
		"tool": {
			"alchemist": "Ability to craft herbal mixtures, chemistry and magic elixirs",
		    "blacksmith": "Ability to shape metals to craft objects",
		    "bowyer": "Ability to craft bows and arrows",
		    "brass": "Skilled in brass instruments",
		    "brewer": "Ability to craft different drinks",
		    "carpenter": "Ability to craft objects with wood",
		    "cartographer": "Ability to create and understand maps",
		    "climber": "Skilled in climbing",
		    "cook": "Ability to craft and prepare food",
		    "disguise": "Ability to craft convincing disguises",
		    "farming": "Skilled in working the land",
		    "fishing": "Skilled in working seas, lakes and rivers",
		    "gambling": "Skilled in games of chance",
		    "gardening": "Skilled in horticulture",
		    "glassblower": "Ability to craft objects with glass",
		    "hunter": "Skilled in hunting game",
		    "jeweler": "Ability to craft objects with gems and jewels",
		    "mason": "Ability to craft objects with stone",
		    "medical": "Skilled in applying bandages and salves",
		    "mining": "Skilled in extracting ore",
		    "navigation": "Skilled in using charts to determine direction",
		    "painter": "Skilled in creating art pieces out of paint",
		    "percussion": "Skilled in percussion instruments",
		    "poisoner": "Ability to craft poisons safely",
		    "potter": "Ability to craft object out of clay",
		    "riding": "Skilled in mounting and riding animals",
		    "sailing": "Skilled in running a ship",
		    "sculpter": "Skilled in creating art pieces out of rocks",
		    "strings": "Skilled in stringed instruments",
		    "tanner": "Ability to craft objects out of leather",
		    "thieves": "Skilled in picking locks and disarming traps",
		    "weaver": "Ability objects out of cloth",
		    "woodcutting": "Skilled in gathering wood",
		    "woodwind": "Skilled in woodwind instruments",
		    "writing": "Skilled in writing"
		},
		"type": [["aberration",1],
		         ["animal",1],
		         ["construct",1],
		         ["dragon",1],
		         ["elemental",1],
		         ["fey",1],
		         ["humanoid",1],
		         ["magical",1],
		         ["monster",1],
		         ["ooze",1],
		         ["outsider",1],
		         ["plant",1],
		         ["undead",1]]
	};
	// Our setting on whether we should use average rolls or not
	var useAverage = false;
	// Perform a basic pseudo-random roll
    function roll (type, number) {
    	if (useAverage) {
    		return Math.floor(((type/2)+0.5)*number);
    	}
        type = (type) ? parseInt(type,10) : 20;
        number = (number) ? parseInt(number,10) : 1;
        var result = 0;
        for (var i = 0; i < number; ++i) {
            result += Math.round(Math.random()*(type-1))+1;
        }
        return result;
    };
	// Our local level value
	var level = 0;
	// Local value of attributes
	var attributes = new function () {
		var array = [];
		for (var attr in config["attr"]) {
			array[attr] = Math.floor((config["attr"][attr].max - config["attr"][attr].min)/2);
		}
		return array;
	};
	// Local size value
	var monsterSize = Math.floor((config["size"].length-1)/2);
	// Local type value
	var monsterType = Math.floor((config["type"].length-1)/2);
	// Local value of skills
	var skills = new function () {
		var array = [];
		for (var attr in config["skil"]) {
			array[attr] = [config["skil"][attr]["base"], false];
		}
		return array;
	};
	// Local value of tools
	var tools = new function () {
		var array = [];
		for (var attr in config["tool"]) {
			array[attr] = false;
		}
		return array;
	};
	// Local value of armour
	var armour = Math.floor((config["armo"].length-1)/2);
	// Local value of bonuses
	var bonuses = new function () {
		var array = [];
		for (attr in config["bonu"]) {
			array[config["bonu"][attr]] = 0;
		}
		return array;
	};
	// Local value of languages
	var languages = new function () {
		var array = [];
		for (attr in config["lang"]) {
			array[config["lang"][attr]] = false;
		}
		return array;
	};
	// Local value of senses
	var senses = new function () {
		var array = [];
		for (attr in config["sens"]) {
			array[config["sens"][attr]] = 0;
		}
		return array;
	};
	// Local value of speeds
	var speeds = new function () {
		var array = [];
		for (attr in config["spdy"]) {
			array[config["spdy"][attr]] = 0;
		}
		return array;
	};
	// Calculate the modifier for a given attribute
	function mod(attribute, value) {
		// Normalise input
		attribute = (typeof attribute === "string") ? attribute : "strength";
		value = parseInt(value,10);
		// Get our configured values for this attribute
		var attr = config["attr"][attribute];
		if (attr.mod) {
			// Ensure out value is within bounds
			value = (value > attr.max) ? attr.max : value;
			value = (value < attr.min) ? attr.min : value;
			// Replace out the marker text
			var calc = attr.mod.replace(/\$/g,value);
			// Execute and return the value
			return eval(calc);
		}
		return 0;
	};
	// Parse our calculations and return as a string
	function parse(calculation,code) {
		var flags = (typeof code === "string") ? code.split(','): [];
		if (typeof calculation === "string") {
			// replace all keywords
			calculation = calculation.replace(/level/g,level);
			calculation = calculation.replace(/size/g,config["size"][monsterSize][1]);
			calculation = calculation.replace(/type/g,config["type"][monsterType][1]);
			calculation = calculation.replace(/armo/g,config["armo"][armour].ac);
			for (var key in attributes) {
				var re = new RegExp("modifier_"+key,"g");
				calculation = calculation.replace(re,mod(key,attributes[key]));
				re = new RegExp(key,"g");
				calculation = calculation.replace(re,attributes[key]);
			}
			for (var key in bonuses) {
				var re = new RegExp("bonus_"+key,"g");
				calculation = calculation.replace(re,bonuses[key]);
			}
			if (!(flags.indexOf('P') > -1)) {
				calculation = calculation.replace(/prof/g,prof(code));
			}
			if (!(flags.indexOf('A') > -1)) {
				calculation = calculation.replace(/armr/g,armr(code));
			}
			if (!(flags.indexOf('H') > -1)) {
				calculation = calculation.replace(/hp/g,eval(parse(config["hp"],code+",H")));
			}
			if (!(flags.indexOf('C') > -1)) {
				calculation = calculation.replace(/a_c/g,eval(parse(config["ac"],code+",C")));
			}
			var matched = calculation.match(/[0-9]+d[0-9]+/g);
			for (var match in matched) {
				var sep = matched[match].split("d");
				var re = new RegExp(matched[match]);
				calculation = calculation.replace(re,roll(sep[1],sep[0]));
			}
		}
		return calculation;
	};
	// Calculate the proficiency
	function prof(code) {
		return eval(parse(config["prof"],code+",P"));
	};
	// Calculate the armour score
	function armr(code) {
		var value = eval(parse(config["armr"],code+",A"));
		if (value > config["armo"][armour].limit) {
			value = config["armo"][armour].limit;
		}
		return value;
	}
	return {
		// Functions that deal with level
		getLevel: (function () { return level; }),
		setLevel: (function (value) { 
			value = parseInt(value);
			level = value;
			return level;
		}),
		// Toggle the use of average rolls
		setAverageRoll: (function (input) { useAverage = (input) ? true : false; }),
		// Functions that deal with proficiency
		getProficiency: (function () { return prof(); }),
		// Functions that deal with hp
		getHP: (function () { return eval(parse(config["hp"]),"H"); }),
		// Functions that deal with ac
		getAC: (function () { return eval(parse(config["ac"]),"C"); }),
		// Functions that deal with size
		getSize: (function () { return config["size"][monsterSize][0]; }),
		setSize: (function (value) {
			for (var values in config["size"]) {
				if (config["size"][values][0] === value) {
					monsterSize = values;
				}
			}
			return config["size"][monsterSize][0];
		}),
		// Functions that deal with type
		getType: (function () { return config["type"][monsterType][0]; }),
		setType: (function (value) {
			for (var values in config["type"]) {
				if (config["type"][values][0] === value) {
					monsterType = values;
				}
			}
			return config["type"][monsterType][0];
		}),
		// Functions that deal with attributes
		getMod: (function (attribute) { if (attributes[attribute]) { return mod(attribute,attributes[attribute]); } }),
		getAttributes: (function (attribute) {
			if (attributes[attribute]) {
				return attributes[attribute];
			}
			return attributes; 
		}),
		setAttribute: (function (attribute, value) {
			if (attributes[attribute]) {
				// Ensure out value is valid and within bounds
				value = parseInt(value);
				value = (value > config["attr"][attribute]["max"]) ? config["attr"][attribute]["max"] : value;
				value = (value < config["attr"][attribute]["min"]) ? config["attr"][attribute]["min"] : value;
				attributes[attribute] = value;
				return attributes[attribute];
			}
		}),
		// Functions that deal with skills
		getSkills: (function (skill) {
			if (skills[skill]) {
				return mod(skills[skill][0],attributes[skills[skill][0]]) + ((skills[skill][1]) ? prof() : 0);
			}
			var array = [];
			for (var s in skills) {
				array[s] = this.getSkills(s);
			}
			return array; 
		}),
		getSkillDesc: (function (skill) {
			if (config["skil"][skill]) {
				return config["skil"][skill]["description"];
			}
		}),
		setSkillProf: (function (skill, proficient) {
			proficient = (proficient) ? true : false;
			if (skills[skill]) {
				skills[skill][1] = proficient;
			}
			return skills[skill][1];
		}),
		// Functions that deal with tools
		getTools: (function (tool) {
			if (tool) {
				return (tools[tool]) ? prof() : 0;
			}
			var array = [];
			for (var s in tools) {
				array[s] = this.getTools(s);
			}
			return array; 
		}),
		getToolDesc: (function (tool) {
			if (config["tool"][tool]) {
				return config["tool"][tool];
			}
		}),
		setToolProf: (function (tool, proficient) {
			proficient = (proficient) ? true : false;
			if (tool) {
				tools[tool] = proficient;
			}
			return tools[tool];
		}),
		// Functions that deal with languages
		getLang: (function (lang) {
			if (lang) {
				return languages[lang];
			}
			return languages; 
		}),
		setLang: (function (lang, proficient) {
			proficient = (proficient) ? true : false;
			if (lang) {
				languages[lang] = proficient;
			}
			return languages[lang];
		}),
		// Functions that deal with bonuses
		getBonus: (function (bonus) {
			if (bonus) {
				return bonuses[bonus];
			}
			return bonuses; 
		}),
		setBonus: (function (bonus, value) {
			value = parseInt(value,10);
			if (bonus) {
				bonuses[bonus] = value;
			}
			return bonuses[bonus];
		}),
		// Functions that deal with senses
		getSense: (function (sense) {
			if (sense) {
				return senses[sense];
			}
			return senses; 
		}),
		setSense: (function (sense, value) {
			value = parseInt(value,10);
			if (sense) {
				senses[sense] = value;
			}
			return senses[sense];
		}),
		// Functions that deal with speeds
		getSpeed: (function (speed) {
			if (speed) {
				return speeds[speed];
			}
			return speeds; 
		}),
		setSpeed: (function (speed, value) {
			value = parseInt(value,10);
			if (speed) {
				speeds[speed] = value;
			}
			return speeds[speed];
		}),
		// Functions that deal with armour
		getArmour: (function () { return config["armo"][armour].name; }),
		setArmour: (function (value) {
			for (var values in config["armo"]) {
				if (config["armo"][values].name === value) {
					armour = values;
				}
			}
			return this.getArmour();
		}),
		getArmourScore: (function() { return armr(); }),
		// Functions for Challenge Ratings
		getDCR: (function () {
			var result = 0;
			for (var i in config["cr"]["defence"]) {
				var calc = config["cr"]["defence"][i];
				if (i > 0) {
					calc = calc.replace(/\$/g,eval(result));
				}
				result = parse(calc);
			}
			return eval(result);
		}),
		getOCR: (function (damage,attribute) {
			// Validate our input
			if (!attributes[attribute]) {
				return 0;
			}
			damage = parseInt(damage,10);
			// Stores the result
			var result = 0;
			for (var i in config["cr"]["offence"]) {
				var calc = config["cr"]["offence"][i];
				if (i > 0) {
					calc = calc.replace(/\$/g,eval(result));
				} else {
					calc = calc.replace(/\$/g,damage);
				}
				calc = calc.replace(/attribute/g,mod(attribute,attributes[attribute]));
				result = parse(calc);
			}
			return eval(result);
		}),
		getCR: (function (damage,attribute) {
			// Validate our input
			if (!attributes[attribute]) {
				return 0;
			}
			var calc = config["cr"]["final"];
			calc = calc.replace(/defence/g,this.getDCR());
			calc = calc.replace(/offence/g,this.getOCR(damage,attribute));
			return eval(calc);
		})
	};
};