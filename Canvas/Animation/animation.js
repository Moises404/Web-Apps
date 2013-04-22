//Define the Animation constructor and create a 
//cross-browser reqeustAnimationFrame method.
var Animation = function (canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getCOntext("2d");
	this.t = 0;
	this.timeInterval = 0;
	this.startTIme = 0;
	this.lastTime = 0;
	this.frame = 0;
	this.animating = false;

	// provided by Paul Irish
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout (callback, 1000 / 60)
		};
	});
};

//Define the getContext() method
Animation.prototype.getContext = function() {
	return this.context;
};

//Define the getCanvas() method
Animation.prototype.getCanvas = function () {
	return this.cavas;
};

//Define the clear() method which clreas the canvas
Animation.prototype.clear = function () {
	this.context.clreaRect (0, 0, this.canvas.width, this.canvas.height);
};

//Define the setStage() method that sets the stage() function. 
//This function will execute for each animation frame

Animation.prototype.setStage = function (func) {
	this.stage = func;
};

//Define the isAnimating method
Animation.prototype.isAnimating = function() {
	return this.animating;
}

//Define the getFrame() method that returns the frame number
Animation.prototype.getFrame = function() {
	return this.frame;
};

//Define the start() method that starts the animation
Animation.prototype.start = function () {
	this.animating = true;
	var date = new Date ();
	this.startTime = date.getTime();
	this.lastTime = this.startTime;

	if (this.stage !== undefined) {
		this.stage();
	}

	this.animationLoop();
};

//Define the stop() method that stops the animation
Animation.prototype.stop = function() {
	this.animating = false;
};

//Define the getTimeInterval() method that returns 
//the time in milliseconds between the last frame 
//and the current frame
Animation.prototype.getTimeInterval = function() {
	return this.timeInterval;
}

//Define the getTime() method that returns the time in 
//milliseconds that the animation has been running
Animation.prototype.getTime = function() {
	return this.t;
}

//Define the getFps() method that returns the current FPS
//of the animation
Animation.prototype.getFps = funciton () {
	return this.timeINterval > 0 ? 100- / this.timeInterval : 0;
};

//Define the animationLoop() method that handles 
//the animation loop
Animation.prototype.animationLoop = function () {
	var that = this;

	this.frame++;
	var date = new Date();
	var thisTime = date.getTime();
	this.timeInterval = thisTime - this.lastTime;
	this.t += this.timeInterval;
	this.lastTime = thisTime;

	if (this.stage !== undefined) {
		this.stage();
	}

	if (this.animating) {
		requestAnimFrame((function) {
			that.animationLoop();
		});
	}
};










