// A $ (document).ready block
$(document).ready(function() {

	console.log("forced directed graph!");

	// CHeck if jQuery and jQueryUI have loaded
	if (jQuery) {  
		console.log("jQuery is loaded"); 
	} else {
		console.log("jQuery is not loaded");
	}

	if (jQuery.ui) {
		console.log("jQueryUI is loaded");
	} else {
		console.log("UI is not loaded");
	}

	// node test
	var node1 = $(".node1-boundary");
	var node1_x = node1.css("top");
	var node1_y = node1.css("left");

		// node1 boundary
			var node1_top = node1.css("top");
			var node1_left = node1.css("left");
			var node1_right = parseInt(node1_left) + 50 + "px";
			var node1_bottom = parseInt(node1_top) + 50 + "px";

			var node1_boundary_top = parseInt(node1.css("top")) - 50 + "px";
			var node1_boundary_left = parseInt(node1.css("left")) - 50 + "px";
			var node1_boundary_right = parseInt(node1_left) + 100 + "px";
			var node1_boundary_bottom = parseInt(node1_top) + 100 + "px";

			// console.log("node1: " + "top: " + node1_top + ", left: " + node1_left + ", bottom: " + node1_bottom + ", right: " + node1_right);
			// console.log("node1_boundary: " + "top: " + node1_boundary_top + ", left: " + node1_boundary_left + ", bottom: " + node1_boundary_bottom + ", right: " + node1_boundary_right);


	var node2 = $(".node2-boundary");
	var node2_x = node2.css("top");
	var node2_y = node2.css("left");

		// node2 boundary
			var node2_top = node2.css("top");
			var node2_left = node2.css("left");
			var node2_right = parseInt(node2_left) + 50 + "px";
			var node2_bottom = parseInt(node2_top) + 50 + "px";

			var node2_boundary_top = parseInt(node2.css("top")) - 50 + "px";
			var node2_boundary_left = parseInt(node2.css("left")) - 50 + "px";
			var node2_boundary_right = parseInt(node2_left) + 100 + "px";
			var node2_boundary_bottom = parseInt(node2_top) + 100 + "px";

			// console.log("node2: " + "top: " + node2_top + ", left: " + node2_left + ", bottom: " + node2_bottom + ", right: " + node2_right);
			// console.log("node2_boundary: " + "top: " + node2_boundary_top + ", left: " + node2_boundary_left + ", bottom: " + node2_boundary_bottom + ", right: " + node2_boundary_right);

	var line1 = $(".line1");
	line1.attr({"x1": node1_x, "y1": node1_y, "x2": node2_x, "y2": node2_y});

		//draggable
		node1.draggable({
			drag: function () {
				line1.attr({"x1": node1.css("left"), "y1": node1.css("top")});

				// node1 boundary
				node1_boundary_top = parseInt(node1.css("top")) - 50 + "px";
				node1_boundary_left = parseInt(node1.css("left")) - 50 + "px";
				node1_boundary_right = parseInt(node1_boundary_left) + 100 + "px";
				node1_boundary_bottom = parseInt(node1_boundary_top) + 100 + "px";

				// node2 boundary
				node2_boundary_top = parseInt(node2.css("top")) - 50 + "px";
				node2_boundary_left = parseInt(node2.css("left")) - 50 + "px";
				node2_boundary_right = parseInt(node2_boundary_left) + 100 + "px";
				node2_boundary_bottom = parseInt(node2_boundary_top) + 100 + "px";


				// console.log("top: " + node1_top + ", left: " + node1_left + ", bottom: " + node1_bottom + ", right: " + node1_right);
				// console.log("node2: " + "top: " + node2_boundary_top + ", left: " + node2_boundary_left + ", bottom: " + node2_boundary_bottom + ", right: " + node2_boundary_right);
				// console.log("node1: " + "top: " + node1_boundary_top + ", left: " + node1_boundary_left + ", bottom: " + node1_boundary_bottom + ", right: " + node1_boundary_right);

				collisionCallback();
			}
		});

		node2.draggable({
			drag: function () {
				line1.attr({"x2": node2.css("left"), "y2": node2.css("top")});

				// node1 boundary
				node1_boundary_top = parseInt(node1.css("top")) - 50 + "px";
				node1_boundary_left = parseInt(node1.css("left")) - 50 + "px";
				node1_boundary_right = parseInt(node1_boundary_left) + 100 + "px";
				node1_boundary_bottom = parseInt(node1_boundary_top) + 100 + "px";


				// node2 boundary
				node2_boundary_top = parseInt(node2.css("top")) - 50 + "px";
				node2_boundary_left = parseInt(node2.css("left")) - 50 + "px";
				node2_boundary_right = parseInt(node2_boundary_left) + 100 + "px";
				node2_boundary_bottom = parseInt(node2_boundary_top) + 100 + "px";

				// console.log("top: " + node2_top + ", left: " + node2_left + ", bottom: " + node2_bottom + ", right: " + node2_right);
				// console.log("node2: " + "top: " + node2_boundary_top + ", left: " + node2_boundary_left + ", bottom: " + node2_boundary_bottom + ", right: " + node2_boundary_right);
				// console.log("node1: " + "top: " + node1_boundary_top + ", left: " + node1_boundary_left + ", bottom: " + node1_boundary_bottom + ", right: " + node1_boundary_right);

				collisionCallback();

			}
		});

	function collisionCallback() {
		// console.log("callback");
		if (node2_boundary_top < node1_boundary_bottom && 
			node2_boundary_bottom > node1_boundary_top &&
			node2_boundary_left < node1_boundary_right &&
			node2_boundary_right > node1_boundary_left) {
			console.log("collision!");
		}
	}
});