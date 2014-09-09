/* ===========================================
 * JavaScript HTML5 Canvas extensions
 * ===========================================
 */

if (window.CanvasRenderingContext2D) {
    /**
     * Cavas reset
     */
    CanvasRenderingContext2D.prototype.reset= function() {
        this.translate(0,0);
        this.fillStyle = "white";
        this.strokeStyle = "white";
    };
    /**
     * Rounded Rectangle
     */
    CanvasRenderingContext2D.prototype.roundedRect = function(x, y, width, height, radius, colour, border, lineWidth, alpha) {
        // if certain values are not set just set defaults
        if(!x || !y || !width || !height) { x = 10; y=10; width=5; height=5; }
        // Set other values
        if (!radius) { radius = 5; }
        if (!alpha) { alpha=1; }
        // Start drawing the rounded rectangle
        var x_left = x - (width/2);
        var x_right = x + (width/2);
        var y_top = y - (height/2);
        var y_bot = y + (height/2);
        this.save();
        this.reset();
        this.beginPath();
        this.moveTo(x_left + radius, y_top);
        this.lineTo(x_right - radius, y_top);
        this.quadraticCurveTo(x_right, y_top, x_right, y_top + radius);
        this.lineTo(x_right, y_bot - radius);
        this.quadraticCurveTo(x_right, y_bot, x_right - radius, y_bot);
        this.lineTo(x_left + radius, y_bot);
        this.quadraticCurveTo(x_left, y_bot, x_left, y_bot - radius);
        this.lineTo(x_left, y_top + radius);
        this.quadraticCurveTo(x_left, y_top, x_left + radius, y_top);
        // Colour it in
        if (colour) {
            this.globalAlpha = alpha;
            this.fillStyle = colour;
            this.fill();
        }
        // Add in optional border
        if (border) {
            this.lineWidth = (lineWidth) ? lineWidth : 1;
            this.strokeStyle = border;
            this.stroke();
        }
        this.closePath();
        this.restore();
    };
    /**
     * Ellipse
     */
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, width, height, colour, border, lineWidth, alpha) {
        // if certain values are not set just exit
        if (!x || !y || !width || !height) { return true; }
        if (!alpha) { alpha=1; }
        // Calculate some points
        var xLeft = x - (width / 2);
        var xRight = x + (width / 2);
        var yTop = y - (height / 2);
        var yBot = y + (height / 2);
        // Draw the ellipse
        this.save();
        this.reset();
        this.beginPath();
        // NOTE: The moveTo() is needed to start the drawing from the correct spot
        this.moveTo(x, yTop);
        // Start drawing two bezier curves to create an ellipse
        this.bezierCurveTo(xRight, yTop, xRight, yBot, x, yBot);
        this.bezierCurveTo(xLeft, yBot, xLeft, yTop, x, yTop);
        // Colour it in
        if (colour) {
            this.globalAlpha = alpha;
            this.fillStyle = colour;
            this.fill();
        }
        // Add in optional border
        if (border) {
            this.lineWidth = (lineWidth) ? lineWidth : 1;
            this.strokeStyle = border;
            this.stroke();
        }
        // Finish the drawing
        this.closePath();
        this.restore();
    };
    /**
     * Rounded arcs and circles
     */
    CanvasRenderingContext2D.prototype.circularArc = function(x, y, radius, startAng, endAng, colour, border, lineWidth, enclosed, direction, alpha) {
        // if certain values are not set just exit
        if (!x || !y || !radius) { return true; }
        // Set other values
        if (!alpha) { alpha=1; }
        if (!startAng) { startAng = 0; }
        if (!endAng) { endAng = Math.PI; }
        if (!direction) { direction = false; }
        // Start drawing
        this.save();
        this.reset();
        this.beginPath();
        this.arc(x, y, radius, startAng, endAng, direction);
        this.globalAlpha = alpha;
        if (enclosed) {
            this.closePath();
        }
        // Colour it in
        if (colour) {
            this.fillStyle = colour;
            this.fill();
        }
        // Add in optional border
        if (border) {
            this.lineWidth = (lineWidth) ? lineWidth : 1;
            this.strokeStyle = border;
            this.stroke();
        }
        // Finish the drawing
        this.closePath();
        this.restore();
    };
    /**
     * Lightbulb
     */
    CanvasRenderingContext2D.prototype.lightbulb = function(x, y, size, colour, border, lineWidth, alpha, baseColour) {
        // if certain values are not set just exit
        if (!x || !y || !size) { return true; }
        // Some standard points for the bulb curve
        var sizeBy3 = size/3;
        var sizeBy2 = size/2;
        var x_right = x+size;
        var x_left = x-size;
        var y_top = y-size;
        var y_bot = y+size;
        // Set other values
        if (!alpha) { alpha=1; }
        this.save();
        this.reset();
        this.beginPath();
        // The bulb
        this.moveTo(x_right,y);
        this.bezierCurveTo(x_right,y+sizeBy3,x+sizeBy2,y+sizeBy2,x+sizeBy2,y_bot);
        this.lineTo(x-sizeBy2,y_bot);
        this.bezierCurveTo(x-sizeBy2,y+sizeBy2,x_left,y+sizeBy3,x_left,y);
        this.bezierCurveTo(x_left,y-sizeBy2,x-sizeBy2,y_top,x,y_top);
        this.bezierCurveTo(x+sizeBy2,y_top,x_right,y-sizeBy2,x_right,y);
        // Colour it in
        if (colour) {
            this.globalAlpha = alpha;
            this.fillStyle = colour;
            this.fill();
        }
        // Add in optional border
        if (border) {
            this.lineWidth = (lineWidth) ? lineWidth : 1;
            this.strokeStyle = border;
            this.stroke();
        }
        this.closePath();
        this.restore();
        if (baseColour) {
            this.roundedRect(x, y_bot+(sizeBy3/2), size, sizeBy3, 5, baseColour, border, lineWidth, alpha);
        }
    };
}

