console.log("stuff happens");



var hover = document.getElementByClassName("hover1");
console.log(hover);
hover.addEventListener("mouseover", hoverHandler, false);


function hoverHandler (){
	console.log("hovering!");
}