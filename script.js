let mycanvas = document.getElementById("canvas")
const canvas = document.createElement('canvas');
canvas.width = mycanvas.offsetWidth;
canvas.height = mycanvas.offsetHeight;
mycanvas.appendChild(canvas);
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");
let size = 1;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
let isEraserOn = false;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    if (!isEraserOn) {

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

function drawLine(x1, y1, x2, y2) {
    if (!isEraserOn) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = size * 2;
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = size * 2;
        ctx.stroke();
    }
}

increaseBtn.addEventListener("click", () => {
    size += 1;
    if (size > 30) {
        size = 30;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 1;
    if (size < 1) {
        size = 1;
    }
    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

clearEl.addEventListener("click", () => {
    isEraserOn = !isEraserOn
    clearEl.textContent = isEraserOn ? "eraser" : "pen"
});
document.getElementById("clearfulldisplay").addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
function updateSizeOnScreen() {
    sizeEl.value = size;
}