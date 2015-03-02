/**
 * Arrays of useful names
 */
if (Dice) {
	var Magicals = new function () {
		// Randomly assign a defence
		function randomDefence () {
			switch(Dice.dice(3,1)) {
			case 1:
				return "Fortitude";
			case 2:
				return "Reflex";
			default:
				return "Will";
			}
			return "[DEFENCE]";
		}
		// Randomly assign an skill
		function randomSkill () {
			switch(Dice.dice(17,1)) {
			case 1:
				return "Athletics";
			case 2:
				return "Endurance";
			case 3:
				return "Acrobatics";
			case 4:
				return "Stealth";
			case 5:
				return "Thievery";
			case 6:
				return "Arcana";
			case 7:
				return "History";
			case 8:
				return "Religion";
			case 9:
				return "Dungeoneering";
			case 10:
				return "Heal";
			case 11:
				return "Insight";
			case 12:
				return "Nature";
			case 13:
				return "Perception";
			case 14:
				return "Bluff";
			case 15:
				return "Diplomacy";
			case 16:
				return "Intimidate";
			default:
				return "Streetwise";
			}
			return "[ATTRIBUTE]";
		}
		// Randomly assign an attribute
		function randomAttribute () {
			switch(Dice.dice(6,1)) {
			case 1:
				return "Strength";
			case 2:
				return "Endurance";
			case 3:
				return "Dexterity";
			case 4:
				return "Intelligence";
			case 5:
				return "Wisdom";
			default:
				return "Charisma";
			}
			return "[ATTRIBUTE]";
		}
		// Randomly assign a damage type
		function randomDamage () {
			switch(Dice.dice(10,1)) {
			case 1:
				return "Acid";
			case 2:
				return "Cold";
			case 3:
				return "Fire";
			case 4:
				return "Force";
			case 5:
				return "Lightning";
			case 6:
				return "Necrotic";
			case 7:
				return "Poison";
			case 8:
				return "Psychic";
			case 9:
				return "Radiant";
			default:
				return "Thunder";
			}
			return "[ATTRIBUTE]";
		}
		// Randomly assign a condition
		function randomCondition () {
			switch(Dice.dice(10,1)) {
			case 1:
				return "Blinded";
			case 2:
				return "Dazed";
			case 3:
				return "Deafened";
			case 4:
				return "Dominated";
			case 5:
				return "Helpless";
			case 6:
				return "Immobilized";
			case 7:
				return "Marked";
			case 8:
				return "Slowed";
			case 9:
				return "Stunned";
			default:
				return "Weakened";
			}
			return "[ATTRIBUTE]";
		}
		// These are half-point items, meant to be combined together with the items' half point powers
		function halfPoint (factor) {
			var power = "";
			// Our first power will be something generic that can be applied to most items
			switch(Dice.dice(9,1)) {
			case 1:
				power += "<p><b>Property:</b> Gain an item bonus to " + randomAttribute() + " checks equal to the item's enchantment bonus</p>";
				break;
			case 2:
				power += "<p><b>Power (Daily - Healing - Free Action):</b> Regain hit points as if you had spend a healing surge</p>";
				break;
			case 3:
				power += "<p><b>Power (At-Will - Radiant - Minor Action):</b> The Item radiates colored lights, illuminating like a torch. You can end the illumination as a free action.</p>";
				break;
			case 4:
				power += "<p><b>Property:</b> Gain an item bonus to " + randomSkill() + " checks equal to the item's enchantment bonus</p>";
				break;
			case 5:
				power += "<p><b>Property:</b> When you spend an action point, you gain a +"+ (1 * factor) + " item bonus to all attack rolls and defences until the end of your next turn</p>";
				break;
			case 6:
				power += "<p><b>Power (Daily - Free action):</b> Spend an action point. You do not gain the normal extra action. Instead, your regain the use of one expended daily power</p>";
				break;
			case 7:
				power += "<p><b>Property:</b> Resist " + (5 * factor) + " " + randomDamage() + " damage</p>";
				break;
			case 8:
				power += "<p><b>Power (At-Will - Minor Action):</b> Use this power when you are adjacent to an ally who is subject to an effect that a save can end. They ally is no longer affected, and you now have the effect. You cannot make a saving throw against this effect until the end of your next turn.</p>";
				break;
			default:
				power += "<p><b>Power (Daily - Radiant - Standard Action):</b> Close burst 2; INT or CHA vs WILL (add enchantment bonus to attack roll); on hit the target is dazed (save ends)</p>";
				break;
			}
			return power;
		}
		// Output a suitable power for armour
		function armourPower(points, factor) {
			var power = "";
			switch (points) {
			case 2:
				switch(Dice.dice(11,1)) {
				case 1:
					damage = randomDamage();
					power += halfPoint(factor) + "<p><b>Power (Daily - " + damage + " - Immediate Reaction):</b> Use when an enemy misses you with a melee attack. The attacker takes ongoing "+ (5 * factor) + " " + damage + " (save ends)</p>";
					break;
				case 2:
					power += halfPoint(factor) + "<p><b>Power (Daily - Immediate Reaction):</b> Use when an enemy misses you with a melee attack. You may shift a number of squares equal to this item's enhancement bonus</p>";
					break;
				case 3:
					power += "<p><b>Property:</b> Add a +"+ (2 * factor) + " item bonus to your saving throws against ongoing damage</p>";
					break;
				case 4:
					power += "<p><b>Property:</b> During a short or extended rest, you can store one at-will or encounter martial power in your armour that you or your ally has. You can only store one power at a time. You cannot store a power of a higher level than the armour. You cannot use a power that is a higher level than you. Once the armour power is used, another power must be stored. You cannot stack powers.</p>";
					power += "<p><b>Power (Daily - Standard Action):</b> Use the power stored in the armour. If it is an encounter power, you must spend 1 action point to use it.</p>";
					break;
				case 5:
					power += halfPoint(factor);
					power += "<p><b>Power (Encounter - Minor Action):</b> Until the end of your next turn, any enemy that hits you with an opportunity attack is " + randomCondition() + " (save ends)</p>";
					break;
				case 6:
					power += "<p><b>Power (Daily - Minor Action):</b> Until the end of the encounter, beasts must make a saving throw to attack you. Once a beast has made a save, it can attack you normally</p>";
					break;
				case 7:
					power += "<p><b>Power (Daily - Free Action):</b> Use this power when you hit a target after a charge. Make an additional melee basic attack with a +2 power bonus against the same target</p>";
					break;
				case 8:
					power += "<p><b>Property:</b> When you are bloodied, you gain a damaging aura. Any creature that starts its turn adjacent to you takes " + (2 * factor)+ " " + randomDamage() +" damage</p>";
					break;
				case 9:
					power += "<p><b>Property:</b> When you hit a target, you gain a +2 item bonus to AC against attacks from that target until the end of your next turn</p>";
					break;
				case 10:
					power += "<p><b>Power (Daily - Minor Action):</b> Until the end of the encounter, a creature that hits you with a melee attack takes damage equal to this armour's enhancement bonus</p>";
					break;
				case 11:
					power += "<p><b>Power (Daily - Teleportation - Move Action):</b> Use this power when you are adjacent to a wall to teleport to the other side of the wall. This teleport does not require line of sight and moves you no more than 3 squares. If you attempt to teleport into an occupied square, you go nowhere, your move action is not spent, but the daily power is expended</p>";
					break;
				}
				break;
			case 3:
				switch(Dice.dice(8,1)) {
				case 1:
					power += "<p><b>Power (Encounter - Immediate Interupt):</b> Use this power when an attack against AC or Reflex targets an adjacent ally, or when a ranged attack against an ally within " + (5 * factor) + " squares of you targets AC or Reflex. You become the target of the attack instead</p>";
					break;
				case 2:
					power += "<p><b>Property:</b> When you spend a healing surge to regain hit points, you regain additional hit points equal to the enhancement bonus</p>";
					break;
				case 3:
					power += halfPoint(factor);
					power += "<p><b>Power (Encounter - Minor Action):</b> Until the end of your next turn, you gain concealment and no creatures can make opportunity attacks against you</p>";
					break;
				case 4:
					damage = randomDamage();
					power += "<p><b>Power (Encounter - " + damage + " - Immediate Reaction):</b> Use this power when you become bloodied after an attack. You gain temporary hit points equal to the enhancement bonus plus constitution modifier, and the attacker who made you bloodied takes an equal amount of " + damage +" damage</p>";
					break;
				case 5:
					damage = randomDamage();
					power += "<p><b>Power (Encounter - Immediate Interrupt):</b> Use this power when you are hit with " + damage +" damage. You gain resist " + (10 * factor) + " to that damage type until the end of the encounter</p>";
					break;
				case 6:
					damage = randomDamage();
					damage2 = randomDamage();
					while (damage == damage2) {
						damage2 = randomDamage();
					}
					power += "<p><b>Power (Encounter - Immediate Interrupt):</b> Use this power when you are hit with " + damage +" or " + damage2 + " damage. You gain resist " + (5 * factor) + " to that damage type until the end of the encounter</p>";
					break;
				case 7:
					power += "<p><b>Power (Daily - Polymorph - Move Action):</b> You transform into a flood of rushing water and can move up to your speed. You can move through small cracks and tight spaces with no difficulty. You automatically escape or free yourself from bonds or shackles. You can only take move actions until you return to your natural form, which you can do as a free action during your next turn. While in watery form, you take " + Math.floor(12.5 - (2.5*factor)) + " damage at the start of each of your turns until you return to your natural form</p>";
					break;
				case 8:
					power += "<p><b>Property</b> Gain a +2 item bonus to  " + randomDefence() + " defense when bloodied</p>"
				}
				break;
			case 4:
				switch(Dice.dice(6,1)) {
				case 1:
					power += "<p><b>Property:</b> While you are not bloodied, you gain an item bonus to AC equal to +"+ (1 * factor) + "</p>";
					break;
				case 2:
					power += "<p><b>Power (Daily - Immediate Interrupt):</b> Use this power when an attack misses you and deals half damage. You resist " + (5 * factor) + " points of that damage (treat negative damage as 0)</p>";
					break;
				case 3:
					power += "<p><b>Power (Daily - Minor Action):</b> Spend a healing surge. One ally within " + (5 * factor) + " squares regains hit points as if they had spent a healing surge</p>";
					break;
				case 4:
					power += "<p><b>Property:</b> You cannot be surprised</p>";
					break;
				case 5:
					power += "<p><b>Power (Daily - Healing - Free Action):</b> Use this power when you use your second wind. All allies within " + (5 * factor) + " squares can spend a healing surge as a free action</p>";
					break;
				case 6:
					power += "<p><b>Power (Daily - Immediate Reaction):</b> Use this power when you are hit by an attack. You gain temporary hit points equal to the damage you take</p>";
					break;
				}
				break;
			default:
				switch(Dice.dice(11,1)) {
				case 1:
					power += halfPoint(factor);
					power += "<p><b>Property:</b> You automatically succeed on saving throws against ongoing " + randomDamage() + " damage</p>";
					break;
				case 2:
					power += halfPoint(factor);
					power += "<p><b>Power (At-Will - Minor Action):</b> Until the end of your next turn you take a -"+ (1 * factor) + " penalty to AC while adjacent allies gain a +"+ (1 * factor) + " power bonus to AC</p>";
					break;
				case 3:
					power += halfPoint(factor);
					power += "<p><b>Power (Encounter - Immediate Reaction):</b> Use this power when you gain ongoing " + randomDamage() + " damage. The ongoing damage ends</p>";
					break;
				case 4:
					power += halfPoint(factor);
					power += "<p><b>Property:</b> You cannot be " + randomCondition() + " while wearing this item</p>";
					break;
				case 5:
					power += halfPoint(factor);
					power += "<p><b>Power (Encounter - Fear - Minor Action):</b> A target within 5 squares of you takes a -"+ (2 * factor) + " penalty to attack rolls until the end of your next turn</p>";
					break;
				case 6:
					power += halfPoint(factor);
					power += "<p><b>Power (Daily - Immediate Interrupt):</b> Use this when an adjacent ally is attacked. You take a penalty to your AC equal to the enchantment bonus; your ally adds then adds the enchantment bonus to their AC. Both effects last until the end of your next turn.</p>";
					break;
				case 7:
					power += "<p><b>Property:</b> Gain an item bonus to " + randomSkill() + " checks equal to TWICE the item's enchantment bonus</p>";
					break;
				case 8:
					power += "<p><b>Property:</b> Gain an item bonus to " + randomAttribute() + " checks equal to TWICE the item's enchantment bonus</p>";
					break;
				case 9:
					power += "<p><b>Power (Daily - Minor Action):</b> Gain resist " + (3 * factor) + " to all damage until the end of your next turn</p>";
					break;
				case 10:
					power += "<p><b>Power (Daily - Immediate Reaction):</b> Use this power when a melee or ranged attack misses you. The attack is redirected to an adjacent target of your choice, and the attacker is forced to reroll the attack with a power bonus equal to the enhancement of this item</p>";
					break;
				default:
					power += halfPoint(factor) + halfPoint(factor);
				}
				break;
			}
			return power;
		}
		// Calculate the price of an item at a specific level
		function calculatePrice(level) {
			// The first stage (levels 1-5)
			var price = 200 + Math.min(800, (level * (800/5)));
			// Second Stage (levels 6-10)
			price += Math.min(4000, (Math.floor((level - 1) / 5) * (4000 / 5) * (level - 5)));
			// Third Stage (levels 11-15)
			price += Math.min(20000, (Math.floor((level - 1) / 10) * (20000 / 5) * (level - 10)));
			// Fourth Stage (levels 16-20)
			price += Math.min(100000, (Math.floor((level - 1) / 15) * (100000 / 5) * (level - 15)));
			// Fifth Stage (levels 21-25)
			price += Math.min(500000, (Math.floor((level - 1) / 20) * (500000 / 5) * (level - 20)));
			// Sixth Stage (levels 26-30)
			price += Math.min(2500000, (Math.floor((level - 1) / 25) * (2500000 / 5) * (level - 25)));
			// Seventh Stage (levels 31-35)
			price += Math.min(12500000, (Math.floor((level - 1) / 30) * (12500000 / 5) * (level - 30)));
			// Eigth Stage (levels 36-40)
			price += Math.min(62500000, (Math.floor((level - 1) / 35) * (62500000 / 5) * (level - 35)));
			return price;
		}
		function determineBonus (level, type) {
			var bonusText = "";
			var factor = 1+Math.floor((level-1) / 10);
			var points = (level - 1) % 5;
			if (points > 0) {
				switch (type) {
				case "armour":
					bonusText += armourPower(points, factor);
					break;
				default:
					bonusText += halfPoint(factor) + halfPoint(factor);
					break;
				}
			}
			return bonusText;
		}
		return {
			price: function (level) { return calculatePrice(level); },
			enchantment: function(level) { return 1 + Math.floor((level - 1) / 5); },
			bonus: function(level, type) { return determineBonus(level, type); }
		};
	};
}