/**
 * The d20 storage system 
 * 
 * This stores system values locally and allows it to be restored
 */
var d20 = (function (window) {
	// Our default set of Languages
	var language = ['Aboleth',
					'Abyssal',
					'Aklo',
					'Aquan',
					'Auran',
					'Boggard',
					'Celestial',
					'Common',
					'Cyclops',
					'Dark Folk',
					'Draconic',
					'Druidic',
					'Dwarven',
					'D\'ziriak',
					'Elvish',
					'Giant',
					'Gnoll',
					'Gnome',
					'Goblin',
					'Grippli',
					'Halfling',
					'Ignan',
					'Infernal',
					'Necril',
					'Orc',
					'Protean',
					'Sylvan',
					'Tengu',
					'Terran',
					'Treant',
					'Undercommon',
					'Vegepygmy'];
	// Our default set of conditions
	var condition = ["Blinded",
	                  "Charmed",
	                  "Confused",
	                  "Deafened",
	                  "Exhausted",
	                  "Frightened",
	                  "Grappled",
	                  "Incapicitated",
	                  "Invisible",
	                  "Paralyzed",
	                  "Petrified",
	                  "Poisoned",
	                  "Prone",
	                  "Restrained",
	                  "Stunned",
	                  "Unconscious"];
	// Our default set of damage descriptors
	var damage = ["Acid",
	              "Bludgeoning",
	              "Cold",
	              "Electricity",
	              "Fire",
	              "Force",
	              "Light",
	              "Necrotic",
	              "Piercing",
	              "Poison",
	              "Psychic",
	              "Slashing",
	              "Sonic"];
	// Our default set of creature origins
	var origin = ["Aberration",
	              "Animal",
	              "Celestial",
	              "Construct",
	              "Dragon",
	              "Elemental",
	              "Fey",
	              "Fiend",
	              "Giant",
	              "Humanoid",
	              "Monstrosity",
	              "Ooze",
	              "Outsider",
	              "Plant",
	              "Undead",
	              "Vermin"];
	// Our default set of magic schooles
	var school = ["Abjuration",
	              "Conjuration",
	              "Divination",
	              "Enchantment",
	              "Evocation",
	              "Illusion",
	              "Necromancy",
	              "Transmutation"];
	// Our default set of sizes
	var size = ["Tiny",
	            "Small",
	            "Medium",
	            "Large",
	            "Huge",
	            "Colossal"];
	// Our default set of armour styles
	var armourStyle = ["None",
	                   "Natural",
	                   "Light",
	                   "Medium",
	                   "Heavy"];
	// Our default set of armour styles
	var weaponStyle = ["Simple",
	                   "Martial",
	                   "Exotic"];
	// Generic function to save data
	function saveState() {
		localStorage.setItem('d20.language', JSON.stringify(language));
		localStorage.setItem('d20.condition', JSON.stringify(condition));
		localStorage.setItem('d20.damage', JSON.stringify(damage));
		localStorage.setItem('d20.origin', JSON.stringify(origin));
		localStorage.setItem('d20.school', JSON.stringify(school));
		localStorage.setItem('d20.size', JSON.stringify(size));
		localStorage.setItem('d20.armourStyle', JSON.stringify(armourStyle));
		localStorage.setItem('d20.weaponStyle', JSON.stringify(weaponStyle));
	}
	function loadState() {
		if ('d20.language' in localStorage) {
			language = JSON.parse(localStorage.getItem('d20.language'));
		}
		if ('d20.condition' in localStorage) {
			condition = JSON.parse(localStorage.getItem('d20.condition'));
		}
		if ('d20.damage' in localStorage) {
			damage = JSON.parse(localStorage.getItem('d20.damage'));
		}
		if ('d20.origin' in localStorage) {
			origin = JSON.parse(localStorage.getItem('d20.origin'));
		}
		if ('d20.school' in localStorage) {
			school = JSON.parse(localStorage.getItem('d20.school'));
		}
		if ('d20.size' in localStorage) {
			size = JSON.parse(localStorage.getItem('d20.size'));
		}
		if ('d20.armourStyle' in localStorage) {
			armourStyle = JSON.parse(localStorage.getItem('d20.armourStyle'));
		}
		if ('d20.weaponStyle' in localStorage) {
			weaponStyle = JSON.parse(localStorage.getItem('d20.weaponStyle'));
		}
	}
	return {
		about: function() { alert('The Shapies d20 system'); },
		// Get and Set our variables
		getLanguage: function() { return language; },
		setLanguage: function(replacement) { if (replacement.constructor === Array) { language = replacement; } },
		getCondition: function() { return condition; },
		setCondition: function(replacement) { if (replacement.constructor === Array) { condition = replacement; } },
		getDamage: function() { return damage; },
		setDamage: function(replacement) { if (replacement.constructor === Array) { damage = replacement; } },
		getOrigin: function() { return origin; },
		setOrigin: function(replacement) { if (replacement.constructor === Array) { origin = replacement; } },
		getSchool: function() { return school; },
		setSchool: function(replacement) { if (replacement.constructor === Array) { school = replacement; } },
		getSize: function() { return size; },
		setSize: function(replacement) { if (replacement.constructor === Array) { size = replacement; } },
		getArmourStyle: function() { return armourStyle; },
		setArmourStyle: function(replacement) { if (replacement.constructor === Array) { armourStyle = replacement; } },
		getWeaponStyle: function() { return weaponStyle; },
		setWeaponStyle: function(replacement) { if (replacement.constructor === Array) { weaponStyle = replacement; } },
		// Some useful form creation related stuff
		makeCheckbox: function(array,name) {
			var text = "<div class='form-group checkbox'>";
			if (array.constructor === Array) {
				var index, len;
				for (index = 0, len = array.length; index < len; ++index) {
				    text += "<label class='checkbox-inline'><input type='checkbox' id='"+name+"_"+index+"' name='"+name+"' value='"+array[index]+"' class='form-control'> "+array[index]+"</label>";
				}
			}
			return text + "</div>";
		},
		makeSelect: function(array,name,selected) {
			var text = "<select id="+name+" name="+name+" class='form-control'>";
			if (array.constructor === Array) {
				var index, len;
				for (index = 0, len = array.length; index < len; ++index) {
				    text += "<option value='"+array[index]+"' "+((selected === array[index]) ? 'selected' : '')+"> "+array[index]+"</option>";
				}
			}
			return text + "</select>";
		},
		// Save and load states
		save: function() { saveState(); },
		load: function() { loadState(); }
	};
})(window);
