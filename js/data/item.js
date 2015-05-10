// Tech-Levels
// 0 - Basic (primitive tools and resources)
// 1 - Village (some basic conversion of resources into industrial goods)
// 2 - Town (converts resources and industrial goods into basic products)
// 3 - Large Town (significant trade hub, with specialised industry)
// 4 - City (multiple specialised industries, and major trade hub)
// 5 - Large City (Access to most technology and magic)
// 6 - Metropolis (Most advanced technology/magic available)
//
// Rarity
// 0 - Basic
// 1 - Common
// 2 - Uncommon
// 3 - Rare
// 4 - Very Rare
// 5 - Legendary
//
// name, price, weight, tech, rarity, description, category
if ($.isEmptyObject(Saver.load("items"))) {
	var items = {
			"Longsword": {
				"name": "Longsword",
				"price": 1500,
				"weight": 1.5,
				"tech": 2,
				"rarity": 1,
				"description": "A longsword will deal 1d8 slashing damage (1d10 if it is wielded with two hands)",
				"category": "Military Melee Weapons"
			},
			"Battleaxe": {
				"name": "Battleaxe",
				"price": 1000,
				"weight": 2,
				"tech": 2,
				"rarity": 1,
				"description": "A battleaxe will deal 1d8 slashing damage (1d10 if it is wielded with two hands)",
				"category": "Military Melee Weapons"
			},
			"Flail": {
				"name": "Flail",
				"price": 1000,
				"weight": 1,
				"tech": 2,
				"rarity": 2,
				"description": "A flail will deal 1d8 bludgeoning damage",
				"category": "Military Melee Weapons"
			},
			"Glaive": {
				"name": "Glaive",
				"price": 2000,
				"weight": 3,
				"tech": 2,
				"rarity": 2,
				"description": "A heavy two-handed pole-arm with a blade on one end and a reach of 10ft/3m. It deals 1d10 slashing damage.",
				"category": "Military Melee Weapons"
			},
			"Greataxe": {
				"name": "Greataxe",
				"price": 3000,
				"weight": 3.5,
				"tech": 3,
				"rarity": 2,
				"description": "A heavy two-handed axe that deals 1d12 slashing damage",
				"category": "Military Melee Weapons"
			},
			"Greatsword": {
				"name": "Greatsword",
				"price": 5000,
				"weight": 3,
				"tech": 3,
				"rarity": 2,
				"description": "A heavy two-handed sword that deals 2d6 slashing damage",
				"category": "Military Melee Weapons"
			},
			"Halberd": {
				"name": "Halberd",
				"price": 2000,
				"weight": 3,
				"tech": 2,
				"rarity": 2,
				"description": "A heavy two-handed pole-arm with an axe on one end and a reach of 10ft/3m. It deals 1d10 slashing damage.",
				"category": "Military Melee Weapons"
			},
			"Lance": {
				"name": "Lance",
				"price": 1000,
				"weight": 3,
				"tech": 2,
				"rarity": 2,
				"description": "A special pole-arm usually used while on horseback. It deals 1d12 piercing damage.",
				"category": "Military Melee Weapons"
			},
			"Maul": {
				"name": "Maul",
				"price": 1000,
				"weight": 5,
				"tech": 2,
				"rarity": 1,
				"description": "A heavy, two-handed hammer that deals 2d6 bludgeoning damage",
				"category": "Military Melee Weapons"
			},
			"Morningstar": {
				"name": "Morningstar",
				"price": 1500,
				"weight": 2,
				"tech": 2,
				"rarity": 1,
				"description": "A morning-star deals 1d8 piercing damage",
				"category": "Military Melee Weapons"
			},
			"Pike": {
				"name": "Pike",
				"price": 500,
				"weight": 9,
				"tech": 2,
				"rarity": 2,
				"description": "A heavy two-handed spear with a reach of 10ft/3m. It deals 1d10 piercing damage",
				"category": "Military Melee Weapons"
			},
			"Rapier": {
				"name": "Rapier",
				"price": 2500,
				"weight": 1,
				"tech": 2,
				"rarity": 2,
				"description": "A weapon of finesse that deals 1d8 piercing damage",
				"category": "Military Melee Weapons"
			},
			"Scimitar": {
				"name": "Scimitar",
				"price": 2500,
				"weight": 1.5,
				"tech": 2,
				"rarity": 2,
				"description": "A light and curved weapon of finesse that deals 1d6 slashing damage",
				"category": "Military Melee Weapons"
			},
			"Shortsword": {
				"name": "Shortsword",
				"price": 1000,
				"weight": 1,
				"tech": 2,
				"rarity": 1,
				"description": "A light weapon of finesse that deals 1d6 slashing damage",
				"category": "Military Melee Weapons"
			},
			"Trident": {
				"name": "Trident",
				"price": 500,
				"weight": 2,
				"tech": 2,
				"rarity": 2,
				"description": "A three-pronged spear that deals 1d6 piercing damage (1d8 when wielded with two-hands) and can be thrown up to 20/60ft (6/18m)",
				"category": "Military Melee Weapons"
			},
			"War pick": {
				"name": "War pick",
				"price": 500,
				"weight": 1,
				"tech": 2,
				"rarity": 1,
				"description": "A war pick deals 1d8 piercing damage",
				"category": "Military Melee Weapons"
			},
			"Warhammer": {
				"name": "Warhammer",
				"price": 1500,
				"weight": 1,
				"tech": 2,
				"rarity": 1,
				"description": "A warhammer deals 1d8 bludgeoning damage (1d10 when wielded with two hands)",
				"category": "Military Melee Weapons"
			},
			"Whip": {
				"name": "Whip",
				"price": 200,
				"weight": 1.5,
				"tech": 2,
				"rarity": 1,
				"description": "A whip is a finesse weapon that deals 1d4 slashing damage up to a range of 10ft(3m)",
				"category": "Military Melee Weapons"
			},
			"Club": {
				"name": "Club",
				"price": 10,
				"weight": 1,
				"tech": 0,
				"rarity": 0,
				"description": "A light weapon that deals 1d4 bludgeoning damage",
				"category": "Simple Melee Weapons"
			},
			"Dagger": {
				"name": "Dagger",
				"price": 200,
				"weight": 0.5,
				"tech": 1,
				"rarity": 1,
				"description": "A light finesse weapon that deals 1d4 bludgeoning damage and can be thrown up to 20/60ft (6/18m)",
				"category": "Simple Melee Weapons"
			},
			"Greatclub": {
				"name": "Greatclub",
				"price": 20,
				"weight": 5,
				"tech": 1,
				"rarity": 1,
				"description": "A two-handed club that deals 1d8 bludgeoning damage",
				"category": "Simple Melee Weapons"
			},
			"Handaxe": {
				"name": "Handaxe",
				"price": 500,
				"weight": 1,
				"tech": 1,
				"rarity": 1,
				"description": "A light weapon that deals 1d6 slashing damage and can be thrown up to 20/60ft (6/18m)",
				"category": "Simple Melee Weapons"
			},
			"Javelin": {
				"name": "Javelin",
				"price": 50,
				"weight": 1,
				"tech": 2,
				"rarity": 1,
				"description": "A weapon that deals 1d6 piercing damage and can be thrown up to 30/120ft (9/36m)",
				"category": "Simple Melee Weapons"
			},
			"Light hammer": {
				"name": "Light hammer",
				"price": 200,
				"weight": 1,
				"tech": 1,
				"rarity": 1,
				"description": "A light weapon that deals 1d4 bludgeoning damage and can be thrown up to 20/60ft (6/18m)",
				"category": "Simple Melee Weapons"
			},
			"Mace": {
				"name": "Mace",
				"price": 500,
				"weight": 2,
				"tech": 2,
				"rarity": 1,
				"description": "A weapong that deals 1d6 bludgeoning damage",
				"category": "Simple Melee Weapons"
			},
			"Quarterstaff": {
				"name": "Quarterstaff",
				"price": 20,
				"weight": 2,
				"tech": 0,
				"rarity": 0,
				"description": "A staff that deals 1d6 bludgeoning damage (1d8 when wielded with two hands)",
				"category": "Simple Melee Weapons"
			},
			"Sickle": {
				"name": "Sickle",
				"price": 100,
				"weight": 1,
				"tech": 1,
				"rarity": 1,
				"description": "A light weapon that deals 1d4 slashing damage",
				"category": "Simple Melee Weapons"
			},
			"Spear": {
				"name": "Spear",
				"price": 100,
				"weight": 1.5,
				"tech": 1,
				"rarity": 1,
				"description": "A weapon that deals 1d6 piercing damage (1d8 when wielded with two hands) and can be thrown up to 20/60ft (6/18m)",
				"category": "Simple Melee Weapons"
			}
		};
	var stock = [];
	for (var l in items) {
		stock.push(Item.fromJSON(items[l]));
	}
	for (var i = 0; i < stock.length; i++) {
		Saver.save("items", stock[i].name, stock[i]);
	}
}
