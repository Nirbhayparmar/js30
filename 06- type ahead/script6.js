const endpoint =
	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
fetch(endpoint)
	.then((response) => response.json())
	.then((data) => cities.push(...data)); // this '...' is spread operator in Js(ES6 syntext). It will help to separate the elements of data object and to push it separately in the cities array.//

console.log("cities");
// console.log(cities);

function search(searchString, cities) {
	return cities.filter((place) => {
		const regExp = new RegExp(searchString, "gi");
		return place.city.match(regExp) || place.state.match(regExp);
	});
}
function displayResult() {
	console.log(this.value);
	const matchedResult = search(this.value, cities);
	const htmlContent = matchedResult
		.map((place) => {
			const regex = new RegExp(this.value, "gi");
			const cityName = place.city.replace(
				regex,
				`<span class="hl">${this.value}</span>`
			);
			const stateName = place.state.replace(
				regex,
				`<span class="hl">${this.value}</span>`
			);
			return `<li><span class="name">${cityName}, ${stateName}</span><span class="population">${place.population}</span></li>`;
		})
		.join("");
	suggestions.innerHTML = htmlContent;
	console.log(matchedResult);
	console.log(htmlContent);
}
const input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
input.addEventListener("change", displayResult);
input.addEventListener("keyup", displayResult);
