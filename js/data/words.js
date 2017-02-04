// Initialise our word data object
InitRegister('words', function () {
    return {
        direction: [
            'North',
            'North-West',
            'North-East',
            'South',
            'South-West',
            'South-East',
            'West',
            'East'
        ],
        colour: [
            'red',
            'blue',
            'green',
            'yellow',
            'purple',
            'orange',
            'white',
            'black',
            'grey',
            'brown',
            'violet',
            'crimson',
            'pink',
            'aqua',
            'maroon',
            'beige'
        ],
        urban: [
            'castle',
            'citadel',
            'city',
            'habitat',
            'hamlet',
            'harbour',
            'estate',
            'farm',
            'fortress',
            'manor',
            'market',
            'temple',
            'town',
            'village',
        ],
        rural: [
            'bay',
            'beach',
            'cave',
            'cavern',
            'copse',
            'desert',
            'forest',
            'grassland',
            'hills',
            'jungle',
            'lake',
            'mountains',
            'plains',
            'river',
            'savanah',
            'woodland',
        ],
        nobility: [
            'aristocrat',
            'baron',
            'baroness',
            'count',
            'countess',
            'duchess',
            'duke',
            'emperess',
            'emperor',
            'king',
            'lady',
            'lord',
            'noble',
            'prince',
            'princess',
            'queen',
        ],
        criminal: [
            'assassin',
            'bandit',
            'barbarian',
            'beggar',
            'cultist',
            'smuggler',
            'thief',
            'thug',
        ],
        profession: [
            'accountant',
            'architect',
            'astronomer',
            'baker',
            'banker',
            'bartender',
            'blacksmith',
            'brewer',
            'butcher',
            'carpenter',
            'clergyman',
            'craftsman',
            'diplomat',
            'dockhand',
            'doctor',
            'engineer',
            'farmer',
            'fisherman',
            'hunter',
            'innkeep',
            'labourer',
            'lawman',
            'mason',
            'merchant',
            'musician',
            'peasant',
            'priest',
            'sailor',
            'scientist',
            'servant',
            'soldier',
            'tailor',
            'teacher',
        ],
        monster: [
            'angel',
            'aberation',
            'banshee',
            'basilisk',
            'centaur',
            'chimera',
            'cockatrice',
            'cyclop',
            'demon',
            'devil',
            'dragon',
            'drake',
            'elemental',
            'gargoyle',
            'ghost',
            'ghoul',
            'giant',
            'gnoll',
            'goblin',
            'golem',
            'kobold',
            'manticore',
            'minotaur',
            'necromancer',
            'ogre',
            'orc',
            'owlbear',
            'poacher',
            'skeleton',
            'stirge',
            'troll',
            'vampire',
            'warband',
            'werewolf',
            'wight',
        ],
        relation: [
            'partner',
            'daughter',
            'son',
            'brother',
            'sister',
            'mother',
            'father',
            'uncle',
            'aunt',
            'grandmother',
            'grandfather',
            'cousin',
            'friend',
            'enemy'
        ],
        animal: [
            'ape',
            'badger',
            'bear',
            'beetle',
            'boar',
            'cat',
            'centipede',
            'crab',
            'crocodile',
            'deer',
            'dog',
            'donkey',
            'eagle',
            'elephant',
            'elk',
            'frog',
            'goat',
            'hawk',
            'horse',
            'hound',
            'hyena',
            'jackal',
            'lion',
            'lizard',
            'mastiff',
            'mule',
            'owl',
            'panther',
            'pony',
            'rabbit',
            'rat',
            'raven',
            'rhinoceros',
            'scorpian',
            'shark',
            'snake',
            'spider',
            'tiger',
            'toad',
            'vulture',
            'wasp',
            'warhorse',
            'weasel',
            'wight',
            'wolf',
        ],
        adjective: [
            "alluring",
            "articulate",
            "beautiful",
            "brilliant",
            "confused",
            "dangerous",
            "dazzling",
            "delightful",
            "demented",
            "desirable",
            "despicable",
            "dishonourable",
            "dull",
            "eloquent",
            "erotic",
            "flirty",
            "foul",
            "gorgeous",
            "handsome",
            "happy",
            "hard",
            "horrible",
            "immodest",
            "intelligent",
            "lucid",
            "lustful",
            "nasty",
            "perplexed",
            "pretty",
            "radiant",
            "raunchy",
            "rotten",
            "seductive",
            "senile",
            "sensual",
            "sexy",
            "shameless",
            "shiny",
            "sleepy",
            "stimulating",
            "strong",
            "stunning",
            "suggestive",
            "sultry",
            "tough",
            "troubled",
            "ugly",
            "vicious",
            "vile",
            "unsightly",
            "wicked"
        ],
        verbPresent: [
            "battling",
            "brawling",
            "celebrating",
            "dancing",
            "drinking",
            "eating",
            "feasting",
            "feuding",
            "fighting",
            "fornicating",
            "gliding",
            "killing",
            "planning",
            "playing",
            "running",
            "sailing",
            "searching",
            "sleeping",
            "sparring",
            "swimming",
            "teasing",
            "training",
            "writing"
        ],
        verb: [
            "to battle",
            "to dance",
            "to feast",
            "to fight",
            "to herd",
            "to kill",
            "to love",
            "to murder",
            "to sail",
            "to teach",
            "to tease",
            "to train",
            "to wash",
            "to write"
        ],
        adverbs: [
            "abnormally",
            "awkwardly",
            "bitterly",
            "boldly",
            "briefly",
            "carefully",
            "crazily",
            "cruelly",
            "curiously",
            "deceivingly",
            "defiantly",
            "diligently",
            "elegantly",
            "excitedly",
            "foolishly",
            "frequently",
            "gently",
            "gratefully",
            "hastily",
            "immediately",
            "intensely",
            "jealously",
            "judgementally",
            "keenly",
            "loudly",
            "loyally",
            "majestically",
            "miserably",
            "mockingly",
            "mysteriously",
            "nicely",
            "nervously",
            "obediently",
            "obnoxiously",
            "perfectly",
            "politely",
            "properly",
            "quietly",
            "rapidly",
            "recklesly",
            "safely",
            "sexily",
            "slowly",
            "subtly",
            "tenderly",
            "triumphantly",
            "unusually"
        ],
        valuable: [
            "amulet",
            "book",
            "dossier",
            "chest",
            "crown",
            "gems",
            "jewels",
            "jewellery",
            "painting",
            "minerals",
            "ship",
            "statuette",
            "tools",
            "weapons",
        ],
    }
});
