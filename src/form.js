/* ===========================================
 * Form object
 * ===========================================
 */
function Form() {
	/*
	 * Drag and Drop Variable
	 */
	var dragSrcEl = null;
	/*
	 * Values for our dropdowns
	 */
	var attribs = ["STR",
	               "CON",
	               "DEX",
	               "INT",
	               "WIS",
	               "CHA"];
	var races = ["Bugbear",
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
	var armour = ["Cloth",
	              "Leather",
	              "Studded leather",
	              "Hide",
	              "Ring mail",
	              "Chainmail",
	              "Banded mail",
	              "Scale",
	              "Splint mail",
	              "Plate",
	              "Spiked plate",
	              "Full plate"];
	var melee = ["Empty",
	             // Simple melee - single handed
	             "Club",
	             "Dagger",
	             "Javelin",
	             "Light mace",
	             "Mace",
	             "Sickle",
	             "Short spear",
	             "Spear",
	             // Simple melee - two handed
	             "Greatclub",
	             "Morningstar",
	             "Quaterstaff",
	             "Scythe",
	             // Military melee - single handed
	             "Battleaxe",
	             "Broadsword",
	             "Flail",
	             "Handaxe",
	             "Lance",
	             "Light war pick",
	             "Longsword",
	             "Rapier",
	             "Scimitar",
	             "Short sword",
	             "Throwing hammer",
	             "Warhammer",
	             "Warpick",
	             // Military melee - two handed
	             "Falchion",
	             "Glaive",
	             "Greataxe",
	             "Greatsword",
	             "Halberd",
	             "Heavy flail",
	             "Longspear",
	             "Maul",
	             "Pike",
	             // Superior melee - single handed
	             "Bastard sword",
	             "Katar",
	             "Rapier",
	             "Serrated pick",
	             "War axe",
	             "Whip",
	             // Superior melee - two handed
	             "Spiked chain"];
	var offhand = ["Empty",
	               // Simple melee - single handed
	               "Dagger",
	               "Light Mace",
	               "Sickle",
	               "Short spear",
	               // Military melee - single handed
	               "Handaxe",
	               "Light war pick",
	               "Short sword",
	               "Throwing hammer",
	               // Superior melee - single handed
	               "Katar"];
	var range = ["Empty",
	             // Simple range - single handed
	             "Hand crossbow",
	             "Sling",
	             // Simple range - two handed
	             "Crossbow",
	             // Military range - two handed
	             "Longbox",
	             "Shortbow",
	             // Superior ranged - one handed
	             "Shuriken"];
	var template = ["Standard",
	                "Minion",
	                "Elite",
	                "Solo",
	                "Acolyte",
	                "Adept of Frost",
	                "Adept of Flame",
	                "Adept of Lightning",
	                "Adept of Thunder",
	                "Battle Champion",
	                "Bodyguard",
	                "Death Knight",
	                "Death Master",
	                "Demagogue",
	                "Devastator",
	                "Feyborn",
	                "Lich",
	                "Mummy Champion",
	                "Mummy Lord",
	                "Savage Berserker",
	                "Shadowborn",
	                "Vampire Lord"];
	/*
	 * Our popup for printing
	 */
	var popup = function (data)	{
	    var mywindow = window.open('', 'DnD Character', 'height=400,width=600');
	    mywindow.document.write('<html><head><title>DnD Character</title></head><body >');
	    mywindow.document.write(data);
	    mywindow.document.write('</body></html>');
	    mywindow.print();
	    mywindow.close();
	    return true;
	};
	/*
	 * Drag and Drop functions
	 */
	var startDrag = function (e) {
		dragSrcEl = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html',this.innerHTML);
	};
	var enterDrag = function (e) {
		this.classList.add('over'); 
	};
	var leaveDrag = function (e) {
		this.classList.remove('over');
	};
	var overDrag = function (e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	};
	var dropDrag = function (e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (dragSrcEl != this) {
			dragSrcEl.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
		}
		return false;
	};
	/*
	 * OUR PUBLIC FORM API
	 */
	return {
		races: function () { return races; },
		classes: function () { return classes; },
		dropdown: function (type, css) {
			var cssType = css ? css : "";
			var text = "<select id='" + type + "_input' class='" + cssType + "' name='" + type + "_input'>";
			switch (type) {
			case "armour":
				armour.forEach(function(a) {
					text += "<option value='" + a + "'>" + a + "</option>";
				});
				text += "</select> <select id ='" + type + "_bonus_input' name='" + type + "_bonus_input'>";
				for(var i = 0; i <= 10; ++i) {
					text += "<option value='" + i + "'>+" + i + "</option>";
				}
				break;
			case "class":
				classes.forEach(function(c) {
					text += "<option value='" + c + "'>" + c + "</option>";
				});
				break;
			case "level":
				for(var i = 1; i <= 40; ++i) {
					text += "<option value='" + i + "'>" + i + "</option>";
				}
				break;
			case "melee":
				melee.forEach(function(m) {
					text += "<option value='" + m + "'>" + m + "</option>";
				});
				text += "</select> <select id ='" + type + "_bonus_input' name='" + type + "_bonus_input'>";
				for(var i = 0; i <= 10; ++i) {
					text += "<option value='" + i + "'>+" + i + "</option>";
				}
				break;
			case "offhand":
				offhand.forEach(function(o) {
					text += "<option value='" + o + "'>" + o + "</option>";
				});
				text += "</select> <select id ='" + type + "_bonus_input' name='" + type + "_bonus_input'>";
				for(var i = 0; i <= 10; ++i) {
					text += "<option value='" + i + "'>+" + i + "</option>";
				}
				break;
			case "preference":
				attribs.forEach(function(a) {
					text += "<li draggable='true' class='dnd_pref_input'>" + a + "</li>";
				});
				break;
			case "race":
				races.forEach(function(race) {
					text += "<option value='" +race+"'>"+race+"</option>";
				});
				break;
			case "range":
				range.forEach(function(r) {
					text += "<option value='" + r + "'>" + r + "</option>";
				});
				text += "</select> <select id ='" + type + "_bonus_input' name='" + type + "_bonus_input'>";
				for(var i = 0; i <= 10; ++i) {
					text += "<option value='" + i + "'>+" + i + "</option>";
				}
				break;
			case "template":
				template.forEach(function(a) {
					text += "<option value='" + a + "'>" + a + "</option>";
				});
				break;
			default:
				for(var i = 5; i <= 20; ++i) {
					text += "<option value='" + i + "'>" + i + "</option>";
				}
				break;
			}
			return text + "</select>";
		},
		draggable: function (type, css) {
			var cssType = css ? css : "";
			var text = "<ol id='" + type + "_drag' class='" + cssType + "' name='" + type + "_drag'>";
			switch (type) {
			case "attributes":
				attribs.forEach(function(a) {
					text += "<li draggable='true' class='" + type + "_drag'>" + a + "</li>";
				});
				break;
			default:
				for(var i = 5; i <= 18; ++i) {
					text += "<option value='" + i + "'>" + i + "</option>";
				}
				break;
			};
			return text + "</select>";
		},
		draggableListeners: function (type) {
			// Drag and drop elements for preferences
		    var draggable = window.document.getElementsByClassName('' + type + '_drag');
		    for (var i = 0; i < draggable.length; ++i) {
		    	draggable[i].addEventListener('dragstart', startDrag, false);
		    	draggable[i].addEventListener('dragenter', enterDrag, false);
		    	draggable[i].addEventListener('dragleave', leaveDrag, false);
		    	draggable[i].addEventListener('dragover', overDrag);
		    	draggable[i].addEventListener('drop', dropDrag, false);
		    };
		},
		draggableAssign: function (type, sortedArray) {
			// Get our attribute preference and put the values as preferenced
			var prefs = window.document.getElementsByClassName('' + type + '_drag');
			window.document.getElementById(prefs[5].innerHTML.toLowerCase()+'_input').value = sortedArray[0];
			window.document.getElementById(prefs[4].innerHTML.toLowerCase()+'_input').value = sortedArray[1];
			window.document.getElementById(prefs[3].innerHTML.toLowerCase()+'_input').value = sortedArray[2];
			window.document.getElementById(prefs[2].innerHTML.toLowerCase()+'_input').value = sortedArray[3];
			window.document.getElementById(prefs[1].innerHTML.toLowerCase()+'_input').value = sortedArray[4];
			window.document.getElementById(prefs[0].innerHTML.toLowerCase()+'_input').value = sortedArray[5];
		},
		print: function (id) { popup(window.document.getElementById(id).innerHTML); }
	};
}