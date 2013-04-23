/*
The following code assigns a value to a requestAnimationFrame 
property of the window object. THe value is a function that's 
returned from what's known in Javascript as a self executing 
function.
*/

/*window.requestNextAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||

		function (callback, element) { // Assume element is visible
			var self = this,
				start,
				finish;

			window.setTimeout(function () {
				start = +new Date();
				callback(start);
				finish = +new Date();

				self.timeout = 1000 / 60 - (finish - start);
			}, self.timeout);
		};
})();*/


/*
The word polyfill is a portmanteau of polymorphically backfill
Like polymorphism in ibject-oriented languages, a polyfill 
conditionally executes code at runtime. Polyfills also backfill
functionality into browsers that do not yet implement a 
particular specification.

For example, the requestNextAnimationFrame() polyfill executes
code at runtime that depends on the browser's support for
requestAnimationFrame(), backfilling as needed with a setTImeout()
implementation for browsers that do not support the Timing control
for script-based animations specificiation.

Polyfills represent an important paradigm shift: Instead of 
programming to the lowest common denominator- a common strategy
in the past for cross-platform software- polyfills let you access
new advances when the are available, falling back to the lowest
common denominator only when necessary.
*/


window.requestNextAnimationFrame = 
	(function () {
		var originalWebkitMethod,
			wrapper = undefined,
			callback = undefined,
			geckoVersion = 0,
			userAgent = navigator.userAgent,
			index = 0,
			self = this;

		// Workaround for Chrome 10 bug where Chrome
		// does not pass the time to the animation function

		if (window.webkitRequestAnimationFrame) {
			// Define the wrapper

			wrapper = function (time) {
				if (time == undefined) {
					time = +new Date();
				}
				self.callback(time);
			};

			// Make the switch

			originalWebkitMethod = window.webkitRequestAnimationFrame;

			window.webkitRequestAnimationFrame = function (callback, element) {
				self.callback = callback;

				// Browser calls wrapper; wrapper calls callback

				originalWebkitMethod(wrapper, element);
			}
		}

		// Workaround for Gecko 2.0, which has a bug in
		// mozRequestAnimationFrame() that restricts animation
		// to th30-40 fps

		if (window.mozRequestAnimationFrame) {
			// Check the Gecko version. Gecko is used by browsers
			// other than Firefox. Gecko 2.0 corresponds to 
			// Firefox 4.0.

			index = userAgent.indexOf("rv:");

			if (userAgent.indexOf("Gecko") != -1 {
				geckoVersion = userAgent.substr(index + 3, 3);

				if (geckoVersion === "2.0") {
					// Forces the return statement to fall through
					// to the setTimeout() function.

					window.mozRequestAnimationFrame = undefined;
				}
			}
		}

		return window.requestAnimationFrame 	||
			window.webkitRequestAnimationFrame 	||
			window.mozRequestAnimationFrame 	||
			window.oRequestAnimationFrame 		||
			window.msRequestAnimationFrame 		||

			function (callback, element) {
				var start,
					finish;

				window.setTimeout (function () {
					start = +new Date();
					callback(start);
					finish = +new Date();

					self.timeout = 1000 / 60 - (finish - start);
				}, self.timeout);
			};
		}
	)
();