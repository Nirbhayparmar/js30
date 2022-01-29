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
var ongoingTouches = [];

canvas.addEventListener("touchstart", (e) => {
	e.preventDefault();
	console.log("touchstart.");
	var touches = e.changedTouches;

	for (var i = 0; i < touches.length; i++) {
		console.log("touchstart:" + i + "...");
		ongoingTouches.push(copyTouch(touches[i]));
		var color = colorForTouch(touches[i]);
		ctx.beginPath();
		ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
		ctx.fillStyle = color;
		ctx.fill();
		console.log("touchstart:" + i + ".");
	}
});
canvas.addEventListener("touchend", (e) => {
	e.preventDefault();
	log("touchend");

	var touches = evt.changedTouches;

	for (var i = 0; i < touches.length; i++) {
		var color = colorForTouch(touches[i]);
		var idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			ctx.lineWidth = 4;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			ctx.lineTo(touches[i].pageX, touches[i].pageY);
			ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
			ongoingTouches.splice(idx, 1); // remove it; we're done
		} else {
			console.log("can't figure out which touch to end");
		}
	}
});

canvas.addEventListener("touchmove", (e) => {
	e.preventDefault();
	for (var i = 0; i < touches.length; i++) {
		var color = colorForTouch(touches[i]);
		var idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			console.log("continuing touch " + idx);
			ctx.beginPath();
			console.log(
				"ctx.moveTo(" +
					ongoingTouches[idx].pageX +
					", " +
					ongoingTouches[idx].pageY +
					");"
			);
			ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			console.log(
				"ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");"
			);
			ctx.lineTo(touches[i].pageX, touches[i].pageY);
			ctx.lineWidth = 4;
			ctx.strokeStyle = color;
			ctx.stroke();

			ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
			console.log(".");
		} else {
			console.log("can't figure out which touch to continue");
		}
	}
});
