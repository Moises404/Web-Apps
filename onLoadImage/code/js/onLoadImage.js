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

	$('.large_background').load(function() {
		$(this).animate({"opacity": 1}, 2000);
	});



});