// The Canvas we will be drawing on
function Canvas(element) {
    /**
     * PRIVATE
     */

    // The private id value of the canvas element and it's getter/setters
    this._id = (typeof element !== 'undefined') && (element !== null) ? element : 'stage';

    // Simple test that checks if the element with the specified ID exists
    this._idExists = function() {
        if (document.getElementById(this._id) !== null) {
            return true;
        }
        return false;
    };

    // Create a new canvas element
    this._createCanvas = function() {
        var elem = document.createElement('canvas');
        elem.setAttribute('id', this._id);
        elem.setAttribute('style', 'border: 5px solid black;');
        elem.setAttribute('width', 500);
        elem.setAttribute('height', 500);
        document.body.insertBefore(elem, document.body.firstChild);
        return elem;
    };

    // Private reference to the canvas element
    this._canvas = this._idExists() ? document.getElementById(this._id) : this._createCanvas();

    // Frames per second (for our drawing function)
    this._fps = 24;

    /**
     * PUBLIC
     */

    // Getter/Setter for the ID value
    this.setID = function(id) {
        this._id = (typeof id !== 'undefined') && (id !== null) ? id : 'stage';
    };
    this.getID = function() {
        return this._id;
    };

    // Canvas values
    this.getWidth = function() {
        return this._canvas.width;
    };
    this.getHeight = function() {
        return this._canvas.height;
    };
    this.getCenterX = function() {
        return this._canvas.width / 2;
    };
    this.getCenterY = function() {
        return this._canvas.height / 2;
    };
    this.setWidth = function(newWidth) {
        this._canvas.width = (typeof newWidth !== 'undefined') && (newWidth !== null) ? newWidth : 500;
    };
    this.setHeight = function(newHeight) {
        this._canvas.height = (typeof newHeight !== 'undefined') && (newHeight !== null) ? newHeight : 500;
    };

    // Drawing values
    this.getFPS = function() {
        return this._fps;
    };
    this.getTimerFPS = function() {
        return 1000 / this._fps;
    };
    this.setFPS = function(newFPS) {
        this._fps = (typeof newFPS !== 'undefined') && (newFPS !== null) ? newFPS : 24;
    };

    // Returns the context
    this.context = function() {
        return this._canvas.getContext('2d');
    };

    // Tests if canvas supported
    this.isSupported = function() {
        return !!(this._canvas.getContext && this._canvas.getContext('2d'));
    };

    // Clear the canvas
    this.clear = function() {
        // Store the current transformation matrix
        var ctx = this.context();
        ctx.save();
        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
        // Restore the transform
        ctx.restore();
    };

    // Write some text onto the canvas
    this.write = function(text, x, y) {
        text = ((typeof text !== 'undefined') && (text !== null)) ? text : 'test';
        x = ((typeof x !== 'undefined') && (x !== null)) ? x : this.getCenterX();
        y = ((typeof y !== 'undefined') && (y !== null)) ? y : this.getCenterY();
        this.context().font = "bold 12px sans-serif";
        this.context().fillStyle = 'black';
        this.context().fillText(text, x, y);
    };
}

