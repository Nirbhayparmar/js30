const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const penWidth = document.querySelector("#penWidth");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = penWidth.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

penWidth.addEventListener("change", (e) => {
	ctx.lineWidth = e.target.valueAsNumber;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	lastX = e.offsetX;
	lastY = e.offsetY;
});
canvas.addEventListener("mouseup", (e) => {
	isDrawing = false;
	lastX = e.offsetX;
	lastY = e.offsetY;
});
function draw(e) {
	if (!isDrawing) return;
	ctx.strokeStyle = `hsl(${hue},100%,50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	lastX = e.offsetX;
	lastY = e.offsetY;

	if (hue >= 360) {
		hue = 0;
	} else {
		hue++;
	}
}

//for touch screen devices
