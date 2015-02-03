/**
 * Creates randomly generated rumours
 */
// Makes sure these objects are initialised
if (Dice && Markov && Name) {
	var Rumours = new function () {
		// Loads the human male names by default
		Markov.load(Name.human.male);
		// Some pre-gen arrays to use
		var direction = ['North','North-West','North-East','South','South-West','South-East','West','East'];
		var colour = ['red','blue','green','yellow','purple','orange','white','black','grey','brown','violet','crimson','pink','aqua','maroon','beige'];
		var urban = ['capital','city','town','village','hamlet','manor','farm','estate','castle','fortress','citadel','harbour','temple'];
		var rural = ['forest','jungle','plains','mountains','hills','beach','bay','river','lake','savanah','grassland','woodland','copse','desert','cavern','cave'];
		var profession = ['noble','aristocrat','doctor','craftsman','labourer','beggar','thief','dockhand','sailor','blacksmith','innkeep','merchant','banker','farmer','peasant','slave','servant','clergyman','priest','teacher','miller','mason','tailor','falconer','squire','knight','butcher','carpenter','plowman','fishmonger','baker','weaver','cooper','cartwright','brewer'];
		var monster = ['aberation','pack of animals','group of bandits','banshee','basilisk','tribe of barbarians','group of creatures','group of cultists','cyclops','dragon','elemental','gargoyle','ghost','ghoul','giant','gnoll','goblin','golem','kobold','manticore','minotaur','necromancer','ogre','orc','owlbear','poacher','skeleton','pack of stirges','thug','troll','undead','vampire','warband','werewolf','wight','pack of wolves'];
		// Generate a random name
		function name() {
			var result = Markov.make(1,Dice.dice(6)+3);
			return result.charAt(0).toUpperCase() + result.slice(1);
		}
		// Monster-specific rumours
		function beast() {
			switch (Dice.dice(9,1)) {
			case 1:
				return "A " + monster[Dice.dice(monster.length - 1, 1)] + " has been troubling a nearby " + urban[Dice.dice(urban.length - 1, 1)];
				break;
			case 2:
				return "A wizard is apparently trying to tame a " + monster[Dice.dice(monster.length - 1, 1)];
				break;
			case 3:
				return "A " + monster[Dice.dice(monster.length - 1, 1)] + " has made their home in the nearby " + rural[Dice.dice(rural.length - 1, 1)];
				break;
			case 4:
				return "A " + profession[Dice.dice(profession.length - 1, 1)] + " was killed by a " + monster[Dice.dice(monster.length - 1, 1)];
				break;
			case 5:
				return "A " + monster[Dice.dice(monster.length - 1, 1)] + " was seen to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			case 6:
				return "To the " + direction[Dice.dice(direction.length - 1, 1)] + " is a " + monster[Dice.dice(monster.length - 1, 1)] + " that is guarding a treasure horde";
				break;
			case 7:
				return "An adventuring group travelled to the " + direction[Dice.dice(direction.length - 1, 1)] + " and could not defeat the " + monster[Dice.dice(monster.length - 1, 1)] + " there";
				break;
			case 8:
				return "A " + monster[Dice.dice(monster.length - 1, 1)] + " is roaming the " + rural[Dice.dice(rural.length - 1, 1)] + ", and they seem to be searching for something";
				break;
			default:
				return monster[Dice.dice(monster.length - 1, 1)] + " has been spotted lurking to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			};
			return "";
		}
		// Idle rumours
		function idle() {
			switch (Dice.dice(13,1)) {
			case 1:
				return "There is a game of dice happening soon";
				break;
			case 2:
				return "There is a game of cards happening soon";
				break;
			case 3:
				return "Some of the other patrons are going to be gambling soon";
				break;
			case 4:
				return name() + " has inherited an extremely large wealth after their father passed away";
				break;
			case 5:
				return "The " + profession[Dice.dice(profession.length - 1, 1)] + "'s daughter is pregnant with " + name() + "'s child!";
				break;
			case 6:
				return "A " + profession[Dice.dice(profession.length - 1, 1)] + " is now charging more because they are in debt";
				break;
			case 7:
				return name() + " has a gambling problem, and has run up a massive debt!";
				break;
			case 8:
				return "The " + profession[Dice.dice(profession.length - 1, 1)] + "'s daughter is now engaged to " + name();
				break;
			case 9:
				return name() + " owes " + name() + " a lot of money";
				break;
			case 10:
				return name() + " has inherited a magical item";
				break;
			case 11:
				return name() + " apparently is in trouble with the local guild, and needs to pay them soon!";
				break;
			case 12:
				return name() + " is a racist, and has an intense hatred for them";
				break;
			default:
				return "The nearby " + urban[Dice.dice(urban.length - 1, 1)] + " apparently has the best games of dice around";
			}
			return "";
		}
		// Political rumours
		function political() {
			switch (Dice.dice(5,1)) {
			case 1:
				return "A war will probably break out to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			case 2:
				return name() + " stole a stack of important documents from the government, and is now hiding somewhere in the " + rural[Dice.dice(rural.length - 1, 1)];
				break;
			case 3:
				return "The guards in the nearby " + urban[Dice.dice(urban.length - 1, 1)] + " are imprisoning certain individuals that enter";
				break;
			case 4:
				return "Officials are setting an entrance tax for outsiders";
				break;
			default:
				return "Officials are setting a tax on all goods bought or sold! What a rip-off!";
				break;
			}
			return "";
		}
		// Criminal/Investigative rumours
		function detective() {
			switch (Dice.dice(8,1)) {
			case 1:
				return name() + " died from some mysterious disease";
				break;
			case 2:
				return "A stranger has been spotted lurking to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			case 3:
				return "A " + profession[Dice.dice(profession.length - 1, 1)] + " was found dead to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			case 4:
				return name() + " has disappeared and all of a sudden their son has been spending a lot of money";
				break;
			case 5:
				return name() + " was caught spying on the nearby " + urban[Dice.dice(urban.length - 1, 1)];
				break;
			case 6:
				return name() + " was arrested for poisoning his wife. He still maintains his innocence.";
				break;
			case 7:
				return name() + " has an issue with the law, and is apparently willing to pay good money to solve it";
				break;
			default:
				return "A " + profession[Dice.dice(profession.length - 1, 1)] + " was arrested, but no one knows why!";
				break;
			}
			return "";
		}
		// Supernatural rumours
		function supernatural() {
			switch (Dice.dice(4,1)) {
			case 1:
				return name() + " is suffering from a dreadful curse";
				break;
			case 2:
				return "Legend has it that if you wait outside the " + urban[Dice.dice(urban.length - 1, 1)] + " to the " + direction[Dice.dice(direction.length - 1, 1)] + " during the full moons, you will be visited by the ghost of " + name();
				break;
			case 3:
				return name() + " is hiding a cursed weapon";
				break;
			default:
				return "A " + profession[Dice.dice(profession.length - 1, 1)] + " is being haunted by the ghost of his mentor";
				break;
			}
			return "";
		}
		// Adventuring rumours
		function adventure() {
			switch (Dice.dice(9,1)) {
			case 1:
				return "An adventuring group has found treasure nearby to the " + direction[Dice.dice(direction.length - 1, 1)];
				break;
			case 2:
				return "A secret cult has started up somewhere near a " + urban[Dice.dice(urban.length - 1, 1)];
				break;
			case 3:
				return "A secret lair is hidden in a nearby " + rural[Dice.dice(rural.length - 1, 1)];
				break;
			case 4:
				return "Rare " + colour[Dice.dice(colour.length -1, 1)] + " flowers to the " + direction[Dice.dice(direction.length - 1, 1)] + " are said to produce a magical effect when eaten";
				break;
			case 5:
				return name() + ", an ancient warrior, travelled to the " + direction[Dice.dice(direction.length - 1, 1)] + " in search of treasure but never returned";
				break;
			case 6:
				return "A secret cult seeks to destroy the nearby " + urban[Dice.dice(urban.length - 1, 1)];
				break;
			case 7:
				return "A secret cult seeks to commit genocide";
				break;
			case 8:
				return "Slavers from the " + direction[Dice.dice(direction.length - 1, 1)] + " are capturing any lone individuals they come across";
				break;
			default:
				return name() + " wishes to investigate the ruins to the " + direction[Dice.dice(direction.length - 1, 1)] + ", and is apparently willing to pay good gold to each adventurer who travels with them";
				break;
			}
			return "";
		}
		return {
			// Choose the rumours based on a passed parameter
			rumour: function (value) {
				switch(value.toLowerCase()) {
				case "beast":
					return beast();
					break;
				case "idle":
					return idle();
					break;
				case "politcal":
					return political();
					break;
				case "detective":
					return detective();
					break;
				case "supernatural":
					return supernatural();
					break;
				default:
					return this.all();
				}
				return adventure();
			},
			// Return a random rumour from all possible rumour lists
			all: function () {
				switch(Dice.dice(6,1)) {
				case 1:
					return beast();
					break;
				case 2:
					return idle();
					break;
				case 3:
					return political();
					break;
				case 4:
					return detective();
					break;
				case 5:
					return supernatural();
					break;
				default:
					return adventure();
				}
				return adventure();
			},
			// Return a beast rumour
			beast: function () {
				return beast();
			},
			// Return an idle rumour
			idle: function () {
				return idle();
			},
			// Return a political rumour
			political: function () {
				return political();
			},
			// Return a detective rumour
			detective: function () {
				return detective();
			},
			// Return a supernatural rumour
			supernatural: function () {
				return supernatural();
			},
			// Return a adventure rumour
			adventure: function () {
				return adventure();
			}
		};
	};
}