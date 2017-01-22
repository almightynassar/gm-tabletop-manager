/**
 * The Markov Name Generating System
 *
 * This will handle the instantiation of our variables
 */
// Our Chain
var Chain = function () {
    // Values
    var chain  = {};
    var weights = {};
    var double = false;
    // Increase the token value within our chain
    // Key = Previous Letter, Token = Following Letter, Prior = Letter before our key
    function increment (key, token, prior) {
        if (double) {
            if (chain[prior]) {
                if (chain[prior][key]) {
                    if (chain[prior][key][token]) {
                        chain[prior][key][token]++;
                    } else {
                        chain[prior][key][token] = 1;
                    }
                } else {
                    chain[prior][key] = {};
                    chain[prior][key][token] = 1;
                }
            } else {
                chain[prior] = {};
                chain[prior][key] = {};
                chain[prior][key][token] = 1;
            }
            scale(key, prior);
        } else {
            if (chain[key]) {
                if (chain[key][token]) {
                    chain[key][token]++;
                } else {
                    chain[key][token] = 1;
                }
            } else {
                chain[key] = {};
                chain[key][token] = 1;
            }
            scale(key);
        }
    }
    // Scale our chain probabilities and saves to our weights
    function scale (key, prior) {
        if (double) {
            if (chain[prior]) {
                if (chain[prior][key]) {
                    if (!weights[prior]) {
                        weights[prior] = {};
                    }
                    weights[prior][key] = 0;
                    for (var token in chain[prior][key]) {
                        weights[prior][key] += chain[prior][key][token];
                    }
                }
            }
        } else {
            if (chain[key]) {
                weights[key] = 0;
                for (var token in chain[key]) {
                    weights[key] += chain[key][token];
                }
            }
        }
    }
    // Select a link based on the weights
    function select (key, prior) {
        try {
            if (double) {
                if (weights[prior] && chain[prior]) {
                    if (weights[prior][key] && chain[prior][key]) {
                        var len = weights[prior][key];
                        var idx = Math.floor(Math.random() * len);
                        var t = 0;
                        for (var token in chain[prior][key]) {
                            t += chain[prior][key][token];
                            if (idx <= t) {
                                return token;
                            }
                        }
                    }
                }
            } else {
                if (weights[key] && chain[key]) {
                    var len = weights[key];
                    var idx = Math.floor(Math.random() * len);
                    var t = 0;
                    for (var token in chain[key]) {
                        t += chain[key][token];
                        if (idx <= t) {
                            return token;
                        }
                    }
                }
            }
        }catch(e){
            alert(e); //error in the above string(in this case,yes)!
        }
        return '';
    }
    // Our start object
    function start () {
        var startObject = {"prior": "", "key": ""};
        try {
            if (double) {
                // Some values to store
                var array = [];
                // Grab an array of our prior tokens
                for (var token in chain) {
                    array.push(token);
                }
                // Our selection index
                var idx = Math.floor(Math.random() * array.length);
                // Find our pre letter
                for (var i in array) {
                    if (idx <= i) {
                        startObject.prior = array[i];
                        break;
                    }
                }
                // Reset our array
                array = [];
                // Grab an array of our key tokens
                for (var token in chain[startObject.prior]) {
                    array.push(token);
                }
                // Our selection index
                var idx = Math.floor(Math.random() * array.length);
                // Find our pre letter
                for (var i in array) {
                    if (idx <= i) {
                        startObject.key = array[i];
                        break;
                    }
                }
            } else {
                // Some values to store
                var array = [];
                // Grab an array of our prior tokens
                for (var token in chain) {
                    array.push(token);
                }
                // Our selection index
                var idx = Math.floor(Math.random() * array.length);
                // Find our pre letter
                for (var i in array) {
                    if (idx <= i) {
                        startObject.key = array[i];
                        break;
                    }
                }
            }
        }catch(e){
            alert(e); //error in the above string(in this case,yes)!
        }
        return startObject;
    }
    // Process a text string into our chain
    function process (text) {
        if (typeof text === "string") {
            if (double) {
                var last = text.charAt(0);
                var pre = text.charAt(1);
                for (var i = 2; i < (text.length); i++) {
                    increment(pre,text.charAt(i),last);
                    last = pre;
                    pre = text.charAt(i);
                }
            } else {
                var pre = text.charAt(0);
                for (var i = 1; i < (text.length); i++) {
                    increment(pre,text.charAt(i));
                    pre = text.charAt(i);
                }
            }
        }
    }
    // Generate text from our chain
    function generate (length, key, prior) {
        length = parseInt(length, 10);
        var text = "";
        if (double) {
            // Generate our own start values if they have not already been given
            if (!key && !prior) {
                var obj = start();
                key = obj.key;
                prior = obj.prior;
            }
            text = prior+key;
            for (var i = 2; i <= length; i++) {
                var token = select(key, prior);
                text += token;
                prior = key;
                key = token;
            }
        } else {
            // Generate our own start values if they have not already been given
            if (!key) {
                var obj = start();
                key = obj.key;
            }
            text = key;
            for (var i = 1; i <= length; i++) {
                var token = select(key);
                text += token;
                key = token;
            }
        }
        return text;
    }
    return {
        // Reset the chain values
        reset: (function () {chain = {}; weights = {};}),
        // Set the chain to be double or single chained (resets the chain)
        setType: (function (type) {
            double = (type) ? true : false;
            this.reset();
        }),
        // Add tokens
        addToken: (function (key, token, prior) { increment(key, token, prior); }),
        getToken: (function (key, prior) { return select(key, prior); }),
        getStart: (function () { return start(); }),
        processText: (function(text) { process(text); }),
        generateText: (function(length) { return generate(length); }),
        // Get our values
        getWeight: (function () {return weights;}),
        getChain: (function () {return chain;}),
        getType: (function () {return (double) ? 'double' : 'single';})
    };
};
// The Markov system
var Markov = function() {
    // Chains to handle different parts of words
    var start_c = new Chain();
    var word_c = new Chain();
    var end_c = new Chain();
    // Key to help determine which list is currently loaded
    var current = null;
    // Reset the chains
    function reset () {
        start_c = new Chain();
        word_c = new Chain();
        end_c = new Chain();
    }
    // Add a name to our chains
    function add (name) {
        if (typeof name === 'string') {
            start_c.addToken(name.charAt(0),name.charAt(1));
            end_c.addToken(name.charAt(name.length-2),name.charAt(name.length-1),name.charAt(name.length-3));
            for (var j = 1; j < (name.length-2); j++) {
                word_c.addToken(name.charAt(j),name.charAt(j+1),name.charAt(j-1));
            };
        }
    }
    // Create our chain from a list of names
    function construct (names) {
        // Re-init our chains
        reset();
        // Set our chain types
        start_c.setType(false);
        word_c.setType(true);
        end_c.setType(true);
        // Loop through out input array and build the chains
        for (var i = 0; i < names.length; i++) {
            add(names[i]);
        };
    }
    // Construct from Markov Chain
    function name (number, length) {
        // Initialise our name array
        var names = [];
        // Generate the requested number of names
        for (var i = 0; i < number; i++) {
            // Get  an array of all the possible starting letters
            var startObj = start_c.getStart();
            var prior = startObj.key;
            var key = start_c.getToken(prior);
            var token = '';
            // Initialise our name value
            var name = prior + key;
            // Loop until our name reaches the minimum length (unless we break the loop early)
            while (name.length < length) {
                // Select a letter from the word chain
                token = word_c.getToken(key, prior);
                // Make sure we have a valid letter to continue traversing the chain
                if (token !== '') {
                    name += token;
                    // Shift our values
                    prior = key;
                    key = token;
                } else {
                    break;
                }
            }
            // Search for our terminal letter
            while ((token = end_c.getToken(key, prior)) === '') {
                // Select a letter from the word chain
                token = word_c.getToken(key, prior);
                // Make sure we have a valid letter to continue traversing the chain
                if (token !== '') {
                    name += token;
                    // Shift our values
                    prior = key;
                    key = token;
                } else {
                    break;
                }
            }
            names.push(name += token);
        }
        return names.join(' ');
    }
    return {
        // Load names
        load: (function (list, tag) { construct(list); current = tag; }),
        // See the current tag
        current: (function() { return current; } ),
        // Make a name from out chains
        make: (function (number, length) { return name(number, length); }),
        // Get our resulting Markov chains
        chains: (function() {return {'start': start_c, 'word': word_c, 'end': end_c };}),
        // Reset the chains to their empty state
        reset: (function() { reset(); })
    };
};
