/**
 * The Item System
 * 
 * Handles listing items and doing some basic shopping/checkout
 */
var Item = new function() {
	// Stock is listed by categories
	// Name, Cost (CP, or Copper Pieces), weight (kg or liters), description, rarity (legendary, very rare, rare, uncommon, common, basic)
	// 1 CP = 10 SP = 100 GP
	var stock = {
		"Animals": [
		    ["Bird of Prey", 30000, 1, "Trained bird (falcon/hawk/eagle). Eagles are up to 5 times larger than other species", "rare"],
		    ["Camel", 5000, 500, "Animal suitable for riding. Can carry up to 50 kg and pull twice it's weight", "rare"],
			["Chicken", 15, 1, "Produces 1 egg roughly every day and is suitable for eating", "common"],
			["Cow", 900, 720, "Produces 30 liters of milk roughly every day and is suitable for eating", "common"],
			["Dog", 2500, 40, "Trained dog for hunting / guarding / other purpose", "common"],
			["Donkey", 1200, 480, "Pack animal that can carry up to 50 kg and pull up to twice it's bodyweight", "common"],
			["Draft Horse", 5000, 900, "Used for manual labour. Carries up to 180 kgs and pull up to twice it's bodyweight ", "uncommon"],
			["Elephant", 20000, 4000, "Can carry up to 1000 kgs and pull twice it's bodyweight", "very rare"],
			["Goat", 95, 75, "Produces 6 liters of milk roughly every day and 85 grams of wool a year (shorn in spring) and is suitable for eating", "common"],
			["Goose", 45, 9, "Produces 30 grams of down twice a year and is suitable for eating", "common"],
			["Ox", 1000, 1350, "Castrated male cattle used as draft animal. Castration makes the animal easier to control.", "common"],
			["Pig", 300, 115, "Animal suitable for eating", "common"],
			["Riding Horse", 7500, 550, "Animal suitable for riding. Can carry up to 100 kg and pull twice it's bodyweight", "uncommon"],
			["Sheep", 95, 100, "Produces 14 kg of wool a year and is suitable for eating", "common"],
			["War Horse", 40000, 900, "Horse trained for battle. Can carry up to 180 kg and pull twice it's bodyweight", "rare"]
		],
		"Art": [
		    ["Basic Statuette", 1500, 5, "Small statue made from common materials (wood / stone / bone)", "common"],
		    ["Famous Painting", 500000, 5, "A masterpiece completed by famous artist with an exquisite engraved frame", "very rare"],
		    ["Jewellery Box", 10000, 5, "Engraved wooden box encrusted with jewels", "uncommon"],
		    ["Painting", 25000, 5, "A well-made composition by a known artist with a custom frame", "uncommon"],
		    ["Mirror", 7500, 1, "Handheld mirror set in a wodden frame", "uncommon"],
		    ["Metal Statuette", 400000, 5, "Small statue made from precious metal and encrusted with jewels", "common"],
		    ["Royal Crown", 1000000, 1, "Crown made out of precious metal and encrusted with jewels", "very rare"],
		    ["Royal Ring", 750000, 0.2, "Ring made out of precious metal and encrusted with jewels", "very rare"],
		    ["Simple Painting", 5000, 5, "A mundane painting by a relatively unknown artist with a simple wooden frame", "common"]
		],
		"Clothing": [
		    ["Boots", 25, 0.5, "Well-made and sturdy travelling boots.", "common"],
		    ["Cloak", 25, 0.5, "A simple warm travelling cloak.", "common"],
		    ["Cold-Weather outfit", 200, 5, "Complete outfit for working in the cold. Cloak / woolen coat / gloves / pants / boots / wool cap.", "common"],
		    ["Craftsman's outfit", 100, 2.5, "Complete outfit for working in a trade (Mason / Smith / Carpenter). Tailored shirt / pants / shoes / belt and apron for carrying tools.", "common"],
		    ["Courtier's outfit", 3000, 2.5, "Complete outfit suitable for someone attending a noble court. These clothes are fancy and tailored.", "uncommon"],
		    ["Entertainer's outfit", 200, 2.5, "Flsahy outfit for entertainers (Jugglers / Jesters / Tumblers).", "uncommon"],
		    ["Monk's outfit", 10, 1, "Sandals and robe.", "uncommon"],
		    ["Night clothes", 20, 2.5, "Loose light and soft full bodied clothing meant to be slept in.", "common"],
		    ["Noble's outfit", 4500, 3, "Fine fashionable and tailored clothes that indicate the bearer is of high-standing.", "rare"],
		    ["Peasant's clothes", 10, 1, "Shoes / belt / breeches / loose shirt", "common"],
		    ["Scholar's outfit", 20, 1, "High-quality and well-made robe / belt / cap / soft indoor shoes", "uncommon"],
		    ["Soldier's uniform", 75, 1, "Specially made shirt / belt / breeches / sheath / tabard that indicate the military unit the wearer is in", "rare"],
		    ["Traveller's clothes", 50, 1, "Sturdy Shoes / belt / breeches / loose shirt. Suitable for travelling on hard roads", "common"]
		],
		"Gems": [
		    ["Azurite", 1000, 0.2, "Ornamental stone. Opaque mottled deep blue.", "common"],
		 	["Alexandrite", 50000, 0.2, "Precious stone. Transparent dark green.", "very rare"],
		 	["Amber", 10000, 0.2, "Precious stone. Transparent golden", "rare"],
		 	["Amethyst", 10000, 0.2, "Precious stone. Transparent deep purple.", "rare"],
		 	["Aquamarine", 50000, 0.2, "Precious stone. Transparent pale blue-green", "very rare"],
		 	["Banded Agate", 1000, 0.2, "Ornamental stone. Translucent striped brown / blue / white / red", "common"],
		 	["Black Opal", 100000, 0.2, "Jewel. Translucent dark green with black mottling and golden flecks", "very rare"],
		 	["Black Sapphire", 500000, 0.2, "Jewel. Translucent black with glowing highlights", "very rare"],
		 	["Bloodstone", 5000, 0.2, "Semi-precious stone. Opaque dark gray with red flecks", "uncommon"],
		 	["Blue Quartz", 1000, 0.2, "Ornamental stone. Transparent pale blue", "common"],
		 	["Carnelian", 5000, 0.2, "Semi-precious stone. Opaque red-brown", "uncommon"],
		 	["Chaldony", 5000, 0.2, "Semi-precious stone. Opaque white", "uncommon"],
		 	["Chrysoberyl", 10000, 0.2, "Semi-precious stone. Translucent pale green", "rare"],
		 	["Chrysoprase", 5000, 0.2, "Semi-precious stone. Translucent emerald green", "uncommon"],
		 	["Citrine", 5000, 0.2, "Semi-precious stone. Opaque red-brown", "uncommon"],
		 	["Coral", 10000, 0.2, "Precious stone. Opaque crimson", "rare"],
		 	["Diamond", 500000, 0.2, "Jewel. Transparent blue-white", "very rare"],
		 	["Emerald", 100000, 0.2, "Jewel. Transparent brilliant green", "very rare"],
		 	["Eye Agate", 1000, 0.2, "Ornamental stone. Translucent circles of white / gray / brown / blue / green", "common"],
		 	["Fire Opal", 100000, 0.2, "Jewel. Translucent fiery red", "very rare"],
		 	["Garnet", 10000, 0.2, "Precious stone. Transparent red", "rare"],
		 	["Hermatite", 1000, 0.2, "Ornamental stone. Opaque grey-black", "common"],
		 	["Jacinth", 500000, 0.2, "Jewel. Opaque red-brown", "very rare"],
		 	["Jade", 10000, 0.2, "Precious stone. Translucent light green", "rare"],
		 	["Jasper", 5000, 0.2, "Semi-precious stone. Opaque blue / black / brown", "uncommon"],
		 	["Jet", 10000, 0.2, "Precious stone. Opaque deep black", "rare"],
		 	["Lapis Lazuli", 1000, 0.2, "Ornamental stone. Opaque blue with yellow flecks", "common"],
		 	["Malachite", 1000, 0.2, "Ornamental stone. Opaque striated light and dark green", "common"],
		 	["Moonstone", 5000, 0.2, "Semi-precious stone. Translucent white with pale blue glow", "uncommon"],
		 	["Moss Agate", 1000, 0.2, "Ornamental stone. Translucent pink with green markings", "common"],
		 	["Obsidian", 1000, 0.2, "Ornamental stone. Opaque black", "common"],
		 	["Opal", 100000, 0.2, "Jewel. Translucent pale blue with golden mottling", "very rare"],
		 	["Onyx", 5000, 0.2, "Semi-precious stone. Opaque bands of black and white", "uncommon"],
		 	["Pearl", 10000, 0.2, "Precious stone. Opaque lustrous white", "rare"],
		 	["Peridot", 50000, 0.2, "Precious stone. Transparent rich olive green", "very rare"],
		 	["Quartz", 5000, 0.2, "Semi-precious stone. Transparent white", "uncommon"],
		 	["Rhodochrosite", 1000, 0.2, "Ornamental stone. Opaque light pink", "common"],
		 	["Rock Crystal", 5000, 0.2, "Semi-precious stone. Transparent clear", "uncommon"],
		 	["Ruby", 500000, 0.2, "Jewel. Transparent deep crimson", "very rare"],
		 	["Sapphire", 100000, 0.2, "Jewel. Translucent blue", "very rare"],
		 	["Sardonyx", 5000, 0.2, "Semi-precious stone. Opaque bands of red and white", "uncommon"],
		 	["Spinel", 10000, 0.2, "Precious stone. Transparent red / green / deep blue", "rare"],
		 	["Star Rose Quartz", 10000, 0.2, "Precious stone. Transparent smokey rose with white star centre", "rare"],
		 	["Tiger Eye Agate", 1000, 0.2, "Ornamental stone. Translucent brown with golden center", "common"],
		 	["Topaz", 50000, 0.2, "Precious stone. Transparent golden yellow", "very rare"],
		 	["Tourmaline", 10000, 0.2, "Precious stone. Transparent pale green", "rare"],
		 	["Turquoise", 1000, 0.2, "Ornamental stone. Opaque light blue-green", "common"],
		 	["Zircon", 5000, 0.2, "Semi-precious stone. Transparent pale blue-green", "uncommon"]
		],
		"Husbandry": [
	        ["Barding (Heavy)", 20000, 50, "Provides equivalent protection as humanoid Heavy Armour", "rare"],
	        ["Barding (Light)", 4500, 20, "Provides equivalent protection as humanoid Light Armour", "uncommon"],
	        ["Gauntlet", 10000, 50, "Padded armwrap suitable to allow a bird of prey to rest", "uncommon"],
	        ["Feed (per day)", 10, 5, "Provides enough nourishment for your particular animal", "common"],
	        ["Riding Gear", 1500, 2, "All the gear for riding. Bit and bridle and saddle", "common"],
	        ["Saddle bags", 400, 4, "Turns the saddle into a suitable container for goods", "common"],
		],
		"Lodging": [
		  	["Common", 50, 0, "Little privacy but comfortable bedding and simple food provide in meal area", "common"],
		  	["Poor", 5, 0, "Allowed to sleep on floor near fire. No privacy / bedding / food", "basic"],
		  	["Rich", 200, 0, "Locked private room with room service", "uncommon"],
		],
		"Wages (per day)": [
		    ["Apprentice", 25, 0, "Studying under a Master / Scholar / Blacksmith", "common"],
			["Blacksmith", 700, 0, "Works the forges", "uncommon"],
			["Master", 200, 0, "Experienced Tradesman (Carpenter / Mason).", "uncommon"],
			["Mercenary", 100, 0, "Footsoldier or Archer.", "uncommon"],
			["Scholar", 500, 0, "Scribe / Alchemist / Doctor / Engineer", "rare"],
			["Skilled", 50, 0, "Generic skilled worker (Carpenter / Mason / Tailor)", "common"],
			["Unskilled", 10, 0, "Unskilled labour for manual work", "basic"]
		],
		"Writing": [
			["Book (Parchment)", 10000, 1, "Empty bound book with 128 pages of parchment/vellum", "uncommon"],
			["Book (Paper)", 5000, 0, "Empty bound book with 128 pages of paper", "common"],
			["Brush", 100, 0.1, "Simple paint brush", "uncommon"],
			["Ink (Black)", 800, 0, "20 grams of black ink (in 1 vial)", "common"],
			["Ink (Colour)", 1600, 0, "20 grams of coloured ink (in 1 vial)", "uncommon"],
			["Inkpen", 50, 0, "Pen suitable for writing", "common"],
			["Paint", 1600, 1, "Oil-based coloured paint", "uncommon"],
			["Parchment", 450, 0, "20 pieces of parchement/vellum", "uncommon"],
			["Paper", 200, 0, "20 pieces of paper", "common"],
			["Sealing Wax", 100, 1, "Sealing wax for scrolls and documents. Enough for multiple uses (must be melted before use).", "common"],
			["Stationary", 100, 0, "1 piece of embossed fancy paper suitable for official agreements", "rare"]
		],
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
    }
	return {
		// Return our stock object
		getStock: function(cat) { 
			if (cat) {
				return stock[cat];
			}
			return stock;
		},
		// Saves and loads the Items
        save: (function () {
    		// Save the new object
    		localStorage.setItem('stock', JSON.stringify(stock));
    	}),
    	load: (function () {
    		// Load the stored object
    		if (localStorage['stock']) {
    			stock = JSON.parse(localStorage['stock']);
    		}
    	}),
    	deleteList: function (cat) { if (cat) { delete stock[cat]; }; },
    	// Get a list of available race names
		categories: (function () {
			var cat = new Array();
			for (var k in stock) {
				cat.push(k);
			}
			return cat;
		}),
		// Get the list of names for a race in CSV format
		getCSV: (function (cat) {
			var csv = "";
			if (cat) {
				if (stock[cat]) {
					for (var item in stock[cat]) {
						if (csv !== "") {
							csv += "\n";
						}
						for (var entry in stock[cat][item]) {
							if (entry > 0) {
								csv += ", ";
							}
							csv += stock[cat][item][entry];
						}
					}
				}
			} else {
				for (cat in stock) {
					for (var item in stock[cat]) {
						if (csv !== "") {
							csv += "\n";
						}
						csv += cat;
						for (var entry in stock[cat][item]) {
							csv += ", " + stock[cat][item][entry];
						}
					}
				}
			}
			return csv;
		}),
		// Set the list of names for a category given in CSV format
		setCSV: (function (cat, inputString) {
			var csv = [];
			if (cat && inputString) {
				csv = CSVToArray( inputString );
				stock[cat] = csv;
			}
			return csv;
		})
	};
};