// The Smilie object
function Smilie(canvas, x, y, radius, colour) {
    /**
     * PRIVATE
     */

    // Some drawing defaults
    this._curX = ((typeof x !== 'undefined') && (x !== null)) ? x : canvas.getCenterX();
    this._curY = ((typeof y !== 'undefined') && (y !== null)) ? y : canvas.getCenterY();
    this._radius = ((typeof radius !== 'undefined') && (radius !== null)) ? radius : canvas.getCenterX() / 4;
    this._colour = ((typeof colour !== 'undefined') && (colour !== null)) ? colour : 'yellow';
    this._border = 'black';

    // For eyes
    this._maxEyeHeight = this._radius / 4;
    this._curEyeHeight = this._maxEyeHeight;
    this._maxEyeWidth = this._radius / 5;
    this._curEyeWidth = this._maxEyeWidth;
    this._eyeDistance = 2;

    // For Smile
    this._smileOpen = false;
    this._smileRadius = 2;
    this._smileColour = 'red';

    // For blinking
    //this._eyeOpenTime = 0;
    //this._timeBtwBlinks = 4000;
    //this._blinkUpdateTime = 1000;
    //this._eyeColour = 'red';

    /**
     * PUBLIC
     */

    // Sets up the physical properties
    this.getCurX = function() { return this._curX; };
    this.getCurY = function() { return this._curY; };
    this.setCurX = function(newX) {
        this._curX = (typeof newX !== 'undefined') && (newX !== null) ? newX : canvas.getCenterX();
    };
    this.setCurY = function(newY) {
        this._curY = (typeof newY !== 'undefined') && (newY !== null) ? newY : canvas.getCenterY();
    };
    this.getColour = function() { return this._colour; };
    this.setColour = function(newColour) { 
        this._colour = (typeof newColour !== 'undefined') && (newColour !== null) ? newColour : 'yellow';
    };
    this.getBorder = function() { return this._border; };
    this.setBorder = function(newColour) { 
        this._border = (typeof newColour !== 'undefined') && (newColour !== null) ? newColour : 'black';
    };
    this.getSmileColour = function() { return this._smileColour; };
    this.setSmileColour = function(newColour) { 
        this._smileColour = (typeof newColour !== 'undefined') && (newColour !== null) ? newColour : 'red';
    };
    this.getEyeColour = function() { return this._eyeColour; };
    this.setEyeColour = function(newColour) { 
        this._eyeColour = (typeof newColour !== 'undefined') && (newColour !== null) ? newColour : 'red';
    };

    // Determines if we are in the blink state
    this.updateBlink = function() {
        //this._eyeOpenTime += this._blinkUpdateTime;
        //if (this._eyeOpenTime >= this._timeBtwBlinks) {
            this.blink();
        //}
    };

    // Performs the blink action
    this.blink = function() {
        this._curEyeHeight -= 1;
        if (this._curEyeHeight <= 0) {
            this._eyeOpenTime = 0;
            this._curEyeHeight = this._maxEyeHeight;
        } else {
            setTimeout(this.blink, 10);
        }
    };

    // Draw our Smilie
    this.draw = function() {
        this.circle(this._curX, this._curY, this._radius, this._colour, this._border);
        this.ellipse(this._curX+(this._radius/ 2), this._curY-(this._radius / this._eyeDistance), this._curEyeWidth, this._curEyeHeight, this._eyeColour);
        this.ellipse(this._curX-(this._radius / 2), this._curY-(this._radius / this._eyeDistance), this._curEyeWidth, this._curEyeHeight, this._eyeColour);
        this.arc(this._curX, this._curY, this._radius/this._smileRadius, 0, Math.PI, this._smileOpen, this._smileColour, this._border);
    };

    // Draw a circle with optional border
    this.circle = function(x, y, radius, colour, border) {
        // Set defaults
        colour = typeof colour !== 'undefined' ? colour : 'clear';
        border = typeof border !== 'undefined' ? border : 'clear';

        // Draw our circle
        canvas.context().beginPath();
        canvas.context().arc(x, y, radius, 0, 2 * Math.PI, false);
        // Colour it in
        if (colour !== 'clear') {
            canvas.context().fillStyle = colour;
            canvas.context().fill();
        }
        // Add in optional border
        if (border !== 'clear') {
            canvas.context().lineWidth = 1;
            canvas.context().strokeStyle = border;
            canvas.context().stroke();
        }
        // Finish the drawing
        canvas.context().closePath();
    };

    // Draw an arc (either enclosed or open)
    this.arc = function(x, y, radius, beginAng, endAng, enclosed, colour, border) {
        // Set defaults
        enclosed = typeof enclosed !== 'undefined' ? enclosed : true;
        colour = typeof colour !== 'undefined' ? colour : 'clear';
        border = typeof border !== 'undefined' ? border : 'clear';

        // Draw our arc
        canvas.context().beginPath();
        canvas.context().arc(x, y, radius, beginAng, endAng, false);
        // Enclose the arc
        if (enclosed) {
            canvas.context().closePath();
            // Colour it in
            if (colour !== 'clear') {
                canvas.context().fillStyle = colour;
                canvas.context().fill();
            }
        }
        // Draw the border
        if (border !== 'clear') {
            canvas.context().lineWidth = 1;
            canvas.context().strokeStyle = border;
            canvas.context().stroke();
        }
        // Finish the drawing
        canvas.context().closePath();
    };

    // Draw an ellipse
    this.ellipse = function(x, y, width, height, colour, border) {
        // Set defaults
        colour = typeof colour !== 'undefined' ? colour : 'clear';
        border = typeof border !== 'undefined' ? border : 'clear';

        // Some reference points
        canvas.context().beginPath();
        var xLeft = x - (width / 2);
        var xRight = x + (width / 2);
        var yTop = y - (height / 2);
        var yBot = y + (height / 2);
        // NOTE: The moveTo() is needed to start the drawing from the correct spot
        canvas.context().moveTo(x, yTop);
        // Start drawing two bezier curves to create an ellipse
        canvas.context().bezierCurveTo(xRight, yTop, xRight, yBot, x, yBot);
        canvas.context().bezierCurveTo(xLeft, yBot, xLeft, yTop, x, yTop);
        // Colour it in
        if (colour !== 'clear') {
            canvas.context().fillStyle = colour;
            canvas.context().fill();
        }
        // Draw the border
        if (border !== 'clear') {
            canvas.context().lineWidth = 1;
            canvas.context().strokeStyle = border;
            canvas.context().stroke();
        }
        // Finish the drawing
        canvas.context().closePath();
    };

    setInterval(this.updateBlink, this._blinkUpdateTime);
}

