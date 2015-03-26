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
				"description": "Lacquered and hardened leather scales connected together in parrallel rows by rivets and lace. Light armour that is cheap and quick to make. Weak to piercing. Slashing could sever the lace. Generally not very durable."
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
				"description": "Full suit of iron plated armour. Heavy armour that is protects against all damage types. Still provides adequate manuervability"
			},
			{
				"name": "scale",
				"ac": 5,
				"limit": 7,
				"description": "Metal strips with iron on the inside and steel on the outside that is held together with leather straps and worn with a padded undergarment. Heavy Armour that offers decent protection against all damage types but still has some exposed weak areas"
			}
		],
		"armr": "armo+modifier_dexterity",
		"attr": {
			"strength": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
			"dexterity": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
			"constitution": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
			"intelligence": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
			"wisdom": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
			"charisma": {
				"attack": "$+prof",
				"min": 5,
				"max": 30,
				"mod": "Math.floor(($-10)/2)",
				"save": "8+$+prof"
			},
		},
		"bonu":	["ac","hp"],
		"cr":{
			"defence": [
			    "if (hp<85) { Math.round(((hp/10)/14)*100)/100; } else if (hp<400) { Math.floor((hp-70)/15)+1; } else { Math.floor(((hp-355)/45)+20) }",
			    "$+(((a_c-(13+Math.floor(Math.abs($-1)/3)))/2)|0)",
			    "if ($>1) { Math.floor($); } else { Math.max(0,$); }"
			],
			"offence": [
			    "if (damage<14) { Math.round((damage/16)*100)/100; } else if (damage<123) { Math.floor((damage-8)/6); } else { Math.floor(((damage-122)/18)+19) }",
			    "if ($<1) { $+((((prof+attribute)-((($)*2)))/2)|0); } else { $+((((prof+attribute)-(((($+1)/3)|0)+4))/2)|0); }",
			    "if ($>1) { Math.floor($); } else { Math.max(0,$); }"
			],
			"final": "(((defence+offence)/2) > 1) ? Math.floor((defence+offence)/2) :Math.max(0,(defence+offence)/2)"
		},
		"hp":	"if (level>0) { leveldsize*type+(level*modifier_constitution)+bonus_hp } else { 1+modifier_constitution+bonus_hp }",
		"lang": ["abyssal","aquan","auran","celestial","common","draconic","druidic","dwarven","elven","giant","gnome","goblin","gnoll","halfling","ignan","infernal","orc","sylvan","terran","undercommon"],
		"prof": "if (level>0) { Math.floor((level-1)/4)+2 } else { 0 }",
		"skil": {
			"acrobatics": {
				"base": "dexterity",
				"description": "Balancing / Diving / Flipping / Jumping / Rolling / Tumbling"
			},
			"animals": {
				"base": "wisdom",
				"description": "You are trained to work with animals and can teach them tricks"
			},
			"arcana": {
				"base": "intelligence",
				"description": "You studied ancient mysteries / magic / symbols / constructs / dragons / magical beasts"
			},
			"athletics": {
				"base": "strength",
				"description": "Breaking / Climbing /Jumping / Pulling / Pushing / Restraining"
			},
			"appraise": {
				"base": "intelligence",
				"description": "You can evaluate the monetary value of an object"
			},
			"bluff": {
				"base": "charisma",
				"description": "Usually an opposed check to insight. Fool / Lie / Mislead"
			},
			"brawling": {
				"base": "strength",
				"description": "You are a canny street-fighter. This is used to avoid lengthy non-lethal encounters"
			},
			"diplomacy": {
				"base": "charisma",
				"description": "Convince / Influence / Persuade / Negotiate / Resolve"
			},
			"engineering": {
				"base": "intelligence",
				"description": "You studied the science and math behind buildings / bridges / machines / fortifications"
			},
			"heal": {
				"base": "wisdom",
				"description": "You are skilled at tending to wounds and ailments and have extensive medical knowledge"
			},
			"history": {
				"base": "intelligence",
				"description": "You studied wars / colonies / migrations / foundings of cities / major events"
			},
			"insight": {
				"base": "wisdom",
				"description": "You are skilled at detecting falsehoods and true intentions"
			},
			"intimidate": {
				"base": "charisma",
				"description": "Hostility / Threats / Violence"
			},
			"investigation": {
				"base": "intelligence",
				"description": "You are can find clues and deduce their meaning"
			},
			"nature": {
				"base": "intelligence",
				"description": "You studied animals / fey / monsters / plants / seasons / cycles / weather / terrain"
			},
			"perception": {
				"base": "wisdom",
				"description": "You are aware of your surroundings and are alert to danger. This also covers the five senses of sight / hearing / touch / taste / smell"
			},
			"perform": {
				"base": "charisma",
				"description": "You are skilled at a form of entertainment such as singing / acting / comedy / dance / oratory / juggling"
			},
			"religion": {
				"base": "intelligence",
				"description": "You studied deities / mythic history / ecclesiastic tradition / holy symbols / undead"
			},
			"sleight": {
				"base": "dexterity",
				"description": "Picking pockets / drawing hidden weapons / taking actions without notice"
			},
			"stealth": {
				"base": "dexterity",
				"description": "Avoid detection / Hiding / Moving silently"
			},
			"survival": {
				"base": "wisdom",
				"description": "You are skilled in surviving in the wilderness. You can find trails / tracks / food / water"
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
			"alchemist": "Ability to craft herbal mixtures / chemicals / magic elixirs",
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
		    "fishing": "Skilled in working seas / lakes / rivers",
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
		         ["undead",1]],
		"moral": [
			["virtuous", "They actively seek out good causes and have a strong moral code. Extremely Good and Selfless"],
			["good", "Generally do the right thing by others. Altruistic and Respectful"],
			["neutral", "Mainly influenced by self-preservation than by morality"],
			["evil", "Generally seek to exploit others for personal gain. Corrupt, Greedy and Selfish"],
			["vile", "They actively oppress or destroy others in their quest for power or riches. Extremely Evil and Sadistic"]
		],
		"ethic": [
			["conservative", "Actively seek the imposition of standing traditions, order and legal structures. Authoritive and Principled"],
			["order", "Believes that a strong, well-ordered society is beneficial to them and their loved ones. Lawful, Organised, and Respectful"],
			["neutral", "Mainly influenced by pragmatism than by civic extremes"],
			["liberal", "Believes in freedom and choice over tradition. Free-minded, Individualistic, and Skeptical of authority"],
			["progressive", "Actively seeks to topple or destroy what they deem as oppressive authoritorian regimes or traditions. Extremely Liberal, Anarchists, and Rebellious"]
		]
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
    // Our local name value
    var name = "Commoner";
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
	// Local morality value
	var monsterMoral = Math.floor((config["moral"].length-1)/2);
	// Local ethics value
	var monsterEthic = Math.floor((config["ethic"].length-1)/2);
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
		for (var attr in config["bonu"]) {
			array[config["bonu"][attr]] = 0;
		}
		return array;
	};
	// Local value of languages
	var languages = new function () {
		var array = [];
		for (var attr in config["lang"]) {
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
	// Set up the values
	function revalue () {
		attributes = new function () {
			var array = [];
			for (var attr in config["attr"]) {
				array[attr] = Math.floor((config["attr"][attr].max - config["attr"][attr].min)/2);
			}
			return array;
		};
		monsterSize = Math.floor((config["size"].length-1)/2);
		monsterType = Math.floor((config["type"].length-1)/2);
		monsterMoral = Math.floor((config["moral"].length-1)/2);
		monsterEthic = Math.floor((config["ethic"].length-1)/2);
		skills = new function () {
			var array = [];
			for (var attr in config["skil"]) {
				array[attr] = [config["skil"][attr]["base"], false];
			}
			return array;
		};
		tools = new function () {
			var array = [];
			for (var attr in config["tool"]) {
				array[attr] = false;
			}
			return array;
		};
		// Local value of armour
		armour = Math.floor((config["armo"].length-1)/2);
		// Local value of bonuses
		bonuses = new function () {
			var array = [];
			for (var attr in config["bonu"]) {
				array[config["bonu"][attr]] = 0;
			}
			return array;
		};
		// Local value of languages
		languages = new function () {
			var array = [];
			for (var attr in config["lang"]) {
				array[config["lang"][attr]] = false;
			}
			return array;
		};
		// Local value of senses
		senses = new function () {
			var array = [];
			for (attr in config["sens"]) {
				array[config["sens"][attr]] = 0;
			}
			return array;
		};
		// Local value of speeds
		speeds = new function () {
			var array = [];
			for (attr in config["spdy"]) {
				array[config["spdy"][attr]] = 0;
			}
			return array;
		};
	}
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
	// Calculate the attack for a given attribute
	function attackDC(attribute) {
		// Normalise input
		attribute = (typeof attribute === "string") ? attribute : "strength";
		// Get our configured values for this attribute
		var attr = config["attr"][attribute];
		if (attr.attack && attributes[attribute]) {
			// Replace out the marker text
			var calc = attr.attack.replace(/\$/g,mod(attribute,attributes[attribute]));
			// Execute and return the value
			return eval(parse(calc));
		}
		return 0;
	};
	// Calculate the attack for a given attribute
	function saveDC(attribute) {
		// Normalise input
		attribute = (typeof attribute === "string") ? attribute : "strength";
		// Get our configured values for this attribute
		var attr = config["attr"][attribute];
		if (attr.save && attributes[attribute]) {
			// Replace out the marker text
			var calc = attr.save.replace(/\$/g,mod(attribute,attributes[attribute]));
			// Execute and return the value
			return eval(parse(calc));
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
			if (!(flags.indexOf('M') > -1)) {
				for (var key in attributes) {
					var re = new RegExp("modifier_"+key,"g");
					calculation = calculation.replace(re,mod(key,attributes[key]));
					re = new RegExp(key,"g");
					calculation = calculation.replace(re,attributes[key]);
				}
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
	// ref: http://stackoverflow.com/a/1293163/2343
    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;

        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if ( strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }

            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue.replace(/(^\s*)|(\s*$)/g,''));
        }

        // Return the parsed data.
        return( arrData );
    }
	return {
		// Functions that deal with level
		getLevel: (function () { return level; }),
		setLevel: (function (value) { 
			value = parseInt(value);
			level = value;
			return level;
		}),
		// Functions that deal with level
		getName: (function () { return name; }),
		setName: (function (value) { 
			name = value;
			return name;
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
		listSize: (function () { return config["size"]; }),
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
		listType: (function () { return config["type"]; }),
		// Functions that deal with morals
		getMoral: (function () { return config["moral"][monsterMoral][0]; }),
		setMoral: (function (value) {
			for (var values in config["moral"]) {
				if (config["moral"][values][0] === value) {
					monsterMoral = values;
				}
			}
			return config["moral"][monsterMoral][0];
		}),
		listMoral: (function () { return config["moral"]; }),
		// Functions that deal with ethics
		getEthic: (function () { return config["ethic"][monsterEthic][0]; }),
		setEthic: (function (value) {
			for (var values in config["ethic"]) {
				if (config["ethic"][values][0] === value) {
					monsterEthic = values;
				}
			}
			return config["ethic"][monsterEthic][0];
		}),
		listEthic: (function () { return config["ethic"]; }),
		// Functions that deal with attributes
		getMod: (function (attribute) { if (attributes[attribute]) { return mod(attribute,attributes[attribute]); } return 0; }),
		getAttack: (function (attribute) { if (attributes[attribute]) { return attackDC(attribute,attributes[attribute]); } return 0; }),
		getSave: (function (attribute) { if (attributes[attribute]) { return saveDC(attribute,attributes[attribute]); } return 0; }),
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
			return 0;
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
			return "";
		}),
		getSkillProf: (function (skill) {
			if (config["skil"][skill]) {
				return skills[skill][1];
			}
			return false;
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
			return "";
		}),
		setToolProf: (function (tool, proficient) {
			proficient = (proficient) ? true : false;
			if (tool) {
				tools[tool] = proficient;
			}
			return tools[tool];
		}),
		getToolProf: (function (tool) {
			if (tools[tool]) {
				return tools[tool];
			}
			return false;
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
		listArmour: (function () { return config["armo"]; }),
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
				calc = calc.replace(/\$/g,eval(result));
				calc = calc.replace(/damage/g,damage);
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
			var result = eval(calc);
			return result;
		}),
		showDCR: function() {
			return config["cr"]["defence"];
		},
		showOCR: function() {
			return config["cr"]["offence"];
		},
		showCR: function() {
			return config["cr"]["final"];
		},
		// Save and Load the config
        saveConfig: (function () {
    		// Save the new object
    		localStorage.setItem('monster.config', JSON.stringify(config));
    	}),
    	loadConfig: (function () {
    		// Load the stored object
    		if (localStorage['monster.config']) {
    			config = JSON.parse(localStorage['monster.config']);
    		}
    		revalue();
    	}),
		// Get and Set the list of armours in CSV format
		getArmourCSV: (function () {
			var csv = "";
			if (config["armo"]) {
				for (var item in config["armo"]) {
					if (csv !== "") {
						csv += "\n";
					}
					var i = 0;
					for (var entry in config["armo"][item]) {
						if (i > 0) {
							csv += ", ";
						}
						csv += config["armo"][item][entry];
						i++;
					}
				}
			}
			return csv;
		}),
		setArmourCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv.length > 0) {
					config["armo"] = [];
					for (var item in csv) {
						if (csv[item].length === 4) {
							config["armo"][item] = {
								"name": csv[item][0],
								"ac": csv[item][1],
								"limit": csv[item][2],
								"description": csv[item][3]
							}
						}
					}
				}
			}
			return config["armo"];
		}),
		// Get and Set the list of attributes in CSV format
		getAttributesCSV: (function () {
			var csv = "";
			if (config["attr"]) {
				for (var item in config["attr"]) {
					if (csv !== "") {
						csv += "\n";
					}
					csv += item;
					var i = 0;
					for (var entry in config["attr"][item]) {
						csv += ", " + config["attr"][item][entry];
						i++;
					}
				}
			}
			return csv;
		}),
		setAttributesCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv.length > 0) {
					config["attr"] = {};
					for (var item in csv) {
						if (csv[item].length === 6) {
							var key =csv[item][0]; 
							config["attr"][key] =  {
								"attack": csv[item][1],
								"min": csv[item][2],
								"max": csv[item][3],
								"mod": csv[item][4],
								"save": csv[item][5]
							};
						}
					}
				}
			}
			return config["attr"];
		}),
		// Get and Set the list of skills in CSV format
		getSkillsCSV: (function () {
			var csv = "";
			if (config["skil"]) {
				for (var item in config["skil"]) {
					if (csv !== "") {
						csv += "\n";
					}
					csv += item;
					var i = 0;
					for (var entry in config["skil"][item]) {
						csv += ", " + config["skil"][item][entry];
						i++;
					}
				}
			}
			return csv;
		}),
		setSkillsCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv.length > 0) {
					config["skil"] = {};
					for (var item in csv) {
						if (csv[item].length === 3) {
							var key = csv[item][0];
							config["skil"][key] = {
								"base": csv[item][1],
								"description": csv[item][2]
							}
						}
					}
				}
			}
			return config["skil"];
		}),
		// Get and Set the list of tools in CSV format
		getToolsCSV: (function () {
			var csv = "";
			if (config["tool"]) {
				for (var item in config["tool"]) {
					if (csv !== "") {
						csv += "\n";
					}
					csv += item + ", " + config["tool"][item];
				}
			}
			return csv;
		}),
		setToolsCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv.length > 0) {
					config["tool"] = {};
					for (var item in csv) {
						if (csv[item].length === 2) {
							var key = csv[item][0];
							config["tool"][key] = csv[item][1];
						}
					}
				}
			}
			return config["tool"];
		}),
		// Get and Set the list of languages in CSV format
		getLangsCSV: (function () {
			var csv = "";
			if (config["lang"]) {
				for (var item in config["lang"]) {
					if (csv !== "") {
						csv += ",";
					}
					csv += config["lang"][item];
				}
			}
			return csv;
		}),
		setLangsCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv[0].length > 0) {
					config["lang"] = [];
					for (var item in csv[0]) {
						config["lang"][item] = csv[0][item];
					}
				}
			}
			return config["lang"];
		}),
		// Get and Set the list of bonuses in CSV format
		getBonusCSV: (function () {
			var csv = "";
			if (config["bonu"]) {
				for (var item in config["bonu"]) {
					if (csv !== "") {
						csv += ",";
					}
					csv += config["bonu"][item];
				}
			}
			return csv;
		}),
		setBonusCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv[0].length > 0) {
					config["bonu"] = [];
					for (var item in csv[0]) {
						config["bonu"][item] = csv[0][item];
					}
				}
			}
			return config["bonu"];
		}),
		// Get and Set the list of senses in CSV format
		getSensesCSV: (function () {
			var csv = "";
			if (config["sens"]) {
				for (var item in config["sens"]) {
					if (csv !== "") {
						csv += ",";
					}
					csv += config["sens"][item];
				}
			}
			return csv;
		}),
		setSensesCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv[0].length > 0) {
					config["sens"] = [];
					for (var item in csv[0]) {
						config["sens"][item] = csv[0][item];
					}
				}
			}
			return config["sens"];
		}),
		// Get and Set the list of speeds in CSV format
		getSpeedsCSV: (function () {
			var csv = "";
			if (config["spdy"]) {
				for (var item in config["spdy"]) {
					if (csv !== "") {
						csv += ",";
					}
					csv += config["spdy"][item];
				}
			}
			return csv;
		}),
		setSpeedsCSV: (function (inputString) {
			var csv = [];
			if (inputString) {
				csv = CSVToArray( inputString );
				if (csv[0].length > 0) {
					config["spdy"] = [];
					for (var item in csv[0]) {
						config["spdy"][item] = csv[0][item];
					}
				}
			}
			return config["spdy"];
		}),
		// Grab the current configuration
		getConfig: function () { return config; }
	};
};