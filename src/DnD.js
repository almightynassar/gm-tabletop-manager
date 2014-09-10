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
		var classes = ["Aristocrat",
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
		               "Warden"];
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
	function Defence() {
		/**tFear
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
		var defence = new Defence();;
		var bonusAtWill = 0;
		var resistances = new Resistances();
		var vulnerable = new Resistances();
		var immunity = new Resistances();
		var bonusInitiative = 0;
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
			bonusInitiative = 0;
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
			getDefence: function () { return defence; },
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
			getInitiative: function () {return bonusInitiative; },
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
					case 'Bugbear':
						heightMin = 200;
						heightMax = 220;
						weightMin = 110;
						weightMax = 135;
						attributes.setStr(2);
						attributes.setDex(2);
						skills.setStealth(2);
						skills.setIntimidate(2);
						hasLowVision = true;
						break;
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
					case 'Drow':
						origin = "Fey";
						heightMin = 160;
						heightMax = 180;
						attributes.setCha(2);
						attributes.setDex(2);
						skills.setStealth(2);
						skills.setIntimidate(2);
						hasDarkVision = true;
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
					case "Gnoll":
						speed = 7;
						heightMin = 210;
						heightMax = 230;
						weightMin = 125;
						weightMax = 145;
						skills.setIntimidate(2);
						attributes.setCon(2);
						attributes.setDex(2);
						hasLowVision = true;
						break;
					case "Gnome":
						origin = "Fey";
						speed = 5;
						heightMin = 100;
						heightMax = 115;
						weightMin = 20;
						weightMax = 35;
						size = 1;
						skills.setArcana(2);
						skills.setStealth(2);
						attributes.setCha(2);
						attributes.setInt(2);
						resistances.setIllusion(5);
						hasLowVision = true;
						break;
					case "Goblin":
						heightMin = 100;
						heightMax = 115;
						weightMin = 20;
						weightMax = 30;
						size = 1;
						skills.setThievery(2);
						skills.setStealth(2);
						attributes.setDex(2);
						attributes.setCha(2);
						defence.setReflex(1);
						hasLowVision = true;
						break;
					case "Goliath":
						heightMin = 200;
						heightMax = 230;
						weightMin = 125;
						weightMax = 155;
						skills.setAthletics(2);
						skills.setNature(2);
						attributes.setStr(2);
						attributes.setCon(2);
						defence.setWill(1);
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
					case "Half-Orc":
						heightMin = 175;
						heightMax = 195;
						weightMin = 70;
						weightMax = 105;
						skills.setEndurance(2);
						skills.setIntimidate(2);
						attributes.setStr(2);
						attributes.setDex(2);
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
					case "Kobold":
						heightMin = 105;
						heightMax = 120;
						weightMin = 30;
						weightMax = 35;
						size = 1;
						skills.setStealth(2);
						skills.setThievery(2);
						attributes.setCon(2);
						attributes.setDex(2);
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
						heightMin = 180;
						heightMax = 195;
						weightMin = 90;
						weightMax = 105;
						attributes.setStr(2);
						attributes.setCon(2);
						hasLowVision = true;
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
	
	/* ============================================
     * Career Object
     * ============================================
     */
	function Career() {
		//Details
		var name = "Unknown";
		var speed = 0;
		// Iniative
		var bonusInitiative = 0;
		// Hit Point values
		var hpBase = 10;
		var hpLevel = 4;
		var hpBonus = 0;
		var surgeBonus = 0;
		var spdBase = 6;
		var spdBonus = 0;
		var attributes = new Attributes();
		var bonusAttributes = 0;
		var skills = new Skills();
		var bonusSkills = 0;
		var defence = new Defence();;
		var resistances = new Resistances();
		var vulnerable = new Resistances();
		var immunity = new Resistances();
		/**
		 * Resets the race object
		 */
		function reset() {
			name = "Unknown";
			speed = 0;
			bonusInitiative = 0;
			hpBase = 10;
			hpLevel = 4;
			hpBonus = 0;
			surgeBonus = 0;
			spdBase = 6;
			spdBonus = 0;
			attributes.reset();
			bonusAttributes = 0;
			skills.reset();
			bonusSkills = 0;
			defence.reset();
			resistances.reset();
			vulnerable.reset();
			immunity.reset();
		};
		return {
			//Getters
			getName: function () { return name;},
			getSpeed: function () { return speed;},
			getInitiative: function () {return bonusInitiative; },
			getBaseHP: function () { return hpBase; },
			getLevelHP: function () { return hpLevel; },
			getBonusHP: function () { return hpBonus; },
			getSurgeBonus: function () { return surgeBonus; },
			getBaseSPD: function () { return spdBase; },
			getBonusSPD: function () { return spdBonus; },
			getAttributes: function () { return attributes; },
			getSkills: function () { return skills; },
			getDefence: function () { return defence; },
			getResistances: function () { return resistances; },
			getVulnerabilities: function () { return vulnerable; },
			getImmunities: function () { return immunity; },
			getBonusAttributes: function () { return bonusAttributes; },
			getBonusSkills: function () { return bonusSkills; },
			/**
			 * Sets the Race details
			 */
			set: function (selection, npc) {
				reset();
				switch (selection) {
					// Base Player Classes
					case "Cleric":
						if (npc) {
							attribute.setWis(1);
							skill.setReligion(5);
							skill.setHeal(5);
						}
						hpBase = 12;
						hpLevel = 5;
						spdBase = 7;
						defence.setWill(2);
						break;
					case "Fighter":
						if (npc) {
							attribute.setStr(1);
							skill.setAthletics(5);
							skill.setEndurance(5);
						}
						hpBase = 15;
						hpLevel = 6;
						spdBase = 9;
						defence.setFort(2);
						break;
					case "Paladin":
						if (npc) {
							attribute.setCon(1);
							skill.setReligion(5);
							skill.setHeal(5);
						}
						hpBase = 15;
						hpLevel = 6;
						spdBase = 10;
						defence.setFort(1);
						defence.setReflex(1);
						defence.setWill(1);
						break;
					case "Ranger":
						if (npc) {
							attribute.setDex(1);
							skill.setDungeoneering(5);
							skill.setNature(5);
						}
						hpBase = 12;
						hpLevel = 5;
						spdBase = 6;
						defence.setFort(1);
						defence.setReflex(1);
						break;
					case "Rogue":
						if (npc) {
							attribute.setWis(1);
							skill.setThievery(5);
							skill.setStealth(5);
						}
						hpBase = 12;
						hpLevel = 5;
						spdBase = 6;
						defence.setReflex(2);
						break;
					case "Warlock":
						if (npc) {
							attribute.setInt(1);
							skill.setArcana(5);
							skill.setInsight(5);
						}
						hpBase = 12;
						hpLevel = 5;
						spdBase = 6;
						defence.setReflex(1);
						defence.setWill(1);
						break;
					case "Warlord":
						if (npc) {
							attribute.setCha(1);
							skill.setIntimidate(5);
							skill.setPerception(5);
						}
						hpBase = 12;
						hpLevel = 5;
						spdBase = 7;
						defence.setFort(1);
						defence.setWill(1);
						break;
					case "Wizard":
						if (npc) {
							attribute.setInt(1);
							skill.setArcana(5);
							skill.setHistory(5);
						}
						hpBase = 10;
						hpLevel = 4;
						spdBase = 6;
						defence.setWill(2);
						break;
					// NPC Classes
					case "Aristocrat":
						if (npc) {
							attribute.setCha(1);
							skill.setBluff(5);
							skill.setDiplomacy(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					case "Artisan":
						if (npc) {
							attribute.setInt(1);
							skill.setAthletics(5);
							skill.setDiplomacy(5);
						}
						hpBase = 10;
						hpLevel = 4;
						spdBase = 6;
						defence.setFort(2);
						break;
					case "Commoner":
						if (npc) {
							attribute.setCon(1);
							skill.setEndurance(5);
							skill.setStreetwise(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setFort(2);
						break;
					case "Courtesan":
						if (npc) {
							attribute.setCha(1);
							skill.setBluff(5);
							skill.setStreetwise(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					case "Criminal":
						if (npc) {
							attribute.setDex(1);
							skill.setStealth(5);
							skill.setThievery(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setReflex(2);
						break;
					case "Healer":
						if (npc) {
							attribute.setWis(1);
							skill.setHeal(10);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					case "Labourer":
						if (npc) {
							attribute.setCon(1);
							skill.setAthletics(5);
							skill.setEndurance(5);
						}
						hpBase = 10;
						hpLevel = 4;
						spdBase = 6;
						defence.setFort(2);
						break;
					case "Merchant":
						if (npc) {
							attribute.setCha(1);
							skill.setBluff(5);
							skill.setDiplomacy(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					case "Priest":
						if (npc) {
							attribute.setWis(1);
							skill.setReligion(10);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					case "Scholar":
						if (npc) {
							attribute.setInt(1);
							skill.setHistory(5);
							skill.setInsight(5);
						}
						hpBase = 8;
						hpLevel = 3;
						spdBase = 5;
						defence.setWill(2);
						break;
					// Warrior Classes
					case "Artillery":
						if (npc) {
							attribute.setDex(1);
							skill.setPerception(5);
							skill.setInsight(5);
						}
						hpBase = 8;
						hpLevel = 4;
						spdBase = 6;
						defence.setAC(2);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
					case "Brute":
						if (npc) {
							attribute.setCon(1);
							skill.setAthletics(5);
							skill.setEndurance(5);
						}
						hpBase = 10;
						hpLevel = 5;
						spdBase = 7;
						defence.setAC(2);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
					case "Controller":
						if (npc) {
							attribute.setWis(1);
							skill.setHeal(5);
							skill.setIntimidate(5);
						}
						hpBase = 8;
						hpLevel = 4;
						spdBase = 6;
						defence.setAC(4);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
					case "Lurker":
						if (npc) {
							attribute.setDex(1);
							skill.setStealth(10);
						}
						bonusInitiative = 4;
						hpBase = 6;
						hpLevel = 3;
						spdBase = 5;
						defence.setAC(4);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
					case "Skirmisher":
						if (npc) {
							attribute.setStr(1);
							skill.setStealth(5);
							skill.setAcrobatics(5);
						}
						hpBase = 8;
						hpLevel = 4;
						spdBase = 6;
						defence.setAC(4);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
					case "Soldier":
						if (npc) {
							attribute.setCon(1);
							skill.setAthletics(5);
							skill.setEndurance(5);
						}
						hpBase = 8;
						hpLevel = 4;
						spdBase = 6;
						defence.setAC(6);
						defence.setFort(2);
						defence.setReflex(2);
						defence.setWill(2);
						break;
				}
				name = selection;
			}
		};
	}
	
	/* ============================================
     * Creature Object
     * ============================================
     */
	function Creature() {
		// Details
		var race = new Race();
		var level = 1;
		// Role-playing
		var age = 0;
		var gender = "Unknown";
		var deity = "Unknown";
		var alignment = "Neutral";
		//Class is a keyword so it now becomes 'career'
		var career = new Career();
		// Speed
		var speedMod = 0;
		// Iniative
		var initiativeMod = 0;	
		// Height mod. 0 = Small, 1 = Average, 2 = Tall
		var heightMod = 0;
		
		/**
		 * Attributes
		 */
		var attributes = new Attributes();
		
		/**
		 * Trained Skills
		 */
		var skills = new Skills();
		
		/**
		 * Defences
		 */
		var defence = new Defence();
		
		/**
		 * Armour
		 */
		var armour = {
				name: "Cloth",
				ac: 0,
				bonus: 1,
				check: 0,
				speed: 0,
				price: 1,
				weight: 4
		};
		
		/**
		 * Level modifier
		 */
		function getLevelMod() { return Math.floor(level * 0.5); };
		
		/**
		 * Attributes
		 */
		function str() { return attributes.getStr() + race.getAttributes().getStr() + career.getAttributes().getStr(); };
		function con() { return attributes.getCon() + race.getAttributes().getCon() + career.getAttributes().getCon(); };
		function dex() { return attributes.getDex() + race.getAttributes().getDex() + career.getAttributes().getDex(); };
		function int() { return attributes.getInt() + race.getAttributes().getInt() + career.getAttributes().getInt(); };
		function wis() { return attributes.getWis() + race.getAttributes().getWis() + career.getAttributes().getWis(); };
		function cha() { return attributes.getCha() + race.getAttributes().getCha() + career.getAttributes().getCha(); };
		
		/**
		 * Attribute modifier
		 */
		function strMod() {return Math.floor((str() - 10)/2); };
		function conMod() {return Math.floor((con() - 10)/2); };
		function dexMod() {return Math.floor((dex() - 10)/2); };
		function intMod() {return Math.floor((int() - 10)/2); };
		function wisMod() {return Math.floor((wis() - 10)/2); };
		function chaMod() {return Math.floor((cha() - 10)/2); };
		
		/**
		 * Base Attack Rolls
		 */
		function strAttack() { return getLevelMod() + strMod(); };
		function conAttack() { return getLevelMod() + conMod(); };
		function dexAttack() { return getLevelMod() + dexMod(); };
		function intAttack() { return getLevelMod() + intMod(); };
		function wisAttack() { return getLevelMod() + wisMod(); };
		function chaAttack() { return getLevelMod() + chaMod(); };
		
		/**
		 * Skills
		 */
		function acrobatics() { return getLevelMod() + dexMod() + skills.getAcrobatics() + race.skills.getAcrobatics() + career.skills.getAcrobatics() + armour.check; };
		function arcana() { return getLevelMod() + intMod() + skills.getArcana() + race.skills.getArcana() + career.skills.getArcana(); };
		function athletics() { return getLevelMod() + strMod() + skills.getAthletics() + race.skills.getAtheletics() + career.skills.getAthletics() + armour.check; };
		function bluff() { return getLevelMod() + chaMod() + skills.getBluff() + race.skills.getBluff() + career.skills.getBluff(); };
		function diplomacy() { return getLevelMod() + chaMod() + skills.getDiplomacy() + race.skills.getDiplomacy() + career.skills.getDiplomacy(); };
		function dugeon() { return getLevelMod() + wisMod() + skills.getDugeoneering() + race.skills.getDugeoneering() + career.skills.getDugeoneering(); };
		function endurance() { return getLevelMod() + conMod() + skills.getEndurance() + race.skills.getEndurance() + career.skills.getEndurance() + armour.check; };
		function heal() { return getLevelMod() + wisMod() + skills.getHeal() + race.skills.getHeal() + career.skills.getHeal(); };
		function history() { return getLevelMod() + intMod() + skills.getHistory() + race.skills.getHistory() + career.skills.getHistory(); };
		function insight() { return getLevelMod() + wisMod() + skills.getInsight() + race.skills.getInsight() + career.skills.getInsight(); };
		function intimidate() { return getLevelMod() + chaMod() + skills.getIntimidate() + race.skills.getIntimidate() + career.skills.getIntimidate(); };
		function nature() { return getLevelMod() + wisMod() + skills.getNature() + race.skills.getNature() + career.skills.getNature(); };
		function perception() { return getLevelMod() + wisMod() + skills.getPerception() + race.skills.getPerception() + career.skills.getPerception(); };
		function religion() { return getLevelMod() + intMod() + skills.getReligion() + race.skills.getReligion() + career.skills.getReligion(); };
		function stealth() { return getLevelMod() + dexMod() + skills.getStealth() + race.skills.getStealth() + career.skills.getStealth() + armour.check; };
		function streetwise() { return getLevelMod() + chaMod() + skills.getStreetwise() + race.skills.getStreetwise() + career.skills.getStreetwise(); };
		function thievery() { return getLevelMod() + dexMod() + skills.getThievery() + race.skills.getThievery() + career.skills.getThievery() +armour.check; };
		
		/**
		 * Defences
		 */
		function ac() { return 10 + getLevelMod() + armour.ac + race.getDefence().getAC() + career.getDefence().getAC() + defence.getAC() + ((armour.bonus) ? ((intMod() > dexMod()) ? intMod() : dexMod()) : 0);	};
		function fort() { return 10 + getLevelMod() + ((strMod() > conMod()) ? strMod() : conMod()) + race.getDefence().getFort() + career.getDefence().getFort() + defence.getAC(); };
		function reflex() { return 10 + getLevelMod() + ((dexMod() > intMod()) ? dexMod() : intMod()) + race.getDefence().getReflex() + career.getDefence().getReflex() + defence.getAC(); };
		function will() { return 10 + getLevelMod() + ((wisMod() > chaMod()) ? wisMod() : chaMod()) + race.getDefence().getWill() + career.getDefence().getWill() + defence.getWill(); };
		
		/**
		 * Weight and Height Calculation
		 */
		function weight() { return Math.round(race.getMinWeight() + ((race.getMaxWeight() - race.getMinWeight()) * (con() / 30))); };
		function height() { return (heightMod) ? ((heightMod > 1) ? race.getMaxHeight() : race.getMinHeight() + ((race.getMaxHeight() - race.getMinHeight())/2)) : race.getMinHeight; };
		
		/**
		 * Speed Calculations
		 */
		function speed() { return race.getSpeed() + career.getSpeed() + speedMod + armour.speed; };
		function speedFeet(minutes) { return Math.round((speed() * 5)*(minutes/6)); };
		function speedMetre(minutes) { return (speedFeet(minutes) * 0.305).toFixed(1); };
		function speedYard(minutes) { return (speedFeet(minutes)/3).toFixed(1); };
		function speedMile(hours) { return Math.round(speedYard(60*hours)/1760); };
		function speedKilometre(hours) { return Math.round(speedMetre(60*hours)/1000); };
		
		/**
		 * Hit Points
		 */
		function hp() { return career.getBaseHP() + con() + career.getBonusHP() + ((level - 1) * career.getLevelHP()); };
		
		// ======== INFORMATION ===========
		/**
		 * Reach
		 
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
		 
		this.getAtWillNumber = (function () {
			return 2 + ((this.race == "Human") ? 1 : 0);
		});
		
		/**
		 * Number of Feats known
		 
		this.getFeatsNum = (function () {
			return 1 + Math.floor(this.level/2) + Math.floor((this.level-1)/10) + ((this.race == "Human") ? 1: 0);
		});
		
		/**
		 * Number of Encounters known
		 
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
		 * Hit Points
		
		this.getHP = (function () {
			return this.hpBase + this.getConstitution() + this.hpBonus + ((this.level - 1) * this.hpLevel);
		});
		this.getSurge = (function () {
			return Math.floor(this.getHP() * 0.25 + ((this.race == "Dragonborn") ? this.getConMod() : 0));
		});
		this.getSurgePerDay = (function () {
			return (this.spdBase + this.getConMod() + this.spdBonus);
		});
		
		// ======== ARMOUR STUFF ===========
		
		/**
		 * Scrubs a given amour from the character (including modifiers)
		
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
		*/
		
		return {
			// Level
			getLevel: function () { return level; },
			setLevel: function (value) { level = parseInt(value); },
			//Age
			getAge: function () { return age; },
			setAge: function (value) { age = parseInt(value); },
			// Deity
			getDeity: function () { return deity; },
			setDeity: function (value) { deity = value; },
			// Gender
			getGender: function () { return gender; },
			setGender: function (value) { gender = value; },
			// Alignment
			getAlignment: function () { return alignment; },
			setAlignment: function (value) { alignment = value; },
			// Initiative
			getInitiative: function () { return getLevelMod() + dexMod() + initiativeMod + career.getInitiative() + race.getInitiative(); },
			// Attributes
			getStr: function () { return str(); },
			getCon: function () { return con(); },
			getDex: function () { return dex(); },
			getInt: function () { return int(); },
			getWis: function () { return wis(); },
			getCha: function () { return cha(); },
			setStr: function (value) { attributes.setStr(value); },
			setCon: function (value) { attributes.setCon(value); },
			setDex: function (value) { attributes.setDex(value); },
			setInt: function (value) { attributes.setInt(value); },
			setWis: function (value) { attributes.setWis(value); },
			setCha: function (value) { attributes.setCha(value); },
			// Modifiers
			getStrMod: function () { return strMod(); },
			getConMod: function () { return conMod(); },
			getDexMod: function () { return dexMod(); },
			getIntMod: function () { return intMod(); },
			getWisMod: function () { return wisMod(); },
			getChaMod: function () { return chaMod(); },
			// Attack rolls
			getStrAttack: function () { return strAttack(); },
			getConAttack: function () { return conAttack(); },
			getDexAttack: function () { return dexAttack(); },
			getIntAttack: function () { return intAttack(); },
			getWisAttack: function () { return wisAttack(); },
			getChaAttack: function () { return chaAttack(); },
			// Defence
			getAC: function () { return ac(); },
			getFort: function () { return fort(); },
			getReflex: function () { return reflex(); },
			getWill: function () { return will(); },
			// Weight and loads
			getWeight: function () { return weight(); },
			getHeavyLoad: function () { return Math.round(weight() * (str()/10)); },
			getDragLoad: function () { return Math.round(weight() * (str()/3)); },
			// Height
			setHeight: function (value) { heightMod = value; },
			getHeight: function () { return height(); },
			// Speed calculations
			getSpeed: function () { return speed(); },
			getSpeedFeet: function (minutes) { return speedFeet(minutes); },
			getSpeedMetre: function (minutes) { return speedMetre(minutes); },
			getSpeedYard: function (minutes) { return speedYard(minutes); },
			getSpeedMile: function (hours) { return speedMile(hours); },
			getSpeedKilometre: function (hours) { return speedKilometre(hours); },
			// Race information
			getRaceName: function () { return race.getName(); },
			getRace: function () { return race; },
			setRace: function (selection) { race.set(selection); },
			// Class information
			getClassName: function () { return career.getName(); },
			getClass: function () { return career; },
			setClass: function (selection) { career.set(selection); },
			// HP information
			getHP: function () { return hp(); },
			getBloodied: function () { return Math.floor(hp() / 2); },
			getSurge: function () { return Math.floor(hp() * 0.25 + ((race.name == "Dragonborn") ? conMod() : 0)); },
			getSurgePerDay: function () { return career.getBaseSPD() + conMod() + career.getBonusSPD(); }
		};
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
        creature: new Creature(),
        
        dice: this.dice
    };
})(window);