// Grab the Canvas and Drawing Context
var canvas = new Canvas('canvas');

var sm1 = new Smilie(canvas, 100, 50, 50, 'blue');

// Object properties
var curX = canvas.getCenterX();
var curY = canvas.getCenterY();

// Face properties
var faceRadius = canvas.getCenterX() / 4;

// Smile properties
var smileType = true;
var smileTime = 0;
var timeBtwSmiles = 3000;
var smileUpdateTime = 50;

// Movement properties
var moveDir = true;

// Eye properites
var maxEyeHeight = faceRadius / 4;
var curEyeHeight = maxEyeHeight;
var maxEyeWidth = faceRadius / 5;
var curEyeWidth = maxEyeWidth;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 1000;

// Set up events
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var moveTimer = setInterval(updateMove, canvas.getTimerFPS());
var drawTimer = setInterval(redraw, canvas.getTimerFPS());

// Draw our scene
function redraw() {
    canvas.clear();

    // Draw the face, smile and eyes
    drawFace(curX, curY, faceRadius, 'yellow');
    if (smileType) {
        drawSmile(curX, curY, faceRadius / 2);
    } else {
        drawWideSmile(curX, curY, faceRadius / 2);
    }
    drawEye(curX + (faceRadius / 2), curY - (faceRadius / 2), curEyeWidth,
            curEyeHeight);
    drawEye(curX - (faceRadius / 2), curY - (faceRadius / 2), curEyeWidth,
            curEyeHeight);
    
    sm1.draw();
}

// Determines if we are in the blink state
function updateBlink() {
    eyeOpenTime += blinkUpdateTime;
    if (eyeOpenTime >= timeBtwBlinks) {
        blink();
    }
}

// Performs the blink action
function blink() {
    curEyeHeight -= 1;
    if (curEyeHeight <= 0) {
        eyeOpenTime = 0;
        curEyeHeight = maxEyeHeight;
    } else {
        setTimeout(blink, 10);
    }
}

