/* The task should be as follow:
when the bar is clicked, display the nav list and also be able to click on the items and be directed to where those items are located on the page. The nav should toggle to the right slowly */

//var for the button
var buttonOpen = document.getElementById("open-nav");
//var for the X of nav when ope
 var buttonClose = document.getElementById("close-nav");

/* event handler hides and shows various elements */

var handler = function(event) {
  var elMenu = document.getElementById('list').style.display = "block";
 var bars = document.getElementById('open-nav').style.display = "none";
  var buttonClose = document.getElementById("close-nav").style.display = "block";
}
buttonOpen.addEventListener('click', handler, false);

/*event handler for closing the nav Can't get this handler and event to work and I need to figure out if it's because my previous event is targeting the closeButton so it's not displaying what I want it to because it's under the handler task */
var escapeNav = function(event) {
  var elMenu = document.getElementById('list').style.display ='none';
}

buttonClose.addEventListener('click', escapeNav);
