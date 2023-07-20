let handpose;
let video;
let predictions = [];

function setup() {
	createCanvas(640, 480,WEBGL);
	video = createCapture(VIDEO);
	video.size(width, height);

	handpose = ml5.handpose(video, modelReady);

	// This sets up an event that fills the global variable "predictions"
	// with an array every time new hand poses are detected
	handpose.on("predict", results => {
		predictions = results;
	});

	// Hide the video element, and just show the canvas
	video.hide();
}

function modelReady() {
	console.log("Model ready!");
}



function draw() {
	drawBox();
	image(video, -width/2, -height/2, width, height,0);

	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
}

let angle = 0;
function drawBox(){
	push()
	translate(0, 0, 180);
	background(0)
	ambientLight(60, 60, 60);
	pointLight(255, 255, 255, 50, 100, 100);
	ambientMaterial(255, 0, 100)
	rotateY(angle)
	angle = angle + 0.11
	box(100)
	pop();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	for (let i = 0; i < predictions.length; i += 1) {
		const prediction = predictions[i];
		for (let j = 0; j < prediction.landmarks.length; j += 1) {
			const keypoint = prediction.landmarks[j];
			fill(255, 0, 0);
			noStroke();
			ellipse(keypoint[0]-width/2, keypoint[1]-height/2, 20, 20);
			fill(0, 255, 0);
			rectMode(CENTER);
			text(j,keypoint[0]-width/2, keypoint[1]-height/2,30,30);
			console.log(j,keypoint[0] - width / 2,keypoint[1]-height/2)
		}
	}
}