// Moves the face
function updateMove() {
    if (moveDir) {
        curX -= 1;
        if (curX <= faceRadius) {
            moveDir = false;
        }
    } else {
        curX += 1;
        if (curX >= (canvas.getWidth() - faceRadius)) {
            moveDir = true;
        }
    }
}

// Determines if we are in the smile state
function updateSmile() {
    smileTime += smileUpdateTime;
    if (smileTime >= timeBtwSmiles) {
        smileType = !(smileType);
        smileTime = 0;
    }
}

// Draw our face
function drawFace(x, y, radius, colour) {
    drawCircle(x, y, radius, colour, 'black');
}

// Draw our wide smile
function drawWideSmile(x, y, radius) {
    drawArc(x, y, radius, 0, Math.PI, true, 'red', 'black');
}

// Draw our smile
function drawSmile(x, y, radius) {
    drawArc(x, y, radius, 0, Math.PI, false, 'clear', 'black');
}

// Draw a single eye
function drawEye(x, y, width, height) {
    drawEllipse(x, y, width, height, 'blue', 'black');
}

// Draw a circle with optional border
function drawCircle(x, y, radius, colour, border) {
    // Set defaults
    colour = typeof colour !== 'undefined' ? colour : 'clear';
    border = typeof border !== 'undefined' ? border : 'clear';

    // Draw our circle
    canvas.context().beginPath();
    canvas.context().arc(x, y, radius, 0, 2 * Math.PI, false);
    // Colour it in
    if (colour !== 'clear') {
        canvas.context().fillStyle = colour;
        canvas.context().fill();
    }
    // Add in optional border
    if (border !== 'clear') {
        canvas.context().lineWidth = 1;
        canvas.context().strokeStyle = border;
        canvas.context().stroke();
    }
    // Finish the drawing
    canvas.context().closePath();
}

// Draw an arc (either enclosed or open)
function drawArc(x, y, radius, beginAng, endAng, enclosed, colour, border) {
    // Set defaults
    enclosed = typeof enclosed !== 'undefined' ? enclosed : true;
    colour = typeof colour !== 'undefined' ? colour : 'clear';
    border = typeof border !== 'undefined' ? border : 'clear';

    // Draw our arc
    canvas.context().beginPath();
    canvas.context().arc(x, y, radius, beginAng, endAng, false);
    // Enclose the arc
    if (enclosed) {
        canvas.context().closePath();
    }
    // Colour it in
    if (colour !== 'clear') {
        canvas.context().fillStyle = colour;
        canvas.context().fill();
    }
    // Draw the border
    if (border !== 'clear') {
        canvas.context().lineWidth = 1;
        canvas.context().strokeStyle = border;
        canvas.context().stroke();
    }
    // Finish the drawing
    canvas.context().closePath();
}

// Draw an ellipse
function drawEllipse(x, y, width, height, colour, border) {
    // Set defaults
    colour = typeof colour !== 'undefined' ? colour : 'clear';
    border = typeof border !== 'undefined' ? border : 'clear';

    // Some reference points
    canvas.context().beginPath();
    var xLeft = x - (width / 2);
    var xRight = x + (width / 2);
    var yTop = y - (height / 2);
    var yBot = y + (height / 2);
    // NOTE: The moveTo() is needed to start the drawing from the correct spot
    canvas.context().moveTo(x, yTop);
    // Start drawing two bezier curves to create an ellipse
    canvas.context().bezierCurveTo(xRight, yTop, xRight, yBot, x, yBot);
    canvas.context().bezierCurveTo(xLeft, yBot, xLeft, yTop, x, yTop);
    // Colour it in
    if (colour !== 'clear') {
        canvas.context().fillStyle = colour;
        canvas.context().fill();
    }
    // Draw the border
    if (border !== 'clear') {
        canvas.context().lineWidth = 1;
        canvas.context().strokeStyle = border;
        canvas.context().stroke();
    }
    // Finish the drawing
    canvas.context().closePath();
}
