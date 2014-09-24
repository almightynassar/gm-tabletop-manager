/* ===========================================
 * DnD main code
 * ===========================================
 */

/**
 * The DnD system
 * 
 * This will handle the instantiation of our variables (including drawing)
 */
var DnD = (function(window) {	
	/* ============================================
     * Creature Object
     * ============================================
     */
	function Creature() {
		/**
		 * Speed Calculations
		 */
		function speed() { return race.getSpeed() + career.getSpeed() + speedMod + armour.speed; };
		function speedFeet(minutes) { return Math.round((speed() * 5)*(minutes/6)); };
		function speedMetre(minutes) { return (speedFeet(minutes) * 0.305).toFixed(1); };
		function speedYard(minutes) { return (speedFeet(minutes)/3).toFixed(1); };
		function speedMile(hours) { return Math.round(speedYard(60*hours)/1760); };
		function speedKilometre(hours) { return Math.round(speedMetre(60*hours)/1000); };
		
		/**
		 * Hit Points
		 */
		
		
		// ======== INFORMATION ===========
		/**
		 * Reach
		 
		this.getReach = (function () {
			switch (this.size) {
				case 0:
					return 0;
					break;
				case 1:
					return 1;
					break;
				default:
					return this.size-1;
					break;
			}
			return 1;
		});
		
		/**
		 * Square space needed
		 
		this.getSquare = (function () {
			switch (this.size) {
				case 0:
					return 0.5;
					break;
				case 1:
					return 1;
					break;
				default:
					return this.size-1;
					break;
			}
			return 1;
		});
		
		
		*/
	}
})(window);