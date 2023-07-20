// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(width, height);

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on('pose', function (results) {
		poses = results;
	});
	// Hide the video element, and just show the canvas
	video.hide();
}

function modelReady() {
	select('#status').html('Model Loaded');
}

function draw() {
	image(video, 0, 0, width, height);

	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
//	drawSkeleton();
}

// 顔のポイント
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
		/*
		for (let j = 0; j < pose.keypoints.length; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.2) {
				fill(0, 255, 0);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
				fill(255, 0, 0);
				textSize(20);
				text(j, keypoint.position.x-5, keypoint.position.y-7,60,20);
			}

		}
		*/
		
		//angleMode(DEGREES);
		function px(x){return pose.keypoints[x].position.x;}
		function py(y){ return pose.keypoints[y].position.y; }
		push();
		noStroke();
		fill(255, 0, 0);
		translate(px(0),py(0));
		let a = (px(1) - py(2));
		let b = (py(1) - py(2));
		//rotate(Math.asin(-b/a));

		rectMode(CENTER);
		beginShape();
		vertex(-100, 0);
		vertex(-30, 0);
		vertex(0, -30);
		vertex(30, 0);
		vertex(100, 0);
		vertex(100, -100);
		vertex(-100,-100);

		endShape();
		pop();

		fill(255, 255, 255);
		push();
		translate(px(1)+5, py(1)+5);
		rotate(10);
		ellipse(0,0, 50, 30);
		pop();push();
		translate(px(2)-5, py(2)+5);
		rotate(-10);
		ellipse(0, 0, 50, 30);
		pop();
		fill(0, 0, 0);
		ellipse(px(1),py(1)-5,15,15);
		ellipse(px(2), py(2)-5, 15, 15);

		push();
		translate(px(1)+30, py(1) - 30);
		rotate(10);
		ellipse(0, 0, 40, 10);
		pop();push();
		translate(px(2)-30, py(2) - 30);
		rotate(-10);
		ellipse(0, 0, 40, 10);
		pop();
	}
}

// 胴体のポイント
/*
function drawSkeleton() 

	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		let skeleton = poses[i].skeleton;
		// For every skeleton, loop through all body connections
		for (let j = 0; j < skeleton.length; j++) {
			let partA = skeleton[j][0];
			let partB = skeleton[j][1];
			stroke(255, 0, 0);
			strokeWeight(10);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			text(j,partA.position.x, partA.position.y);
		}
	}
}
*/
