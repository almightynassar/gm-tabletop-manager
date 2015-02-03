/*===========================================
 * The DnD system - This will handle the instantiation of our variables (including drawing)
 *===========================================
 */
var DnD = (function (window) {
    /**
     * Calculate weight and height of species
     */
    // Internal function to calcular 
    function calcWH(min, max, a, random) {
            a = a ? a : 0;
            random = random ? random : 0;
            return Math.floor(parseInt(min, 10) + (((parseInt(max, 10) - parseInt(min, 10)) / 4) * parseInt(a, 10)) + ((((parseInt(max, 10) - parseInt(min, 10)) / 8) * parseInt(random, 10))));
        }
        /**
         * Storage Object
         */

    function Storage() {
            // Stores all of the attributes
            this.attributes = {};
            this.reset = function () {
                attributes = {};
            };
            this.get = function (key) {
                if (this.attributes[key]) {
                    return this.attributes[key];
                }
                return 0;
            };
            this.set = function (key, value) {
                this.attributes[key] = parseInt(value, 10);
            };
            this.increase = function (key, value) {
                if (this.attributes[key]) {
                    this.attributes[key] += parseInt(value, 10);
                } else {
                    this.attributes[key] = parseInt(value, 10);
                }
            };
        }
        /**
         * Stores the specific skill set
         */

    function Skill(key, value) {
            this.key = key ? key : "wis";
            this.value = parseInt(value, 10);
        }
        /**
         * Stores the specific defences
         */

    function Defence(key1, key2, value) {
            this.attribute1 = key1 ? key1 : "str";
            this.attribute2 = key2 ? key2 : "con";
            this.value = parseInt(value, 10);
        }
        /**
         * Creatures object
         */

    function Creature(name, level, npc) {
        // The name and details of the creature
        this.name = name ? name : "Unknown";
        this.npc = npc;
        this.race = "Unknown";
        this.career = "Unknown";
        this.template = "Unknown";
        this.size = "Medium";
        this.origin = "Natural";
        this.gender = "male";
        this.height = 155;
        this.weight = 55;
        this.hasLowVision = false;
        this.hasDarkVision = false;
        this.bonusSkill = 0;
        this.bonusAtWill = 0;
        this.bonusInitiative = 0;
        this.bonusFeat = 0;
        this.bonusSurgeValue = 0;
        this.bonusNoArmour = 0;
        this.bonusSurge = 0;
        this.ap = 0;
        this.regenerate = 0;
        this.preferred = ["str", "con"];
        this.vision = function () {
            return (this.hasDarkVision) ? "Dark Vision" : (this.hasLowVision ? "Low Vision" : "Normal Vision");
        };
        this.initiative = function () {
            return this.modLevel() + this.mod("dex") + this.bonusInitiative;
        };
        this.actionPoint = function () {
            if (!this.npc) {
                return 1;
            }
            return this.ap;
        };
        this.speed = 6;
        this.getSpeed = function () {
            return this.speed + ((this.bonusNoArmour > 0) ? 0 : this.armour.speed);
        };
        this.getSpeedInFeet = function (minutes) {
            return Math.round((this.getSpeed() * 5) * (minutes / 6));
        };
        this.getSpeedInMetres = function (minutes) {
            return (this.getSpeedInFeet(minutes) * 0.305).toFixed(1);
        };
        this.getSpeedInYards = function (minutes) {
            return (this.getSpeedInFeet(minutes) / 3).toFixed(1);
        };
        this.getSpeedInMiles = function (hours) {
            return Math.round(this.getSpeedInYards(60 * hours) / 1760);
        };
        this.getSpeedInKm = function (hours) {
            return Math.round(this.getSpeedInMetre(60 * hours) / 1000);
        };
        // The health stuff
        this.hpBase = 10;
        this.hpLevel = 4;
        this.spdBase = 0;
        this.savingThrow = 0;
        this.hp = function () {
            var hp = 1;
            if (this.npc) {
                var segment = Math.floor(this.hpBase / 2) + 2;
                hp = this.get("con") + ((level + 1) * segment);
            } else {
                hp = this.hpBase + this.get("con") + ((level - 1) * this.hpLevel);
            }
            switch (this.template) {
            case "Standard":
                break;
            case "Minion":
                hp = 1;
                break;
            case "Solo":
                hp = hp * 5;
                break;
            default:
                hp = hp * 2;
                break;
            }
            return hp;
        };
        this.bloodied = function () {
            return Math.floor(this.hp() / 2);
        };
        this.surge = (function () {
            return Math.floor(this.hp() * 0.25 + ((this.bonusSurgeValue > 0) ? this.mod("con") : 0));
        });
        this.surgePerDay = (function () {
            if (this.npc) {
                return 0;
            }
            return (this.spdBase + this.mod("con"));
        });
        // Our level stuff
        this.level = level ? parseInt(level, 10) : 1;
        this.modLevel = function () {
            return Math.floor(this.level * 0.5);
        };
        // The bonus level stuff
        this.levelUp = function () {
            // Calculate the scores to be added to the two top preferences
            var scores = (this.level > 3 ? 1 : 0) + (this.level > 7 ? 1 : 0) + Math.floor(Math.abs(this.level - 4) / 10) + Math.floor(Math.abs(this.level - 8) / 10);
            var extra = Math.floor(Math.abs(this.level - 1) / 10);
            if (this.attributes) {
                for (var ability in this.attributes) {
                    this.attributes[ability] += extra;
                    if (ability === this.preferred[0] || ability === this.preferred[1]) {
                        this.attributes[ability] += scores;
                    }
                }
            }
        };
        // Returns our attribute modifiers
        this.mod = function (key) {
            if (this.attributes[key]) {
                return Math.floor((this.attributes[key] - 10) / 2);
            }
            return 0;
        };
        this.attack = function (key) {
            if (this.attributes[key]) {
                return this.mod(key) + this.modLevel();
            }
            return 0;
        };
        // Returns our Defences
        this.defence = {};
        this.addDefence = function (defence, key1, key2, value) {
            this.defence[defence] = new Defence(key1, key2, value);
        };
        this.getDefence = function (defence) {
            return 10 + this.defence[defence].value + this.modLevel() + (this.mod(this.defence[defence].attribute1) > this.mod(this.defence[defence].attribute2) ? this.mod(this.defence[defence].attribute1) : this.mod(this.defence[defence].attribute2));
        };
        this.increaseDefence = function (defence, value) {
            if (this.defence[defence]) {
                this.defence[defence].value += value;
            }
        };
        this.bonusAC = 0;
        this.ac = function () {
            return 10 + parseInt(this.bonusAC, 10) + this.modLevel() + parseInt(this.armour.ac, 10) + parseInt(this.armour.enchantment, 10) + parseInt((this.armour.light ? (this.mod("dex") > this.mod("int") ? this.mod("dex") : this.mod("int")) : 0)) + (this.offhand.shield ? this.offhand.prof + this.offhand.enchantment : 0);
        };
        // Our skill stuff
        this.skill = {};
        this.addSkill = function (skill, key, value) {
            this.skill[skill] = new Skill(key, value);
        };
        this.increaseSkill = function (skill, value) {
            if (this.skill[skill]) {
                this.skill[skill].value += value;
            }
        };
        this.getSkill = function (skill) {
            return this.mod(this.skill[skill].key) + this.modLevel() + this.skill[skill].value + (this.skill[skill].key === "str" || this.skill[skill].key === "dex" ? this.armour.check + (this.offhand.shield ? this.offhand.check : 0) : 0);
        };
        // Our resistances, vulnerabilities and immunities
        this.resistance = new Storage();
        this.getResists = function () {
            var text = "";
            if (this.resistance.attributes) {
                for (var key in this.resistance.attributes) {
                    text += key + " +" + (this.resistance.get(key) + this.modLevel()) + "<br />";
                }
            }
            return text;
        };
        this.vulnerable = new Storage();
        this.getVulnerable = function () {
            var text = "";
            if (this.vulnerable.attributes) {
                for (var key in this.vulnerable.attributes) {
                    text += key + " (Double Damage)<br />";
                }
            }
            return text;
        };
        this.immunity = new Storage();
        this.getImmune = function () {
            var text = "";
            if (this.immunity.attributes) {
                for (var key in this.immunity.attributes) {
                    text += key + " (No Damage)<br />";
                }
            }
            return text;
        };
        // XP stats
        this.xp = function () {
            var base = 100 + (25 * Math.max(this.level - 1)) + (25 * Math.max(0, this.level - 5)) + (50 * Math.max(0, this.level - 9)) + (100 * Math.max(0, this.level - 13)) + (200 * Math.max(0, this.level - 17)) + (550 * Math.max(0, this.level - 21)) + (1050 * Math.max(0, this.level - 25)) + (2000 * Math.max(0, this.level - 29)) + (4000 * Math.max(0, this.level - 33)) + (8000 * Math.max(0, this.level - 37));
            switch (this.template) {
            case "Standard":
                break;
            case "Minion":
                base = Math.round(base / 4);
                break;
            case "Solo":
                base = base * 5;
                break;
            default:
                base = base * 2;
                break;
            }
            return base;
        };
        // Armour Stats
        this.armour = {
            name: "Armour",
            type: "Cloth",
            ac: 0,
            enchantment: 0,
            light: 1,
            check: 0,
            speed: 0,
            price: 1,
            weight: 4,
            properties: {}
        };
        this.getArmourPower = function () {
            var text = "<p><b>Armour - " + this.armour.type + (this.armour.light ? " (Light)" : "") + "</b><br / > AC Bonus = " + this.armour.ac + "</p>";
            for (var power in this.armour.properties) {
                text += "<p><b>" + power + "</b><br />" + this.armour.properties[power] + "</p>";
            }
            return text;
        };
        this.applyArmour = function (name, type, enchantment) {
            this.armour.name = name;
            this.armour.type = type;
            this.armour.enchantment = parseInt(enchantment, 10);
            switch (type) {
            case "Leather":
                this.armour.ac = 2;
                this.armour.light = 1;
                this.armour.check = 0;
                this.armour.speed = 0;
                this.armour.price = 25;
                this.armour.weight = 15;
                break;
            case "Studded leather":
                this.armour.ac = 3;
                this.armour.light = 1;
                this.armour.check = 0;
                this.armour.speed = 0;
                this.armour.price = 35;
                this.armour.weight = 28;
                this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
                break;
            case "Hide":
                this.armour.ac = 3;
                this.armour.light = 1;
                this.armour.bonus = 1;
                this.armour.check = -1;
                this.armour.speed = 0;
                this.armour.price = 30;
                this.armour.weight = 25;
                break;
            case "Ring mail":
                this.armour.ac = 3;
                this.armour.light = 1;
                this.armour.check = -1;
                this.armour.speed = 0;
                this.armour.price = 40;
                this.armour.weight = 30;
                this.armour.properties["Durable"] = "On first hit, reduce damage by 2 (plus enchantment bonus). The property is lost until repaired";
                break;
            case "Chainmail":
                this.armour.ac = 6;
                this.armour.bonus = 0;
                this.armour.check = -1;
                this.armour.speed = -1;
                this.armour.price = 40;
                this.armour.weight = 40;
                break;
            case "Banded mail":
                this.armour.ac = 6;
                this.armour.light = 0;
                this.armour.check = -1;
                this.armour.speed = -1;
                this.armour.price = 55;
                this.armour.weight = 35;
                this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
                break;
            case "Scale":
                this.armour.ac = 7;
                this.armour.light = 0;
                this.armour.bonus = 0;
                this.armour.check = 0;
                this.armour.speed = -1;
                this.armour.price = 45;
                this.armour.weight = 45;
                break;
            case "Splint mail":
                this.armour.ac = 7;
                this.armour.light = 0;
                this.armour.check = -2;
                this.armour.speed = -1;
                this.armour.price = 50;
                this.armour.weight = 55;
                this.armour.properties["Durable"] = "On first hit, reduce damage by 3 (plus 2 times the enchantment bonus). The property is lost until repaired";
                break;
            case "Plate":
                this.armour.ac = 8;
                this.armour.light = 0;
                this.armour.bonus = 0;
                this.armour.check = -2;
                this.armour.speed = -1;
                this.armour.price = 50;
                this.armour.weight = 50;
                break;
            case "Spiked plate":
                this.armour.ac = 8;
                this.armour.light = 0;
                this.armour.check = -3;
                this.armour.speed = -1;
                this.armour.price = 55;
                this.armour.weight = 60;
                this.armour.properties["Barbed"] = "Creature take 2 + half your level when you grab or escape the grab";
                break;
            case "Full plate":
                this.armour.ac = 8;
                this.armour.light = 0;
                this.armour.check = -1;
                this.armour.speed = -1;
                this.armour.price = 65;
                this.armour.weight = 60;
                this.armour.properties["Tough"] = "Reinforced with additional plates. In each encounter, first critical hit becomes normal hit";
                break;
            default:
                this.armour.ac = 0;
                this.armour.light = 1;
                this.armour.check = 0;
                this.armour.speed = 0;
                this.armour.price = 1;
                this.armour.weight = 4;
                this.armour.properties = {};
                break;
            }
        };
        // Melee Weapon Stats
        this.melee = {
            name: "Unarmed",
            type: "Empty",
            prof: 0,
            enchantment: 0,
            dice: 1,
            side: 4,
            twohands: 0,
            price: 0,
            weight: 0,
            properties: {}
        };
        this.getMeleePower = function () {
            var text = "<p><b>Melee - " + this.melee.type + ":</b> " + (this.melee.twohands ? "(Two-handed)" : "") + "+" + (this.melee.prof + this.melee.enchantment + this.mod("str") + this.modLevel()) + " vs AC; Hit Damage = " + this.melee.dice + "d" + this.melee.side + " + " + (this.mod("str") + this.melee.enchantment) + "</p>";
            for (var power in this.melee.properties) {
                text += "<p><b>" + power + "</b><br />" + this.melee.properties[power] + "</p>";
            }
            return text;
        };
        this.applyMelee = function (name, type, enchantment) {
            this.melee.name = name;
            this.melee.type = type;
            this.melee.enchantment = parseInt(enchantment, 10);
            switch (type) {
            case "Club":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 1;
                this.melee.weight = 3;
                break;
            case "Dagger":
                this.melee.prof = 3;
                this.melee.price = 1;
                this.melee.weight = 1;
                this.melee.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead). Range 5/10.";
                break;
            case "Javelin":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 5;
                this.melee.weight = 2;
                this.melee.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 10/20";
                break;
            case "Light mace":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 3;
                this.melee.weight = 2;
                this.melee.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Mace":
                this.melee.prof = 2;
                this.melee.side = 8;
                this.melee.price = 5;
                this.melee.weight = 6;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Sickle":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 2;
                this.melee.weight = 2;
                break;
            case "Short spear":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 2;
                this.melee.weight = 1;
                this.melee.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead). Range 5/10.";
                this.melee.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Spear":
                this.melee.prof = 2;
                this.melee.side = 8;
                this.melee.price = 5;
                this.melee.weight = 6;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Greatclub":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 2;
                this.melee.side = 4;
                this.melee.price = 1;
                this.melee.weight = 10;
                break;
            case "Morningstar":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 10;
                this.melee.weight = 8;
                break;
            case "Quaterstaff":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.side = 8;
                this.melee.price = 5;
                this.melee.weight = 4;
                break;
            case "Scythe":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 2;
                this.melee.side = 4;
                this.melee.price = 5;
                this.melee.weight = 10;
                break;
            case "Battleaxe":
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 15;
                this.melee.weight = 6;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Broadsword":
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 20;
                this.melee.weight = 5;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Flail":
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 15;
                this.melee.weight = 6;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Handaxe":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 5;
                this.melee.weight = 3;
                this.melee.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            case "Lance":
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 12;
                this.melee.weight = 10;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                this.melee.properties["Mounted"] = "More effective when on mount. When used not on a mount, take -2 attack penalty. When mounted, charges do an addition 1[W] extra damage";
                break;
            case "Light warpick":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 10;
                this.melee.weight = 4;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                this.melee.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Longsword":
                this.melee.prof = 3;
                this.melee.side = 8;
                this.melee.price = 15;
                this.melee.weight = 4;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Rapier":
                this.melee.prof = 3;
                this.melee.side = 8;
                this.melee.price = 25;
                this.melee.weight = 2;
                break;
            case "Scimitar":
                this.melee.prof = 2;
                this.melee.side = 8;
                this.melee.price = 10;
                this.melee.weight = 4;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                break;
            case "Short sword":
                this.melee.prof = 3;
                this.melee.side = 6;
                this.melee.price = 10;
                this.melee.weight = 2;
                break;
            case "Throwing hammer":
                this.melee.prof = 2;
                this.melee.side = 6;
                this.melee.price = 5;
                this.melee.weight = 2;
                this.melee.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            case "Warhammer":
                this.melee.prof = 2;
                this.melee.side = 10;
                this.melee.price = 15;
                this.melee.weight = 5;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Warpick":
                this.melee.prof = 2;
                this.melee.side = 8;
                this.melee.price = 15;
                this.melee.weight = 6;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Falchion":
                this.melee.twohands = 1;
                this.melee.prof = 3;
                this.melee.dice = 2;
                this.melee.side = 4;
                this.melee.price = 25;
                this.melee.weight = 7;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                break;
            case "Glaive":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 2;
                this.melee.side = 4;
                this.melee.price = 25;
                this.melee.weight = 10;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                break;
            case "Greataxe":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 12;
                this.melee.price = 30;
                this.melee.weight = 8;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                break;
            case "Greatsword":
                this.melee.twohands = 1;
                this.melee.prof = 3;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 30;
                this.melee.weight = 8;
                break;
            case "Halberd":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 25;
                this.melee.weight = 12;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                break;
            case "Heavy flail":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 2;
                this.melee.side = 6;
                this.melee.price = 25;
                this.melee.weight = 10;
                break;
            case "Longspear":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 10;
                this.melee.weight = 9;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                break;
            case "Maul":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 2;
                this.melee.side = 6;
                this.melee.price = 30;
                this.melee.weight = 12;
                break;
            case "Pike":
                this.melee.twohands = 1;
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 15;
                this.melee.weight = 6;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                this.melee.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Bastard sword":
                this.melee.prof = 3;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 30;
                this.melee.weight = 6;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Katar":
                this.melee.prof = 3;
                this.melee.dice = 1;
                this.melee.side = 6;
                this.melee.price = 3;
                this.melee.weight = 1;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                break;
            case "Serrated pick":
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 10;
                this.melee.price = 15;
                this.melee.weight = 4;
                this.melee.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                this.melee.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "War axe":
                this.melee.prof = 2;
                this.melee.dice = 1;
                this.melee.side = 12;
                this.melee.price = 30;
                this.melee.weight = 10;
                this.melee.properties["Versatile"] = "Can be used as a two handed weapon for an extra point of damage";
                break;
            case "Whip":
                this.melee.prof = 3;
                this.melee.dice = 1;
                this.melee.side = 4;
                this.melee.price = 10;
                this.melee.weight = 2;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                break;
            case "Spiked chain":
                this.melee.twohands = 1;
                this.melee.prof = 3;
                this.melee.dice = 2;
                this.melee.side = 4;
                this.melee.price = 30;
                this.melee.weight = 10;
                this.melee.properties["Reach"] = "Can attack enemies that are 2 squares away from you (as well as adjacent enemies)";
                break;
            default:
                this.melee.prof = 0;
                this.melee.dice = 1;
                this.melee.side = 4;
                this.melee.twohands = 0;
                this.melee.price = 0;
                this.melee.weight = 0;
                this.melee.properties = {};
                break;
            }
        };
        // Offhand Stats
        this.offhand = {
            name: "Unarmed",
            type: "Empty",
            prof: 0,
            enchantment: 0,
            dice: 1,
            side: 4,
            shield: 0,
            check: 0,
            price: 0,
            weight: 0,
            properties: {}
        };
        this.getOffhandPower = function () {
            var text = "";
            if (this.offhand.shield) {
                text = "<p><b>Offhand - " + this.offhand.type + ":</b> AC Bonus = " + this.offhand.prof + "</p>";
            } else { 
                text = "<p><b>Offhand - " + this.offhand.type + ":</b> +" + (this.offhand.prof + this.mod("str") + this.modLevel()) + " vs AC; Hit Damage = " + this.offhand.dice + "d" + this.offhand.side + " + " + (this.offhand.enchantment + this.mod("str")) + "</p>";
            }
            for (var power in this.offhand.properties) {
                text += "<p><b>" + power + "</b><br />" + this.offhand.properties[power] + "</p>";
            }
            return text;
        };
        this.applyOffhand = function (name, type, enchantment) {
            this.offhand.name = name;
            this.offhand.type = type;
            this.offhand.enchantment = parseInt(enchantment, 10);
            switch (type) {
            case "Light shield":
                this.offhand.shield = 1;
                this.offhand.prof = 1;
                this.offhand.check = 0;
                this.offhand.price = 5;
                this.offhand.weight = 6;
                break;
            case "Heavy shield":
                this.offhand.shield = 1;
                this.offhand.prof = 2;
                this.offhand.check = -2;
                this.offhand.price = 10;
                this.offhand.weight = 15;
                break;
            case "Barbed shield":
                this.offhand.shield = 1;
                this.offhand.prof = 2;
                this.offhand.check = -3;
                this.offhand.price = 20;
                this.offhand.weight = 18;
                this.offhand.properties["Barbed"] = "Creature takes damage 2 + one-half your level when you escape a grab or a creature escapes your grab";
                break;
            case "Dagger":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 3;
                this.offhand.price = 1;
                this.offhand.weight = 1;
                this.offhand.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead). Range 5/10.";
                break;
            case "Light mace":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 3;
                this.offhand.weight = 2;
                this.offhand.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Sickle":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 2;
                this.offhand.weight = 2;
                break;
            case "Short spear":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 2;
                this.offhand.weight = 1;
                this.offhand.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead). Range 5/10.";
                this.offhand.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Handaxe":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 5;
                this.offhand.weight = 3;
                this.offhand.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            case "Light warpick":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 10;
                this.offhand.weight = 4;
                this.offhand.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                this.offhand.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Short sword":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 3;
                this.offhand.side = 6;
                this.offhand.price = 10;
                this.offhand.weight = 2;
                break;
            case "Throwing hammer":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 2;
                this.offhand.side = 6;
                this.offhand.price = 5;
                this.offhand.weight = 2;
                this.offhand.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            case "Katar":
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 3;
                this.offhand.dice = 1;
                this.offhand.side = 6;
                this.offhand.price = 3;
                this.offhand.weight = 1;
                this.offhand.properties["High Crit"] = "On critical, deal an extra 1[W] damage @ 1-10, 2[W] @ 11-20, 3[W] @ >21";
                break;
            default:
                this.offhand.shield = 0;
                this.offhand.check = 0;
                this.offhand.prof = 0;
                this.offhand.dice = 1;
                this.offhand.side = 4;
                this.offhand.twohands = 0;
                this.offhand.price = 0;
                this.offhand.weight = 0;
                this.offhand.properties = {};
                break;
            }
        };
        // Range Stats
        this.range = {
            name: "Improvised",
            type: "Improvised",
            key: "dex",
            twohands: 0,
            prof: 0,
            enchantment: 0,
            dice: 1,
            side: 4,
            short: 5,
            long: 10,
            price: 0,
            weight: 0,
            properties: {}
        };
        this.getRangePower = function () {
            var text = "<p><b>Ranged - " + this.range.type + (this.range.twohands ? " (Two-handed)" : "") + " (Range: " + this.range.short + "/" + this.range.long + ")</b><br />+" + (this.range.prof + this.mod(this.range.key)) + " vs AC; Hit Damage = " + this.range.dice + "d" + this.range.side + " + " + (this.mod(this.range.key) + this.range.enchantment) + "</p>";
            for (var power in this.range.properties) {
                text += "<p><b>" + power + "</b><br />" + this.range.properties[power] + "</p>";
            }
            return text;
        };
        this.applyRange = function (name, type, enchantment) {
            this.range.name = name;
            this.range.type = type;
            this.range.enchantment = parseInt(enchantment, 10);
            switch (type) {
            case "Hand crossbow":
                this.range.prof = 2;
                this.range.side = 6;
                this.range.short = 10;
                this.range.long = 20;
                this.range.price = 25;
                this.range.weight = 2;
                this.range.properties["Load free"] = "Draw and load as a free action (Requires two hands)";
                break;
            case "Sling":
                this.range.prof = 2;
                this.range.side = 6;
                this.range.short = 10;
                this.range.long = 20;
                this.range.price = 1;
                this.range.weight = 0;
                this.range.properties["Load free"] = "Draw and load as a free action (Requires two hands)";
                break;
            case "Crossbow":
                this.range.twohands = 1;
                this.range.prof = 2;
                this.range.side = 8;
                this.range.short = 15;
                this.range.long = 30;
                this.range.price = 25;
                this.range.weight = 4;
                this.range.properties["Load minor"] = "Draw and load as a minor action (Requires two hands)";
                break;
            case "Longbow":
                this.range.twohands = 1;
                this.range.prof = 2;
                this.range.side = 10;
                this.range.short = 20;
                this.range.long = 40;
                this.range.price = 30;
                this.range.weight = 3;
                this.range.properties["Load free"] = "Draw and load as a free action (Requires two hands)";
                break;
            case "Shortbow":
                this.range.twohands = 1;
                this.range.prof = 2;
                this.range.side = 8;
                this.range.short = 15;
                this.range.long = 30;
                this.range.price = 25;
                this.range.weight = 2;
                this.range.properties["Load free"] = "Draw and load as a free action (Requires two hands)";
                this.range.properties["Small"] = "Small creatures can use in the same way a medium creature can";
                break;
            case "Shuriken":
                this.range.prof = 3;
                this.range.side = 4;
                this.range.short = 6;
                this.range.long = 12;
                this.range.price = 1;
                this.range.weight = 1;
                this.offhand.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead)";
                break;
            case "Javelin":
                this.range.key = "str";
                this.range.short = 10;
                this.range.long = 20;
                this.range.prof = 2;
                this.range.side = 6;
                this.range.price = 5;
                this.range.weight = 2;
                this.range.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier)";
                break;
            case "Dagger":
                this.range.short = 5;
                this.range.long = 10;
                this.range.prof = 2;
                this.range.side = 4;
                this.range.price = 1;
                this.range.weight = 1;
                this.offhand.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead)";
                break;
            case "Short spear":
                this.range.short = 5;
                this.range.long = 10;
                this.range.prof = 2;
                this.range.side = 6;
                this.range.price = 2;
                this.range.weight = 1;
                this.range.properties["Light Thrown"] = "Can be used as a ranged basic attack (use dexterity modifier instead). Range 5/10.";
                this.range.properties["Small"] = "A small creature can use this weapon in the same manner as a medium creature can";
                break;
            case "Handaxe":
                this.range.short = 5;
                this.range.long = 10;
                this.range.prof = 2;
                this.range.side = 6;
                this.range.price = 5;
                this.range.weight = 3;
                this.range.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            case "Throwing hammer":
                this.range.short = 5;
                this.range.long = 10;
                this.range.prof = 2;
                this.range.side = 6;
                this.range.price = 5;
                this.range.weight = 2;
                this.range.properties["Heavy Thrown"] = "Can be used as a ranged basic attack (use strength modifier). Range 5/10.";
                break;
            default:
                this.range.name = "Improvised";
                this.range.type = "Improvised";
                this.range.key = "dex";
                this.range.twohands = 0;
                this.range.prof = 0;
                this.range.enchantment = 0;
                this.range.dice = 1;
                this.range.side = 4;
                this.range.short = 5;
                this.range.long = 10;
                this.range.price = 0;
                this.range.weight = 0;
                this.range.properties = {};
                break;
            }
        };
        // Powers and Feats
        this.getAtWill = (function () {
            return 2 + this.bonusAtWill;
        });
        this.getFeats = (function () {
            return (this.npc) ? 0 : 1 + Math.floor(this.level / 2) + Math.floor((this.level - 1) / 10) + this.bonusFeat;
        });
        this.getEncounter = (function () {
            if (this.npc) {
                if (this.level > 10 && this.level <= 20) {
                    return 2;
                } else if (this.level > 20) {
                    return 3;
                }
            } else {
                if (this.level > 2 && this.level < 7) {
                    return 2;
                } else if (this.level >= 7 && this.level < 11) {
                    return 3;
                } else if (this.level >= 11) {
                    return 4;
                }
            }
            return 1;
        });
        this.getDaily = (function () {
            if (!this.npc) {
                var multi = (this.career === "Wizard") ? 2 : 1;
                if (this.level > 4 && this.level < 9) {
                    return 2 * multi;
                } else if (this.level >= 9 && this.level < 21) {
                    return 3 * multi;
                } else if (this.level >= 21) {
                    return 4 * multi;
                }
                return 1 * multi;
            }
            return 0;
        });
        this.getUtility = (function () {
            if (!this.npc) {
                var multi = (this.career === "Wizard") ? 2 : 1;
                if (this.level > 1 && this.level < 6) {
                    return 1 * multi;
                } else if (this.level >= 6 && this.level < 10) {
                    return 2 * multi;
                } else if (this.level >= 10 && this.level < 12) {
                    return 3 * multi;
                } else if (this.level >= 12 && this.level < 16) {
                    return 5 * multi;
                } else if (this.level >= 16 && this.level < 22) {
                    return 5 * multi;
                } else if (this.level >= 22 && this.level < 26) {
                    return 6 * multi;
                } else if (this.level >= 26) {
                    return 7 * multi;
                }
            }
            return 0;
        });
        // Racial stats (race, height (0-3), weight (0-3)
        this.applyRacial = function (race, h, w) {
            this.race = race;
            if (Race) {
            	if (Race[race]) {
            		this.height = calcWH(Race[race].height.min, Race[race].height.max, h);
            		this.weight = calcWH(Race[race].weight.min, Race[race].weight.max, w);
            		this.size = (this.height >= 120) ? "Small" : "Medium";
            		this.origin = Race[race].origin;
            		this.speed = Race[race].speed;
            		this.hasLowVision = (Race[race].bonus.lowvision > 0 ) ? true : false;
            		this.hasDarkVision = (Race[race].bonus.darkvision > 0 ) ? true : false;
            		this.bonusInitiative = (Race[race].bonus.initiative > 0) ? Race[race].bonus.initiative : 0;
            		this.bonusAtWill = (Race[race].bonus.atwills > 0) ? Race[race].bonus.atwills : 0;
            		this.bonusFeat = (Race[race].bonus.feat > 0) ? Race[race].bonus.feat : 0;
            		this.bonusSurgeValue = (Race[race].bonus.surge_value_bonus > 0) ? Race[race].bonus.surge_value_bonus : 0;;
        			this.bonusNoArmour = (Race[race].bonus.no_armour_penalty > 0) ? Race[race].bonus.no_armour_penalty : 0;;
        			this.bonusSurge = (Race[race].bonus.surge_bonus > 0) ? Race[race].bonus.surge_bonus : 0;;
            		for (attribute in Race[race].attributes) {
						if (Race[race].attributes[attribute] > 0) {
							this.increase(attribute, Race[race].attributes[attribute]);
						}
					}
					if (Race[race].bonus.attributes > 0) {
						this.increase(this.preferred[0], Race[race].bonus.attributes);
					}
					for (skill in Race[race].skills) {
						if (Race[race].skills[skill] > 0) {
							this.increaseSkill(skill, Race[race].skills[skill]);
						}
					}
					if (Race[race].bonus.skills > 0) {
						this.bonusSkill += Race[race].bonus.skills;
					}
					for (defence in Race[race].defences) {
						if (Race[race].defences[defence] > 0) {
							this.increaseDefence(defence, Race[race].defences[defence]);
						}
					}
					for (resistance in Race[race].resistances) {
						if (Race[race].resistances[resistance] > 0) {
							this.resistance.set(resistance, Race[race].resistances[resistance]);
						}
					}
					for (vulnerability in Race[race].vulnerabilities) {
						if (Race[race].vulnerabilities[vulnerability] > 0) {
							this.vulnerable.set(vulnerability, Race[race].vulnerabilities[vulnerability]);
						}
					}
					for (immune in Race[race].immunities) {
						if (Race[race].immunities[immune] > 0) {
							this.immunity.set(immune, Race[race].immunities[immune]);
						}
					}
            	}
            }
        };
        // Apply class stats
        this.applyClass = function (career) {
            this.career = career;
            switch (career) {
                // Base Player Classes
            case "Cleric":
                this.increaseSkill("religion", 5);
                this.increaseDefence("will", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 12;
                this.hpLevel = 5;
                this.spdBase = 7;
                break;
            case "Fighter":
                this.increaseDefence("fort", 2);
                if (this.npc) {
                    this.bonusSkill += 2;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 15;
                this.hpLevel = 6;
                this.spdBase = 9;
                break;
            case "Paladin":
                this.increaseSkill("religion", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 15;
                this.hpLevel = 6;
                this.spdBase = 10;
                break;
            case "Ranger":
                this.increaseSkill("dungeon", 5);
                this.increaseSkill("nature", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                if (!this.npc) {
                    this.bonusSkill += 3;
                }
                this.hpBase = 12;
                this.hpLevel = 5;
                this.spdBase = 6;
                break;
            case "Rogue":
                this.increaseSkill("stealth", 5);
                this.increaseSkill("thievery", 5);
                this.increaseDefence("reflex", 2);
                if (!this.npc) {
                    this.bonusSkill += 4;
                }
                this.hpBase = 12;
                this.hpLevel = 5;
                this.spdBase = 6;
                break;
            case "Warlock":
                this.increaseDefence("will", 1);
                this.increaseDefence("reflex", 1);
                if (this.npc) {
                    this.bonusSkill += 2;
                } else {
                    this.bonusSkill += 4;
                }
                this.hpBase = 12;
                this.hpLevel = 5;
                this.spdBase = 6;
                break;
            case "Warlord":
                this.increaseDefence("fort", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 2;
                } else {
                    this.bonusSkill += 4;
                }
                this.hpBase = 12;
                this.hpLevel = 5;
                this.spdBase = 7;
                break;
            case "Wizard":
                this.increaseSkill("arcana", 5);
                this.increaseDefence("will", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
                // NPC Classes
            case "Aristocrat":
                this.increaseSkill("diplomacy", 5);
                this.increaseDefence("will", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Artisan":
                this.increaseSkill("dungeon", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Commoner":
                this.increaseSkill("streetwise", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Courtesan":
                this.increaseSkill("insight", 5);
                this.increaseDefence("will", 1);
                this.increaseDefence("reflex", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Criminal":
                this.increaseSkill("thievery", 5);
                this.increaseDefence("reflex", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Healer":
                this.increaseSkill("heal", 5);
                this.increaseDefence("will", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Labourer":
                this.increaseSkill("endurance", 5);
                this.increaseDefence("fort", 2);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Merchant":
                this.increaseSkill("insight", 5);
                this.increaseDefence("will", 1);
                this.increaseDefence("reflex", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Priest":
                this.increaseSkill("religion", 5);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Scholar":
                this.increaseSkill("history", 5);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 2;
                } else {
                    this.bonusSkill += 4;
                }
                this.hpBase = 10;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
                // Warrior Classes
            case "Artillery":
                this.increaseSkill("perception", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 8;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Brute":
                this.increaseSkill("athletics", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 16;
                this.hpLevel = 5;
                this.spdBase = 7;
                break;
            case "Controller":
                this.increaseSkill("perception", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 12;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Lurker":
                this.increaseSkill("stealth", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                this.bonusInitiative += 4;
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 8;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Skirmisher":
                this.increaseSkill("athletics", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                this.bonusInitiative += 2;
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 12;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            case "Soldier":
                this.increaseSkill("endurance", 5);
                this.increaseDefence("fort", 1);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                this.bonusInitiative += 2;
                if (this.npc) {
                    this.bonusSkill += 1;
                } else {
                    this.bonusSkill += 3;
                }
                this.hpBase = 12;
                this.hpLevel = 4;
                this.spdBase = 6;
                break;
            }
        };
        // Template
        this.applyTemplate = function (template) {
            this.template = template;
            switch (template) {
            case 'Minion':
                break;
            case 'Solo':
                this.ap = 1;
                this.bonusAtWill += 1;
                this.savingThrow += 5;
                break;
            case "Acolyte":
                this.origin += " (demon)";
                this.resistance.increase("fire", 5);
                this.resistance.increase("necrotic", 5);
                this.resistance.increase("disease", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("will", 2);
                break;
            case "Adept of Frost":
                this.origin += " (elemental)";
                this.resistance.increase("cold", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                break;
            case "Adept of Flame":
                this.origin += " (elemental)";
                this.resistance.increase("fire", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                break;
            case "Adept of Lightning":
                this.origin += " (elemental)";
                this.resistance.increase("lightning", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                break;
            case "Adept of Thunder":
                this.origin += " (elemental)";
                this.resistance.increase("thunder", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("will", 2);
                this.increaseDefence("reflex", 2);
                break;
            case "Battle Champion":
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                this.increaseDefence("will", 2);
                break;
            case "Bodyguard":
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 4);
                this.increaseDefence("reflex", 1);
                this.increaseDefence("will", 1);
                break;
            case "Death Knight":
                this.origin += " (undead)";
                this.hasDarkVision = true;
                this.immunity.set("disease", 1);
                this.immunity.set("poison", 1);
                this.resistance.increase("necrotic", 5);
                this.vulnerable.increase("radiant", 10);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 4);
                this.increaseDefence("will", 2);
                break;
            case "Death Master":
                this.origin += " (shadow)";
                this.hasDarkVision = true;
                this.resistance.increase("necrotic", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("will", 2);
                break;
            case "Demagogue":
                this.savingThrow += 2;
                this.ap = 1;
                this.resistance.increase("charm", 5);
                this.resistance.increase("fear", 5);
                this.increaseDefence("fort", 2);
                this.increaseDefence("will", 4);
                break;
            case "Devastator":
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("reflex", 2);
                break;
            case 'Feyborn':
                this.origin += " (fey)";
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("reflex", 2);
                this.increaseDefence("will", 2);
                break;
            case "Lich":
                this.origin += " (undead)";
                this.hasDarkVision = true;
                this.immunity.set("disease", 1);
                this.immunity.set("poison", 1);
                this.resistance.increase("necrotic", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.regenerate = 10;
                this.increaseDefence("fort", 4);
                this.increaseDefence("will", 4);
                break;
            case "Mummy Champion":
                this.origin += " (undead)";
                this.hasDarkVision = true;
                this.immunity.set("disease", 1);
                this.immunity.set("poison", 1);
                this.resistance.increase("necrotic", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.regenerate = 10;
                this.increaseDefence("fort", 2);
                this.increaseDefence("will", 4);
                break;
            case "Mummy Lord":
                this.origin += " (undead)";
                this.hasDarkVision = true;
                this.immunity.set("disease", 1);
                this.immunity.set("poison", 1);
                this.resistance.increase("necrotic", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.regenerate = 10;
                this.increaseDefence("fort", 2);
                this.increaseDefence("will", 4);
                break;
            case "Savage Berserker":
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 4);
                this.regenerate = 10;
                break;
            case "Shadowborn":
                this.origin += " (shadow)";
                this.hasDarkVision = true;
                this.savingThrow += 2;
                this.ap = 1;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                this.increaseDefence("will", 2);
                break;
            case "Vampire Lord":
                this.origin += " (undead)";
                this.hasDarkVision = true;
                this.immunity.set("disease", 1);
                this.immunity.set("poison", 1);
                this.resistance.increase("necrotic", 5);
                this.vulnerable.increase("radiant", 5);
                this.savingThrow += 2;
                this.ap = 1;
                this.regenerate = 10;
                this.increaseDefence("fort", 2);
                this.increaseDefence("reflex", 2);
                this.increaseDefence("will", 2);
                break;
            default:
                this.ap = 1;
                this.savingThrow += 2;
                break;
            }
        };
    }
    Creature.prototype = new Storage();
    /**
     * Return our public API
     */
    return {
        blank: new Creature(),
        create4E: (function (name, level, race, career, template, npc, attributes, preferences, height, weight) {
            var temp = new Creature(name, level, npc);
            temp.set("str", attributes[0]);
            temp.set("con", attributes[1]);
            temp.set("dex", attributes[2]);
            temp.set("int", attributes[3]);
            temp.set("wis", attributes[4]);
            temp.set("cha", attributes[5]);
            temp.preferred = preferences;
            temp.addDefence("fort", "str", "con", 0);
            temp.addDefence("reflex", "dex", "int", 0);
            temp.addDefence("will", "wis", "cha", 0);
            temp.addSkill("acrobatics", "dex", 0);
            temp.addSkill("arcana", "int", 0);
            temp.addSkill("athletics", "str", 0);
            temp.addSkill("bluff", "cha", 0);
            temp.addSkill("diplomacy", "cha", 0);
            temp.addSkill("dungeon", "wis", 0);
            temp.addSkill("endurance", "con", 0);
            temp.addSkill("heal", "wis", 0);
            temp.addSkill("history", "int", 0);
            temp.addSkill("insight", "wis", 0);
            temp.addSkill("intimidate", "cha", 0);
            temp.addSkill("nature", "wis", 0);
            temp.addSkill("perception", "wis", 0);
            temp.addSkill("religion", "int", 0);
            temp.addSkill("stealth", "dex", 0);
            temp.addSkill("streetwise", "cha", 0);
            temp.addSkill("thievery", "dex", 0);
            temp.applyRacial(race, height, weight);
            temp.applyClass(career);
            temp.applyTemplate(template);
            temp.levelUp();
            return temp;
        }),
        serialise: (function (creature) {
            // The attributes are not saved when stringified, so we create a temporary storage space for it
            if (creature.attributes) {
                creature.abilities = creature.attributes;
            }
            return JSON.stringify(creature);
        }),
        deserialise: (function (creature) {
            var hydrated = JSON.parse(creature);
            if (hydrated !== null && typeof hydrated === 'object') {
                var toReturn = new Creature(hydrated.name, hydrated.level, hydrated.npc);
                for (var key in hydrated) {
                    if (typeof hydrated[key] === "object") {
                        switch (key) {
                        case 'abilities':
                            for (var attribute in hydrated[key]) {
                                toReturn.set(attribute, hydrated[key][attribute]);
                            }
                            break;
                        case 'defence':
                            for (var defence in hydrated[key]) {
                                toReturn.addDefence(defence, hydrated[key][defence].attribute1, hydrated[key][defence].attribute2, hydrated[key][defence].value);
                            }
                            break;
                        case 'immunity':
                            for (var immunity in hydrated[key].attributes) {
                                toReturn.immunity.set(immunity, hydrated[key].attributes[immunity]);
                            }
                            break;
                        case 'resistance':
                            for (var resist in hydrated[key].attributes) {
                                toReturn.resistance.set(resist, hydrated[key].attributes[resist]);
                            }
                            break;
                        case 'skill':
                            for (var skill in hydrated[key]) {
                                toReturn.addSkill(skill, hydrated[key][skill].key, hydrated[key][skill].value);
                            }
                            break;
                        case 'vulnerable':
                            for (var vuln in hydrated[key].attributes) {
                                toReturn.vulnerable.set(vuln, hydrated[key].attributes[vuln]);
                            }
                            break;
                        default:
                            toReturn[key] = hydrated[key];
                        }
                    } else {
                        toReturn[key] = hydrated[key];
                    }
                }
                return toReturn;
            }
            return null;
        })
    };
})(window);