/*===========================================
 * The DnD system - This will handle the instantiation of our variables (including drawing)
 *===========================================
 */
var DnD = (function (window) {
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
    };
    /**
     * Stores the specific skill set
     */
    function Skill(key, value) {
    	this.key = key ? key : "wis";
    	this.value = parseInt(value,10);
    }
    /**
     * Stores the specific defences
     */
    function Defence(key1, key2, value) {
    	this.attribute1 = key1 ? key1 : "str";
    	this.attribute2 = key2 ? key2 : "con";
    	this.value = parseInt(value,10);
    }
    /**
     * Race Object
     */
    function Race() {
    	
    }
    /**
     * Creatures object
     */
    function Creature(name, level, npc) {
    	// The name and details of the creature
    	this.name = name ? name : "Unknown";
    	this.race = "Unknown";
    	this.career = "Unknown";
    	this.npc = 0;
    	// Our level stuff
    	this.level = level ? parseInt(level, 10) : 1;
    	this.modLevel = function () {
    		return Math.floor(this.level * 0.5);
    	};
    	// Returns our attribute modifier
        this.mod = function (key) {
            if (this.attributes[key]) {
                return Math.floor((this.attributes[key] - 10) / 2);
            }
            return 0;
        };
        // Returns our Defences
        this.defence = {};
        this.defence.prototype = new Storage();
        this.addDefence = function (defence, key1, key2, value) {
        	this.defence[defence] = new Defence(key1, key2, value);
        };
        this.getDefence = function (defence) {
        	return 10 + this.defence[defence].value + (this.mod(this.defence[defence].attribute1) > this.mod(this.defence[defence].attribute2) ? this.mod(this.defence[defence].attribute1) : this.mod(this.defence[defence].attribute1));
        };
        // Our skill stuff
    	this.skill = {};
    	this.skill.prototype = new Storage();
    	this.addSkill = function (skill, key, value) {
    		this.skill[skill] = new Skill(key, value);
    	};
    	this.getSkill = function (skill) {
    		return this.mod(this.skill[skill].key) + this.modLevel() + this.skill[skill].value;
    	};
    	// Our resistances, vulnerabilities and immunities
    	this.resistance = {};
    	this.resistance.prototype = new Storage();
    	this.vulnerable = {};
    	this.vulnerable.prototype = new Storage();
    	this.immunity = {};
    	this.immunity.prototype = new Storage();
    }
    Creature.prototype = new Storage();
    /**
     * Return our public API
     */
    return {
        blank: new Creature(),
        create: (function (name, race, career, level, npc) {
        	return new Creature(name, level, npc);
        })
    };
})(window);