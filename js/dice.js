/**
 *  Handles a variety of Dice functions
 */
var Dice = new function () {
	// Private function for sorting out numbers (for arrays)
	function sortNumber(a,b) {
	    return a - b;
	};
	// Perform a basic pseudorandom roll
    function roll (type, number) {
        type = (type && (typeof type === "number")) ? parseInt(type,10) : 20;
        number = (number && (typeof number === "number")) ? parseInt(number,10) : 1;
        var result = 0;
        for (var i = 0; i < number; ++i) {
            result += Math.round(Math.random()*(type-1))+1;
        }
        return result;
    };
    // Perform a simple advantage/disadvantage roll (1=advantage,0=normal,-1=disadvantage) 
    function advantage (type, number, adv) {
    	adv = (adv && (typeof adv === "number")) ? parseInt(adv,10) : 0;
    	if (adv !== 0) {
	    	var t1 = roll(type, number), t2 = roll(type, number);
	    	if (adv > 0) {
	    		return (t1 > t2) ? t1 : t2;
	    	} else if (adv < 0) {
	    		return (t1 < t2) ? t1 : t2;
	    	}
    	}
    	return roll(type, number);
    }
    // Roll a series of dice, drop a certain amount (from lowest or highest), and return the sum
    function score (type, number, drop, highest) {
    	type = (type && (typeof type === "number")) ? parseInt(type,10) : 6;
        number = (number && (typeof number === "number")) ? parseInt(number,10) : 4;
        drop = (drop && (typeof drop === "number")) ? parseInt(drop,10) : 1;
        highest = (highest) ? true : false;
        var result = new Array();
        var sum = 0;
        var i;
        for (i = 0; i < number; i++) {
        	result.push(roll(type));
        }
        result.sort(sortNumber);
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
    }
    return {
    	// Customisable dice roll, with die type, number of die, and advantage (1=adv,0=normal,-1=dis) 
    	dice: (function (type, number, adv) {
    		return advantage(type, number, adv);
    	}),
    	// Wrapper functions for roll
        d2: (function (number) {
            return roll(2,number);
        }),    
        d3: (function (number) {
            return roll(3,number);
        }),
        d4: (function (number) {
            return roll(4,number);
        }),
        d6: (function (number) {
            return roll(6,number);
        }),
        d8: (function (number) {
            return roll(8,number);
        }),
        d10: (function (number) {
            return roll(10,number);
        }),
        d12: (function (number) {
            return roll(12,number);
        }),
        d20: (function (number) {
            return roll(20,number);
        }),
        d30: (function (number) {
            return roll(30,number);
        }),
        d100: (function (number) {
            return roll(100,number);
        }),
        // Wrapper function for a single customisable attribute
        score: (function (type, number, drop, highest) {
        	return score(type, number, drop, highest);
        }),
        // Returns a random D&D array (for 6 attributes)
        randomArray: (function () {
    		var attributes = new Array(score(),score(),score(),score(),score(),score());
    		return attributes.sort(sortNumber);
        }),
        // Returns the Standard D&D Array (for 6 attributes)
        standardArray: (function () {
        	return [8,10,12,13,14,15];
        })
    };
};