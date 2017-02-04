// Initialise our dice data object
InitRegister('dice', function () {
    return [
        CreateDice( 'd20', 'roll(1,20)', 'Standard d20 roll' ),
        CreateDice( 'd6', 'roll(1,6)', 'Standard d6 roll' ),
        CreateDice( 'D&D Attribute', 'drop(4,6,1,0)', 'D&D 4d6 attribute roll' ),
    ]
});
