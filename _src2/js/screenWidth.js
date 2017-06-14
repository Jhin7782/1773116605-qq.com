//$(document).ready(onChange())
window.onload = onChange();

function onChange() {
	var screen_width = $(window).width();
	console.log(screen_width);
	var position_left = (screen_width-400)/2;
	console.log(position_left);
	
	$(".center_fixed_bg").css("left", position_left);
	$("#kfpopupDiv").css("left", position_left+400);
	
}

window.addEventListener("resize", function() {
	onChange();
})