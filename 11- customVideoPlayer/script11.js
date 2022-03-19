//getting elements for control
const player = document.querySelector("video");
const playPause = document.querySelector(".toggle");
const volume = document.querySelector("input[name=volume]");

// adding eventlistners in the controls
playPause.addEventListener("click", startVideo);
volume.addEventListener("mousemove", updateVolume);

// functions for controlling various actions
function startVideo() {
	if (player.paused) {
		player.play();
	} else {
		player.pause();
	}
}

function updateVolume() {
	let volumeLevel = this.value;
	player.volume = volumeLevel;
	console.log(player.volume);
}
