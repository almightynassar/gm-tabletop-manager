/**
 * =====================================================================
 * DICE
 *
 * Dice roller
 * =====================================================================
 */
var Dice = function () {
    // Debug is flag for console reporting
    function Dice() {
        this.debug = false;
    }

    // Function for sorting out numbers (for arrays)
    Dice.sortNumber = function (a,b) {
        return a - b;
    }

    // Perform a basic pseudorandom roll
    Dice.roll = function (number, type) {
        return new Dice().roll(number,type);
    }

    // Perform a simple advantage/disadvantage roll (TRUE=advantage,FALSE=disadvantage)
    Dice.advantage = function (number, type, adv) {
        return new Dice().advantage(number,type,adv);
    }

    // Roll a series of dice, drop a certain amount (from lowest or highest), and return the sum
    Dice.drop = function (number, type, drop, highest) {
        return new Dice().drop(number, type, drop, highest);
    }
    Dice.prototype = {
        // Customisable dice roll, with die type, number of die, and advantage (1=adv,0=normal,-1=dis)
        roll: function (number, type) {
            type = (type && (typeof type === "number")) ? parseInt(type,10) : 20;
            number = (number && (typeof number === "number")) ? parseInt(number,10) : 1;
            var result = 0;
            for (var i = 0; i < number; ++i) {
                result += Math.round(Math.random()*(type-1))+1;
            }
            return result;
        },
        drop: function (number, type, drop, highest) {
            type = (type && (typeof type === "number")) ? parseInt(type,10) : 6;
            number = (number && (typeof number === "number")) ? parseInt(number,10) : 4;
            drop = (drop && (typeof drop === "number")) ? parseInt(drop,10) : 1;
            highest = (highest) ? true : false;
            var result = new Array();
            var sum = 0;
            for (var i = 0; i < number; i++) {
                result.push(this.roll(1,type));
            }
            result.sort(this.sortNumber);
            if (highest) {
                for (i = 0; i < (number-drop); i++ ) {
                    sum += result[i];
                }
            } else {
                for (i = drop; i < number; i++ ) {
                    sum += result[i];
                }
            }
            return sum;
        },
        advantage: function (number, type, adv) {
            type = (type && (typeof type === "number")) ? parseInt(type,10) : 6;
            number = (number && (typeof number === "number")) ? parseInt(number,10) : 4;
            adv = (adv) ? true : false;
            var result = 0;
            for (var i = 0; i < number; ++i) {
                var t1 = this.roll(1, type), t2 = this.roll(1, type);
                if (adv) {
                    result += (t1 > t2) ? t1 : t2;
                } else {
                    result += (t1 < t2) ? t1 : t2;
                }
            }
            return result;
        }
    };

    return Dice;
}();
