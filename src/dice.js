/**
 *  Dice Object
 */
var Dice = new function () {
	function sortNumber(a,b) {
	    return a - b;
	};
    function roll (type, number) {
        type = (type && (typeof type === "number")) ? parseInt(type,10) : 20;
        number = (number && (typeof number === "number")) ? parseInt(number,10) : 1;
        var result = 0;
        for (var i = 0; i < number; ++i) {
            result += Math.round(Math.random()*(type-1))+1;
        }
        return result;
    };
    function rollAbilityScore () {
        var result = new Array(roll(6),roll(6,1),roll(6,1),roll(6,1));
        result.sort(sortNumber); 
        return result[1] + result[2] + result[3];
    }
    return {
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
        characterAttribute: (function () {
        	return rollAbilityScore();
        }),
        randomArray: (function () {
    		var attributes = [rollAbilityScore(),
    		                  rollAbilityScore(),
    		                  rollAbilityScore(),
    		                  rollAbilityScore(),
    		                  rollAbilityScore(),
    		                  rollAbilityScore()];
    		return attributes.sort(sortNumber);
        }),
        standardArray: (function () {
        	return [10,11,12,13,14,16];
        })
    };
};