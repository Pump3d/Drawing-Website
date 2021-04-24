let canvas = document.getElementById("canvas")
let cursor = document.getElementById("cursor")
let ctx = canvas.getContext('2d'); 
let ctx2 = cursor.getContext('2d')
let drawing = false;

function drawCircle(pos) {
    var color = document.getElementById("color").value;

    var R = 45;
    var X = pos.offsetX;
    var Y = pos.offsetY;

    ctx.beginPath();
    ctx.arc(X, Y, R, 0, 2 * Math.PI, false);

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;

    ctx.fillStyle = color;
    ctx.fill();

    ctx.stroke();
}

function drawOutline(pos) {
    var R = 45;
    var X = pos.offsetX;
    var Y = pos.offsetY;

    ctx2.clearRect(0, 0, cursor.width, cursor.height);
    ctx2.restore();

    ctx2.beginPath();
    ctx2.arc(X, Y, R, 0, 2 * Math.PI, false);
    
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#000000";
    
    ctx2.stroke();
    
}


function mouseUp() {
    drawing = false;
}

function onClick(pos) {
    if (pos.clientY < 15) {
        console.log("Out of range");
        return;
    }

    console.log(pos.clientX, pos.clientY);

    drawCircle(pos);

    drawing = true;

}

function prepare() {
    document.body.style.cursor = "none";

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx2.canvas.width  = window.innerWidth;
    ctx2.canvas.height = window.innerHeight;
}

function mouseMove(pos) {
    if (drawing === true) {
        setTimeout(() => {
            drawCircle(pos);
        }, 100);
    }
    drawOutline(pos);

}

prepare();
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousedown", onClick);