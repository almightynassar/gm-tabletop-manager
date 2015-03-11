/**
 * Creates randomly generated rumours
 */
var Rumours = new function () {
	// Some pre-gen arrays to use
	var values = {
		"direction": ['North','North-West','North-East','South','South-West','South-East','West','East'],
		"colour": ['red','blue','green','yellow','purple','orange','white','black','grey','brown','violet','crimson','pink','aqua','maroon','beige'],
		"urban": ['city','town','village','hamlet','manor','farm','estate','castle','fortress','citadel','harbour','temple'],
		"rural": ['forest','jungle','plains','mountains','hills','beach','bay','river','lake','savanah','grassland','woodland','copse','desert','cavern','cave'],
		"profession": ['noble','aristocrat','doctor','craftsman','labourer','beggar','thief','dockhand','sailor','blacksmith','innkeep','merchant','banker','farmer','peasant','slave','servant','clergyman','priest','teacher','miller','mason','tailor','falconer','squire','knight','butcher','carpenter','plowman','fishmonger','baker','weaver','cooper','cartwright','brewer'],
		"monster": ['aberation','pack of animals','group of bandits','banshee','basilisk','tribe of barbarians','group of creatures','group of cultists','cyclops','dragon','elemental','gargoyle','ghost','ghoul','giant','gnoll','goblin','golem','kobold','manticore','minotaur','necromancer','ogre','orc','owlbear','poacher','skeleton','pack of stirges','thug','troll','undead','vampire','warband','werewolf','wight','pack of wolves'],
		"relation": ['partner','daughter','son','brother','sister','mother','father','uncle','aunt','grandmother','grandfather','cousin','friend','enemy']
	};
	// Perform a basic pseudorandom roll
    function roll (number) {
        number = (number && (typeof number === "number")) ? parseInt(number,10) : 2;
        return Math.round(Math.random()*(number));
    };
    // Return a random value
    function randValue (type) {
    	type = (type && (typeof type === "string")) ? type : "direction";
    	if (values[type]) {
    		return values[type][roll(values[type].length-1)];
    	}
    	return "";
    };
	// Specific rumours
	var rumours = {
		"tavern": ["A :monster has been troubling a nearby :urban",
		           "Someone is apparently trying to tame a :monster",
		           "A :monster has made their home in the nearby :rural",
		           "A :profession was recently killed by a :monster",
		           "A :monster was seen to the :direction",
		           "To the :direction is a :monster that is guarding treasure",
		           "An adventuring group travelled to the :direction and could not defeat the :monster there",
		           "A :monster is roaming the :rural and they seem to be searching for something",
		           ":monster has been spotted lurking to the :direction",
		           "A game of chance will be happening soon",
		           "Some of the other patrons are going to be gambling soon",
		           ":profession has inherited an extremely large wealth after their :relation passed away",
		           "The :relation of a :profession is involved in adultery!",
		           "A :profession is now charging more because they are in debt",
		           "A local :profession has a gambling problem and has run up a massive debt",
		           "The :relation of :profession is now engaged",
		           "The :profession owes a criminal a lot of money",
		           "The :profession has inherited a magical item",
		           "The local :profession apparently is in trouble with the guild and needs to resolve it soon!",
		           "The local :profession is a racist and has an intense hatred for outsiders",
		           "The nearby :urban apparently has the best games of dice around",
		           "The :profession died from some mysterious disease",
		           "A stranger has been spotted lurking to the :direction",
		           "The :profession has been suffering from a dreadful curse",
		           "Legend has it that if you wait outside the :urban to the :direction during the full moon you will be visited by a ghost",
		           "The :profession is hiding a cursed item",
		           "The :profession is being haunted by their former mentor",
		           "A :profession was found dead to the :direction",
		           "The :profession has disappeared and all of a sudden their :relation has been spending a lot of money",
		           "The :profession was arrested for poisoning their :relation. They still maintain their innocence",
		           "The :profession was arrested and no one knows why!",
		           "A secret cult has started up somewhere near a :urban",
		           "A secret lair is hidden in a nearby :rural",
		           "Rare :colour flowers to the :direction are said to produce an effect when eaten",
		           "An ancient warrior travelled to the :direction in search of treasure but never returned",
		           "A secret cult seeks to destroy the nearby :urban",
		           "A secret cult seeks to commit genocide",
		           "Slavers from the :direction are capturing any lone individuals they come across",
		           "A noble wishes to investigate the ruins to the :direction and is willing to pay good money"
		],
		"political": ["A war will probably break out to the :direction",
		              "A spy stole a stack of important documents from the government and is now hiding somewhere in the :rural",
		              "The guards in the nearby :urban are imprisoning certain individuals that enter",
		              "Officials are setting an entrance tax for outsiders",
		              "Officials are setting a tax on all goods bought or sold",
		              "A saboteaur was caught trying to sabatoge the nearby :urban",
		              "A spy was caught spying on the nearby :urban",
		              "The :relation of the ruler of :urban is trying to take over",
		              "A high-ranking noble has an issue with the law and is willing to pay good money to solve it"
		]
	};
	// Return a random tavern rumour (unparsed)
	function randRumour (type) {
    	type = (type && (typeof type === "string")) ? type : "tavern";
    	if (rumours[type]) {
    		return rumours[type][roll(rumours[type].length-1)];
    	}
    	return "";
    };
	// Render rumour from input text
	function render(input) {
		if (input) {
			var replaceable = input.match(/:\w*\b/g);
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
		// Get rumours
		getRumour: (function(type) {return render(randRumour(type)); }),
		// Get a list of available rumour types
		getTypes: (function () {
			var type = new Array();
			for (var k in rumours) {
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
        saveValues: (function () { localStorage.setItem('rumour.values', JSON.stringify(values)); }),
        // Loads the values
    	loadValues: (function () { if (localStorage['rumour.values']) { values = JSON.parse(localStorage['rumour.values']); } }),
    	// Delete values
    	deleteValues: function (value) { if (value) { delete values[value]; }; },
    	// Saves the rumours
        saveRumours: (function () { localStorage.setItem('rumour.rumours', JSON.stringify(rumours)); }),
        // Loads the rumours
    	loadRumours: (function () { if (localStorage['rumour.rumours']) { rumours = JSON.parse(localStorage['rumour.rumours']); } }),
    	// Delete rumours
    	deleteRumours: function (rumour) { if (rumour) { delete rumours[rumour]; }; },
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
		// Get a CSV list of rumours
		getRumourCSV: (function (part) {
			var csv = "";
			if (part) {
				if (rumours[part]) {
					for (var name in rumours[part]) {
						if (csv !== "") {
							csv += "\n";
						}
						csv += rumours[part][name];
					}
				}
			}
			return csv;
		}),
		// Set the list of names for a category given in CSV format
		setRumourCSV: (function (cat, inputString) {
			var csv = [];
			if (cat && inputString) {
				csv = CSVToArray( inputString );
				var result = [];
				for (var i in csv) {
					result[i] = csv[i][0];
				}
				rumours[cat] = result;
			}
			return csv;
		})
	};
};