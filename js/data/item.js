/**
 * Tech-Levels
 * 0 - Stone (primitive hunter and gather tools)
 * 1 - Ancient (simple metals; arithmetic; writing. Includes Bronze and Iron ages)
 * 2 - Medieval (steel; calculus; books. Includes Renaissance)
 * 3 - Industrial (steam; mechanical calculators; telegraph)
 * 4 - Mechanized (fossil fuels; electrical calculators; radio)
 * 5 - Digital (renewable energy; personal computers; networking)
 * 6 - Robotic (nanotech; artificial intelligence; human-machine interfaces. Includes stellar space travel)
 * 7 - Interstellar (FTL space travel; planetary colonization)
 * 8 - Exotic (extremely high-tech)
 */
InitRegister('item', function () {
    return [
        /**-----
         * WEAPONS
         *------
         */
        CreateItem( 'Light Pistol', 4, 100, .5, "weapon", "Range: 10/20/40, Damage: 2d6, ROF: 1, Shots: 12, Semi-Auto", "Small, lightweight pistol that fires bullets using chemical-based propellants. Magazine weighs .25 kg and costs 2 Credits." ),
        CreateItem( 'Pistol', 4, 200, 1, "weapon", "Range: 12/24/48, Damage: 2d6, ROF: 1, Shots: 24, AP: 1, Semi-Auto", "Standard pistol that fires bullets using chemical-based propellants. Magazine weighs .5 kg and costs 5 Credits." ),
        CreateItem( 'Assault Rifle', 4, 500, 5, "weapon", "Range: 24/48/96, Damage: 2d8, ROF: 3, Shots: 30, AP: 2, Auto, 3RB, Min Strength: d6", "Standard assault rifle that fires bullets using chemical-based propellants. Magazine weighs .5 kg and costs 6 Credits." ),
        CreateItem( 'Machine Gun', 4, 600, 15, "weapon", "Range: 30/60/120, Damage: 2d8, ROF: 4, Shots: 200, AP: 3, Min Strength: d8, Auto, Snapfire", "Large, powerful gun that fires bullets using chemical-based propellants. Magazine weighs 3.5 kg and costs 35 Credits" ),
        CreateItem( 'Revolver', 3, 300, 4, "weapon", "Range: 12/24/48, Damage: 2d8, ROF: 1, Shots: 6, AP: 2, Revolver", "Powerful revolver pistol that fires bullets using chemical-based propellants. 6 bullets weighs .25 kg and costs 2 Credits." ),
        CreateItem( 'Rifle', 3, 300, 5, "weapon", "Range: 24/48/96, Damage: 2d8, ROF: 1, Shots: 15, AP: 2, Min. Strength: d6", "Standard rifle that fires bullets using chemical-based propellants. Magazine weighs .3 kg and costs 3 Credits." ),
        CreateItem( 'Shotgun', 3, 500, 5, "weapon", "Range: 12/24/48, Damage: 3d6/2d6/1d6, ROF: 1, Shots: 6, +2 Shooting", "Powerful close quarters gun that fires shells using chemical-based propellants that spreads out across an area. Magazine weighs .5 kg and costs 6 Credits." ),
        CreateItem( 'SMG', 4, 300, 5, "weapon", "Range: 12/24/48, Damage: 2d6, ROF: 3, Shots: 30, AP: 1, Auto", "Small, portable automatic gun that fires bullets using chemical-based propellants. Magazine weighs .5 kg and costs 6 Credits." ),
        CreateItem( 'Sniper Rifle', 4, 600, 5, "weapon", "Range: -/320/640, Damage: 2d10, ROF: 1, Shots: 10, AP: 4, Snapfire, Heavy Weapon", "Long-range gun that fires bullets using chemical-based propellants. Magazine weighs .25 kg and costs 6 Credits." ),
        CreateItem( 'Gauss Gun', 5, 800, 6, "weapon", "Range: 48/96/192, Damage: 2d8+1, ROF: 1, Shots: 30, AP: 3, Semi-Auto, Min Strength: d8", "Military-grade gun that fires bullets using electromagnetic coils. Also known as a Coilgun and Mag Gun. Magazine weighs .5 kg and costs 6 Credits." ),
        CreateItem( 'Plasma Gun', 7, 1000, 6, "weapon", "Range: 10/20/40, Damage: 3d6, ROF: 1, AP: 5, Shots: 30, Semi-Auto, Heavy Weapon", "Military-grade gun that superheats a hydrogen pellet until it reaches it's plasma state, and then accelerates the plasma to it's target by magnetic coils. The plasma pellet dissapates relatively quickly, but causes a lot of damage. Magazine weighs .25 kg and costs 12 Credits." ),
        CreateItem( 'TDD Gun', 8, 2000, 6, "weapon", "Range: 12/24/48, Damage: 2d10, ROF: 1, AP: 5, Shots: 30, Semi-Auto, Heavy Weapon", "Exotic gun that uses TDD technology to shoot particles at a target. Spending a round calibrating the weapon onto it's target means the weapon can ignore cover. Magazines are rare if they are produced at all and weighs .25 kg" ),
        CreateItem( 'Grenade', 3, 50, 1, "weapon", "Range: 5/10/20, Damage: 3d6, Medium Burst", "Standard thrown grenade (can be launched from a modified weapon)" ),
        CreateItem( 'Stun Grenade', 5, 50, 1, "weapon", "Range: 5/10/20, Damage: 3d6, Medium Burst", "Grenade that stuns and not kill your opponent. Deals non-lethal damage and inflicts fatigue loss instead of wounds." ),
        CreateItem( 'Crossbow', 2, 100, 5, "weapon", "Range: 15/30/60, Damage: 2d6, ROF: 1, AP: 1, Min Strength: d6, 1 action reload", "Crossbows built on low tech worlds cannot affect modern armour" ),
        CreateItem( 'Sword', 1, 100, 4, "weapon", "Damage: Str+d8", "Standard metal sword. If built on a high-tech world, add 1 AP for each tech-level above 4 (add additional cost)" ),
        CreateItem( 'Knife', 1, 50, .5, "weapon", "Damage: Str+d4", "Standard metal knife. If built on a high-tech world, add 1 AP for every 2 tech-level above 4 (add additional cost)" ),
        CreateItem( 'Baton', 0, 25, .5, "weapon", "Damage: Str+d4", "Standard baton or club." ),
        CreateItem( 'EMP Cannon', 7, 1000, 6, "weapon", "Range: Cone, Damage: 2d8, ROF: 1, Shots: 10, Min. Strength: d6, EMP, Snapfire", "Designed to take out electronics quickly including Bots, Cyberware and Shells. They charge up and release a burst of EMP energy towards their target. Bots, Cyberware and Shells take normal damage ignoring armour. Everyone else suffers half damage as their neural system is overloaded." ),
        /**-----
         * EQUIPMENT
         *------
         */
        CreateItem( 'Portable Light', 4, 30, .5, "equipment", "Lantern mode: Large Burst, Torchlight: Cone", "Rugged all-purpose, all-environ light source. Can be easily switched to lantern and flashlight mode. Can work underwater and in vacuum." ),
        CreateItem( 'Breather', 5, 50, 1, "equipment", "Screens out toxins, chemicals, spores and other harmful materials. Cannot smell anything.", "Protection from noxious or toxic fumes in an otherwise breathable atmosphere. It also makes the native air smell sweeter." ),
        CreateItem( 'Climbing Gear', 3, 40, 1.5, "equipment", "+1 to Climbing rolls", "A pack containing rope, hooks, climbing spikes and everything else you will need (except protective gear)." ),
        CreateItem( 'Secure-Cuffs', 7, 75, 1, "equipment", "Strength target of 10. For each failed attempt, increase Strength target by 1", "Advanaced hand-cuffs that uses the energy from escape attempts to close the cuffs more.." ),
        CreateItem( 'Hand-cuffs', 3, 20, 0.5, "equipment", "Strength target of 10", "Standard hand-cuffs." ),
        /**-----
         * ANIMALS
         *------
         */
        CreateItem( 'Bird of Prey', 0, 30000, 2, "animal", "A pet that can be used for hunting", "Trained bird (falcon/hawk/eagle). Eagles are up to 5 times larger than other species." ),
        CreateItem( 'Dog', 0, 400, 40, "animal", "Loyally follows and obeys owner if trained properly", "Trained dog for hunting / guarding / other purpose." ),
        CreateItem( "Riding Horse", 0, 20000, 550, "animal", "Can carry up to 100 kg and pull twice it's bodyweight", "Animal suitable for riding."),
        CreateItem( "War Horse", 0, 40000, 900, "animal", "Can carry up to 180 kg and pull twice it's bodyweight", "Horse trained for battle."),
        /**-----
         * ART
         *------
         */
        CreateItem( 'Basic Statuette', 0, 100, 5, "art", "Made from common materials (wood / stone/ bone)", "Small statue that is considered aesthetically simple." ),
        CreateItem( 'Master Statuette', 0, 500, 10, "art", "Made from exquisite materials", "Statue that is considered aesthetically masterful." ),
        CreateItem( 'Basic Painting', 2, 500, 5, "art", "Basic canvas material that may be mounted onto a simple frame", "Mundane painting by a relatively unknown artist." ),
        CreateItem( 'Master Painting', 2, 5000, 10, "art", "Uses high quality materials", "A painting that some critics would call a masterpiece. This is the base price for such a painting." ),
        /**-----
         * CLOTHING
         *------
         */
        CreateItem( 'Boots', 1, 100, 2, "clothing", "Provides warmth in cold climates. No weight when worn.", "Sturdy footwear designed to keep wearer warm." ),
        CreateItem( 'Cape', 1, 50, 0.5, "clothing", "Aesthetic.", "Material worn off the shoulders. Usually with intricate patterns." ),
        CreateItem( 'Cloak', 1, 100, 3, "clothing", "Provides warmth in cold climates. No weight when worn.", "Thick clothing designed to keep the wearer warm." ),
        CreateItem( 'Coat', 1, 75, 2, "clothing", "Provides warmth in cold climates. No weight when worn.", "Thick clothing designed to keep the upper body warm." ),
        CreateItem( 'Dress', 1, 75, 1, "clothing", "Aesthetic.", "Pant-less clothing, usually worn by women." ),
        CreateItem( 'Gloves', 1, 25, 0.5, "clothing", "Provides warmth in cold climates.", "Pair of hand coverings." ),
        CreateItem( 'Hat', 1, 25, 0.5, "clothing", "Shades the eyes from the sun's glare.", "Provides protection from the sun for the head." ),
        CreateItem( 'Lingerie', 4, 125, 0.5, "clothing", "Aesthetic.", "Sexual clothing, usually worn by women." ),
        /**-----
         * GEMS
         *------
         */
        CreateItem( 'Amber', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent, golden, rare precious stone." ),
        CreateItem( 'Amethyst', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent, deep purple, rare precious stone." ),
        CreateItem( 'Aquamarine', 0, 1600, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent, pale blue-green, very rare precious stone." ),
        CreateItem( 'Azurite', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent, golden, common ornamental stone." ),
        CreateItem( 'Banded Agate', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent, striped brown / blue / white / red, common ornamental stone." ),
        CreateItem( 'Bloodstone', 0, 700, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque dark gray with red flecks, semi-precious stone." ),
        CreateItem( 'Carnelian', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque red-brown, semi-precious stone." ),
        CreateItem( 'Chaldony', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque white, semi-precious stone." ),
        CreateItem( 'Chrysoberyl', 0, 1000, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent pale-green, rare semi-precious stone." ),
        CreateItem( 'Coral', 0, 2400, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque crimson, rare precious stone." ),
        CreateItem( 'Diamond', 0, 8000, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent blue-white, rare jewel." ),
        CreateItem( 'Emerald', 0, 6000, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent brilliant green, rare jewel." ),
        CreateItem( 'Garnet', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent red, rare precious stone." ),
        CreateItem( 'Hematite', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque gray-black, common ornamental stone." ),
        CreateItem( 'Jade', 0, 4000, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent light green, rare precious stone." ),
        CreateItem( 'Jasper', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque blue / black / brown, semi-precious stone." ),
        CreateItem( 'Jet', 0, 3600, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque deep black, rare precious stone." ),
        CreateItem( 'Lapis Lazuli', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque blue with yellow flecks, common ornamental stone." ),
        CreateItem( 'Malachite', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque striated light and dark green, common ornamental stone." ),
        CreateItem( 'Moonstone', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent white with a pale blue glow, semi-precious stone." ),
        CreateItem( 'Obsidian', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque black ornamental stone." ),
        CreateItem( 'Onyx', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque bands of black and white, semi-precious stone." ),
        CreateItem( 'Opal', 0, 6000, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent pale blue with golden mottling, very rare jewel." ),
        CreateItem( 'Pearl', 0, 2400, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque lustrous white, rare precious stone." ),
        CreateItem( 'Peridot', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent rich olive green, semi-precious stone." ),
        CreateItem( 'Quartz', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent white, semi-precious stone." ),
        CreateItem( 'Moonstone', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent white with a pale blue glow, semi-precious stone." ),
        CreateItem( 'Ruby', 0, 6000, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent deep crimson, rare jewel." ),
        CreateItem( 'Sapphire', 0, 6000, 0.5, "gem", "Uncut gemstone, double if cut.", "Translucent blue, rare jewel." ),
        CreateItem( 'Sardonyx', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque bands of red and white, semi-precious stone." ),
        CreateItem( 'Spinel', 0, 1600, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent red / green / deep-blue, rare precious stone." ),
        CreateItem( 'Topaz', 0, 2400, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent golden yellow, rare precious stone." ),
        CreateItem( 'Tourmaline', 0, 800, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent pale green, rare precious stone." ),
        CreateItem( 'Turquoise', 0, 250, 0.5, "gem", "Uncut gemstone, double if cut.", "Opaque light blue-green ornamental stone." ),
        CreateItem( 'Zircon', 0, 500, 0.5, "gem", "Uncut gemstone, double if cut.", "Transparent pale blue-green, semi-precious stone." ),
    ];
});
