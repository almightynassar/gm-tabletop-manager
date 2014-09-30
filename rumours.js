/**
 * Arrays of useful names
 */
if (Names && Form && Dice && Markov) {
	var Rumours = new function () {
		Markov.generate(Names.human(false));
		var classes = Form().classes();
		var races = Form().races();
		var nations = ['Kelerak', 'Kale', 'Zeland', 'Orland', 'Farland', 'Dale', 'Wawmar', 'Kale Mountains', 'Northern Teeth', 'Grand Peaks', 'Black Wood', 'Wilder Wood', 'Green Copse', 'Eagle Woods', 'Green Plains (West)', 'Cold Lands (North)', 'Deadlands', 'Nameless City', 'Orc Lands (East)', 'Sea Lands (South)'];
		var locations = ["Dessingrove", "Waleron", "West-of-Sky", "Dragonspur", "Ackton", "Newtown", "Beacon Hill", 'Kale City', 'Deaton'];
		var direction = ["North", "North-West", "North-East", "South", "South-West", "South-East", "West", "East"];
		var colour = ['red', 'black', 'blue', 'green', 'copper', 'yellow', 'white', 'silver', 'gold', 'bronze'];
		var effect = ['heals all injuries', 'restore powers', 'grant temporary powers', 'grant giant strength', 'grant keen perception', 'improve your initiative', 'improve your intelligence', 'improve your wisdom', 'improve your charisma', 'poison your body', 'cause diesease'];
		return {
			tavern: function () {
				var rumour = "";
				var gossip = Dice.d2() > 1 ? " (true)" : " (false)";
				switch(Dice.dice(50,1)) {
				case 1:
					rumour = Markov.make(1,5) + " died from some mysterious disease";
					break;
				case 2:
					rumour = "A stranger has been spotted lurking to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 3:
					rumour = "A group of " + classes[Dice.dice(classes.length - 1, 1)] + "s has found " + Dice.d100(Dice.d100(1)) + " gold to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 4:
					rumour = Markov.make(1,5) + " has inherited " + Dice.d100(Dice.d100(1)) + " GP!";
					break;
				case 5:
					rumour = Markov.make(1,5) + " owes " + Markov.make(1,5) + " " + Dice.d100(Dice.d100(1)) + " GP!";
					break;
				case 6:
					rumour = Markov.make(1,5) + " is suffering from a dreadful curse";
					break;
				case 7:
					rumour = "The " + classes[Dice.dice(classes.length - 1, 1)] + "'s daughter is pregnant with " + Markov.make(1,5) + "'s child!";
					break;
				case 8:
					rumour = "A " + classes[Dice.dice(classes.length - 1, 1)] + " was found dead to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 9:
					rumour = Markov.make(1,5) + " has disappeared and their son has been spending a lot of coin on clothes and women";
					break;
				case 10:
					rumour = nations[Dice.dice(nations.length - 1, 1)] + " was caught spying on the citizens of " + nations[Dice.dice(nations.length - 1, 1)];
					break;
				case 11:
					rumour = "A war will probably break out between the " + races[Dice.dice(races.length - 1, 1)] + " and the " + races[Dice.dice(races.length - 1, 1)];
					break;
				case 12:
					rumour = "A secret cult has started up in " + locations[Dice.dice(locations.length - 1, 1)];
					break;
				case 13:
					rumour = "A secret lair is hidden to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 14:
					rumour = "Rare " + colour[Dice.dice(colour.length -1, 1)] + " flowers to the " + direction[Dice.dice(direction.length - 1, 1)] + " are said to " + effect[Dice.dice(effect.length - 1, 1)] + " when eaten";
					break;
				case 15:
					rumour = "A " + colour[Dice.dice(colour.length - 1, 1)] + " dragon was seen to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 16:
					rumour = Markov.make(1,5) + " has inherited a magical item that " + effect[Dice.dice(effect.length - 1, 1)];
					break;
				case 17:
					rumour = Markov.make(1,5) + ", an ancient warrior, travelled to the " + direction[Dice.dice(direction.length - 1, 1)] + " in search of treasure, but never returned";
					break;
				case 18:
					rumour = Markov.make(1,5) + ", a " + classes[Dice.dice(classes.length - 1, 1)] + ", is in debt and is charging double";
					break;
				case 19:
					rumour = Markov.make(1,5) + " was arrested for poisoning his wife. He still maintains his innocence.";
					break;
				case 20:
					rumour = Markov.make(1,5) + " stole a stack of important documents from the tax office, and is now hiding to the " + direction[Dice.dice(direction.length - 1, 1)];
					break;
				case 21:
					rumour ="Legend has it that if you wait outside " + locations[Dice.dice(locations.length - 1, 1)] + " to the " + direction[Dice.dice(direction.length - 1, 1)] + " during the twin full moons, you will be visited by the ghost of " + Markov.make(1,5) + " who will " + effect[Dice.dice(effect.length - 1, 1)];
					break;
				case 22:
					rumour = "A secret cult seeks to destory " + nations[Dice.dice(nations.length - 1, 1)];
					break;
				case 23:
					rumour = "A secret cult seeks to elimate every " + races[Dice.dice(races.length - 1, 1)] + "in the region";
					break;
				case 24:
					rumour = "Slavers from the " + direction[Dice.dice(direction.length - 1, 1)] + " are capturing any " + races[Dice.dice(races.length - 1, 1)] + " they come across";
					break;
				case 25:
					rumour = Markov.make(1,5) + " is hiding a cursed weapon";
					break;
				case 26:
					rumour = Markov.make(1,5) + " has a gambling problem, and has run up a debt of " + Dice.d100(Dice.d100(1)) + " GP!";
					break;
				case 27:
					rumour = Markov.make(1,5) + " apparently is in trouble with the thieves guild, and needs to pay them " + Dice.d100(Dice.d100(1)) + " GP!";
					break;
				case 28:
					rumour = Markov.make(1,5) + " has an issue with the law, and is apparently willing to pay " + Dice.d100(Dice.d100(1)) + " GP to solve it";
					break;
				case 29:
					rumour = Markov.make(1,5) + " wishes to investigate the ruins to the " + direction[Dice.dice(direction.length - 1, 1)] + ", and is apparently willing to pay " + Dice.d100(Dice.d100(1)) + " GP to each adventurer who travels with them";
					break;
				case 30:
					rumour = "A " + classes[Dice.dice(classes.length - 1, 1)] + " is being haunted by the ghost of his mentor";
					break;
				case 31:
					rumour = "To the " + direction[Dice.dice(direction.length - 1, 1)] + " is a " + colour[Dice.dice(colour.length - 1, 1)] + " that is guarding a horde worth at least " + Dice.d100(Dice.d100(2)) + " GP";
					break;
				case 32:
					rumour = "To watch in " + locations[Dice.dice(locations.length - 1, 1)] + " are imprisoning every " + races[Dice.dice(races.length - 1, 1)] + " that enter";
					break;
				case 33:
					rumour = "Officials in " + locations[Dice.dice(locations.length - 1, 1)] + " are setting a tax of " + Dice.d100(Dice.d4(2)) + " GP for outsiders to enter";
					break;
				case 34:
					rumour = "Officials are setting a tax of " + Dice.d10(Dice.d2(2)) + " on all magical goods bought or sold! What a rip-off!";
					break;
				case 35:
					rumour = Markov.make(1,5) + " has an intense hatred for every " + races[Dice.dice(races.length - 1, 1)] + " that they see";
					break;
				default:
					rumour = "The " + classes[Dice.dice(classes.length - 1, 1)] + " was arrested, but no one knows why!";
					break;
				}
				return rumour + gossip;
			},
			military: function () {
				return 0;
			}
		};
	};
}