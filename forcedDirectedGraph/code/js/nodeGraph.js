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

	// test
	var node1 = $(".node1");
	var node1_x = node1.css("top");
	var node1_y = node1.css("left");

	var node2 = $(".node2");
	var node2_x = node2.css("top");
	var node2_y = node2.css("left");


	var line1 = $(".line1");
	line1.attr({"x1": node1_x, "y1": node1_y, "x2": node2_x, "y2": node2_y});


		//draggable
		node1.draggable({
			drag: function () {
				line1.attr({"x1": node1.css("left"), "y1": node1.css("top")});
			}
		});

		node2.draggable({
			drag: function () {
				line1.attr({"x2": node2.css("left"), "y2": node2.css("top")});
			}
		});

		//console.log(node1);




});