function longPress(obj, LinkId) {
	obj.on({
		touchstart: function(e) {
			timeOutEvent = setTimeout("longPressed(" + LinkId + ")", 500);

		},
		touchmove: function() {
			clearTimeout(timeOutEvent);
			timeOutEvent = 0;
		},
		touchend: function() {
			clearTimeout(timeOutEvent);
			return false;
		}
	})
}

function longPressed() {
	console.log("you have press it for more than 500ms;");
	alert("you have press it for more than 500ms;");
}