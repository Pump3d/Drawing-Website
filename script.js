let canvas = document.getElementById("canvas")
let cursor = document.getElementById("cursor")

let ctx = canvas.getContext('2d'); 
let ctx2 = cursor.getContext('2d');

let drawing = false;
let colorDeb = false;
let radius = 25
let mouseAt = undefined;

function drawCircle(pos) {
    var color = document.getElementById("color").value;

    var X = pos.offsetX;
    var Y = pos.offsetY;

    ctx.beginPath();
    ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;

    ctx.fillStyle = color;
    ctx.fill();

    ctx.stroke();
}

function drawOutline(pos) {
    var X = pos.offsetX;
    var Y = pos.offsetY;

    ctx2.clearRect(0, 0, cursor.width, cursor.height);
    ctx2.restore();

    ctx2.beginPath();
    ctx2.arc(X, Y, radius, 0, 2 * Math.PI, false);
    
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#000000";
    
    ctx2.stroke();
    mouseAt = pos;
}


function mouseUp() {
    drawing = false;
}

function onClick(pos) {
    if (colorDeb == true) {
        console.log("On button");
        return;
    }

    console.log(pos.clientX, pos.clientY);

    drawCircle(pos);

    drawing = true;
}

function prepare() {
    document.body.style.cursor = "none";

    ctx.canvas.width  = window.innerWidth * 0.99;
    ctx.canvas.height = window.innerHeight * 0.98;
    ctx2.canvas.width  = window.innerWidth * 0.99;
    ctx2.canvas.height = window.innerHeight * 0.98;
}

function mouseMove(pos) {
    if (drawing === true) {
        setTimeout(() => {
            drawCircle(pos);
        }, 100);
    }
    
    drawOutline(pos);
}

function scrolled(we) {
    if (we.wheelDeltaY >= 0) {
        if (radius >= 125) {
            return;
        }

        radius += 2;
    } else {
        if (radius <= 5) {
            return;
        }
        
        radius -= 2;
    }

    console.log(radius);
    drawOutline(mouseAt);
}

document.getElementById("color").onmouseover = function() {
    colorDeb = true;
}

document.getElementById("color").onmouseout = function() {
    colorDeb = false;
}

prepare();

document.addEventListener("wheel", scrolled)
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousedown", onClick);
window.addEventListener("resize", prepare)