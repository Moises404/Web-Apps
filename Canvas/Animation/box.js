
// Instantiate the ANimation object and get the canvas context
window.onload = function () {

	var anim = new Animation ("myCanvas");
	var canvas = anim.getCanvas();
	var context = anim.getContext();

	//Define the box's linear speed and create a box object that 
	//contains the box's position and size
	var linearSpeed = 100; // pixels/second
	var box = {
		x: 0,
		y: canvas.height / 2 -25,
		width: 100,
		height: 50
	};

//Set the state() function, which updates the box's position,
 //clears the canvas, and draws the box

	 anim.setStage(function() {
	 	 //update
	 	var linearDistEachFrame = linearSpeed * this.getInterval() / 1000;

	 	if (box.x < canvas.width - box.width) {
	 		box.x += linearDistEachFrame;
	 	} else {
	 		anim.stop();
	 	}

	 	// clear
	 	this.clear();

	 	// draw
	 	context.beginPath();
	 	context.fillStyle = "blue";
	 	context.fillRect(box.x, box.y, box.width, box.height);
	 });

	 //Start the Animation
	 anim.start();






};
	
