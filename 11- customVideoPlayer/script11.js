//getting elements for control
const player = document.querySelector("video");
const playPause = document.querySelector(".toggle");
const slider = document.querySelectorAll(".player__slider");
const skipButton = document.querySelectorAll("[data-skip]");
const progressBar = document.querySelector(".progress__filled");
const progressBarContainer = document.querySelector(".progress");
const fullscreenButton = document.querySelector(".fullscreen");
const playerWrap = document.querySelector(".player");

// adding eventlistners in the controls
playPause.addEventListener("click", toggleVideo);
player.addEventListener("click", toggleVideo);
player.addEventListener("play", updateButton);
player.addEventListener("pause", updateButton);
player.addEventListener("timeupdate", updateProgressbar);
progressBarContainer.addEventListener("click", updateTime);
progressBarContainer.addEventListener(
	"mousemove",
	(e) => mouseDown && scrub(e)
);

let mouseDown = false;
progressBarContainer.addEventListener("mousedown", () => {
	mouseDown = true;
});
progressBarContainer.addEventListener("mouseup", () => {
	mouseDown = false;
});
progressBarContainer.addEventListener("mousemove", (e) => {
	if (mouseDown) updateTime(e);
});
slider.forEach((rangeSlider) => {
	rangeSlider.addEventListener("change", updateSliderValues);
	rangeSlider.addEventListener("mousemove", updateSliderValues);
});
skipButton.forEach((button) => {
	button.addEventListener("click", skipVideo);
});
let isFull = false;
fullscreenButton.addEventListener("click", toggleFullscreen);

// functions for controlling various actions
function toggleVideo() {
	if (player.paused) {
		player.play();
	} else {
		player.pause();
	}
}

function updateSliderValues() {
	player[this.name] = this.value;
}

function updateButton() {
	if (player.paused) {
		playPause.innerHTML = "►";
	} else {
		playPause.innerHTML = "&#x23f8;"; //icon for pause(in unicode)
	}
}

function skipVideo() {
	// console.log("skipped");
	let time = parseFloat(this.dataset.skip);
	player.currentTime = player.currentTime + time;
}

function updateProgressbar() {
	let percent = (player.currentTime / player.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function updateTime(e) {
	//still some error in this function. Compare it with answer files.
	let time = (e.offsetX / this.offsetWidth) * player.duration;
	player.currentTime = time;
}
function toggleFullscreen() {
	if (!isFull) {
		playerWrap.requestFullscreen();
		isFull = true;
	} else {
		document.exitFullscreen();
		isFull = false;
	}
}
