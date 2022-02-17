const checkboxArray = [...document.querySelectorAll("input[type=checkbox]")];
// let firstIndex = null,
// 	secondIndex = null;
// console.log(checkboxArray);
// checkboxArray.forEach((box) => {
// 	box.addEventListener("click", firstBox);
// });
// checkboxArray.forEach((box) => {
// 	box.addEventListener("click", secondBox);
// });
// function firstBox(e) {
// 	firstIndex = checkboxArray.indexOf(this);
// 	console.log(firstIndex);
// }
// function secondBox(e) {
// 	if (e.shiftKey) {
// 		secondIndex = checkboxArray.indexOf(this);
// 	}

// 	console.log(secondIndex);
// }

// in the above approach the main fault is that the two separate event lister of the same event type will always take action at simulteneously. so i cannot get the separate value of the last checked checkbox after checking next checkbox.
let lastIndex = null;
checkboxArray.forEach((box) => {
	box.addEventListener("click", handleCheck);
});
function handleCheck(e) {
	let flag = false;
	if (e.shiftKey && this.checked) {
		// console.log(lastIndex, "inside if");
		checkboxArray.forEach((box) => {
			if (box.checked) {
				// to check weather the checkbox we are at is working is checked or not.
				flag = !flag;
			}
			if (flag) {
				box.checked = true;
			}
		});
	}
	lastIndex = this;
	console.log(lastIndex);
}
