// Variables
let playerIsDead = false
// Movement flags, this allows holding down movement keys
let movingup
let movingdown
let movingright
let movingleft
let x = 300
let y = 400
let speed = 8

// Event Listeners for movement
document.addEventListener('keydown', initialPress)
document.addEventListener('keyup', endPress)

// Two functions that toggle the flags as keys are pressed down, I love stackflow
function initialPress(e){
    if (e.keyCode === 38 /*up*/ || e.keyCode === 87 /*w*/){
        movingup = true
    }
    if (e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        movingright = true
    }
    if (e.keyCode === 40 /*down*/ || e.keyCode === 83 /*s*/){
        movingdown = true
    }
    if (e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/){
        movingleft = true
    }
}
function endPress(e){
    if (e.keyCode === 38 /*up*/ || e.keyCode === 87 /*w*/){
        movingup = false
    }
    if (e.keyCode === 39 /*right*/ || e.keyCode === 68 /*d*/){
        movingright = false
    }
    if (e.keyCode === 40 /*down*/ || e.keyCode === 83 /*s*/){
        movingdown = false
    }
    if (e.keyCode === 37 /*left*/ || e.keyCode === 65 /*a*/){
        movingleft = false
    }
}

// Actually moves our image if flags are true, uses a speed variable so it can easily be adjusted
function movePlayer(){
    if (!playerIsDead) {
        var img = document.getElementById('player')
        if (movingup){
            y = y - speed
        }
        if (movingright){
            x = x + speed
        }
        if (movingdown){
            y = y + speed
        }
        if (movingleft){
            x = x - speed
        }
        img.style.top = y + 'px';
        img.style.left = x + 'px';
        window.requestAnimationFrame(movePlayer)
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