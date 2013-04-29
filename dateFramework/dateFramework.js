/*
//Initiate global date variable
var today = new Date();
console.log("Today is: " + today);

//Events
var d1 = new Date("October 13, 1975 11:13:00")


//Check if event has occurred
if (d1 < today) {
	console.log("Your event has occurred!");

} else {
	console.log("Your event has not occurred.")
}

*/


 var today = new Date();
// First let's create an array of JavaScript Date
// objects.
// More info about the Date class:
// http://w3schools.com/js/js_obj_date.asp
var dates = [
new Date(2013, 0, 10, 10, 07, 16),
new Date(2013, 1, 10, 10, 07, 16),
new Date(2013, 5, 10, 10, 07, 16),
new Date(2013, 4, 10, 10, 07, 16),
new Date(2013, 4, 8, 9, 16, 09),
new Date(2013, 2, 30, 0, 15, 49),
new Date(2013, 2, 8, 10, 08, 35)];
 
// Now we will define our date comparison functions. These are callbacks
// that we will be providing to the array sort method below.
var date_sort_asc = function (date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};
 
var date_sort_desc = function (date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // DESCENDING order.
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};
 
// Finally, we are now able to call the sort method on our array of dates.
// More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp
 
// First let's sort the array in ascending order.
dates.sort(date_sort_asc);
 
// Now let's output the results to the page to show that the dates are now
// sorted in ascending order.
var dateList = document.createElement("ul");
dateList.id = "dateList";
dateList.innerHTML =  "Dates sorted in ascending order (oldest to newest)";
document.body.appendChild(dateList);

var todayDate = document.createElement("li");
todayDate.innerHTML = "Today is: " + today;
dateList.appendChild(todayDate);

for (var i = 0; i < dates.length; i++) {

	var dateElement = document.createElement('li');
	dateElement.id = "dates" + i;
	dateElement.innerHTML = i + ': ' + dates[i] + '<br>';
	
	if (dates[i] < today) {
		todayDate.insertBefore(dateElement, todayDate.lastChild);	
	} else {
		todayDate.appendChild(dateElement, todayDate.firstChild);
	}
  
}
 
// Now let's sort the dates in descending order and output the results.

/*dates.sort(date_sort_desc);
 
document.write('<p id="todayDesc">Dates sorted in descending order (newest to oldest):</p>');
document.write( today + '<br>');
for (var i = 0; i < dates.length; i++) {
	if (dates[i] > today) {
		document.write(i + ': ' + dates[i] + '<br>');	
	}
}*/
 
// That's all there is to it!
// From: http://onpub.com/index.php?s=7&a=109
