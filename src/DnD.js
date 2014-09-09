/* ===========================================
 * Drag and Drop Variable
 * ===========================================
 */
var dragSrcEl = null;

/* ===========================================
 * Number sorter
 * ===========================================
 */
function sortNumber(a,b) {
    return a - b;
}

/* ===========================================
 * Print only part of a webpage
 * ===========================================
 */
function PrintElem(id)
{
    Popup(window.document.getElementById(id).innerHTML);
}

function Popup(data) 
{
    var mywindow = window.open('', 'DnD Character', 'height=400,width=600');
    mywindow.document.write('<html><head><title>DnD Character</title></head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.print();
    mywindow.close();
    return true;
}

/* ===========================================
 * Form object
 * ===========================================
 */
function Forms() {
	/**
	 * The race of the creature
	 */
	this.racesDropdown = (function (cssClass) {
		var races = ["Angel",
			         "Archon",
			         "Bugbear",
		             "Demon",
		             "Devil",
		             "Dragon",
		             "Dragonborn",
		             "Drow",
		             "Dwarf",
		             "Eladrin",
		             "Elf",
		             "Gnoll",
		             "Gnome",
		             "Goblin",
		             "Goliath",
		             "Half-Elf",
		             "Half-Orc",
		             "Halfling",
		             "Hobgoblin",
		             "Human",
		             "Kobold",
		             "Minotaur",
		             "Orc",
		             "Tiefling"];
		var text = "<select id='race_input' class='"+cssClass+"' name='race_input'>";
		
		races.forEach(function(race) {
			text += "<option value='"+race+"'>"+race+"</option>";
		});
		return text + "</select>";
	});
	
	/**
	 * The class of the creature
	 */
	this.classDropdown = (function (cssClass) {
		var classes = ["Adept",
		               "Aristocrat",
		               "Artillery",
		               "Artisan",
		               "Avenger",
		               "Barbarian",
		               "Bard",
		               "Brute",
		               "Cleric",
		               "Commoner",
		               "Controller",
		               "Courtesan",
		               "Criminal",
		               "Druid",
		               "Fighter",
		               "Healer",
		               "Labourer",
		               "Lurker",
		               "Merchant",
		               "Paladin",
		               "Priest",
		               "Ranger",
		               "Rogue",
		               "Scholar",
		               "Shaman",
		               "Skirmisher",
		               "Sorceror",
		               "Soldier",
		               "Warlock",
		               "Warlord",
		               "Wizard",
		               "Warden",
		               "Warrior"];
		var text = "<select id='class_input' class='"+cssClass+"' name='class_input'>";
		
		classes.forEach(function(type) {
			text += "<option value='"+type+"'>"+type+"</option>";
		});
		return text + "</select>";
	});
	
	/**
	 * The level of the creature
	 */
	this.levelDropdown = (function (limit, cssClass) {
		var level = (limit > 0) ? limit : 30; 
		var text = "<select id='level_input' class='"+cssClass+"' name='level_input'>";
		
		for(var i = 1; i <= level; ++i) {
			text += "<option value='"+i+"'>"+i+"</option>";
		}
		return text + "</select>";
	});
	
	/**
	 * The level of the creature
	 */
	this.attributeDropdown = (function (attribute, limit, cssClass) {
		var level = (limit > 10) ? limit : 18; 
		var text = "<select id='"+attribute+"_input' class='"+cssClass+"' name='"+attribute+"_input'>";
		
		for(var i = 1; i <= level; ++i) {
			text += "<option value='"+i+"'>"+i+"</option>";
		}
		return text + "</select>";
	});
	
	/**
	 * The attribute preference of the creature
	 */
	this.preferenceDropdown = (function (cssClass) {
		var text = "<ol id='pref_input' class='"+cssClass+"' name='pref_input'>";
		var attribs = ["STR","CON","DEX","INT","WIS","CHA"];
		attribs.forEach(function(type) {
			text += "<li draggable='true' class='dnd_pref_input'>"+type+"</li>";
		});
		return text + "</ol>";
	});
}

/* ===========================================
 * Environment and Form set-up
 * ===========================================
 */
window.onload = (function ()
{
	// Display our form elements
	var form = new Forms();
    window.document.getElementById('races').innerHTML = form.racesDropdown();
    window.document.getElementById('classes').innerHTML = form.classDropdown();
    window.document.getElementById('levels').innerHTML = form.levelDropdown();
    window.document.getElementById('prefs').innerHTML = form.preferenceDropdown();
    window.document.getElementById('str').innerHTML = form.attributeDropdown('str');
    window.document.getElementById('con').innerHTML = form.attributeDropdown('con');
    window.document.getElementById('dex').innerHTML = form.attributeDropdown('dex');
    window.document.getElementById('int').innerHTML = form.attributeDropdown('int');
    window.document.getElementById('wis').innerHTML = form.attributeDropdown('wis');
    window.document.getElementById('cha').innerHTML = form.attributeDropdown('cha');
    
    // Drag and drop elements for preferences
    var draggable = window.document.getElementsByClassName('dnd_pref_input');
    for (var i = 0; i < draggable.length; ++i) {
    	draggable[i].addEventListener('dragstart', (function (e) {dragSrcEl = this; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/html',this.innerHTML); }), false);
    	draggable[i].addEventListener('dragenter', (function (e) { this.classList.add('over'); }), false);
    	draggable[i].addEventListener('dragleave', (function (e) { this.classList.remove('over'); }), false);
    	draggable[i].addEventListener('dragover', (function (e) {if (e.preventDefault) { e.preventDefault(); } e.dataTransfer.dropEffect = 'move'; return false; }));
    	draggable[i].addEventListener('drop', (function (e) {if (e.stopPropagation) { e.stopPropagation(); } if (dragSrcEl != this) { dragSrcEl.innerHTML = this.innerHTML; this.innerHTML = e.dataTransfer.getData('text/html'); } return false; }), false);
    };
    
	// Hide the Human Bonus part
	var e = window.document.querySelectorAll(".human_bonus");
	for (var i = 0; i < e.length; i++) {
		e[i].style["visibility"] = "show";
		e[i].style["display"] = "none";
	}
	
	// Function to SHOW / HIDE elements
	var humanBonusElement = (function () {
		var e = window.document.querySelectorAll(".human_bonus");
		for (var i = 0; i < e.length; i++) {
			if (window.document.querySelector("#race_input").value == "Human") {
				e[i].style["display"] = "block";
			} else {
				e[i].style["display"] = "none";
			}
		}
	});
	
	window.document.querySelector("#race_input").onchange = humanBonusElement;
});

/* ===========================================
 * DnD main code
 * ===========================================
 */

/**
 * The DnD system
 * 
 * This will handle the instantiation of our variables (including drawing)
 */
var DnD = (function(window) {
	/* ============================================
     * Dice Object
     * ============================================
     */
	this.dice = new function Dice() {
		/**
		 * Standard dice
		 */
		function roll (type, number) {
			type = (type && (typeof type === "number")) ? type : 20;
			number = (number && (typeof number === "number")) ? number : 1;
			var result = 0;
			for (var i = 0; i < number; ++i) {
				result += Math.round(Math.random()*(type-1))+1;
			}
			return result;
		};
		
		return {
			/**
			 * D2 dice
			 */
			d2: (function (number) { return roll(2,number); }),	
			/**
			 * D3 dice
			 */
			d3: (function (number) { return roll(3,number); }),
			/**
			 * D4 dice
			 */
			d4: (function (number) { return roll(4,number); }),
			/**
			 * D6 dice
			 */
			d6: (function (number) { return roll(6,number); }),
			/**
			 * D8 dice
			 */
			d8: (function (number) { return roll(8,number); }),
			/**
			 * D10 dice
			 */
			d10: (function (number) { return roll(10,number); }),
			/**
			 * D12 dice
			 */
			d12: (function (number) { return roll(12,number); }),
			/**
			 * D20 dice
			 */
			d20: (function (number) { return roll(20,number); }),
			/**
			 * D30 dice
			 */
			d30: (function (number) { return roll(30,number); }),
			/**
			 * D100 dice
			 */
			d100: (function (number) { return roll(100,number); }),
			/**
			 * For Character Attribute rolls
			 */
			charAttribute: (function () {
				var result = new Array(roll(6),roll(6,1),roll(6,1),roll(6,1));
				result.sort(sortNumber); 
				return result[1] + result[2] + result[3];
			})
		};
	};
	
	/* ============================================
     * Attributes Object
     * ============================================
     */
	function Attributes() {
		/**
		 * Order is STR, CON, DEX, INT, WIS, CHA
		 */
		var attributes = [0,0,0,0,0,0];
		return {
			// Reset values
			reset: function() { attributes = [0,0,0,0,0,0]; },
			// Get values
			getStr: function() { return parseInt(attributes[0]); },
			getCon: function() { return parseInt(attributes[1]); },
			getDex: function() { return parseInt(attributes[2]); },
			getInt: function() { return parseInt(attributes[3]); },
			getWis: function() { return parseInt(attributes[4]); },
			getCha: function() { return parseInt(attributes[5]); },
			// Set Values
			setStr: function(value) { attributes[0] = parseInt(value); },
			setCon: function(value) { attributes[1] = parseInt(value); },
			setDex: function(value) { attributes[2] = parseInt(value); },
			setInt: function(value) { attributes[3] = parseInt(value); },
			setWis: function(value) { attributes[4] = parseInt(value); },
			setCha: function(value) { attributes[5] = parseInt(value); },
		};
	}
	
	/* ============================================
     * Skills Object
     * ============================================
     */
	function Skills() {
		/**
		 * Order is:
		 * 
		 * 0 - Acrobatics
		 * 1 - Arcana (Knowledge)
		 * 2 - Athletics
		 * 3 - Bluff
		 * 4 - Diplomacy
		 * 5 - Dungeoneering
		 * 6 - Endurance
		 * 7 - Heal
		 * 8 - History
		 * 9 - Insight
		 * 10 - Intimidate
		 * 11 - Nature
		 * 12 - Perception
		 * 13 - Religion
		 * 14 - Stealth
		 * 15 - Streetwise
		 * 16 - Thievery
		 */
		var skills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		return {
			// Reset values
			reset: function() { skills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; },
			// Get values
			getAcrobatics: function() { return skills[0]; },
			getArcana: function() { return skills[1]; },
			getAthletics: function() { return skills[2]; },
			getBluff: function() { return skills[3]; },
			getDiplomacy: function() { return skills[4]; },
			getDungeoneering: function() { return skills[5]; },
			getEndurance: function() { return skills[6]; },
			getHeal: function() { return skills[7]; },
			getHistory: function() { return skills[8]; },
			getInsight: function() { return skills[9]; },
			getIntimidate: function() { return skills[10]; },
			getNature: function() { return skills[11]; },
			getPerception: function() { return skills[12]; },
			getReligion: function() { return skills[13]; },
			getStealth: function() { return skills[14]; },
			getStreetwise: function() { return skills[15]; },
			getThievery: function() { return skills[16]; },
			// Set Values
			setAcrobatics: function(value) { skills[0] = parseInt(value); },
			setArcana: function(value) { skills[1] = parseInt(value); },
			setAthletics: function(value) { skills[2] = parseInt(value); },
			setBluff: function(value) { skills[3] = parseInt(value); },
			setDiplomacy: function(value) { skills[4] = parseInt(value); },
			setDungeoneering: function(value) { skills[5] = parseInt(value); },
			setEndurance: function(value) { skills[6] = parseInt(value); },
			setHeal: function(value) { skills[7] = parseInt(value); },
			setHistory: function(value) { skills[8] = parseInt(value); },
			setInsight: function(value) { skills[9] = parseInt(value); },
			setIntimidate: function(value) { skills[10] = parseInt(value); },
			setNature: function(value) { skills[11] = parseInt(value); },
			setPerception: function(value) { skills[12] = parseInt(value); },
			setReligion: function(value) { skills[13] = parseInt(value); },
			setStealth: function(value) { skills[14] = parseInt(value); },
			setStreetwise: function(value) { skills[15] = parseInt(value); },
			setThievery: function(value) { skills[16] = parseInt(value); }
		};
	}
	
	/* ============================================
     * Resistances, Vulnerabilities and Immunities Object
     * ============================================
     */
	function Resistances() {
		/**
		 * Order is:
		 * 
		 * 0 - Acid
		 * 1 - Cold
		 * 2 - Fire
		 * 3 - Lightning
		 * 4 - Poison
		 * 5 - Thunder
		 * 6 - Necrotic
		 * 7 - Radiant
		 * 8 - Psychic
		 * 9 - Force
		 * 10 - Charm
		 * 11 - Fear
		 * 12 - Sleep
		 * 13 - Disease
		 * 14 - Illusion
		 * 15 - Petrification
		 * 16 - Other
		 */
		var resist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		return {
			// Reset values
			reset: function() { resist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; },
			// Get values
			getAcid: function() { return parseInt(resist[0]); },
			getCold: function() { return parseInt(resist[1]); },
			getFire: function() { return parseInt(resist[2]); },
			getLightning: function() { return parseInt(resist[3]); },
			getPoison: function() { return parseInt(resist[4]); },
			getThunder: function() { return parseInt(resist[5]); },
			getNecrotic: function() { return parseInt(resist[6]); },
			getRadiant: function() { return parseInt(resist[7]); },
			getPsychic: function() { return parseInt(resist[8]); },
			getForce: function() { return parseInt(resist[9]); },
			getCharm: function() { return parseInt(resist[10]); },
			getFear: function() { return parseInt(resist[11]); },
			getSleep: function() { return parseInt(resist[12]); },
			getDisease: function() { return parseInt(resist[13]); },
			getIllusion: function() { return parseInt(resist[14]); },
			getPetrification: function() { return parseInt(resist[15]); },
			getOther: function() { return parseInt(resist[16]); },
			// Set Values
			setAcid: function(value) { resist[0] = parseInt(value);},
			setCold: function(value) { resist[1] = parseInt(value);},
			setFire: function(value) { resist[2] = parseInt(value);},
			setLightning: function(value) { resist[3] = parseInt(value);},
			setPoison: function(value) { resist[4] = parseInt(value);},
			setThunder: function(value) { resist[5] = parseInt(value);},
			setNecrotic: function(value) { resist[6] = parseInt(value);},
			setRadiant: function(value) { resist[7] = parseInt(value);},
			setPsychic: function(value) { resist[8] = parseInt(value);},
			setForce: function(value) { resist[9] = parseInt(value);},
			setCharm: function(value) { resist[10] = parseInt(value);},
			setFear: function(value) { resist[11] = parseInt(value);},
			setSleep: function(value) { resist[12] = parseInt(value);},
			setDisease: function(value) { resist[13] = parseInt(value);},
			setIllusion: function(value) { resist[14] = parseInt(value);},
			setPetrification: function(value) { resist[15] = parseInt(value);},
			setOther: function(value) { resist[16] = parseInt(value);}
		};
	}
	
	/* ============================================
     * Defences Object
     * ============================================
     */
	function Defences() {
		/**
		 * Order is AC, Fortitude, Reflex, Willpower
		 */
		var attributes = [0,0,0,0];
		return {
			// Reset values
			reset: function() { attributes = [0,0,0,0]; },
			// Get values
			getAC: function() { return parseInt(attributes[0]); },
			getFort: function() { return parseInt(attributes[1]); },
			getReflex: function() { return parseInt(attributes[2]); },
			getWill: function() { return parseInt(attributes[3]); },
			// Set Values
			setAC: function(value) { attributes[0] = parseInt(value); },
			setFort: function(value) { attributes[1] = parseInt(value); },
			setReflex: function(value) { attributes[2] = parseInt(value); },
			setWill: function(value) { attributes[3] = parseInt(value); }
		};
	}
	
	/* ============================================
     * Race Object
     * ============================================
     */
	function Race() {
		/**
		 * Details
		 */
		var name = "Unknown";
		var origin = "Natural";
		var heightMin = 155;
		var heightMax = 185;
		var weightMin = 60;
		var weightMax = 80;
		var speed = 6;
		var hasLowVision = false;
		var hasDarkVision = false;
		var size = 2; // 0 = Tiny, 1 = Small, 2 = Medium, 3 = Large, 4 = Gigantic
		var attributes = new Attributes();
		var bonusAttributes = 0;
		var skills = new Skills();
		var bonusSkills = 0;
		var defence = new Defences();;
		var bonusAtWill = 0;
		var resistances = new Resistances();
		var vulnerable = new Resistances();
		var immunity = new Resistances();
		/**
		 * Resets the race object
		 */
		function reset() {
			name = "Unknown";
			origin = "Natural";
			heightMin = 155;
			heightMax = 185;
			weightMin = 60;
			weightMax = 80;
			speed = 6;
			hasLowVision = false;
			hasDarkVision = false;
			size = 2;
			attributes.reset();
			bonusAttributes = 0;
			skills.reset();
			bonusSkills = 0;
			defence.reset();
			bonusAtWill = 0;
			resistances.reset();
			vulnerable.reset();
			immunity.reset();
		};
		
		return {
			//Getters
			getName: function () { return name;},
			getOrigin: function () { return origin;},
			getSpeed: function () { return speed;},
			getVision: function () { return (hasDarkVision) ? "Dark Vision" : ((hasLowVision) ? "Low Vision" : "Normal Vision");},
			getAttributes: function () { return attributes; },
			getSkills: function () { return skills; },
			getResistances: function () { return resistances; },
			getVulnerabilities: function () { return vulnerable; },
			getImmunities: function () { return immunity; },
			getBonusAttributes: function () { return bonusAttributes; },
			getBonusSkills: function () { return bonusSkills; },
			getBonusAtWills: function () { return bonusAtWill; },
			getMinHeight: function () { return heightMin; },
			getMinWeight: function () { return weightMin; },
			getMaxHeight: function () { return heightMax; },
			getMaxWeight: function () { return weightMax; },
			getSize: function () { 
				switch(size) {
					case 0:
						return "Tiny";
						break;
					case 1:
						return "Small";
						break;
					case 3:
						return "Large";
						break;
					case 4:
						return "Gigantic";
						break;
				}
				return "Medium";
			},
			
			/**
			 * Sets the Race details
			 */
			set: function (selection) {
				reset();
				switch (selection) {
					case 'Dragonborn':
						heightMin = 190;
						heightMax = 205;
						weightMin = 100;
						weightMax = 150;
						attributes.setStr(2);
						attributes.setCha(2);
						skills.setHistory(2);
						skills.setIntimidate(2);
						break;
					case "Dwarf":
						heightMin = 130;
						heightMax = 145;
						weightMin = 70;
						weightMax = 100;
						hasLowVision = true;
						speed = 5;
						skills.setDungeoneering(2);
						skills.setEndurance(2);
						attributes.setCon(2);
						attributes.setWis(2);
						resistances.setPoison(5);
						break;
					case "Eladrin":
						origin = "Fey";
						heightMin = 165;
						heightMax = 185;
						skills.setArcana(2);
						skills.History(2);
						attributes.setDex(2);
						attributes.setInt(2);
						defence.setWill(1);
						hasLowVision = true;
						bonusSkills = 1;
						resistance.setCharm(5);
						break;
					case "Elf":
						origin = "Fey";
						speed = 7;
						heightMin = 145;
						weightMin = 55;
						weightMax = 75;
						skills.setNature(2);
						skills.setPerception(2);
						attributes.setDex(2);
						attributes.setWis(2);
						hasLowVision = true;
						break;
					case "Half-Elf":
						heightMin = 165;
						heightMax = 190;
						weightMax = 85;
						skills.setDiplomacy(2);
						skills.setInsight(2);
						attributes.setCon(2);
						attributes.setCha(2);
						hasLowVision = true;
						break;
					case "Halfling":
						heightMin = 115;
						heightMax = 130;
						weightMin = 35;
						weightMax = 40;
						size = 1;
						skills.setAcrobatics(2);
						skills.setThievery(2);
						attributes.setDex(2);
						attributes.setCha(2);
						resistances.setFear(5);
						break;
					case 'Human':
						heightMin = 165;
						heightMax = 190;
						weightMax = 100;
						bonusAttributes = 2;
						bonusSkills = 1;
						defence.setFort(1);
						defence.setReflex(1);
						defence.setWill(1);
						bonusAtWill = 1;
						break;
					case "Tiefling":
						heightMin = 170;
						heightMax = 195;
						weightMin = 65;
						weightMax = 110;
						hasLowVision = true;
						skills.setBluff(2);
						skills.setStealth(2);
						attributes.setInt(2);
						attributes.setCha(2);
						resistances.setFire(5);
						break;
				};
				name = selection;
			}
		};
	}
	
	
    /**
     * Base Creature
     */
	function Creature() {
		/**
		 * Details
		 */
		this.race = new Race();
		this.level = 1;
		this.xp = 0;
		// Role-playing
		this.age = 0;
		this.gender = "Unknown";
		this.deity = "Unknown";
		this.alignment = "Neutral";
		//Class is a keyword so it now becomes 'career'
		this.career = "Unknown";
		// Speed
		this.speedMod = 0;
		// Iniative
		this.initiativeMod = 0;
		// Hit Point values
		this.hpBase = 10;
		this.hpLevel = 4;
		this.hpBonus = 0;
		this.surgeBonus = 0;
		this.spdBase = 6;
		this.spdBonus = 0;
		
		
		/**
		 * Attributes
		 * 
		 * Order is STR, CON, DEX, INT, WIS, CHA
		 */
		this.attributes = new Attributes();
		
		/**
		 * Class Attribute Modifiers
		 */
		this.classAttributes = [0,0,0,0,0,0];
		
		/**
		 * Misc Attribute Modifiers
		 */
		this.miscAttributes = [0,0,0,0,0,0];
		
		/**
		 * Trained Skills
		 */
		this.trainedSkills = new Skills();
		
		/**
		 * Class Skills
		 */
		this.classSkills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		/**
		 * Misc Skills
		 */
		this.miscSkills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		/**
		 * Class Defences
		 * 
		 * Order is AC, FORT, REF, WIL
		 */
		this.classDefence = [0,0,0,0];
		
		/**
		 * Misc Defences
		 */
		this.raceDefence = [0,0,0,0];
		
		/**
		 * Misc Defences
		 */
		this.miscDefence = [0,0,0,0];
		
		/**
		 * Armour
		 */
		this.armour = {
				name: "Cloth",
				ac: 0,
				bonus: 1,
				check: 0,
				speed: 0,
				price: 1,
				weight: 4
		};
		
		// ======== INFORMATION ===========
		
		/**
		 * The normal weight limit (pounds)
		 */
		this.getNormalLoadPounds = (function () {
			return this.getStrength() * 10;
		});
		
		/**
		 * The normal weight limit (kilos)
		 */
		this.getNormalLoadKilos = (function () {
			return Math.floor(this.getNormalLoadPounds() * 0.45);
		});
		
		/**
		 * The heavy weight limit (pounds)
		 */
		this.getHeavyLoadPounds = (function () {
			return this.getNormalLoadPounds() * 2;
		});
		
		/**
		 * The heavy weight limit (kilos)
		 */
		this.getHeavyLoadKilos = (function () {
			return Math.floor(this.getHeavyLoadPounds() * 0.45);
		});
		
		/**
		 * The heavy weight limit (pounds)
		 */
		this.getDragLoadPounds = (function () {
			return this.getNormalLoadPounds() * 5;
		});
		
		/**
		 * The drag weight limit (kilos)
		 */
		this.getDragLoadKilos = (function () {
			return Math.floor(this.getDragLoadPounds() * 0.45);
		});
		
		/**
		 * Speed in squares
		 */
		this.getSpeed = (function () {
			return this.speedBase + this.speedMod + this.armour.speed;
		});
		
		/**
		 * Speed in feet (per turn)
		 */
		this.getSpeedFeet = (function () {
			return this.getSpeed() * 5;
		});
		
		/**
		 * Speed in metres (per turn)
		 */
		this.getSpeedMetre = (function () {
			return (this.getSpeedFeet() * 0.305).toFixed(1);
		});
		
		/**
		 * Speed in feet (per minute)
		 */
		this.getSpeedFpm = (function () {
			return this.getSpeedFeet() * 10;
		});
		
		/**
		 * Speed in metres (per minute)
		 */
		this.getSpeedMpm = (function () {
			return (this.getSpeedFpm() * 0.305).toFixed(1);
		});
		
		/**
		 * Speed in feet (per hour)
		 */
		this.getSpeedFph = (function () {
			return this.getSpeedFpm() * 60;
		});
		
		/**
		 * Speed in metres (per hour)
		 */
		this.getSpeedMph = (function () {
			return (this.getSpeedFph() * 0.305).toFixed(1);
		});
		
		/**
		 * Speed in miles (per hour)
		 */
		this.getSpeedMiles = (function() {
			return Math.floor(this.getSpeedFph() * 0.000189);
		});
		
		/**
		 * Speed in kilometres (per hour)
		 */
		this.getSpeedKm = (function() {
			return (this.getSpeedMiles() * 1.61).toFixed(1);
		});
		
		/**
		 * Speed in miles (per day)
		 */
		this.getSpeedMilesPerDay = (function() {
			return this.getSpeedMiles() * 8;
		});
		
		/**
		 * Speed in kilometres (per day)
		 */
		this.getSpeedKmPerDay = (function() {
			return (this.getSpeedMilesPerDay() * 1.61).toFixed(1);
		});
		
		/**
		 * Reach
		 */
		this.getReach = (function () {
			switch (this.size) {
				case 0:
					return 0;
					break;
				case 1:
					return 1;
					break;
				default:
					return this.size-1;
					break;
			}
			return 1;
		});
		
		/**
		 * Square space needed
		 */
		this.getSquare = (function () {
			switch (this.size) {
				case 0:
					return 0.5;
					break;
				case 1:
					return 1;
					break;
				default:
					return this.size-1;
					break;
			}
			return 1;
		});
		
		/**
		 * Number of at will spells
		 */
		this.getAtWillNumber = (function () {
			return 2 + ((this.race == "Human") ? 1 : 0);
		});
		
		/**
		 * Number of Feats known
		 */
		this.getFeatsNum = (function () {
			return 1 + Math.floor(this.level/2) + Math.floor((this.level-1)/10) + ((this.race == "Human") ? 1: 0);
		});
		
		/**
		 * Number of Encounters known
		 */
		this.getEncountersNum = (function () {
			if (this.level > 2 && this.level < 7) {
				return 2;
			} else if (this.level >= 7 && this.level < 11) {
				return 3;
			} else if (this.level >= 11) {
				return 4;
			}
			return 1;
		});
		
		/**
		 * Number of Dailies known
		 */
		this.getDailiesNum = (function () {
			var multi = (this.career == "Wizard") ? 2 : 1;
			if (this.level > 4 && this.level < 9) {
				return 2 * multi;
			} else if (this.level >= 9 && this.level < 21) {
				return 3 * multi;
			} else if (this.level >= 21) {
				return 4 * multi;
			}
			return 1 * multi;
		});
		
		/**
		 * Number of Utilities known
		 */
		this.getUtilitiesNum = (function () {
			var multi = (this.career == "Wizard") ? 2 : 1;
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
		
		// ======== ATTRIBUTES, INITIATIVE AND SKILLS ===========
		
		/**
		 * LEVEL MODIFIER
		 */
		this.getLevelMod = (function () {
			return Math.floor(this.level * 0.5);
		});
		
		/**
		 * INITIATIVE
		 */
		this.getInitiative = (function () {
			return this.getLevelMod() + this.getDexMod() + this.initiativeMod;
		});
		
		/**
		 * ATTRIBUTES
		 */
		this.getStrength = (function () {
			return this.attributes.getStr() + this.race.getAttributes().getStr() + parseInt(this.classAttributes[0]) + this.miscAttributes[0];
		});
		this.getConstitution = (function () {
			return this.attributes.getCon() + this.race.getAttributes().getCon() + parseInt(this.classAttributes[1]) + this.miscAttributes[1];
		});
		this.getDexterity = (function () {
			return this.attributes.getDex() + this.race.getAttributes().getDex() + parseInt(this.classAttributes[2]) + this.miscAttributes[2];
		});
		this.getIntelligence = (function () {
			return this.attributes.getInt() + this.race.getAttributes().getInt() + parseInt(this.classAttributes[3]) + this.miscAttributes[3];
		});
		this.getWisdom = (function () {
			return this.attributes.getWis() + this.race.getAttributes().getWis() + parseInt(this.classAttributes[4]) + this.miscAttributes[4];
		});
		this.getCharisma = (function () {
			return this.attributes.getCha() + this.race.getAttributes().getCha() + parseInt(this.classAttributes[5]) + this.miscAttributes[5];
		});
		
		/**
		 * ATTRIBUTE MODIFIER
		 */
		this.getStrMod = (function () {
			return Math.floor((this.getStrength() - 10) / 2);
		});
		this.getConMod = (function () {
			return Math.floor((this.getConstitution() - 10) / 2);
		});
		this.getDexMod = (function () {
			return Math.floor((this.getDexterity() - 10) / 2);
		});
		this.getIntMod = (function () {
			return Math.floor((this.getIntelligence() - 10) / 2);
		});
		this.getWisMod = (function () {
			return Math.floor((this.getWisdom() - 10) / 2);
		});
		this.getChaMod = (function () {
			return Math.floor((this.getCharisma() - 10) / 2);
		});
		
		/**
		 * SKILLS
		 */
		this.getAcrobatics = (function () {
			return this.getLevelMod() + this.getDexMod() + parseInt(this.trainedSkills[0]) + this.raceSkills[0] + this.classSkills[0] + this.miscSkills[0] + this.armour.check;
		});
		this.getArcana = (function () {
			return this.getLevelMod() + this.getIntMod() + parseInt(this.trainedSkills[1]) + this.raceSkills[1] + this.classSkills[1] + this.miscSkills[1];
		});
		this.getAthletics = (function () {
			return this.getLevelMod() + this.getStrMod() + this.trainedSkills[2] + this.raceSkills[2] + this.classSkills[2] + this.miscSkills[2] + this.armour.check;
		});
		this.getBluff = (function () {
			return this.getLevelMod() + this.getChaMod() + this.trainedSkills[3] + this.raceSkills[3] + this.classSkills[3] + this.miscSkills[3];
		});
		this.getDiplomacy = (function () {
			return this.getLevelMod() + this.getChaMod() + this.trainedSkills[4] + this.raceSkills[4] + this.classSkills[4] + this.miscSkills[4];
		});
		this.getDungeon = (function () {
			return this.getLevelMod() + this.getWisMod() + this.trainedSkills[5] + this.raceSkills[5] + this.classSkills[5] + this.miscSkills[5];
		});
		this.getEndurance = (function () {
			return this.getLevelMod() + this.getConMod() + this.trainedSkills[6] + this.raceSkills[6] + this.classSkills[6] + this.miscSkills[6] + this.armour.check;
		});
		this.getHeal = (function () {
			return this.getLevelMod() + this.getWisMod() + this.trainedSkills[7] + this.raceSkills[7] + this.classSkills[7] + this.miscSkills[7];
		});
		this.getHistory = (function () {
			return this.getLevelMod() + this.getIntMod() + this.trainedSkills[8] + this.raceSkills[8] + this.classSkills[8] + this.miscSkills[8];
		});
		this.getInsight = (function () {
			return this.getLevelMod() + this.getWisMod() + this.trainedSkills[9] + this.raceSkills[9] + this.classSkills[9] + this.miscSkills[9];
		});
		this.getIntimidate = (function () {
			return this.getLevelMod() + this.getChaMod() + this.trainedSkills[10] + this.raceSkills[10] + this.classSkills[10] + this.miscSkills[10];
		});
		this.getNature = (function () {
			return this.getLevelMod() + this.getWisMod() + this.trainedSkills[11] + this.raceSkills[11] + this.classSkills[11] + this.miscSkills[11];
		});
		this.getPerception = (function () {
			return this.getLevelMod() + this.getWisMod() + this.trainedSkills[12] + this.raceSkills[12] + this.classSkills[12] + this.miscSkills[12];
		});
		this.getReligion = (function () {
			return this.getLevelMod() + this.getIntMod() + this.trainedSkills[13] + this.raceSkills[13] + this.classSkills[13] + this.miscSkills[13];
		});
		this.getStealth = (function () {
			return this.getLevelMod() + this.getDexMod() + this.trainedSkills[14] + this.raceSkills[14] + this.classSkills[14] + this.miscSkills[14] + this.armour.check;
		});
		this.getStreetwise = (function () {
			return this.getLevelMod() + this.getChaMod() + this.trainedSkills[15] + this.raceSkills[15] + this.classSkills[15] + this.miscSkills[15];
		});
		this.getThievery = (function () {
			return this.getLevelMod() + this.getDexMod() + this.trainedSkills[16] + this.raceSkills[16] + this.classSkills[16] + this.miscSkills[16] + this.armour.check;
		});
		
		/**
		 * Defences
		 */
		this.getAC = (function () {
			return 10 + this.getLevelMod() + this.armour.ac + parseInt(this.raceDefence[0]) + parseInt(this.classDefence[0]) + parseInt(this.miscDefence[0]) + ((this.armour.bonus) ? ((this.getIntMod() > this.getDexMod()) ? this.getIntMod() : this.getDexMod()) : 0);
		});
		this.getFort = (function () {
			return 10 + this.getLevelMod() + ((this.getStrMod() > this.getConMod()) ? this.getStrMod() : this.getConMod()) + this.raceDefence[1] + this.classDefence[1] + this.miscDefence[1];
		});
		this.getRef = (function () {
			return 10 + this.getLevelMod() + ((this.getDexMod() > this.getIntMod()) ? this.getDexMod() : this.getIntMod()) + this.raceDefence[2] + this.classDefence[2] + this.miscDefence[2];
		});
		this.getWil = (function () {
			return 10 + this.getLevelMod() + ((this.getWisMod() > this.getChaMod()) ? this.getWisMod() : this.getChaMod()) + this.raceDefence[3] + this.classDefence[3] + this.miscDefence[3];
		});
		
		/**
		 * Hit Points
		 */
		this.getHP = (function () {
			return this.hpBase + this.getConstitution() + this.hpBonus + ((this.level - 1) * this.hpLevel);
		});
		this.getSurge = (function () {
			return Math.floor(this.getHP() * 0.25 + ((this.race == "Dragonborn") ? this.getConMod() : 0));
		});
		this.getSurgePerDay = (function () {
			return (this.spdBase + this.getConMod() + this.spdBonus);
		});
		
		/**
		 * Base Attack Rolls
		 */
		this.getStrAttack = (function () {
			return this.getLevelMod() + this.getStrMod(); 
		});
		this.getConAttack = (function () {
			return this.getLevelMod() + this.getConMod(); 
		});
		this.getDexAttack = (function () {
			return this.getLevelMod() + this.getDexMod(); 
		});
		this.getIntAttack = (function () {
			return this.getLevelMod() + this.getIntMod(); 
		});
		this.getWisAttack = (function () {
			return this.getLevelMod() + this.getWisMod(); 
		});
		this.getChaAttack = (function () {
			return this.getLevelMod() + this.getChaMod(); 
		});
		
		this.setRace = function (race) { this.race.set(race); };
		
		// ======== CLASS STUFF ===========
		
		/**
		 * Scrubs a given class from the character (including modifiers)
		 */
		this.removeClass = (function () {
			// Name
			this.career = "Unknown";
			// Iniative
			this.initiativeMod = 0;
			// Hit Point values
			this.hpBase = 10;
			this.hpLevel = 4;
			this.hpBonus = 0;
			this.surgeBonus = 0;
			this.spdBase = 6;
			this.spdBonus = 0;
			// Remove any attributes
			this.classAttributes = [0, 0, 0, 0, 0, 0];
			this.classDefence = [0, 0, 0, 0];
			this.classSkills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		});
		
		/**
		 * Adds bonuses dependant on class
		 */
		this.addClass = (function(name) {
			this.removeClass();
			this.career = name;
			switch (this.career) {
				case "Cleric":
					this.hpBase = 12;
					this.hpLevel = 5;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 7;
					this.spdBonus = 0;
					this.classDefence = [0,0,0,2];
					break;
				case "Fighter":
					this.hpBase = 15;
					this.hpLevel = 6;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 9;
					this.spdBonus = 0;
					this.classDefence = [0,2,0,0];
					break;
				case "Paladin":
					this.hpBase = 15;
					this.hpLevel = 6;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 10;
					this.spdBonus = 0;
					this.classDefence = [0,1,1,1];
					break;
				case "Ranger":
					this.hpBase = 12;
					this.hpLevel = 5;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 0;
					this.spdBonus = 0;
					this.classDefence = [0,1,1,0];
					break;
				case "Rogue":
					this.hpBase = 12;
					this.hpLevel = 5;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 6;
					this.spdBonus = 0;
					this.classDefence = [0,0,2,0];
					break;
				case "Warlock":
					this.hpBase = 12;
					this.hpLevel = 5;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 6;
					this.spdBonus = 0;
					this.classDefence = [0,0,1,1];
					break;
				case "Warlord":
					this.hpBase = 12;
					this.hpLevel = 5;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 7;
					this.spdBonus = 0;
					this.classDefence = [0,1,0,1];
					break;
				case "Wizard":
					this.hpBase = 10;
					this.hpLevel = 4;
					this.hpBonus = 0;
					this.surgeBonus = 0;
					this.spdBase = 6;
					this.spdBonus = 0;
					this.classDefence = [0,0,0,2];
					break;
				case "Adept":
					// Add bonuses to Intelligence, Arcana and Insight
					this.classAttributes[3] = 1; 
					this.classSkills[1] = 2;
					this.classSkills[9] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,0,2];
					break;
				case "Artisan":
					// Add bonuses to Wisdom, Diplomacy and Endurance
					this.classAttributes[4] = 1;
					this.classSkills[4] = 2;
					this.classSkills[6] = 2;
					this.hpBase = 8;
					this.hpLevel = 4;
					this.classDefence = [0,2,2,0];
					break;
				case "Aristocrat":
					// Add bonuses to Intelligence, Diplomacy and Bluff
					this.classAttributes[3] = 1;
					this.classSkills[4] = 2;
					this.classSkills[3] = 2;
					this.hpBase = 8;
					this.hpLevel = 4;
					this.classDefence = [0,0,2,2];
					break;
				case "Commoner":
					// Add bonuses to Constitution, Streetwise and Endurance
					this.classAttributes[1] = 1;
					this.classSkills[15] = 2;
					this.classSkills[6] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,0,0];
					break;
				case "Courtesan":
					// Add bonuses to Charisma, Streetwise and Insight
					this.classAttributes[5] = 1;
					this.classSkills[15] = 2;
					this.classSkills[9] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,2,2];
					break;
				case "Criminal":
					// Add bonuses to Dexterity, Stealth and Thievery
					this.classAttributes[2] = 1;
					this.classSkills[14] = 2;
					this.classSkills[16] = 2;
					this.hpBase = 8;
					this.hpLevel = 4;
					this.classDefence = [0,2,2,0];
					break;
				case "Expert":
					// Add bonuses to Intelligence, Perception and Insight
					this.classAttributes[3] = 1;
					this.classSkills[10] = 2;
					this.classSkills[12] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,0,2];
					break;
				case "Healer":
					// Add bonuses to Wisdom, Heal and Nature
					this.classAttributes[4] = 1;
					this.classSkills[7] = 2;
					this.classSkills[11] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,2,2];
					break;
				case "Labourer":
					// Add bonuses to Constitution, Athletics and Endurance
					this.classAttributes[1] = 1;
					this.classSkills[2] = 2;
					this.classSkills[6] = 2;
					this.hpBase = 10;
					this.hpLevel = 5;
					this.classDefence = [0,2,2,0];
					break;
				case "Merchant":
					// Add bonuses to Charisma, Bluff and Insight
					this.classAttributes[5] = 1;
					this.classSkills[3] = 2;
					this.classSkills[9] = 2;
					this.hpBase = 8;
					this.hpLevel = 4;
					this.classDefence = [0,0,0,2];
					break;
				case "Priest":
					// Add bonuses to Wisdom, Heal and Religion
					this.classAttributes[4] = 1;
					this.classSkills[7] = 2;
					this.classSkills[13] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,0,2];
					break;
				case "Scholar":
					// Add bonuses to Intelligence, History and Religion
					this.classAttributes[3] = 1;
					this.classSkills[8] = 2;
					this.classSkills[13] = 2;
					this.hpBase = 6;
					this.hpLevel = 3;
					this.classDefence = [0,0,0,2];
					break;
				case "Warrior":
					// Add bonuses to Strength, Athletics and Intimidate
					this.classAttributes[0] = 1;
					this.classSkills[2] = 2;
					this.classSkills[9] = 2;
					this.hpBase = 12;
					this.hpLevel = 8;
					this.classDefence = [6,2,2,2];
					break;
				case "Artillery":
					this.classAttributes[2] = 2;
					this.initiativeMod = 0;
					this.hpBase = 6;
					this.hpLevel = 6;
					this.classDefence = [2,2,2,2];
					break;
				case "Brute":
					this.classAttributes[0] = 2;
					this.initiativeMod = 0;
					this.hpBase = 10;
					this.hpLevel = 10;
					this.classDefence = [2,2,2,2];
					break;
				case "Controller":
					this.classAttributes = [0,0,0,1,1,1];
					this.initiativeMod = 0;
					this.hpBase = 8;
					this.hpLevel = 8;
					this.classDefence = [4,2,2,2];
					break;
				case "Lurker":
					this.classAttributes[2] = 2;
					this.initiativeMod = 4;
					this.hpBase = 6;
					this.hpLevel = 6;
					this.classDefence = [4,2,2,2];
					break;
				case "Skirmisher":
					this.classAttributes[2] = 2;
					this.initiativeMod = 2;
					this.hpBase = 8;
					this.hpLevel = 8;
					this.classDefence = [4,2,2,2];
					break;
				case "Soldier":
					this.classAttributes[1] = 2;
					this.initiativeMod = 2;
					this.hpBase = 8;
					this.hpLevel = 8;
					this.classDefence = [6,2,2,2];
					break;
			}
		});
		
		// ======== ARMOUR STUFF ===========
		
		/**
		 * Scrubs a given amour from the character (including modifiers)
		 */
		this.removeArmour = (function () {
			this.armour = {
					name: "Cloth",
					ac: 0,
					bonus: 1,
					check: 0,
					speed: 0,
					price: 1,
					weight: 4
			};
		});
		
		/**
		 * Adds bonuses dependant on class
		 */
		this.addArmour = (function(name) {
			this.removeArmour();
			switch (name) {
				case "Leather":
					this.armour = {
							name: "Leather",
							ac: 2,
							bonus: 1,
							check: 0,
							speed: 0,
							price: 25,
							weight: 15
					};
					break;
				case "Hide":
					this.armour = {
						name: "Hide",
						ac: 3,
						bonus: 1,
						check: -1,
						speed: 0,
						price: 30,
						weight: 25
					};
					break;
				case "Chainmail":
					this.armour = {
						name: "Chainmail",
						ac: 6,
						bonus: 0,
						check: -1,
						speed: -1,
						price: 40,
						weight: 40
					};
					break;
				case "Scale":
					this.armour = {
						name: "Scale",
						ac: 7,
						bonus: 0,
						check: 0,
						speed: -1,
						price: 45,
						weight: 45
					};
					break;
				case "Plate":
					this.armour = {
						name: "Plate",
						ac: 8,
						bonus: 0,
						check: -2,
						speed: -1,
						price: 50,
						weight: 50
					};
					break;
			}
		});
	}
	
	/* ============================================
     * DnD
     * 
     * Our public API for the DnD program
     * ============================================
     */
    return {
        /**
         * Return a new creature object
         */
        newCreature: (function() {return new Creature;}),
        
        dice: this.dice
    };
})(window);