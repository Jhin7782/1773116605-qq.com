if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
	var version = parseFloat(RegExp.$1);
	if (version > 2.3) {
		var phoneScale = parseInt(window.screen.width) / 640;
		if (/MZ-M571C/.test(navigator.userAgent)) {
			document.write('<meta name="viewport" content="width=640", user-scalable=no>');
		} else {
			document.write('<meta name="viewport" content="width=640, user-scalable=no, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
		}
	} else {
		document.write('<meta name="viewport" content="width=640,user-scalable=no, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}

$(function() {
	$w = $('.pic2').width();
	$h = $('.pic2').height();
	$w2 = $w + 181;
	$h2 = $h + 91;
	$('.pic2').stop().animate({
		height: $h2,
		width: $w2,
		left: "-100px",
		top: "-80px"
	}, 500);

});