/* ===========================================
 * Shapies main code
 * ===========================================
 */

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
                },
                
                context: function() {
                    return localCanvas.getContext('2d');
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
        function RoundedRectangle() {
            /**
             * Some variables
             */
            this.colour = 'clear';
            this.border = 'clear';
            this.radius = 10;
            this.point = [0,0];
            this.length = [5,10];
            this.lineWidth = 1;
            
            /**
             * Draw a circle onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.roundedRect(this.point[0],this.point[1], this.length[0], this.length[1], this.radius, this.colour, this.border, this.lineWidth, this.alpha);
                    return true;
                } catch(err) {
                    console.log("ERROR - RoundedRectangle: draw() hit an error");
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
            this.angles = [0, 2*Math.PI];
            this.radius = 10;
            this.point = [0,0];
            this.lineWidth = 1;
            this.direction = false;
            
            /**
             * Draw a circle onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.circularArc(this.point[0], this.point[1], this.radius, this.angles[0], this.angles[1], this.colour, this.border, this.lineWidth, this.enclosed, this.direction);
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
            this.lineWidth = 1;
            this.alpha = 1;
            
            /**
             * Draw an ellipse onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.ellipse(this.point[0], this.point[1], this.lengths[0], this.lengths[1], this.colour, this.border, this.lineWidth, this.alpha);
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
         * Draw an Lightbulb
         */
        function Lightbulb() {
            /**
             * Some variables
             */
            this.colour = 'clear';
            this.border = 'clear';
            this.base = 'clear';
            this.size = 5;
            this.point = [0,0];
            this.lineWidth = 1;
            this.alpha = 1;
            
            /**
             * Draw an ellipse onto the canvas
             */
            this.draw = function(context) {
                try {
                    context.lightbulb(this.point[0], this.point[1], this.size, this.colour, this.border, this.lineWidth, this.alpha, this.base);
                    return true;
                } catch(err) {
                    console.log("ERROR - LIGHTBULB: draw() hit an error");
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
            this.colour = 'yellow';
            this.eyecolour = 'blue';
            this.eyeborder = 'black';
            this.smilecolour = 'red';
            this.smileborder = 'black';
            this.border = 'black';
            this.lineWidth = 1;
            this.radius = 100;
            this.point = [0,0];
            this.alpha = 1;
            
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
            this.left = function() {
            	this.point[0] = this.point[0] - (this.radius * 0.25);
            };
            this.right = function() {
            	this.point[0] = this.point[0] + (this.radius * 0.25);
            };
            this.up = function() {
            	this.point[1] = this.point[1] - (this.radius * 0.25);
            };
            this.down = function() {
            	this.point[1] = this.point[1] + (this.radius * 0.25);
            };
            
            /**
             * Draw an ellipse onto the canvas
             */
            this.draw = function(context) {
                try {
                    /**
                     * Draw the face
                     */
                    context.circularArc(this.point[0], this.point[1], this.radius, 0, 2*Math.PI, this.colour, this.border, this.lineWidth, false, false, this.alpha);
                    /**
                     * Draw the eyes
                     */
                    for (var i = 0; i < 2; i++) {
                        var base = (i !== 1) ? this.point[0] + (this.radius/ 2) : this.point[0] - (this.radius/ 2);
                        context.ellipse(base, this.point[1] - (this.radius/2), (this.radius/5), (this.radius/4), this.eyecolour, this.eyeborder, this.lineWidth, this.alpha);
                    }
                    /**
                     * Draw the smile
                     */
                    context.circularArc(this.point[0], this.point[1], this.radius/2, 0, Math.PI, this.smilecolour, this.smileborder, this.lineWidth, true, false, this.alpha);
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
                    case 'roundedrectangle':
                        return new RoundedRectangle();
                    case 'lightbulb':
                        return new Lightbulb();
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