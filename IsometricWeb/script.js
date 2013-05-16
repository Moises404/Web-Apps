$(document).ready(function(){

	var buttons = ["small","medium","large","xlarge"];
	
	$("body").wrapAll("<div id='transformDiv' class='transform-h-x' />");
	

	$.each(buttons, function(index, element){
		$("<div class='manipulator' id='"+element+"' />").appendTo("body");
	});


	$(".manipulator").each(function(index, element){
		var currentID = $(element).attr("id");
		var currentIDselector = "#" + currentID;
		$(currentIDselector).click(function(){
			
			console.log(currentID);
			$.each(buttons, function(index, element){
				$("#transformDiv").removeClass(element);
			});
			$("#transformDiv").addClass('transform-x-y');
			
			

		});

	});

	console.log("done");
});
