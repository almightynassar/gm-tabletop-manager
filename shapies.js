// Grab the Canvas and Drawing Context
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Reference positions
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// Our frames per second
var fps = 24;

// Object properties
var curX = centerX;
var curY = centerY;

// Face properties
var faceRadius = centerX / 4;

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
var smileTimer = setInterval(updateSmile, smileUpdateTime);
var moveTimer = setInterval(updateMove, 1000 / fps);
var drawTimer = setInterval(redraw, 1000 / fps);

// Draw our scene
function redraw() {
  // Clear the canvas
  canvas.width = canvas.width;
  // Draw the face, smile and eyes
  drawFace(curX, curY, faceRadius, 'yellow');
  if (smileType) {
    drawSmile(curX, curY, faceRadius / 2);
  } else {
    drawWideSmile(curX, curY, faceRadius /2);
  }
  drawEye(curX + (faceRadius / 2), curY - (faceRadius / 2), curEyeWidth, curEyeHeight);
  drawEye(curX - (faceRadius / 2), curY - (faceRadius / 2), curEyeWidth, curEyeHeight);
}

// Write some text
function writeText(text, x, y) {
  context.font = "bold 12px sans-serif";
  context.fillText(text, x, y);
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
    if (curX >= (canvas.width - faceRadius)) {
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
  drawArc(x, y, radius, 0, Math.PI, false , 'clear', 'black');
}

// Draw a single eye
function drawEye(x, y, width, height) {
  drawEllipse(x, y, width, height, 'blue', 'black');
}

// Draw a circle with optional border
function drawCircle(x, y, radius, colour = 'clear', border = 'clear') {
  // Draw our circle
  context.beginPath();
  context.arc(x, y, radius, 0, 2*Math.PI, false);
  // Colour it in
  if (colour != 'clear') {
    context.fillStyle = colour;
    context.fill();
  }
  // Add in optional border
  if (border != 'clear') {
    context.lineWidth = 5;
    context.strokeStyle = border;
    context.stroke();
  }
  // Finish the drawing
  context.closePath();
}

// Draw an arc (either enclosed or open)
function drawArc(x, y, radius, beginAng, endAng, enclosed = true, colour = 'clear', border = 'clear') {
  // Draw our arc
  context.beginPath();
  context.arc(x, y, radius, beginAng, endAng, false);
  // Enclose the arc
  if (enclosed) {
    context.closePath();
  }
  // Colour it in
  if (colour != 'clear') {
    context.fillStyle = colour;
    context.fill();
  }
  // Draw the border
  if (border != 'clear') {
    context.lineWidth = 5;
    context.strokeStyle = border;
    context.stroke();
  }
  // Finish the drawing
  context.closePath();
}

// Draw an ellipse
function drawEllipse(x, y, width, height, colour = 'clear', border = 'clear') {
  // Some reference points
  context.beginPath();
  xLeft = x - (width / 2);
  xRight = x + (width / 2);
  yTop = y - (height / 2);
  yBot = y + (height / 2);
  // NOTE: The moveTo() is needed to start the drawing from the correct spot
  context.moveTo(x, yTop);
  // Start drawing two bezier curves to create an ellipse
  context.bezierCurveTo(xRight, yTop, xRight, yBot, x, yBot);
  context.bezierCurveTo(xLeft, yBot, xLeft, yTop, x, yTop);
  // Colour it in
  if (colour != 'clear') {
    context.fillStyle = colour;
    context.fill();
  }
  // Draw the border
  if (border != 'clear') {
    context.lineWidth = 5;
    context.strokeStyle = border;
    context.stroke();
  }
  // Finish the drawing
  context.closePath();
}
