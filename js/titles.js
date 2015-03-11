/**
 * Creates randomly generated titles
 */
var Titles = new function () {
	// Some pre-gen arrays to use
	var values = {
		"nouns": ["angel",
		          "ape",
		          "aristocrat",
		          "astronomer",
		          "badger",
		          "baker",
		          "banker",
		          "banshee",
		          "basilisk",
		          "bard",
		          "bear",
		          "beetle",
		          "beggar",
		          "blacksmith",
		          "boar",
		          "brewer",
		          "butcher",
		          "cat",
		          "centaur",
		          "centipede",
		          "chimera",
		          "clergyman",
		          "cleric",
		          "cockatrice",
		          "crab",
		          "craftsman",
		          "crocodile",
		          "cultist",
		          "cyclops",
		          "deer",
		          "demon",
		          "devil",
		          "diplomat",
		          "dockhand",
		          "doctor",
		          "dog",
		          "donkey",
		          "dragon",
		          "drake",
		          "druid",
		          "dwarve",
		          "eagle",
		          "eladrin",
		          "elemental",
		          "elf",
		          "elephant",
		          "elk",
		          "faun",
		          "farmer",
		          "fighter",
		          "frog",
		          "gargoyle",
		          "ghost",
		          "ghoul",
		          "giant",
		          "gnoll",
		          "goat",
		          "goblin",
		          "golem",
		          "goliath",
		          "gremlin",
		          "griffon",
		          "harpy",
		          "hawk",
		          "healer",
		          "hell-hound",
		          "hippogriff",
		          "hobgoblin",
		          "horse",
		          "hound",
		          "hunter",
		          "hyrdra",
		          "hyena",
		          "innkeep",
		          "jackal",
		          "jester",
		          "king",
		          "knight",
		          "kobold",
		          "labourer",
		          "lady",
		          "lion",
		          "lizard",
		          "lord",
		          "mammoth",
		          "manticore",
		          "mason",
		          "mastiff",
		          "medusa",
		          "merchant",
		          "miller",
		          "miner",
		          "minotaur",
		          "minstrel",
		          "mule",
		          "noble",
		          "ogre",
		          "octopus",
		          "orc",
		          "owl",
		          "panther",
		          "peasant",
		          "pegasus",
		          "pony",
		          "priest",
		          "prince",
		          "princess",
		          "queen",
		          "rabbit",
		          "rat",
		          "raven",
		          "rhinoceros",
		          "sage",
		          "sailor",
		          "satyr",
		          "scorpian",
		          "servant",
		          "skeleton",
		          "shark",
		          "slave",
		          "snake",
		          "spider",
		          "stewerd",
		          "tailor",
		          "tiger",
		          "titan",
		          "thief",
		          "toad",
		          "troll",
		          "undead",
		          "vampire",
		          "vulture",
		          "wasp",
		          "warhorse",
		          "weasel",
		          "werewolf",
		          "wight",
		          "wizard",
		          "wolf",
		          "wyvern",
		          "zombie"],
	    "adjectives": ["alluring",
		               "articulate",
		               "beautiful",
		               "brilliant",
		               "confused",
		               "dangerous",
		               "dazzling",
		               "delightful",
		               "demented",
		               "desirable",
		               "despicable",
		               "dishonourable",
		               "dull",
		               "eloquent",
		               "erotic",
		               "flirty",
		               "foul",
		               "gorgeous",
		               "handsome",
		               "happy",
		               "hard",
		               "horrible",
		               "immodest",
		               "intelligent",
		               "lucid",
		               "lustful",
		               "nasty",
		               "perplexed",
		               "pretty",
		               "radiant",
		               "raunchy",
		               "rotten",
		               "seductive",
		               "senile",
		               "sensual",
		               "sexy",
		               "shameless",
		               "shiny",
		               "sleepy",
		               "stimulating",
		               "strong",
		               "stunning",
		               "suggestive",
		               "sultry",
		               "tough",
		               "troubled",
		               "ugly",
		               "vicious",
		               "vile",
		               "unsightly",
		               "wicked"],
		"participles": ["battling",
		                "biting",
		                "boxing",
		                "brawling",
		                "chewing",
		                "dancing",
		                "drinking",
		                "eating",
		                "feuding",
		                "fighting",
		                "fornicating",
		                "gliding",
		                "guzzling",
		                "humping",
		                "jousting",
		                "killing",
		                "loving",
		                "playing",
		                "prancing",
		                "running",
		                "sailing",
		                "screwing",
		                "searching",
		                "singing",
		                "sleeping",
		                "snoring",
		                "sparring",
		                "speaking",
		                "spitting",
		                "swallowing",
		                "swilling",
		                "swimming",
		                "teasing",
		                "turning",
		                "twisting",
		                "wrestling",
		                "writing"],
	    "verbs": ["battles",
	              "bites",
	              "dances",
	              "fights",
	              "herds",
	              "kills",
	              "loves",
	              "murders",
	              "prances",
	              "runs",
	              "sails",
	              "sings",
	              "swims",
	              "teaches",
	              "teases",
	              "washes",
	              "writes"],
	    "adverbs": ["crazily",
		            "frequently",
		            "immediately",
		            "loudly",
		            "quietly",
		            "rapidly",
		            "sexily",
		            "slowly",
		            "subtly",
		            "unusually"],
	    "objects": ["abacus",
		            "amulet",
		            "anvil",
		            "armour",
		            "axe",
		            "barrel",
		            "battleaxe",
		            "blanket",
		            "bowel",
		            "bucket",
		            "candle",
		            "cart",
		            "chalk",
		            "club",
		            "crossbow",
		            "crowbar",
		            "cup",
		            "dagger",
		            "drum",
		            "flute",
		            "halberd",
		            "hammer",
		            "horn",
		            "javelin",
		            "jewellery",
		            "kite",
		            "knife",
		            "lamp",
		            "lance",
		            "lockpick",
		            "longbow",
		            "lute",
		            "lyre",
		            "mace",
		            "make-up",
		            "maul",
		            "mug",
		            "pen",
		            "quill",
		            "rapier",
		            "rope",
		            "saddle",
		            "scimitar",
		            "scythe",
		            "sickle",
		            "sheath",
		            "ship",
		            "shield",
		            "shortbow",
		            "shovel",
		            "spear",
		            "sword",
		            "rake",
		            "tent",
		            "tongs",
		            "tools",
		            "torch",
		            "trident",
		            "wand",
		            "wagon",
		            "whistle",
		            "whip"]
	};
	// Some pre-gen arrays to use
	var titles = {
	    "books": ["The :adjectives :nouns :verbs",
		          "When the :nouns :verbs :adverbs",
		          "The :nouns :verbs the :nouns",
		          "How to be :adjectives",
		          "A guide to :participles",
		          "On :nouns",
		          "Learn about :nouns",
		          "The :nouns :verbs the :adjectives :nouns",
		          "The :nouns that :adverbs :verbs",
		          "How to use a :objects",
		          ":objects for dummies",
		          "Advanced techniques for using your :objects",
		          "Become an expert with :objects",
		          "How to make a :objects",
		          "A study on why :nouns like :objects"],
	    "taverns": ["The :adjectives :nouns",
		            "The :adjectives :objects",
		            "The :participles :nouns",
		            "The :nouns & :nouns",
		            "The :objects & :objects",
		            "The :nouns & :objects"]
	};
	// Perform a basic pseudorandom roll
    function roll (number) {
        number = (number && (typeof number === "number")) ? parseInt(number,10) : 2;
        return Math.round(Math.random()*(number));
    };
    // Return a random value
    function randValue (type) {
    	type = (type && (typeof type === "string")) ? type : "nouns";
    	if (values[type]) {
    		return values[type][roll(values[type].length-1)];
    	}
    	return "";
    };
    // Return a random title (unparsed)
	function randTitle (type) {
    	type = (type && (typeof type === "string")) ? type : "books";
    	if (titles[type]) {
    		return titles[type][roll(titles[type].length-1)];
    	}
    	return "";
    };
	// Render title from input text
	function render(input) {
		if (input) {
			var replaceable = input.match(/:\w+\b/g);
			for (var i in replaceable) {
				if (typeof replaceable[i] === "string") {
					var split = replaceable[i].split(':');
					// Replace the matched words
					while (input.match(replaceable[i]) !== null && input.match(replaceable[i]) !== undefined && split[1]) {
						input = input.replace(replaceable[i], randValue(split[1]));
					}
				}
			}
		}
		return input;
	};
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
    };
    function convert(inputArray) {
    	var csv = "";
    	if (inputArray) {
	    	for (name in inputArray) {
				if (csv !== "") {
					csv += ", ";
				}
				csv += inputArray[name];
			}
    	}
    	return csv;
    }
	return {
		// Get random variables
		getValue: (function(type) { return randValue(type); }),
		// Get titles
		getTitle: (function(type) {return render(randTitle(type)); }),
		// Get a list of available title types
		getTypes: (function () {
			var type = new Array();
			for (var k in titles) {
				type.push(k);
			}
			return type;
		}),
		// Get a list of available values types
		getValues: (function () {
			var type = new Array();
			for (var k in values) {
				type.push(k);
			}
			return type;
		}),
		// Saves the values
        saveValues: (function () { localStorage.setItem('title.values', JSON.stringify(values)); }),
        // Loads the values
    	loadValues: (function () { if (localStorage['title.values']) { values = JSON.parse(localStorage['title.values']); } }),
    	// Delete values
    	deleteValues: function (value) { if (value) { delete values[value]; }; },
    	// Saves the titles
        saveTitles: (function () { localStorage.setItem('title.titles', JSON.stringify(titles)); }),
        // Loads the titles
    	loadTitles: (function () { if (localStorage['title.titles']) { titles = JSON.parse(localStorage['title.titles']); } }),
    	// Delete titles
    	deleteTitles: function (title) { if (title) { delete titles[title]; }; },
		// Get a CSV list of values
		getValueCSV: (function (part) {
			var csv = "";
			if (part) {
				if (values[part]) {
					for (var name in values[part]) {
						if (csv !== "") {
							csv += ", ";
						}
						csv += values[part][name];
					}
				}
			}
			return csv;
		}),
		// Set the list of names for a value given in CSV format
		setValueCSV: (function (value, inputString) {
			var csv = [];
			if (value && inputString) {
				csv = CSVToArray( inputString );
				values[value] = csv[0];
			}
			return csv[0];
		}),
		// Get a CSV list of titles
		getTitleCSV: (function (part) {
			var csv = "";
			if (part) {
				if (titles[part]) {
					for (var name in titles[part]) {
						if (csv !== "") {
							csv += "\n";
						}
						csv += titles[part][name];
					}
				}
			}
			return csv;
		}),
		// Set the list of names for a category given in CSV format
		setTitleCSV: (function (cat, inputString) {
			var csv = [];
			if (cat && inputString) {
				csv = CSVToArray( inputString );
				var result = [];
				for (var i in csv) {
					result[i] = csv[i][0];
				}
				titles[cat] = result;
			}
			return csv;
		})
	};
};