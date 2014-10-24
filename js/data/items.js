var Item = {
	"animals": {
		"cat": {
			"name": "Cat",
			"cost": 1,
			"weight": 3,
			"description": "Domestic house cat"
		},
		"chicken": {
			"name": "Chicken",
			"cost": 0.5,
			"weight": 5,
			"description": "Produces eggs and meat"
		},
		"cow": {
			"name": "Cow",
			"cost": 10,
			"weight": 375,
			"description": "Produces milk and meat"
		},
		"dogguard": {
			"name": "Dog (Guard)",
			"cost": 25,
			"weight": 60,
			"description": "Large, heavy dog domesticated to guard homes"
		},
		"doghunting": {
			"name": "Dog (Hunting)",
			"cost": 20,
			"weight": 40,
			"description": "Fast dog for hunting game"
		},
		"doglap": {
			"name": "Dog (lap)",
			"cost": 10,
			"weight": 25,
			"description": "Small dog suitable as a pet"
		},
		"donkey": {
			"name": "Donkey",
			"cost": 40,
			"weight": 180,
			"description": "Stubborn pack animal. Carries up to 150 kg. 5 square speed (4.5 km an hour)"
		},
		"raptor": {
			"name": "Raptor (trained)",
			"cost": 300,
			"weight": 5,
			"description": "A trained bird-of-prey"
		},
		"goat": {
			"name": "Goat",
			"cost": 1,
			"weight": 45,
			"description": "Produces milk and meat"
		},
		"goose": {
			"name": "Goose",
			"cost": 1,
			"weight": 7,
			"description": "Produces eggs and meat"
		},
		"horsedraft": {
			"name": "Horse (Draft)",
			"cost": 150,
			"weight": 400,
			"description": "Suitable for labour. Carries up to 300 kg. 6 square speed (5.5 km an hour)"
		},
		"horseriding": {
			"name": "Horse (Riding)",
			"cost": 75,
			"weight": 220,
			"description": "Only for riding. Carries up to 150 kg. 8 square speed (7.5 km an hour)"
		},
		"horsewar": {
			"name": "Horse (War)",
			"cost": 300,
			"weight": 450,
			"description": "Suitable for combat. Carries up to 350 kg. 8 square speed (7.5 km an hour)"
		},
		"pig": {
			"name": "Pig",
			"cost": 3,
			"weight": 130,
			"description": "Produces meat"
		},
		"sheep": {
			"name": "Sheep",
			"cost": 2,
			"weight": 70,
			"description": "Produces wool and meat"
		}
	},
	"art": {
		"jewelledcrown": {
			"name": "Jewelled Crown",
			"cost": 25000,
			"weight": 1,
			"description": "Golden crown set with jewels"
		},
		"jewelledcup": {
			"name": "Jewelled Cup",
			"cost": 20000,
			"weight": 1,
			"description": "Golden cup set with jewels"
		},
		"jewellednecklace": {
			"name": "Jewelled Necklace",
			"cost": 10000,
			"weight": 0,
			"description": "Necklace set with a jewel"
		},
		"jewelledring": {
			"name": "Jewelled Ring",
			"cost": 7000,
			"weight": 0,
			"description": "A golden ring encrusted with a jewel"
		},
		"statuettebone": {
			"name": "Statuette (Bone/Ivory)",
			"cost": 40,
			"weight": 1,
			"description": "A statuette made of carved bone or ivory"
		},
		"statuettegold": {
			"name": "Statuette (Gold)",
			"cost": 900,
			"weight": 3,
			"description": "A statuette made of silver"
		},
		"statuettemetal": {
			"name": "Statuette (Metal)",
			"cost": 60,
			"weight": 3,
			"description": "A statuette made of mudane metal (brass, pewter, copper, iron)"
		},
		"statuettesilver": {
			"name": "Statuette (Silver)",
			"cost": 450,
			"weight": 3,
			"description": "A statuette made of silver"
		},
		"statuettestone": {
			"name": "Statuette (Stone)",
			"cost": 100,
			"weight": 6,
			"description": "A statuette made of stone"
		},
		"statuettewood": {
			"name": "Statuette (Wood)",
			"cost": 30,
			"weight": 1,
			"description": "A statuette made of wood"
		},
	},
	"clothing": {
		"artisan": {
			"name": "Artisan Outfit",
			"cost": 1,
			"weight": 2.5,
			"description": "Complete outfit for working in a trade (Mason, Smith, Craftsman, etc). Button shirt, pants, shoes, and a belt and apron for carrying tools."
		},
		"boots": {
			"name": "Boots",
			"cost": 3,
			"weight": 1,
			"description": "Sturdy travelling boots"
		},
		"capecommon": {
			"name": "Cape (Common)",
			"cost": 0.5,
			"weight": 0.5,
			"description": "A travelling cape"
		},
		"caperich": {
			"name": "Cape (Rich)",
			"cost": 6,
			"weight": 1,
			"description": "A fine, embroided cape"
		},
		"cloakcommon": {
			"name": "Cloak (common)",
			"cost": 1,
			"weight": 1,
			"description": "A heavy warm cloak suitable for winter"
		},
		"cloakrich": {
			"name": "Cloak (rich)",
			"cost": 25,
			"weight": 2,
			"description": "A finely made cloak to show off your status"
		},
		"coldweather": {
			"name": "Coldweather clothes",
			"cost": 8,
			"weight": 5,
			"description": "Common woolen coat, heavy cloak, gloves, boots and wool cap. Necessary for winter and cold climates. Goes over regular clothes."
		},
		"common": {
			"name": "Common Clothes",
			"cost": 1,
			"weight": 2.5,
			"description": "Shoes, belt, breeches, and loose shirt."
		},
		"courtier": {
			"name": "Courtier Outfit",
			"cost": 30,
			"weight": 3,
			"description": "Complete outfit for suitable for courtier (person attending a noble court). Fancy, tailored and fashionable clothes."
		},
		"entertainer": {
			"name": "Entertainer's Outfit",
			"cost": 3,
			"weight": 2,
			"description": "Flashy and maybe gaudy clothes for entertaining. Allows wearer to tumble, dance and run."
		},
		"monk": {
			"name": "Monk's Outfit",
			"cost": 5,
			"weight": 1,
			"description": "Simple outfit of sandal, loose breeches, loose shirt, bound by a sash. Gives user maximum mobility, and made of high-quality fabric."
		},
		"nightclothes": {
			"name": "Nigthclothes",
			"cost": 3,
			"weight": 0.5,
			"description": "Loose clothing that is meant to sleep in."
		},
		"noblemajor": {
			"name": "Noble's Outfit (major)",
			"cost": 75,
			"weight": 3,
			"description": "Fine, high quality, fashionable and tailored clothes that indicate the bearer is of high-standing. Precious metal is usually woven into the fabric. Usually found by nobles in the city"
		},
		"nobleminor": {
			"name": "Noble's Outfit (minor)",
			"cost": 45,
			"weight": 3,
			"description": "Of similar cut and quality as major noble clothes, but without the adornment of precious metals. Usually worn by the rural nobility."
		},
		"peasant": {
			"name": "Peasant Outfit",
			"cost": 0.2,
			"weight": 1,
			"description": "Complete outfit for suitable for peasants. Loose shirt and baggy breeches. Cloth wrappings for shoes."
		},
		"scholar": {
			"name": "Scholar Outfit",
			"cost": 5,
			"weight": 3,
			"description": "Complete outfit for suitable for scholars. Includes a robe, belt, cap, and soft indoor shoes. All of high-quality."
		},
		"snowshows": {
			"name": "Snow shoes",
			"cost": 5,
			"weight": 0.5,
			"description": "Shows that allow you to walk on snow."
		},
		"traveler": {
			"name": "Traveler's Outfit",
			"cost": 1,
			"weight": 2.5,
			"description": "Suitable clothing for warm-weather adventuring. Boots, wool breeches, belt, shirt and hood."
		},
		"uniform": {
			"name": "Soldier's uniform",
			"cost": 5,
			"weight": 5,
			"description": "Specially made shirts, breeches, boots, belt, sheath, and tabbard that indicates the army/unit the wearer is in."
		},
		"vestment": {
			"name": "Priest Vestments",
			"cost": 5,
			"weight": 3,
			"description": "These ecclesiastical clothes are for performing priestly functions, and are not suitable for travelling/adventuring"
		}
	},
	"gems": {
		"azurite": {
			"name": "Azurite",
			"cost": 15,
			"weight": 0,
			"description": "Ornamental Stone. Opaque, mottled deep blue"
		},
		"alexandrite": {
			"name": "Alexandrite",
			"cost": 130,
			"weight": 0,
			"description": "Precious Stone. Dark green"
		},
		"amber": {
			"name": "Amber",
			"cost": 130,
			"weight": 0,
			"description": "Precious Stone. Transparent and Golden"
		},
		"amethyst": {
			"name": "Amethyst",
			"cost": 150,
			"weight": 0,
			"description": "Precious Stone. Purple Crystal"
		},
		"aquamarine": {
			"name": "Aquamarine",
			"cost": 500,
			"weight": 0,
			"description": "Precious Stone. Pale blue-green"
		},
		"bandedagate": {
			"name": "Banded Agate",
			"cost": 20,
			"weight": 0,
			"description": "Ornamental Stone. Brown, blue, red and white stripes"
		},
		"blackopal": {
			"name": "Black Opal",
			"cost": 1500,
			"weight": 0,
			"description": "Jewel. Dark green with black mottling and golden flecks"
		},
		"blacksapphire": {
			"name": "Black Sapphire",
			"cost": 5000,
			"weight": 0,
			"description": "Jewel. Rich black with highlights"
		},
		"bloodstone": {
			"name": "Bloodstone",
			"cost": 80,
			"weight": 0,
			"description": "Semi-Precious Stone. Dark gray with red flecks"
		},
		"bluequartz": {
			"name": "Blue Quartz",
			"cost": 15,
			"weight": 0,
			"description": "Ornamental Stone. Transparent pale blue"
		},
		"carnelian": {
			"name": "Carnelian",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Orange to red-brown"
		},
		"chaldony": {
			"name": "Chaldony",
			"cost": 90,
			"weight": 0,
			"description": "Semi-Precious Stone. White"
		},
		"Chrysoberyl": {
			"name": "Chrysoberyl",
			"cost": 125,
			"weight": 0,
			"description": "Precious Stone. Green or yellow green"
		},
		"chrysoprase": {
			"name": "Chrysoprase",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Translucent apple to emerald green"
		},
		"citrine": {
			"name": "Citrine",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Pale yellow brown"
		},
		"coral": {
			"name": "Coral",
			"cost": 200,
			"weight": 0,
			"description": "Precious Stone. Pink to crimson"
		},
		"diamond": {
			"name": "Diamond",
			"cost": 5000,
			"weight": 0,
			"description": "Jewel. Clear blue-white, rich blue, yellow or pink"
		},
		"emerald": {
			"name": "Emerald",
			"cost": 5000,
			"weight": 0,
			"description": "Jewel. Brilliant green"
		},
		"eyeagate": {
			"name": "Eye Agate",
			"cost": 20,
			"weight": 0,
			"description": "Ornamental Stone. Gray, white, brown, blue, and green circles"
		},
		"fireopal": {
			"name": "Fire Opal",
			"cost": 2000,
			"weight": 0,
			"description": "Jewel. Fiery Red"
		},
		"garnet": {
			"name": "Garnet",
			"cost": 500,
			"weight": 0,
			"description": "Precious Stone. Deep red to violet crystal"
		},
		"hermatite": {
			"name": "Hermatite",
			"cost": 10,
			"weight": 0,
			"description": "Ornamental Stone. Gray-black"
		},
		"jacinth": {
			"name": "Jacinth",
			"cost": 5000,
			"weight": 0,
			"description": "Jewel. Fiery orange"
		},
		"jade": {
			"name": "Jade",
			"cost": 200,
			"weight": 0,
			"description": "Precious Stone. Light to Dark green or white"
		},
		"jasper": {
			"name": "Jasper",
			"cost": 75,
			"weight": 0,
			"description": "Semi-Precious Stone. Blue, black to brown"
		},
		"jet": {
			"name": "Deep black",
			"cost": 250,
			"weight": 0,
			"description": "Precious Stone. Deep black"
		},
		"lapislazuli": {
			"name": "Lapis Lazuli",
			"cost": 35,
			"weight": 0,
			"description": "Ornamental Stone. Light or dark blue with yellow flecks"
		},
		"malachite": {
			"name": "Malachite",
			"cost": 30,
			"weight": 0,
			"description": "Ornamental Stone. Striated light and dark green"
		},
		"moonstone": {
			"name": "Moonstone",
			"cost": 85,
			"weight": 0,
			"description": "Semi-Precious Stone. White with pale blue hue"
		},
		"mossagate": {
			"name": "Moss Agate",
			"cost": 20,
			"weight": 0,
			"description": "Ornamental Stone. Pink, yellow-white with gray-green moss-like markings"
		},
		"obsidian": {
			"name": "Obsidian",
			"cost": 40,
			"weight": 0,
			"description": "Ornamental Stone. Jet Black"
		},
		"opal": {
			"name": "Opal",
			"cost": 1000,
			"weight": 0,
			"description": "Jewel. Pale blue with green and gold mottling"
		},
		"onyx": {
			"name": "Onyx",
			"cost": 75,
			"weight": 0,
			"description": "Semi-Precious Stone. Black, white, or bands of both"
		},
		"pearl": {
			"name": "Pearl",
			"cost": 400,
			"weight": 0,
			"description": "Precious Stone. Pure white, rose, or black"
		},
		"peridot": {
			"name": "Peridot",
			"cost": 500,
			"weight": 0,
			"description": "Precious Stone. Olive Green"
		},
		"rhodochrosite": {
			"name": "Rhodocrosite",
			"cost": 25,
			"weight": 0,
			"description": "Ornamental Stone. Ligth pink"
		},
		"rockcrystal": {
			"name": "Rock Crystal",
			"cost": 90,
			"weight": 0,
			"description": "Semi-Precious Stone. Clear, transparent"
		},
		"ruby": {
			"name": "Ruby",
			"cost": 5000,
			"weight": 0,
			"description": "Jewel. Clear to deep crimson red"
		},
		"sapphire": {
			"name": "Sapphire",
			"cost": 1000,
			"weight": 0,
			"description": "Jewel. Clear to medium blue"
		},
		"sardonyx": {
			"name": "Sardonyx",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Bands of red and white"
		},
		"smokyquartz": {
			"name": "Smoky Quartz",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Light grey, yellow, brown or blue"
		},
		"spinel": {
			"name": "Spinel",
			"cost": 300,
			"weight": 0,
			"description": "Precious Stone. Red, red-brown, green or deep blue"
		},
		"starrosequartz": {
			"name": "Star Rose Quartz",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Smoky rose with white star centre"
		},
		"starruby": {
			"name": "Star Ruby",
			"cost": 10000,
			"weight": 0,
			"description": "Jewel. Translucent ruby with white star highlight"
		},
		"starsapphire": {
			"name": "Star Sapphire",
			"cost": 10000,
			"weight": 0,
			"description": "Jewel. Translucent sapphire with white star highlight"
		},
		"startopaz": {
			"name": "Star Topaz",
			"cost": 7000,
			"weight": 0,
			"description": "Jewel. Translucent Topaz with white star highlight"
		},
		"tigereyeagate": {
			"name": "Tiger Eye Agate",
			"cost": 25,
			"weight": 0,
			"description": "Ornamental Stone. Rich golden brown with dark striping"
		},
		"topaz": {
			"name": "Topaz",
			"cost": 500,
			"weight": 0,
			"description": "Precious Stone. Golden yellow"
		},
		"tourmaline": {
			"name": "Tourmaline",
			"cost": 100,
			"weight": 0,
			"description": "Precious Stone. Pale green, blue, brown, or red"
		},
		"turquoise": {
			"name": "Turquoise",
			"cost": 35,
			"weight": 0,
			"description": "Ornamental Stone. Aqua with darker mottling"
		},
		"zircon": {
			"name": "Zircon",
			"cost": 70,
			"weight": 0,
			"description": "Semi-Precious Stone. Clear pale aqua"
		}
	},
	"husbandry": {
		"animalfeed": {
			"name": "Animal Feed",
			"cost": 0.5,
			"weight": 2,
			"description": "Enough food for a single animal for one day"
		},
		"bardingheavy": {
			"name": "Barding (Heavy)",
			"cost": 150,
			"weight": 40,
			"description": "Armour for your mount. +2 AC, -2 Armour check penalty, -1 speed"
		},
		"bardinglight": {
			"name": "Barding (Light)",
			"cost": 75,
			"weight": 20,
			"description": "Armour for your mount. +1 AC"
		},
		"gauntlet": {
			"name": "Gauntlet",
			"cost": 10,
			"weight": 1,
			"description": "Allows raptor to rest on your arm"
		},
		"ridinggear": {
			"name": "Riding Gear",
			"cost": 15,
			"weight": 5,
			"description": "All the gear necessary for riding. Bit and Bridle, harness and saddle"
		}
	},
	"jewellery": {
		"amuletcommon": {
			"name": "Amulet (common)",
			"cost": 50,
			"weight": 0,
			"description": "Amulet made out of mundane materials"
		},
		"amuletmasterwork": {
			"name": "Amulet (masterwork)",
			"cost": 300,
			"weight": 0,
			"description": "Amulet made by a master craftsman, with intricate carvings and detail"
		},
		"amuletrich": {
			"name": "Amulet (rich)",
			"cost": 150,
			"weight": 0,
			"description": "Amulet made of precious materials"
		},
		"ankletcommon": {
			"name": "Anklet (common)",
			"cost": 5,
			"weight": 0,
			"description": "Anklet made out of mundane materials"
		},
		"ankletmasterwork": {
			"name": "Anklet (masterwork)",
			"cost": 150,
			"weight": 0,
			"description": "Anklet made by a master craftsman, with intricate carvings and detail"
		},
		"ankletrich": {
			"name": "Anklet (rich)",
			"cost": 50,
			"weight": 0,
			"description": "Anklet made of precious materials"
		},
		"braceletcommon": {
			"name": "Bracelet (common)",
			"cost": 2,
			"weight": 0,
			"description": "A bracelet made out of mundane materials"
		},
		"braceletmasterwork": {
			"name": "Bracelet (masterwork)",
			"cost": 100,
			"weight": 0,
			"description": "A bracelet made by a master craftsman, with intricate carvings and detail"
		},
		"braceletrich": {
			"name": "Bracelet (rich)",
			"cost": 25,
			"weight": 0,
			"description": "A bracelet made of precious materials"
		},
		"broochcommon": {
			"name": "Brooch (common)",
			"cost": 50,
			"weight": 0,
			"description": "Brooch made out of mundane materials"
		},
		"broochmasterwork": {
			"name": "Brooch (masterwork)",
			"cost": 300,
			"weight": 0,
			"description": "Brooch made by a master craftsman, with intricate carvings and detail"
		},
		"broochrich": {
			"name": "Brooch (rich)",
			"cost": 150,
			"weight": 0,
			"description": "Brooch made of precious materials"
		},
		"earringscommon": {
			"name": "Earrings (common)",
			"cost": 2,
			"weight": 0,
			"description": "A pair of earrings made out of mundane materials"
		},
		"earringsmasterwork": {
			"name": "Earrings (masterwork)",
			"cost": 80,
			"weight": 0,
			"description": "A pair of earrings made by a master craftsman, with intricate carvings and detail"
		},
		"earringsrich": {
			"name": "Earrings (rich)",
			"cost": 20,
			"weight": 0,
			"description": "A pair of earrings made of precious materials"
		},
		"hairpincommon": {
			"name": "Hairpin (common)",
			"cost": 1,
			"weight": 0,
			"description": "Hairpin made out of mundane materials"
		},
		"hairpinmasterwork": {
			"name": "Hairpin (masterwork)",
			"cost": 50,
			"weight": 0,
			"description": "Hairpin made by a master craftsman, with intricate carvings and detail"
		},
		"hairpinrich": {
			"name": "Hairpin (rich)",
			"cost": 20,
			"weight": 0,
			"description": "Hairpin made of precious materials"
		},
		"necklacecommon": {
			"name": "Necklace (common)",
			"cost": 5,
			"weight": 0,
			"description": "A necklace made out of mundane materials"
		},
		"necklacemasterwork": {
			"name": "Necklace (masterwork)",
			"cost": 150,
			"weight": 0,
			"description": "A necklace made by a master craftsman, with intricate carvings and detail"
		},
		"necklacerich": {
			"name": "Necklace (rich)",
			"cost": 50,
			"weight": 0,
			"description": "A necklace made of precious materials"
		},
		"ringcommon": {
			"name": "Ring (common)",
			"cost": 5,
			"weight": 0,
			"description": "Ring made out of mundane materials"
		},
		"ringmasterwork": {
			"name": "Rings (masterwork)",
			"cost": 120,
			"weight": 0,
			"description": "Rings made by a master craftsman, with intricate carvings and detail"
		},
		"ringrich": {
			"name": "Ring (rich)",
			"cost": 40,
			"weight": 0,
			"description": "Rings made of precious materials"
		},
		"ringsignet": {
			"name": "Ring (signet)",
			"cost": 5,
			"weight": 0,
			"description": "Rings specially made to seal wax on documents"
		}
	},
	"lodging": {
		"monthcommon": {
			"name": "Month (Common)",
			"cost": 10,
			"weight": 0,
			"description": "Little privacy, comfortable bedding"
		},
		"monthpoor": {
			"name": "Month (Poor)",
			"cost": 0.8,
			"weight": 0,
			"description": "No privacy or bedding"
		},
		"monthrich": {
			"name": "Month (Rich)",
			"cost": 30,
			"weight": 0,
			"description": "Lockable private room"
		},
		"nightcommon": {
			"name": "Night (Common)",
			"cost": 0.5,
			"weight": 0,
			"description": "Little privacy, comfortable bedding"
		},
		"nightpoor": {
			"name": "Night (Poor)",
			"cost": 0.05,
			"weight": 0,
			"description": "No privacy or bedding"
		},
		"nightrich": {
			"name": "Night (Rich)",
			"cost": 2,
			"weight": 0,
			"description": "Lockable private room"
		},
		"weekcommon": {
			"name": "Week (Common)",
			"cost": 3,
			"weight": 0,
			"description": "Little privacy, comfortable bedding"
		},
		"weekpoor": {
			"name": "Week (Poor)",
			"cost": 0.2,
			"weight": 0,
			"description": "No privacy or bedding"
		},
		"weekrich": {
			"name": "Week (Rich)",
			"cost": 10,
			"weight": 0,
			"description": "Lockable private room"
		}
	},
	"writing": {
		"bookparchement": {
			"name": "Book (Parchment)",
			"cost": 25,
			"weight": 1,
			"description": "Empty bound book with 128 pages of parchment"
		},
		"bookpaper": {
			"name": "Book (Paper)",
			"cost": 50,
			"weight": 1,
			"description": "Empty bound book with 128 pages of paper"
		},
		"bookvellum": {
			"name": "Book (Vellum)",
			"cost": 100,
			"weight": 1,
			"description": "Empty bound book with 128 pages of vellum"
		},
		"brush": {
			"name": "Brush",
			"cost": 1,
			"weight": 0,
			"description": "Paint brush"
		},
		"inkblack": {
			"name": "Ink (Black)",
			"cost": 8,
			"weight": 0,
			"description": "20 grams of black ink (in 1 vial)"
		},
		"inkcolour": {
			"name": "Ink (Colour)",
			"cost": 16,
			"weight": 0,
			"description": "20 grams of coloured ink (in 1 vial)"
		},
		"inkpen": {
			"name": "Inkpen",
			"cost": 0.1,
			"weight": 0,
			"description": "Pen suitable for writing"
		},
		"paint": {
			"name": "Oil based paint",
			"cost": 16,
			"weight": 1,
			"description": "Coloured paint"
		},
		"parchement": {
			"name": "Parchment (100 sheets)",
			"cost": 10,
			"weight": 1,
			"description": "100 sheets of low quality parchment"
		},
		"paper": {
			"name": "Paper (100 sheets)",
			"cost": 20,
			"weight": 1,
			"description": "100 pages of quality paper"
		},
		"sealingwax": {
			"name": "Sealing Wax",
			"cost": 1,
			"weight": 1,
			"description": "Sealing wax to seal scrolls and documents. Enough for multiple uses. Must be melted. Can be pressed with signet ring."
		},
		"stationary": {
			"name": "Stationary",
			"cost": 1,
			"weight": 0,
			"description": "1 sheet of fancy, embossed paper"
		},
		"vellum": {
			"name": "Vellum (100 sheets)",
			"cost": 50,
			"weight": 1,
			"description": "100 sheets of high quality vellum calf skin"
		}
	}
};