/**
 * The Shapies system
 * 
 * This will handle the instantiation of our Shapies game and other variables (including drawing)
 */
var Shapies = (function(window) {
    /* ============================================
     * CANVAS
     * 
     * Only one instance of the canvas will stored
     * ============================================
     */
    var canvas = (function () {
        /**
         * Instance stores a reference to the canvas Singleton
         */
        var instance;
        
        /**
         * Initialises the singleton constructor
         * 
         * This will create a canvas object with the id=Shapies, if one has not already been created
         */
        function init() {
            /**
             * Frames per second
             *  
             * Sets the default speed/timer for the draw() function
             */
            var fps = 24;
            
            /**
             * Our list of objects to draw
             */
            var objectList = {};
            
            /**
             * This is used to store our timer ID. This can be used to manipulate our timing function
             */
            var timerID = 0;
            
            /**
             * Create a new canvas element to add to the top of our document
             */
            var createCanvas = function() {
                var elem = window.document.createElement('canvas');
                elem.setAttribute('id', 'Shapies');
                elem.setAttribute('style', 'border: 5px solid black;');
                elem.setAttribute('width', 500);
                elem.setAttribute('height', 500);
                window.document.body.insertBefore(elem, window.document.body.firstChild);
                return elem;
            };
            
            /**
             * Our initial canvas element (straight from the DOM)
             */
            var localCanvas = (window.document.getElementById('Shapies') !== null) ? window.document.getElementById('Shapies') : createCanvas();
            
            // Set up some defaults for text writing
            localCanvas.getContext('2d').font = "bold 12px sans-serif";
            localCanvas.getContext('2d').fillStyle = 'black';
            
            /**
             * Clear the canvas of all items
             */
            var clear = function() {
                try {
                    // Save the context
                    localCanvas.getContext('2d').save();
                    // Use the identity matrix while clearing the canvas
                    localCanvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
                    localCanvas.getContext('2d').clearRect(0, 0, localCanvas.width, localCanvas.height);
                    // Restore the transform
                    localCanvas.getContext('2d').restore();
                    return true;
                } catch (err) {
                    console.log("ERROR - CANVAS: clear() hit an error");
                    console.log(err.name);
                    console.log(err.message);
                }
                return false;
            };
            
            /**
             * Goes through all objects and draws them
             */
            var draw = function() {
                clear();
                for (var i in objectList) {
                    try {
                        // Test that the object has a draw function
                        objectList[i].draw(localCanvas.getContext('2d'));
                    } catch (err) {
                        console.log("ERROR - CANVAS: draw() hit an error");
                        console.log(err.name);
                        console.log(err.message);
                    }
                }
            };
            
            /**
             * Start our timer
             */
            var startInterval = function() {
                if (timerID === 0) {
                    timerID = setInterval(draw, 1000/fps);
                    return true;
                }
                return false;
            };
            
            /**
             * Stop our timer
             */
            var stopInterval = function() {
                if (timerID > 0) {
                    clearInterval(timerID);
                    timerID = 0;
                    return true;
                }
                return false;
            };
            
            /**
             * Our public accessible canvas object
             */
            return {
                /**
                 * Sets or Get our Frames Per Second
                 */
                fps: function(newFPS){
                    if ((typeof newFPS == "number") && (newFPS !== null)) {
                        return (fps = newFPS);
                    }
                    return fps;
                },
                
                /**
                 * Starts our animation
                 */
                start: startInterval,
                
                /**
                 * Stops the animation
                 */
                stop: stopInterval,
                
                /**
                 * Add an actor to draw
                 */
                addActor: function(name, actor){
                    if ((typeof actor !== "undefined") && (actor !== null)) {
                        return (objectList[""+name] = actor);
                    }
                    return false;
                },
                
                /**
                 * Remove an actor
                 */
                deleteActor: function(name){
                    if (objectList.hasOwnProperty(name)) {
                        return (delete objectList[name]);
                    }
                    return false;
                },
                
                /**
                 * Return the mid-point of the canvas as an array
                 */
                midpoint: function() {
                    return [localCanvas.width/2, localCanvas.height/2];
                },
                
                /**
                 * Set or get the width
                 */
                width: function(newWidth) {
                    if ((typeof newWidth !== 'undefined') && (newWidth !== null)) {
                        return (localCanvas.width = newWidth);
                    }
                    return localCanvas.width;
                },
                
                /**
                 * Set or get the height
                 */
                height: function(newHeight) {
                    if ((typeof newHeight !== 'undefined') && (newHeight !== null)) {
                        return (localCanvas.height = newHeight);
                    }
                    return localCanvas.height;
                }
            };
        };
        /**
         * Instantiate only one version of the Canvas object
         */
        return {
          getInstance: function () {
            if ( !instance ) {
              instance = init();
            }
            return instance;
          }
        };
      })();
    
    /* ============================================
     * ACTORS
     * 
     * This defines a factory we can use to create objects to draw on canvas
     * ============================================
     */
    function Actors() {
        /**
         * Pure text object
         */
        function Text() {
            /**
             * Some variables
             */
            this.text = 'filler';
            this.point = [0,0];
            
            /**
             * Write some text onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.fillText(this.text, this.point[0], this.point[1]);
                    return true;
                } catch(err) {
                    console.log("ERROR - TEXT: draw() hit an error");
                    console.log(err.name);
                    console.log(err.message);
                }
                return false;
            };
        };
        
        
        /**
         * Draw an arc (either enclosed or open)
         */
        function Arc() {
            /**
             * Some variables
             */
            this.enclosed = false;
            this.colour = 'clear';
            this.border = 'clear';
            this.angles = [0, Math.PI];
            this.lengths = [5, 10];
            this.point = [0,0];
            
            /**
             * Draw a circle onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.beginPath();
                    context.arc(this.point[0], this.point[1], this.radius, this.angles[0], this.angles[1], false);
                    if (this.enclosed) {
                        context.closePath();
                    }
                    // Colour it in
                    if (this.colour !== 'clear') {
                        context.fillStyle = this.colour;
                        context.fill();
                    }
                    // Add in optional border
                    if (this.border !== 'clear') {
                        context.lineWidth = 1;
                        context.strokeStyle = this.border;
                        context.stroke();
                    }
                    // Finish the drawing
                    context.closePath();
                    return true;
                } catch(err) {
                    console.log("ERROR - ARC: draw() hit an error");
                    console.log(err.name);
                    console.log(err.message);
                }
                return false;
            };
        };
        
        /**
         * Draw an ellipse
         */
        function Ellipse() {
            /**
             * Some variables
             */
            this.colour = 'clear';
            this.border = 'clear';
            this.lengths = [5, 10];
            this.point = [0,0];
            
            /**
             * Draw an ellipse onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.beginPath();
                    var xLeft = this.point[0] - (this.lengths[0] / 2);
                    var xRight = this.point[0] + (this.lengths[0] / 2);
                    var yTop = this.point[1] - (this.lengths[1] / 2);
                    var yBot = this.point[1] + (this.lengths[1] / 2);
                    // NOTE: The moveTo() is needed to start the drawing from the correct spot
                    context.moveTo(this.point[0], yTop);
                    // Start drawing two bezier curves to create an ellipse
                    context.bezierCurveTo(xRight, yTop, xRight, yBot, this.point[0], yBot);
                    context.bezierCurveTo(xLeft, yBot, xLeft, yTop, this.point[0], yTop);
                    // Colour it in
                    if (this.colour !== 'clear') {
                        context.fillStyle = this.colour;
                        context.fill();
                    }
                    // Add in optional border
                    if (this.border !== 'clear') {
                        context.lineWidth = 1;
                        context.strokeStyle = this.border;
                        context.stroke();
                    }
                    // Finish the drawing
                    context.closePath();
                    return true;
                } catch(err) {
                    console.log("ERROR - ELLIPSE: draw() hit an error");
                    console.log(err.name);
                    console.log(err.message);
                }
                return false;
            };
        };
        
        /**
         * Draw an smilie
         */
        function Smilie() {
            /**
             * Some variables
             */
            this.colour = 'clear';
            this.eyecolour = 'clear';
            this.eyeborder = 'clear';
            this.smilecolour = 'clear';
            this.smileborder = 'clear';
            this.border = 'clear';
            this.radius = 100;
            this.point = [0,0];
            
            /**
             * Actions
             */
            this.attack = function() {
                alert("ATTACK!");
            };
            this.heal = function() {
                alert("HEAL!");
            };
            this.move = function() {
                alert("MOVE!");
            };
            
            /**
             * Draw an ellipse onto the canvas
             */
            this.draw = function(context) {
                try {
                    /**
                     * Draw the face
                     */
                    context.beginPath();
                    context.arc(this.point[0], this.point[1], this.radius, 0, 2*Math.PI, false);
                    // Colour it in
                    if (this.colour !== 'clear') {
                        context.fillStyle = this.colour;
                        context.fill();
                    }
                    // Add in optional border
                    if (this.border !== 'clear') {
                        context.lineWidth = 1;
                        context.strokeStyle = this.border;
                        context.stroke();
                    }
                    // Finish the drawing
                    context.closePath();
                    /**
                     * Draw the eyes
                     */
                    for (var i = 0; i < 2; i++) {
                        var base = (i !== 1) ? this.point[0] + (this.radius/ 2) : this.point[0] - (this.radius/ 2);
                        context.beginPath();
                        var xLeft =  base - (this.radius/5);
                        var xRight = base + (this.radius/5);
                        var yTop = this.point[1] - (this.radius/2) - (this.radius/4);
                        var yBot = this.point[1] - (this.radius/2) + (this.radius/4);
                        // NOTE: The moveTo() is needed to start the drawing from the correct spot
                        context.moveTo(base, yTop);
                        // Start drawing two bezier curves to create an ellipse
                        context.bezierCurveTo(xRight, yTop, xRight, yBot, base, yBot);
                        context.bezierCurveTo(xLeft, yBot, xLeft, yTop, base, yTop);
                        // Colour it in
                        if (this.eyecolour !== 'clear') {
                            context.fillStyle = this.eyecolour;
                            context.fill();
                        }
                        // Add in optional border
                        if (this.eyeborder !== 'clear') {
                            context.lineWidth = 1;
                            context.strokeStyle = this.eyeborder;
                            context.stroke();
                        }
                        // Finish the drawing
                        context.closePath();
                        /**
                         * Draw the smile
                         */
                        context.beginPath();
                        context.arc(this.point[0], this.point[1], this.radius/2, 0, Math.PI, false);
                        context.closePath();
                        // Colour it in
                        if (this.smilecolour !== 'clear') {
                            context.fillStyle = this.smilecolour;
                            context.fill();
                        }
                        // Add in optional border
                        if (this.smileborder !== 'clear') {
                            context.lineWidth = 1;
                            context.strokeStyle = this.smileborder;
                            context.stroke();
                        }
                        // Finish the drawing
                        context.closePath();
                    }
                    return true;
                } catch(err) {
                    console.log("ERROR - SMILIE: draw() hit an error");
                    console.log(err.name);
                    console.log(err.message);
                }
                return false;
            };
        };
        
        return {
            create: function(type, options) {
                switch (type) {
                    case 'text':
                        return new Text();
                    case 'arc':
                        return new Arc();
                    case 'ellipse':
                        return new Ellipse();
                    case 'smilie':
                        return new Smilie();
                }
                return false;
            }
        };
    };
    
    /* ============================================
     * SHAPIES
     * 
     * Our public API for the Shapies program
     * ============================================
     */
    return {
        /**
         * Return our Canvas object
         */
        canvas: function(){ return canvas.getInstance(); },
        
        /**
         * Helps create our actors
         */
        actors: new Actors()
    };
})(window);