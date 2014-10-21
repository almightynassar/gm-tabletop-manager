var Background = {
		"amnesiac": {
			"name": "Amnesiac",
			"description": "One day you woke up somewhere unfamiliar, with no recollection of your past. No one around you seemed to have any idea who your were, either. So you have read history books, investigated leads, adventured and searched for clues about your past in the hope that you may discover your true past... that is, if you even want to know....",
			"skills": ["Diplomacy","History"],
			"trait": "Faint memories - Occassionally your amnesia clears and you remember some specific knowledge, lore or something else related your past. Choose a knowledge field and write it down. Once per day, if you fail a knowledge/intelligence check related to that field you can re-roll that check with a +2 bonus",
			"equipment" : {
				"trinket": "A trinket from your past",
				"clothes": "A set of commoner clothes",
				"gold": "5 GP"
			}
		},
		"artisan": {
			"name": "Artisan",
			"description": "You apprenticed under a blacksmith, brewer, jeweler, potter, carpenter, goldsmith or bowyer. Eventually you mastered your trade.",
			"skills": ["Diplomacy","Streetwise"],
			"trait": "Guild Membership - You are a member of a guild that is connected to your craft. Fellow members of the guild will provide you lodging and food. Guilds weild political power, and may support you. You must pay 5 GP per month to the guild, and make up backpayments on any dues missed.",
			"equipment": {
				"tools": "The tools of your trade",
				"mirror": "A small steel mirror",
				"masterwork": "Autographed masterwork of well-known artisan (approriate to your craft)",
				"clothes": "Common clothes",
				"gold": "39 GP and 5 SP"
			}
		},
		"bountyhunter": {
			"name": "Bounty Hunter",
			"description": "Your past was spent tracking down and capturing fugitives, outlaws and criminals for the bounty placed on their heads. You may have worked on the frontier or in the underworld of cities.",
			"skills": ["Perception","Streetwise"],
			"trait": "Bounty Board - When you are in an area of civilisation, you can find information about fugitives and bounties. You can also secure legal authority to hunt down and capture or kill outlaws. It easy for you to make contacts in the town watch or guard",
			"equipment": {
				"posters": "A collection of Wanted broadsheets",
				"manacles": "Two sets of iron manacles",
				"rope": "50 feet (15m) of rope",
				"clothes": "Commoner clothing",
				"hair": "A lock of hair from previous or current bounty",
				"gold": "35 GP and 5 SP"
			}
		},
		"charlatan": {
			"name": "Charlatan",
			"description": "Your past was spent pulling off heists, swindles, deceptions and peddling fake goods. You talked your way out of almost every bad situation, and know just what to say for what you want to seek.",
			"skills": ["Bluff","Streetwise"],
			"trait": "False Identity - You have an established second identity with documentation, acquaintences, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters if you have examples/copy of the document you wish to forge",
			"equipment": {
				"disguise": "A kit of equipment for changing your identity (i.e. make-up)",
				"vials": "Ten stoppered vials of colored water",
				"dice": "A set of weighted dice",
				"cards": "Playing cards",
				"clothes": "Two sets of clothing; one commoner, one noble",
				"ring": "A signet ring for an imaginary duke",
				"gold": "29 GP and 5 SP"
			}
		},
		"commoner": {
			"name": "Commoner",
			"description": "You came from humble stock. You were a serf, laborer, servent, sheperd, or fisher.",
			"skills": ["Endurance","Streetwise"],
			"trait": "Blend in - You can fit among commoners with ease. You can find a place to hide, rest or recuperate among commoners, unless you have shown yourself to be danger to them. They will shield you from the law or anyone else searching for you, but will not risk their lives.",
			"equipment": {
				"tools": "The tools of your trade",
				"pot": "An iron pot",
				"spade": "An iron spade",
				"clothes": "Common clothes",
				"gold": "14 GP and 4 SP"
			}
		},
		"courtesan": {
			"name": "Courtesan",
			"description": "The polite term for a prostitute, you spent your past providing 'services' for those who could afford to pay. This does not necessarily mean only sex; you also provided companionship, comfort and company. Your work required you to be an outgoing personality and a charming conversationalist.",
			"skills": ["Diplomacy","Streetwise"],
			"trait": "Bedroom Secrets - You have up to 2d4 former clients who are of importance and friendly to you. You also have secret information on one of them. You also have a madam, who can work for or gain secrets or rumours from.",
			"equipment": {
				"disguise": "A kit of equipment for changing your identity (i.e. make-up)",
				"necklace": "Necklace worth 50 GP",
				"clothes": "Three sets of clothing; one fine, one travelling and one nightclothes (sexy)",
				"gems": "3 small gems worth 10 GP each",
				"gold": "200 GP"
			}
		},
		"diplomat": {
			"name": "Diplomat",
			"description": "You spent your life negotiating deals for merchants, treaties for lords and even sometimes arguing for the life of criminals in the courts. Your knowledge about philosophy and the mundane world is extensive so that it can fuel your withering diatribes.",
			"skills": ["Diplomacy","Insight"],
			"trait": "Diplomatic envoy - When facing an intelligent or relatable opposition, you are given a chance to negotiate with them. When in large towns, you are can request an audience with a council or leader and are able try to sway them to support your cause, or give your cause legal authority. You also have a patron, who can sometimes lend aide or provide work.",
			"equipment": {
				"scribing": "A kit of equipment for writing letters (i.e. quills and paper)",
				"letters": "A collection of important letters, missives and communiques",
				"book": "A book of law",
				"clothes": "Two sets of clothing; one fine, one travelling",
				"gold": "65 GP"
			}
		},
		"farmer": {
			"name": "Farmer",
			"description": "You worked the land for most of your life. You raised livestock, tended crops and worked from dawn to dusk.",
			"skills": ["Endurance","Nature"],
			"trait": "Farmhand - When you are not adventuring, you can work on a farm. You get free accomodation and food for the work, and the farmer will give you enough food for your party to last for 10 days.",
			"equipment": {
				"pot": "An iron pot",
				"rope": "50 ft (15 m) of hempen rope",
				"goods": "2 GP worth of trade goods",
				"clothes": "Common clothes",
				"beltpouch": "A belt pouch to hold valuables",
				"gold": "10 GP"
			}
		},
		"graduate": {
			"name": "Graduate",
			"description": "You managed to afford to study at an academy, and your classmates were the sons and daughters of the powerful. While the skills your learned will stand you in good stead, it is the friendships you formed that may be the most worthwhile gift.",
			"skills": ["Insight","History"],
			"trait": "Alumni - In any large town or hall of power you will be able to find a fellow alumnus who will be at least willing to listen to whatever you propose. They are under no obligation to help you, but may at least get your foot in the door. If they are wealthy they will be happy to host you and your party for a few days. Some Alumni may approach you to ask for favours. You are not obliged to help, but word may spread along the network",
			"equipment": {
				"diploma": "A diploma scroll in a case",
				"book": "A textbook with notes scribbled in the margins",
				"clothes": "Two sets of clothing; one fine, one scholarly robes",
				"ring": "A ring with your academy's crest on it",
				"gold": "30 GP"
			}
		},
		"guide": {
			"name": "Guide",
			"description": "You have spent a lifetime guiding the city-folk through the wilds along rare and unused tracks, and you are adept at tracking down things useful for survival. You prefer to be in the wild, away from the hustle and bustle.",
			"skills": ["Perception","Nature"],
			"trait": "Wanderer - You have an excellent memory for maps and geography and can always recall the general layout of terrain, settlements, and other features around you. In addition, you can always find food and fresh water for yourself and up to five other people each day (provided the terrain offers suitable berries, small game, water, etc)",
			"equipment": {
				"bedroll": "A bedroll suitable sleeping on the road",
				"rope": "500 feet (15 m) of hempen rope",
				"tent": "A tent suitable for 1 person",
				"waterskin": "For holding a few days worth of water",
				"blanket": "Blanket suitable for winter",
				"clothes": "Travellers clothes",
				"backpack": "A backpack for holding your stuff",
				"gold": "40 GP and 8 SP"
			}
		},
		"guildthief": {
			"name": "Guild Thief",
			"description": "You made your living by stealing as a member of a thieves' guild. The work of the guild ranges from extortion, blackmail, murder and thievery. The guild does protect it's members, but it requires absolute loyalty.",
			"skills": ["Stealth","Thievery"],
			"trait": "Thieves' Cant - You know the secret language known by all guild thieves. It is a combination of jargon and secret signs known to the underworld. You can interpret and communicate in this secret language",
			"equipment": {
				"thieves": "A kit of thieves tools (i.e. lockpicks)",
				"oil": "A can of lamp oil",
				"mirror": "A small steel mirror",
				"beltpouch": "For holding coins and other small items",
				"clothes": "Breeches with a secret pocket",
				"gold": "28 GP and 4 SP"
			}
		},
		"harvester": {
			"name": "Harvester",
			"description": "You were a lumberjack, miner, trapper or hunter. You bring back the bounties of nature to civilisation. This is hard work, which has shaped you.",
			"skills": ["Athletics","Nature"],
			"trait": "Labourer's Bond - You can easily make contacts with all harvesters (people who work on the fringes of nature). They will gladly give you lodging and food in return for work, and they will freely tell you of their worries or rumours of their places of work.",
			"equipment": {
				"tools": "The tools of your trade",
				"rope": "50 ft (15m) of hempen rope",
				"knife": "A work knife",
				"spade": "An iron spade",
				"clothes": "Common clothes",
				"gold": "10 GP and 4 SP"
			}
		},
		"healer": {
			"name": "Healer",
			"description": "You life has been spent healing via natural methods the cuts, bruises, ailments and other conditions for people. While you also use magical methods of healing you are adept with surgical techniques, herbology, medical alchemy and diagnosis. Some of this knowledge can also be applied to various other creatures.",
			"skills": ["Heal","Nature"],
			"trait": "Medical ethics - When you are in a civilised setting, you and your allies are provided with free medical care and beds provided that they are sick. This is a professional courtesy from others in your field. You also get a bonuses when negotiating prices for medical equipment. In downtime, you can work to earn an income for a comfortable lifestyle.",
			"equipment": {
				"herbalism": "A kit full of herbalism equipment",
				"surgeon": "A surgeons or doctors kit",
				"clothes": "Travellers clothes",
				"anamoly": "A preserved medical anomaly (such as a deformed skull)",
				"gold": "15 GP"
			}
		},
		"jester": {
			"name": "Jester",
			"description": "You were employed as a jester by a noble. It was you job to perform acrobatic stunts, tell jokes and stories, and provide entertainment for your employer and their guests.",
			"skills": ["Acrobatics","Diplomacy"],
			"trait": "Licensed Fool - You enjoy the rare privilege of speaking your mind with little concern for repurcussions. As a jester, it is your duty to use comedy to point out the absurdities of the world. You can criticise through humour without offense. In addition, you can gain access to nobles in order to perform in return for a meal, place to stay or payment.",
			"equipment": {
				"motley": "A kit of equipment for a jester (dress, juggling balls etc)",
				"scepter": "A tin scepter",
				"instrument": "A musical instrument of your choice",
				"book": "Book of bawdy poems and jokes",
				"clothes": "Travellers clothes",
				"gold": "38 GP"
			}
		},
		"knight": {
			"name": "Knight",
			"description": "You served your training years as a squire and earned your knighthood. Your title carries many responsibilities, and you are expected to behave in a chivalrous manner, protect the innocent, and mete out justice.",
			"skills": ["Diplomacy","Endurance"],
			"trait": "Knight's Station - When you are among nobility or some other group that would recognise your knighthood, you can expect to receive free accomodation and food for yourself and your adventuring companions for the duration of your stay. Commoners will treat you with deference. You may also have a patron of a noble house.",
			"equipment": {
				"lance": "A lance weapon",
				"warhouse": "A light warhorse with saddle and bridle",
				"grooming": "Grooming kit for horses",
				"feed": "Feed for seven days",
				"affection": "A token of affection from a nobleperson",
				"clothes": "Travellers clothes",
				"ring": "A signet ring",
				"gold": "32 GP and 5 SP"
			}
		},
		"merchant": {
			"name": "Merchant",
			"description": "You have sold goods for profit all your life. You know the value of things, and how to get the most out of your money.",
			"skills": ["Bluff", "Insight"],
			"trait": "Appraisal - You know the approximate value of mundane items and gems. You also know one trade contact in each large town or city.",
			"equipment": {
				"scribing": "Ink, ink pen and paper (ten sheets)",
				"clothes": "Two sets of clothes; travelling clothes and fine clothes",
				"beltpouch": "For holding valuables",
				"gems": "Three gems worth 10 GP each",
				"gold": "30 GP"
			}
		},
		"minstrel": {
			"name": "Minstrel",
			"description": "You wandered the land performing music, telling tales and entertaining audiences ranging from the common to the noble. People value you not only for your entertainment, but also because you bring news and rumours from faraway lands",
			"skills": ["Diplomacy","Streetwise"],
			"trait": "Noted Performer - You can always find a place to perform. At an inn or tavern you will be granted free lodging and food as long as you perform each night. In addition, your performances make you a local figure and people will typically take a liking to you",
			"equipment": {
				"instrument": "A musical instrument of your choice",
				"paper": "5 sheets",
				"clothes": "Two sets of clothing; Fine and Travellers clothes",
				"ink": "For writing",
				"gold": "27 GP"
			}
		},
		"noble": {
			"name": "Noble",
			"description": "You carry a noble title approriate to the realm you come from. You weild wealth, power and influence.",
			"skills": ["Intimidate","Insight"],
			"trait": "Retainers - You are a member of a noble family and have the service of three retainers loyal to your family. These retainers can be squires, attendants, messangers, or a major-domo. You retainers can perform mundane tasks for you, but they do not fight for you and will leave if they are frequently endangered or abused",
			"equipment": {
				"grooming": "Grooming kit for horses",
				"horse": "Riding horse with saddle and bridle",
				"scroll": "A scroll of pedigree",
				"wax": "Sealing wax",
				"clothes": "Fine clothes",
				"ring": "A signet ring",
				"feed": "Feed for seven days",
				"gold": "29 GP and 5 SP"
			}
		},
		"priest": {
			"name": "Priest",
			"description": "You have pledged your life to a God. You dedicate your life to serve as a intermediary between your chosen power and the mortal world.",
			"skills": ["Insight","Religion"],
			"trait": "Temple Service - You have residence at any temple of your God. You can perform rites and sermons there. While near the temple, you can call upon acolytes and fellow priests for assistance, provided it is not hazardous. Additionally, you receive free healing and care from other temples that are aligned with your faith.",
			"equipment": {
				"symbol": "A holy symbol",
				"flask": "A flask of holy water",
				"scribing": "Ink, ink pen and paper (ten sheets)",
				"clothes": "Religious vestments suitable for performing rites",
				"gold": "3 GP and 9 SP"
			}
		},
		"sage": {
			"name": "Sage",
			"description": "You spent many years learning the lore of the world. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interested you. You have made great efforts to be a true master in your field.",
			"skills": ["History","Insight"],
			"trait": "Researcher - When you attempt to learn or recall a piece of lore, if you do not know that information then you often know where you can obtain it. Usually in a library, scriptorium, university, or another sage.",
			"equipment": {
				"oddity": "An odd mundane artefact (carving, fossil, etc)",
				"book": "Related to your chosen field of study",
				"scribing": "Ink, ink pen and paper (ten sheets)",
				"clothes": "Scholar Robes",
				"candles": "Ten candles",
				"gold": "12 GP and 8 SP"
			}
		},
		"slave": {
			"name": "Slave",
			"description": "You were sold into bondage, forced to work for masters. Your life is one of hard labour, suffering and hardship.",
			"skills": ["Endurance","Insight"],
			"trait": "Former Slave - You are marked with a brand that denotes you were property. Hard labour does not bother you, and you endure it with silent stoicism. Other slaves, runaways, criminals or servants will provide you with reliable information on the nearby area and the location of safe hiding places, sources of food and water and how to avoid local authorities.",
			"equipment": {
				"quaterstaff": "A quarterstaff",
				"backpack": "Backpack",
				"clothes": "Traveller's clothes"
			}
		},
		"soldier": {
			"name": "Soldier",
			"description": "You were trained in military skills and battle. You studied weapons of war and armour, basic survival techniques, and how to stay alive in combat. You were part of a larger military force and have discipline drummed into you",
			"skills": ["Athletics","Intimidate"],
			"trait": "Military Rank - You have a military rank. Soldiers loyal to your former military organisation still recognise your authority and influence, and will defer to you if of lower rank. You can invoke rank to exert influence over other soldiers. You can access friendly military encampments and fortresses where your rank is recognised.",
			"equipment": {
				"charm": "A lucky charm",
				"souvenir": "A souvenir from a former military campaign",
				"insignia": "A symbol of your rank",
				"dice": "Bone dice",
				"clothes": "Travellers clothes",
				"gold": "40 GP"
			}
		},
		"spy": {
			"name": "Spy",
			"description": "You deal in secrets and shadows, and revel in learning information that others wish to keep secret. You collected rumours, whispers, stories and evidence.",
			"skills": ["Acrobatics","Stealth"],
			"trait": "Contact - You have a contact who acts as your liason to a network of other spies. You know how to communicate with your contact over great distances and can exchange information",
			"equipment": {
				"disguise": "A kit of equipment for changing your identity (i.e. make-up)",
				"satchel": "A satchel with a secret compartment",
				"scribing": "Ink, ink pen and paper (ten sheets)",
				"clothes": "Travellers clothes",
				"mirror": "A small steel mirror",
				"gold": "6 GP and 9 SP"
			}
		},
		"thug": {
			"name": "Thug",
			"description": "You spent years being a street tough, bullying those around you to get your way. You broke knees, arms and faces. Your skills have earned you work with less-than-reputable organisations.",
			"skills": ["Intimidate","Perception"],
			"trait": "Bad Reputation - No matter where you go, people are afraid of you due to your criminal connections. When you are in civilisation, you can get away with minor criminal offences such as refusing to pay food or breaking doors since most people will not report your activity to the authorities",
			"equipment": {
				"club": "A wooden club",
				"clothes": "Common clothes",
				"gold": "28 GP and 4 SP"
			}
		}
};