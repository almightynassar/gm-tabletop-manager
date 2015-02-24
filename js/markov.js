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
var Markov = new function() {
	// Our internal name variable
	var Name = {
		    "dwarf": {
		        "female": ["abilsteif",
		        		   "abonis",
		        		   "adanis",
		        		   "adisla",
		                   "adruneif",
		                   "afridis",
		                   "afridir",
		                   "agratha",
		                   "agrima",
		                   "alfeidir",
		                   "alfrun",
		                   "alidir",
		                   "amma",
		                   "ammaneif",
		                   "andina",
		                   "angora",
		                   "arma",
		                   "armidir",
		                   "armunir",
		                   "arnatla",
		                   "audelga",
		                   "audilda",
		                   "augudir",
		                   "bakna",
		                   "batha",
		                   "baugeid",
		                   "bedwina",
		                   "belraka",
		                   "bergidis",
		                   "bergora",
		                   "birla",
		                   "birna",
		                   "birkildir",
		                   "bokora",
		                   "bolla",
		                   "borga",
		                   "bothreif",
		                   "borgunna",
		                   "bugrina",
		                   "bulla",
		                   "busla",
		                   "burnilda",
		                   "dageif",
		                   "dagilda",
		                   "dagrun",
		                   "dalla",
		                   "damora",
		                   "darina",
		                   "digrina",
		                   "dirthia",
		                   "diwlia",
		                   "dorgrima",
		                   "dorthila",
		                   "dralgora",
		                   "dramina",
		                   "drawana",
		                   "dulgola",
		                   "durimi",
		                   "dwiana",
		                   "dwimina",
		                   "garola",
		                   "garilda",
		                   "gireif",
		                   "girola",
		                   "gilara",
		                   "gilda",
		                   "girtha",
		                   "glora",
		                   "glomira",
		                   "glomura",
		                   "kebora",
		                   "kedda",
		                   "kedna",
		                   "kerundi",
		                   "ketnia",
		                   "kilda",
		                   "kifinna",
		                   "kineif",
		                   "megora",
		                   "mendila",
		                   "marindis",
		                   "mazinda",
		                   "morana",
		                   "mozaga",
		                   "normina",
		                   "norumi",
		                   "owina",
		                   "owaka",
		                   "ragunis",
		                   "ranira",
		                   "rawura",
		                   "ruthia",
		                   "ruwara",
		                   "thirimis",
		                   "thinondis",
		                   "thowura",
		                   "thorana",
		                   "thogona",
		                   "thorura"],
		        "male":   ["abjorn",
		        		   "abeigrim",
		        		   "adabrand",
		        		   "adakan",
		        		   "adalbert",
		        		   "adalbrik",
		        		   "adalrar",
		        		   "adameirk",
		        		   "adeirf",
		        		   "adgil",
		        		   "adobrik",
		        		   "afastein",
		        		   "afwaldir",
		        		   "agastein",
		        		   "agein",
		        		   "agheir",
		        		   "agmund",
		        		   "agnar",
		        		   "agriz",
		        		   "albeid",
		        		   "albund",
		        		   "alfar",
		        		   "alfarin",
		        		   "alfraud",
		        		   "algaut",
		        		   "algeind",
		        		   "almeir",
		        		   "almund",
		        		   "alstein",
		        		   "alwid",
		        		   "alwin",
		        		   "ameid",
		        		   "amstrom",
		        		   "amund",
		        		   "angstein",
		        		   "angstrom",
		        		   "angund",
		        		   "anastein",
		        		   "anuborn",
		        		   "anund",
		        		   "arein",
		        		   "arafast",
		        		   "arandim",
		        		   "arnod",
		        		   "asborn",
		        		   "askil",
		        		   "askir",
		        		   "astein",
		        		   "astrom",
		        		   "atasur",
		        		   "atifar",
		        		   "atil",
		        		   "audi",
		        		   "aumund",
		        		   "aungeir",
		        		   "aungist",
		        		   "aungrim",
		        		   "aungur",
		        		   "austomadir",
		        		   "baglir",
		        		   "bagrim",
		        		   "bardir",
		                   "barin",
		                   "balak",
		                   "balrein",
		                   "balur",
		                   "bastrom",
		                   "beilir",
		                   "belgrim",
		                   "belin",
		                   "belrak",
		                   "belzad",
		                   "binwin",
		                   "bingard",
		                   "bofor",
		                   "bofum",
		                   "boltil",
		                   "breim",
		                   "brorim",
		                   "brotrim",
		                   "bulak",
		                   "bulin",
		                   "dalbar",
		                   "dalor",
		                   "dalrim",
		                   "dalum",
		                   "denastein",
		                   "denork",
		                   "dokak",
		                   "doran",
		                   "dorwen",
		                   "drudin",
		                   "drum",
		                   "drunal",
		                   "druwin",
		                   "druzad",
		                   "fastad",
		                   "fastum",
		                   "filul",
		                   "fimeim",
		                   "fimar",
		                   "fimdin",
		                   "fingil",
		                   "fingon",
		                   "fingum",
		                   "fistrum",
		                   "fistrad",
		                   "furnal",
		                   "fustad",
		                   "garak",
		                   "garar",
		                   "gangar",
		                   "gilgol",
		                   "gimli",
		                   "gimtil",
		                   "gimtrun",
		                   "goldon",
		                   "gomein",
		                   "gomar",
		                   "gomuk",
		                   "grilol",
		                   "grimdum",
		                   "greim",
		                   "grogrim",
		                   "groun",
		                   "gruk",
		                   "grunim",
		                   "hard",
		                   "harod",
		                   "harund",
		                   "harzad",
		                   "hathand",
		                   "hatrim",
		                   "herim",
		                   "herwod",
		                   "hezod",
		                   "kalein",
		                   "kalim",
		                   "kalk",
		                   "kalin",
		                   "kathein",
		                   "kehal",
		                   "ketor",
		                   "kilmin",
		                   "kiltil",
		                   "klond",
		                   "klorwand",
		                   "megam",
		                   "mendok",
		                   "munbun",
		                   "mungol",
		                   "nalim",
		                   "nalond",
		                   "olim",
		                   "olrium",
		                   "omgrim",
		                   "omuntil",
		                   "owistein",
		                   "owomund",
		                   "ragrim",
		                   "ragtil",
		                   "ralmond",
		                   "rumdrid",
		                   "runtil",
		                   "sigrim",
		                   "simbar",
		                   "storak",
		                   "stordin",
		                   "storgul",
		                   "storun",
		                   "talgud",
		                   "talgrim",
		                   "thilrim",
		                   "thinzad",
		                   "thovgud",
		                   "thrain",
		                   "thugem",
		                   "thund",
		                   "tilgud",
		                   "tilzorm"]
		    },
		    "elf": {
		        "female": ["aedora",
		                   "aerithel",
		                   "alaena",
		                   "aliria",
		                   "alirian",
		                   "anawe",
		                   "anwen",
		                   "arifina",
		                   "arihel",
		                   "atalira",
		                   "atreana",
		                   "britesa",
		                   "brithela",
		                   "braena",
		                   "deneth",
		                   "desidra",
		                   "donidrae",
		                   "dothiel",
		                   "elaire",
		                   "elanwe",
		                   "elanya",
		                   "elisone",
		                   "elwiloth",
		                   "eronare",
		                   "eronilia",
		                   "erosana",
		                   "erosira",
		                   "etherea",
		                   "etoril",
		                   "fanadra",
		                   "faranel",
		                   "finedra",
		                   "firenil",
		                   "helende",
		                   "hesion",
		                   "hilidara",
		                   "hiniel",
		                   "hirale",
		                   "iladria",
		                   "imadre",
		                   "imodrenia",
		                   "iranel",
		                   "irien",
		                   "isatiria",
		                   "irova",
		                   "kalamia",
		                   "karasha",
		                   "karitha",
		                   "korisha",
		                   "koritha",
		                   "lelwish",
		                   "leranil",
		                   "lifalia",
		                   "lilidrae",
		                   "lilosha",
		                   "lovelian",
		                   "lovilas",
		                   "madrae",
		                   "mahana",
		                   "manosha",
		                   "medora",
		                   "meloril",
		                   "menolia",
		                   "minalda",
		                   "mirien",
		                   "nabasila",
		                   "namalia",
		                   "nelitha",
		                   "nenisha",
		                   "nerussa",
		                   "nilwane",
		                   "niradish",
		                   "ranaline",
		                   "ravesha",
		                   "reladith",
		                   "rivia",
		                   "ronefel",
		                   "sihash",
		                   "sinariel",
		                   "sidril",
		                   "sidosha",
		                   "silath",
		                   "sirilonwe",
		                   "tandilwe",
		                   "tanwena",
		                   "taralda",
		                   "tarisha",
		                   "tirente",
		                   "tiresara",
		                   "tufira",
		                   "turisha",
		                   "vahendrae",
		                   "vaketha",
		                   "valisha",
		                   "valendra",
		                   "velina",
		                   "venafila",
		                   "zenesara",
		                   "zenosara",
		                   "zenotha",
		                   "zereni"],
		        "male":   ["alidaril",
		                   "aloderil",
		                   "alimar",
		                   "alomir",
		                   "alawin",
		                   "amidor",
		                   "amragor",
		                   "amrelor",
		                   "anarenen",
		                   "anacano",
		                   "anacher",
		                   "anidel",
		                   "anidil",
		                   "anidiriel",
		                   "anogoril",
		                   "anogorn",
		                   "anolas",
		                   "aracher",
		                   "aragorn",
		                   "aranir",
		                   "aratan",
		                   "aravan",
		                   "arille",
		                   "arimion",
		                   "arivan",
		                   "arodell",
		                   "arodiriel",
		                   "arimragor",
		                   "aronil",
		                   "asamir",
		                   "asavan",
		                   "asenis",
		                   "asliel",
		                   "asovil",
		                   "ataven",
		                   "athellor",
		                   "atheman",
		                   "atorel",
		                   "berenil",
		                   "benaval",
		                   "boralith",
		                   "borinish",
		                   "buneril",
		                   "bunoral",
		                   "buvaman",
		                   "carecelimo",
		                   "caryarel",
		                   "corivus",
		                   "corilon",
		                   "eramil",
		                   "eramion",
		                   "erundil",
		                   "falanamo",
		                   "falarel",
		                   "fanildil",
		                   "figuran",
		                   "firiel",
		                   "fogusivan",
		                   "foraman",
		                   "fulidriel",
		                   "fulitan",
		                   "gladiron",
		                   "gladriel",
		                   "godaros",
		                   "goromir",
		                   "gundalas",
		                   "guromir",
		                   "hasamir",
		                   "hasiman",
		                   "hebadil",
		                   "hecerinde",
		                   "henatier",
		                   "henorin",
		                   "heraval",
		                   "hidelith",
		                   "hinigor",
		                   "iachesis",
		                   "iadriel",
		                   "ianomevan",
		                   "ilamiril",
		                   "ilodrivan",
		                   "inogonar",
		                   "inuviman",
		                   "iradriel",
		                   "irolon",
		                   "iterimel",
		                   "karidryn",
		                   "kavidoril",
		                   "ladriel",
		                   "lanodirume",
		                   "lodriel",
		                   "loricalin",
		                   "loriman",
		                   "lylim",
		                   "lydriel",
		                   "malevasian",
		                   "malivan",
		                   "meanen",
		                   "melador",
		                   "melomir",
		                   "meryaran",
		                   "molimo",
		                   "moranar",
		                   "mororur",
		                   "mosanon",
		                   "naemon",
		                   "nanide",
		                   "nelacar",
		                   "nelulin",
		                   "neramo",
		                   "norinil",
		                   "nosaril",
		                   "oledral",
		                   "oliquar",
		                   "oramir",
		                   "oromilus",
		                   "orwyn",
		                   "padriel",
		                   "pavideran",
		                   "peladil",
		                   "peniman",
		                   "riminotil",
		                   "rivandriel",
		                   "rulorin",
		                   "rumare",
		                   "sanyon",
		                   "sarulas",
		                   "sarulian",
		                   "saruman",
		                   "sedaril",
		                   "senawen",
		                   "sidarel",
		                   "sinyaramen",
		                   "solelian",
		                   "soliman",
		                   "sorcalin",
		                   "sorondil",
		                   "tarovan",
		                   "tamenith",
		                   "tauryon",
		                   "tedranil",
		                   "telinaturco",
		                   "tragorim",
		                   "trechitus",
		                   "tunegore",
		                   "tusamicil",
		                   "turomalin",
		                   "unabacano",
		                   "unadil",
		                   "ulerinil",
		                   "volanaro",
		                   "vorian",
		                   "yaberiel",
		                   "yadiriel",
		                   "yanagor",
		                   "yaravan"]
		    },
		    "human": {
		        "female": ["adelie",
		                   "adrienne",
		                   "aletta",
		                   "alyssa",
		                   "angeline",
		                   "anna",
		                   "annabelle",
		                   "anya",
		                   "arielle",
		                   "arlene",
		                   "ashlyn",
		                   "asolda",
		                   "azara",
		                   "azielle",
		                   "azura",
		                   "barabelle",
		                   "barbanna",
		                   "barbara",
		                   "bathella",
		                   "beatrice",
		                   "bella",
		                   "belladonna",
		                   "bernadette",
		                   "brey",
		                   "brianna",
		                   "diabelle",
		                   "dianna",
		                   "dianne",
		                   "delfine",
		                   "denise",
		                   "elanna",
		                   "elara",
		                   "eliza",
		                   "emiele",
		                   "emily",
		                   "emma",
		                   "emmadette",
		                   "fanna",
		                   "farana",
		                   "fasele",
		                   "fayne",
		                   "galia",
		                   "ganielle",
		                   "hallan",
		                   "halviene",
		                   "hanna",
		                   "helan",
		                   "helen",
		                   "irabelle",
		                   "irene",
		                   "isabeau",
		                   "isabelle",
		                   "joanne",
		                   "jolie",
		                   "kadence",
		                   "karolanna",
		                   "kasabelle",
		                   "keira",
		                   "kera",
		                   "klair",
		                   "klare",
		                   "lanette",
		                   "larisa",
		                   "lerisa",
		                   "lera",
		                   "lielle",
		                   "lirielle",
		                   "lisette",
		                   "lorelei",
		                   "lora",
		                   "luciana",
		                   "lucy",
		                   "magdelena",
		                   "marie",
		                   "mariette",
		                   "marisha",
		                   "mina",
		                   "mirabel",
		                   "page",
		                   "paige",
		                   "rachelle",
		                   "raelynn",
		                   "relena",
		                   "relie",
		                   "remora",
		                   "renardine",
		                   "rochelle",
		                   "rosalyn",
		                   "rose",
		                   "roxanne",
		                   "ruby",
		                   "ruse",
		                   "sabina",
		                   "samatha",
		                   "sarra",
		                   "savannah",
		                   "sebella",
		                   "sefora",
		                   "senna",
		                   "shali",
		                   "shani",
		                   "sibella",
		                   "sienna",
		                   "tabitha",
		                   "tarra",
		                   "tinkabelle",
		                   "tirette",
		                   "vencia",
		                   "venicia",
		                   "victoire",
		                   "viktiora",
		                   "vivienne",
		                   "voada",
		                   "volette",
		                   "zandrilla",
		                   "zara",
		                   "zieda",
		                   "zilara",
		                   "zoada",
		                   "zoe"],
		        "male":   ["abas",
		                   "abel",
		                   "abram",
		                   "abraham",
		                   "aburon",
		                   "aburen",
		                   "achard",
		                   "adam",
		                   "adem",
		                   "adim",
		                   "aden",
		                   "adran",
		                   "alayn",
		                   "alek",
		                   "alend",
		                   "alind",
		                   "alvin",
		                   "anend",
		                   "anlow",
		                   "anson",
		                   "anton",
		                   "arand",
		                   "arando",
		                   "aron",
		                   "arles",
		                   "arnald",
		                   "arth",
		                   "ashelon",
		                   "austin",
		                   "banond",
		                   "barden",
		                   "barkly",
		                   "bazil",
		                   "bekit",
		                   "ben",
		                   "bil",
		                   "bolson",
		                   "bradden",
		                   "brand",
		                   "brandis",
		                   "breter",
		                   "brice",
		                   "brillman",
		                   "bowen",
		                   "carn",
		                   "carrol",
		                   "dalkon",
		                   "damion",
		                   "dane",
		                   "daylen",
		                   "dengar",
		                   "dendy",
		                   "deveral",
		                   "dirk",
		                   "dodden",
		                   "dondreth",
		                   "drew",
		                   "dungarth",
		                   "edward",
		                   "edwird",
		                   "erik",
		                   "falken",
		                   "feck",
		                   "fenton",
		                   "gary",
		                   "greg",
		                   "hagar",
		                   "hamund",
		                   "haydin",
		                   "jakob",
		                   "jerod",
		                   "johannes",
		                   "jonaten",
		                   "jordan",
		                   "kain",
		                   "kane",
		                   "karn",
		                   "kaspar",
		                   "kayden",
		                   "konrad",
		                   "kris",
		                   "lavant",
		                   "levid",
		                   "lorran",
		                   "madian",
		                   "malfier",
		                   "mane",
		                   "mark",
		                   "markus",
		                   "martin",
		                   "mathiew",
		                   "meklan",
		                   "mikal",
		                   "musti",
		                   "namen",
		                   "navaren",
		                   "nerl",
		                   "niall",
		                   "nilus",
		                   "ning",
		                   "noril",
		                   "noris",
		                   "odaren",
		                   "okarin",
		                   "ospar",
		                   "oxbaren",
		                   "padan",
		                   "peda",
		                   "pendus",
		                   "pikon",
		                   "piku",
		                   "pyder",
		                   "randal",
		                   "rath",
		                   "ridan",
		                   "roger",
		                   "rizard",
		                   "rydan",
		                   "ryth",
		                   "sabal",
		                   "samweth",
		                   "sefan",
		                   "sekor",
		                   "semma",
		                   "seth",
		                   "sidel",
		                   "shane",
		                   "skoth",
		                   "skot",
		                   "suktor",
		                   "syth",
		                   "tabio",
		                   "talebiron",
		                   "taron",
		                   "tate",
		                   "tavon",
		                   "temil",
		                   "tiber",
		                   "timoth",
		                   "tindred",
		                   "tobias",
		                   "toma",
		                   "tomas",
		                   "tony",
		                   "troy",
		                   "tucker",
		                   "tusdar",
		                   "tuskana",
		                   "tyler",
		                   "ubanon",
		                   "ubed",
		                   "ugdon",
		                   "unalot",
		                   "uther",
		                   "utred",
		                   "uven",
		                   "van",
		                   "vako",
		                   "valkeri",
		                   "vanan",
		                   "vasko",
		                   "varden",
		                   "vespar",
		                   "veth",
		                   "viktor",
		                   "vigoth",
		                   "vilan",
		                   "vinald",
		                   "volmar",
		                   "wade",
		                   "wak",
		                   "waner",
		                   "waren",
		                   "warin",
		                   "wendel",
		                   "wesmith",
		                   "weshin",
		                   "wimeth",
		                   "wisane",
		                   "wilt",
		                   "wolgan",
		                   "wyeth",
		                   "xander",
		                   "xavier",
		                   "xenil",
		                   "yabaro",
		                   "yaiden",
		                   "yestin",
		                   "yezern",
		                   "yizid",
		                   "yordis",
		                   "yuri",
		                   "zakden",
		                   "zane",
		                   "zanilo",
		                   "zef",
		                   "zeke",
		                   "zelgan",
		                   "zev",
		                   "zidane",
		                   "zidar",
		                   "zoro",
		                   "zoru",
		                   "zrorotan",
		                   "zytan",
		                   "zyten"]
		    },
		    "orc": {
		        "female": ["agadbu",
		                   "aglakh",
		                   "agrob",
		                   "badbog",
		                   "barak",
		                   "bashuk",
		                   "batul",
		                   "blagakh",
		                   "bluga",
		                   "bogdub",
		                   "bolar",
		                   "borash",
		                   "borba",
		                   "bugdurash",
		                   "bula",
		                   "bulak",
		                   "bulfim",
		                   "burzob",
		                   "dufbash",
		                   "dura",
		                   "durgat",
		                   "durz",
		                   "gashnak",
		                   "glasha",
		                   "glob",
		                   "gluronk",
		                   "gonk",
		                   "gorza",
		                   "gulfim",
		                   "gulzob",
		                   "horza",
		                   "horkash",
		                   "hurampf",
		                   "huzoth",
		                   "kharz",
		                   "khazug",
		                   "khozarm",
		                   "lagakh",
		                   "lambug",
		                   "lazgar",
		                   "magula",
		                   "marbul",
		                   "mogak",
		                   "mogdurz",
		                   "morn",
		                   "murob",
		                   "mursush",
		                   "murzoth",
		                   "narug",
		                   "nazubesh",
		                   "orkul",
		                   "orkulg",
		                   "ormgog",
		                   "shagdub",
		                   "sharamf",
		                   "sheltharz",
		                   "shuzrag",
		                   "skagarz",
		                   "skandar",
		                   "snagara",
		                   "snat",
		                   "stulga",
		                   "thishnaku",
		                   "ugrash",
		                   "undusha",
		                   "uratag",
		                   "urzoth",
		                   "uzhug",
		                   "yatul",
		                   "yarzol",
		                   "yarug",
		                   "yaznaku"],
		        "male":   ["atonak",
		                   "atulg",
		                   "azuk",
		                   "azog",
		                   "bagamul",
		                   "bakh",
		                   "balagog",
		                   "baronk",
		                   "bashnag",
		                   "bazgulub",
		                   "bogakh",
		                   "bologra",
		                   "borkul",
		                   "borug",
		                   "bothurz",
		                   "bugrash",
		                   "bugrol",
		                   "bumbub",
		                   "dabugok",
		                   "dalorgo",
		                   "diganok",
		                   "dilug",
		                   "dular",
		                   "duluk",
		                   "duma",
		                   "dumbuk",
		                   "durbul",
		                   "durgash",
		                   "durgob",
		                   "durzub",
		                   "fakgoz",
		                   "fazig",
		                   "framorz",
		                   "frukag",
		                   "gakt",
		                   "garothmuk",
		                   "garzonk",
		                   "gashna",
		                   "gazamog",
		                   "gommok",
		                   "gorak",
		                   "gortwog",
		                   "gorok",
		                   "grikug",
		                   "grulush",
		                   "karak",
		                   "karanek",
		                   "kargol",
		                   "kognak",
		                   "komarod",
		                   "kozak",
		                   "kurdan",
		                   "kurzan",
		                   "kurz",
		                   "largakh",
		                   "larbumol",
		                   "logbur",
		                   "loronk",
		                   "lozarg",
		                   "lugrub",
		                   "lumdum",
		                   "lurog",
		                   "luronk",
		                   "luzmash",
		                   "mahk",
		                   "matuk",
		                   "mauhul",
		                   "mazgro",
		                   "megak",
		                   "mekag",
		                   "mogrul",
		                   "mogzakh",
		                   "molgan",
		                   "morbash",
		                   "murag",
		                   "murkab",
		                   "naruzgub",
		                   "nash",
		                   "nurzum",
		                   "nushub",
		                   "oathsmash",
		                   "oazkig",
		                   "ogdahk",
		                   "ograt",
		                   "olfim",
		                   "olzad",
		                   "othbug",
		                   "othmash",
		                   "ragbar",
		                   "raguk",
		                   "ragyuk",
		                   "ramolg",
		                   "rhaguz",
		                   "rhosh",
		                   "rokirak",
		                   "rozag",
		                   "rugmeg",
		                   "rumurz",
		                   "shagrod",
		                   "shargam",
		                   "shazgob",
		                   "shelakh",
		                   "shet",
		                   "skulzak",
		                   "skurkul",
		                   "snagla",
		                   "snakha",
		                   "snuronk",
		                   "takzosh",
		                   "targoth",
		                   "tazgol",
		                   "todagog",
		                   "torahk",
		                   "ugnath",
		                   "ugmob",
		                   "ungruntuk",
		                   "unrahg",
		                   "uzat",
		                   "uzgakh",
		                   "uzul",
		                   "vadgu",
		                   "vakgar",
		                   "walug",
		                   "warg",
		                   "wark",
		                   "wart",
		                   "wumush",
		                   "wurgoth",
		                   "yakoth",
		                   "yamarz",
		                   "yambagorn",
		                   "yambul",
		                   "yamolg",
		                   "yaroz",
		                   "zegol",
		                   "zezok",
		                   "zubash",
		                   "zugnath",
		                   "zunuguk"]
		    }
	};
	// Chains to handle different parts of words
	var start_c = new Chain();
	var word_c = new Chain();
	var end_c = new Chain();
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
		// Handles the list of names for the chains
		addList: function (race,gender,names) {
			if (!Name[race]) {
				Name[race] = {'male': [], 'female': []};
			}
			Name[race][gender] = names;
		},
		loadList: function (race, gender) { construct(Name[race][gender]); },
		addName: function (race,gender,name) { Name[race][gender].push(name); },
		getList: (function (race, gender) {return Name[race][gender];}),
		// Get all of the available names
		all: (function () {return Name;}),
		// Saves and loads the Name
        save: (function () {
    		// Save the new object
    		localStorage.setItem('name', JSON.stringify(Name));
    	}),
    	load: (function () {
    		// Load the stored object
    		if (localStorage['name']) {
    			Name = JSON.parse(localStorage['name']);
    		}
    	}),
		// Make a name from out chains
		make: function (number, length) { return name(number, length); },
		// Get our resulting Markov chains
		chain: (function() {return {'start': start_c, 'word': word_c, 'end': end_c };}),
		// Get a list of available race names
		races: (function () {
			var race = new Array();
			for (var k in Name) {
				race.push(k);
			}
			return race;
		}),
		// Get the number of entries for a race and/or gender
		getLength: (function (race,gender) {
			if (gender && race) {
				return Name[race][gender].length;
			}
			return 0;
		})
	};
};