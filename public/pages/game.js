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
let speed = 8
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
        movementCrouch()
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
        movementCrouch()
    }
    if (e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/){
        movingleft = false
    }
}
function movementJump() {
    let img = document.getElementById('player')
    if (!isJumping && y === window.innerHeight - img.height) {
        // Jump only if not already jumping and player is on the ground
        isJumping = true;
        yVelocity = -12; // Adjust this value for desired jump strength
    }
}
function movementCrouch() {
    let img = document.getElementById('player')
    if (isCrouching) {
        img.style.height = '60px'
    } else {
        img.style.height = '80px'
    }
}

// Actually moves our image if flags are true, uses a speed variable so it can easily be adjusted
function movePlayer(){
    if (!playerIsDead) {
        let img = document.getElementById('player')

        // Apply gravity
        yVelocity += gravity; // Adjust this value for desired gravity strength
        y += yVelocity;

        // Restrain player from falling through the bottom of the screen
        if (y > window.innerHeight - img.height) {
            y = window.innerHeight - img.height;
            yVelocity = 0; // Reset vertical velocity on the ground
            isJumping = false
        }

        // Handle left and right movement speed
        if (movingright){
            x = x + speed
        }
        if (movingleft){
            x = x - speed
        }
        
        movementCrouch()

        // Adjust the image position as needed
        img.style.top = y + 'px';
        img.style.left = x + 'px';
        window.requestAnimationFrame(movePlayer)
        testCollide()
        myCheckHit()
    }
}
window.requestAnimationFrame(movePlayer)


// Collision Checks
function myHitOther(my1,my2){
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

// Yeah
function testCollide() {
    if (myHitOther('player', 'myImg02')) {
        // If colliding with the box, adjust the player's position
        let img = document.getElementById('player');
        let box = document.querySelector('.collisionbox');

        if (y + img.height > box.offsetTop) {
            // Player is on or below the box, move the player above the box
            y = box.offsetTop - img.height;
            yVelocity = 0;
            isJumping = false;
        } else {
            // Player is above the box, move the player below the box
            y = box.offsetTop + box.offsetHeight;
            yVelocity = 0;
        }
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