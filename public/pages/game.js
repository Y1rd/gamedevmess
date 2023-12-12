// Variables
let playerIsDead = false
let x = 300
let y = 400
// Movement related variables
let movingup
let movingright
let movingleft

let isJumping = false
let isCrouching = false

let yVelocity = 0

let playerSpeed = 0
let speed = 0.046875
let decelerationspeed = .5
let topspeed = 6
let friction = 0.046875

let jumpStrength = 16
let gravity = .5

// Event Listeners for movement
document.addEventListener('keydown', movementStart)
document.addEventListener('keyup', movementEnd)

// Two functions that toggle the flags as keys are pressed down, I love stackflow
function movementStart(e){
    if (e.keyCode === 38 /*up*/ || e.keyCode === 87 /*w*/){
        movementJump()
    }
    if (e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        movingright = true
    }
    if (e.keyCode === 40 /*down*/ || e.keyCode === 83 /*s*/){
        isCrouching = true
        // Disabled
    }
    if (e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/){
        movingleft = true
    }
}
function movementEnd(e){
    if (e.keyCode === 38 /*up*/ || e.keyCode === 87 /*w*/){
        // Disabled
    }
    if (e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        movingright = false
    }
    if (e.keyCode === 40 /*down*/ || e.keyCode === 83 /*s*/){
        isCrouching = false
        // Disabled
    }
    if (e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/){
        movingleft = false
    }
}

// Handles jumping, will be changed to emulate classic sonic
function movementJump() {
    let img = document.getElementById('player')
    if (!isJumping && y === window.innerHeight - img.height) {
        // Jump only if not already jumping and player is on the ground
        isJumping = true;
        yVelocity = -12; // Adjust this value for desired jump strength
    }
}
// Handles crouching
function movementCrouch() {
    // Rewriting this code to make the crouch animation play and prevent movement...
    // Or, incase we are moving, activate a spindash
}

// Handles the movement of the player, along with gravity, and other forms of movement
function movePlayer() {
    if (!playerIsDead) {
        let img = document.getElementById('player');
        // Apply gravity
        yVelocity += gravity;
        y += yVelocity;
        // Restrain player from falling through the bottom of the screen for now
        if (y > window.innerHeight - img.height) {
            y = window.innerHeight - img.height;
            yVelocity = 0;
            isJumping = false;
        }
        // Handle left and right movement speed
        // Sonic Physics guide my beloved
        if (movingright) {
            if (playerSpeed < 0) {
                playerSpeed += decelerationspeed;
                if (playerSpeed >= 0) playerSpeed = 0.5;
            } else if (playerSpeed < topspeed) {
                playerSpeed += speed;
                if (playerSpeed >= topspeed) playerSpeed = topspeed;
            }
        }
        if (movingleft) {
            if (playerSpeed > 0) {
                playerSpeed -= decelerationspeed;
                if (playerSpeed <= 0) playerSpeed = -0.5;
            } else if (playerSpeed > -topspeed) {
                playerSpeed -= speed;
                if (playerSpeed <= -topspeed) playerSpeed = -topspeed;
            }
        }
        // Decelerate when not moving left or right
        if (!movingleft && !movingright) {
            playerSpeed -= Math.min(Math.abs(playerSpeed), friction) * Math.sign(playerSpeed);
        }
        x += playerSpeed;
        img.style.top = y + 'px';
        img.style.left = x + 'px';
    }
}
// Overall game loop function that keeps everything running
function gameLoop() {
    movePlayer()
    window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)

// Checks the collision between two objections
// Legacy Code
function collisionDetect(my1,my2){
    left1   = parseInt(document.getElementById(my1).style.left)
    right1  = left1 + parseInt(document.getElementById(my1).style.width)
    top1    = parseInt(document.getElementById(my1).style.top)   
    bottom1 = top1   + parseInt(document.getElementById(my1).style.height)
    left2   = parseInt(document.getElementById(my2).style.left)
    right2  = left2 + parseInt(document.getElementById(my2).style.width)
    top2    = parseInt(document.getElementById(my2).style.top)   
    bottom2 = top2   + parseInt(document.getElementById(my2).style.height)
    if ((right1  >=  left2  ) &&      	   
        (bottom1 >=  top2   ) &&
        (left1   <=  right2 ) &&
        (top1    <=  bottom2) ){
        return true
    }
}

// You lose if you hit the other image.
function myCheckHit(){
    if ( myHitOther('player','myImg02') ){
        playerIsDead = true
        alert("Game over.")
        if (window.location.href.endsWith('gametemplate.html')) {
            window.location.href = 'gametemplate2.html';
        } else {
            window.location.href = 'gametemplate.html';
        }
    }
}