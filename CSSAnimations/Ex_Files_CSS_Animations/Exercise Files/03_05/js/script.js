var count = 0;

$(document).ready(function(){

	$(".nav a").click(function() {
	//increase count to track which selection we're on
	count ++
	checkCount();
		
	if (count == 0) { 
		//this must be our second selection if count was reset to 0
		
		$(this).addClass('selected2');
		
		//remove current selection if it's not already the current one
		if (!$(this).hasClass("compare2")){
			$('.compare2').addClass('hidden').removeClass('compare2');
		}
		//remove colours from any existing selected links
		$(".nav a").each(function() {
			$(this).removeClass('selected2');
		});
		$(this).addClass('selected2');
		
		//show the newly selected coffee 
		console.log($(this).text(),2);
		findProfile($(this).text(), 2);
		
	} else if (count ==1) { 
	   //this must be our first selection
	
		$(this).addClass('selected1');
		
		//remove current selection if it's not already the current one
		if (!$(this).hasClass("compare1")){
		$('.compare1').addClass('hidden').removeClass('compare1');
		}
		//remove colours from any existing selected links
		$(".nav a").each(function() {
			$(this).removeClass('selected1');
		});
		$(this).addClass('selected1');
		
		//show the newly selected coffee 
		console.log($(this).text(),1);
		findProfile($(this).text(), 1);
	}
		
		
	});



});



function findProfile(name, num) {

	switch(name) {
		case 'Macchiato':
			$(".macchiato").addClass('compare'+ num).removeClass('hidden');
		break;
		
		case 'Latte':
			$('.latte').addClass('compare'+ num).removeClass('hidden');
		break;
		
		case 'Breve':
			$(".breve").addClass('compare'+ num).removeClass('hidden');
		break;
		
		case 'Mocha':
			$(".mocha").addClass('compare'+ num).removeClass('hidden');
		break;
		
		case 'Cappuccino':
			$(".cappuccino").addClass('compare'+ num).removeClass('hidden');		
		break;
		
		case 'Americano':
			$(".americano").addClass('compare'+ num).removeClass('hidden');
		break;
		
		default:
			console.log("nothing found");
		break;
	}
}

function checkCount() {
	if (count >= 2) {
		count = 0;
	}
}