const img = document.getElementById("img");
const input = document.getElementById("image_url");
const result = document.getElementById("prediction");
const input_url = document.getElementById("input_url");

input.addEventListener("change", function () {
	const url = input.value;
	img.src = url;
	result.innerText = "Loading...";
});

let model;

window.onload = function () {
	img.src =
		"https://images.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
	result.innerText = "Loading...";
};

img.onload = () => {
	doPrediction();
};

function doPrediction() {
	if (model) {
		model.classify(img).then((predictions) => {
			showPrediction(predictions);
		});
	} else {
		mobilenet.load().then((_model) => {
			model = _model;
			model.classify(img).then((predictions) => {
				showPrediction(predictions);
			});
		});
	}
}

function showPrediction(predictions) {
	console.log(predictions);
	result.innerText = predictions[0].className;
	//input_url.innerText = "i"+img.src;
}
