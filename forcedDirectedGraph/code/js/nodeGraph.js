// A $ (document).ready block
$(document).ready(function() {

	console.log("forced directed graph!");

	// Check if jQuery and jQueryUI have loaded
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

	///////////
	// node1 //
	///////////

			var node1 = $(".node1-boundary");
			var node1_centerY = node1.css("top");
			var node1_centerX = node1.css("left");

			var node1_boundary_top = parseInt(node1_centerX) - 50 + "px";
			var node1_boundary_left = parseInt(node1_centerY) - 50 + "px";
			var node1_boundary_right = parseInt(node1_boundary_left) + 100 + "px";
			var node1_boundary_bottom = parseInt(node1_boundary_top) + 100 + "px";

			// console.log("node1: " + "top: " + node1_top + ", left: " + node1_left + ", bottom: " + node1_bottom + ", right: " + node1_right);
			// console.log("node1_boundary: " + "top: " + node1_boundary_top + ", left: " + node1_boundary_left + ", bottom: " + node1_boundary_bottom + ", right: " + node1_boundary_right);

	///////////
	// node2 //
	///////////

			var node2 = $(".node2-boundary");
			var node2_centerX = node2.css("top");
			var node2_centerY = node2.css("left");

			var node2_boundary_top = parseInt(node2_centerX) - 50 + "px";
			var node2_boundary_left = parseInt(node2_centerY) - 50 + "px";
			var node2_boundary_right = parseInt(node2_boundary_left) + 100 + "px";
			var node2_boundary_bottom = parseInt(node2_boundary_top) + 100 + "px";

			// console.log("node2: " + "top: " + node2_top + ", left: " + node2_left + ", bottom: " + node2_bottom + ", right: " + node2_right);
			// console.log("node2_boundary: " + "top: " + node2_boundary_top + ", left: " + node2_boundary_left + ", bottom: " + node2_boundary_bottom + ", right: " + node2_boundary_right);

	// line connecting the two nodes
	var line1 = $(".line1");
	line1.attr({"x1": node1_centerX, "y1": node1_centerY, "x2": node2_centerX, "y2": node2_centerY});

		/////////////
		//draggable//
		/////////////

		node1.draggable({
			drag: function () {
				line1.attr({"x1": node1.css("left"), "y1": node1.css("top")});
				
				// currentNode to pass through
				var currentNode = $(this);
				var collidedNode = node2;

				collisionDetection(collidedNode);
			}
		});

		node2.draggable({
			drag: function () {
				line1.attr({"x2": node2.css("left"), "y2": node2.css("top")});	
				
				// currentNode to pass through
				var currentNode = $(this);
				var collidedNode = node1;

				collisionDetection(collidedNode);
			}
		});

		function collisionDetection(collidedNode) {
			// node1 boundary
			node1_boundary_top = parseInt(node1.css("top")) - 50;
			node1_boundary_left = parseInt(node1.css("left")) - 50;
			node1_boundary_right = parseInt(node1_boundary_left) + 100;
			node1_boundary_bottom = parseInt(node1_boundary_top) + 100;


			// node2 boundary
			node2_boundary_top = parseInt(node2.css("top")) - 50;
			node2_boundary_left = parseInt(node2.css("left")) - 50;
			node2_boundary_right = parseInt(node2_boundary_left) + 100;
			node2_boundary_bottom = parseInt(node2_boundary_top) + 100;

			// console.log("node1: " + "right: " + node1_boundary_right + ", left: " + node1_boundary_left + ", bottom: " + node1_boundary_bottom + ", top: " + node1_boundary_top);
			// console.log("node2: " + "left: " + node2_boundary_left + ", right: " + node2_boundary_right + ", top: " + node2_boundary_top + ", bottom: " + node2_boundary_bottom);

			var oppositeDiff_rightLeft = (node1_boundary_right - node2_boundary_left);
			var oppositeDiff_leftRight = (node1_boundary_left - node2_boundary_right);
			var oppositeDiff_bottomTop = (node1_boundary_bottom - node2_boundary_top);
			var oppositeDiff_topBottom = (node1_boundary_top - node2_boundary_bottom);


			// console.log("callback");
			if (node1_boundary_right > node2_boundary_left &&
				node1_boundary_left < node2_boundary_right && 
				node1_boundary_bottom > node2_boundary_top &&
				node1_boundary_top < node2_boundary_bottom) {
				console.log("collision!");

				//collidedNode.animate({"top": "10px", "left": "10px" }, 400);
				// line1.attr({"x1": node1_centerX, "y1": node1_centerY, "x2": node2_centerX, "y2": node2_centerY});
				// console.log("top: " + oppositeDiff_topBottom + "px" + " left: " + oppositeDiff_leftRight + "px" + " bottom: " + oppositeDiff_bottomTop + "px" + " right: " + oppositeDiff_rightLeft + "px");
			}

		}

		line1.attr({"x1": node1.css("left"), "y1": node1.css("top")});
});