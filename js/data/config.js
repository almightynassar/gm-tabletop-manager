// Initialise our dice data object
InitRegister('config', function () {
    return {
        debug: true,
        modules: [
            'config',
            'dice',
            'font',
            'generator',
            'item',
            'markov',
            'words'
        ]
    }
});
