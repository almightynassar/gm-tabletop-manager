/**
 * The Markov system
 * 
 * This will handle the instantiation of our variables
 */
var Markov = new function() {
	// The name of our chain
	var chain_name = "unknown_unknown";
	// Stores our initial Markov values
	var start_chain = {};
	var start_weights = {};
	// Stores our word building chains
	var word_chain = {};
	var word_weights = {};
	// Stores our terminal Markov values
	var terminal_chain = {};
	var terminal_weights = {};
	// Create our chain from a list of names
	function construct (names) {
		// Re-init our chains
		start_chain = {};
		start_weights = {};
		word_chain = {};
		terminal_chain = {};
		word_weights = {};
		terminal_weights = {};
		// Loop through out input array and build the chains
		for (var i = 0; i < names.length; i++) {
			var name = names[i];
			start_chain = incr_single(start_chain,name.charAt(0),name.charAt(1));
			terminal_chain = incr_double(terminal_chain,name.charAt(name.length-3),name.charAt(name.length-2),name.charAt(name.length-1));
			for (var j = 1; j < (name.length-2); j++) {
				word_chain = incr_double(word_chain,name.charAt(j-1),name.charAt(j),name.charAt(j+1));
			};
		};
		start_weights = scale_single(start_chain);
		terminal_weights = scale_double(terminal_chain);
		word_weights = scale_double(word_chain);
	}
	// Increase the token value within our chain
	function incr_single (chain, key, token) {
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
		return chain;
	}
	// Increase the token values within our chain (stores two values)
	function incr_double (chain, prior, key, token) {
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
		return chain;
	}
	// Scale our chain probabilities and saves to our weights
	function scale_single (chain) {
		var weights = {};
		for (var key in chain) {
			weights[key] = 0;
			for (var token in chain[key]) {
				var count = chain[key][token];
				var weighted = Math.floor(Math.pow(count,1.3));
				chain[key][token] = weighted;
				weights[key] += weighted;
			}
		}
		return weights;
	}
	// Scale our chain probabilities and saves to our weights (with prior)
	function scale_double (chain) {
		var weights = {};
		for (var prior in chain) {
			weights[prior] = {};
			for (var key in chain[prior]) {
				weights[prior][key] = 0;
				for (var token in chain[prior][key]) {
					var count = chain[prior][key][token];
					var weighted = Math.floor(Math.pow(count,1.3));
					chain[prior][key][token] = weighted;
					weights[prior][key] += weighted;
				}
			}
		}
		return weights;
	}
	// Select a link based on the weights
	function select_single (chain, weights, key) {
		if (!weights[key]) return '-';
		if (!chain[key]) return '-';
		var len = weights[key];
	    var idx = Math.floor(Math.random() * len);
	    var t = 0;
	    for (var token in chain[key]) {
	    	t += chain[key][token];
	    	if (idx < t) {
	    		return token;
	    	}
	    }
	    return '-';
	}
	// Select a link based on the weights (double)
	function select_double (chain, weights, prior, key) {
		if (!weights[prior]) return '';
		if (!chain[prior]) return '';
		if (!weights[prior][key]) return '';
		if (!chain[prior][key]) return '';
		var len = weights[prior][key];
	    var idx = Math.floor(Math.random() * len);
	    var t = 0;
	    for (var token in chain[prior][key]) {
	    	t += chain[prior][key][token];
	    	if (idx < t) {
	    		return token;
	    	}
	    }
	    return '';
	}
	// Construct from Markov Chain
	function name (number, length) {
		// Initialise our name array
	    var names = [];
	    // Generate the requested number of names
	    for (var i = 0; i < number; i++) {
	    	// Get  an array of all the possible starting letters
	    	var start_array = [];
	    	for (var k in start_chain) {
	    		if (start_chain.hasOwnProperty(k)) {
	    			start_array.push(k);
	    		}
	    	}
	    	// Select a starting letter at random
	    	var start_index = Math.round(Math.random() * (start_array.length-1));
	    	// Initialise 'p', our prior value
	    	var p = start_array[start_index];
	    	// Initialise 'c', our current character
	    	var c = select_single(start_chain,start_weights,start_array[start_index]);
	    	// Initialise our name value
	    	var name = p + c;
	    	// Store our last c value for searching purposes
	    	var last_c = c;
	    	// Loop until our name reaches the minimum length (unless we break the loop early)
	    	while (name.length < length) {
	    		// Select a letter from the word chain
	    		c = select_double(word_chain, word_weights, p, last_c);
	    		// Make sure we have a valid letter to continue traversing the chain
	    		if (c !== '') {
	    			name += c;
	    			// Shift our values
	    			p = last_c;
	    			last_c = c;
	    		} else {
	    			break;
	    		}
	    	}
	    	// Search for our terminal letter
	    	while ((c = select_double(terminal_chain, terminal_weights, p, last_c)) === '') {
	    		// Select a letter from the word chain
	    		c = select_double(word_chain, word_weights, p, last_c);
	    		// Make sure we have a valid letter to continue traversing the chain
	    		if (c !== '') {
	    			name += c;
	    			// Shift our values
	    			p = last_c;
	    			last_c = c;
	    		} else {
	    			break;
	    		}
	    	}
	    	names.push(name += c);
	    }
	    return names.join(' ');
	}
	return {
		chain: function () { return chain_name; },
		load: function (names, title) { construct(names); chain_name= title; },
		make: function (number, length) { return name(number, length); }
	};
};