//jQuery(document).ready(function() {
function randomPassword(obj, pwdLength) {
	var randomPassword = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
	];

	for(var i = 0; i < pwdLength; i++) {
		var index = Math.floor(randomPassword.length * Math.random());
		$("#"+obj).append(randomPassword[index]);
	}

	$("#"+obj).append("**");
}

function randomPwd_for (obj, loopCount, pwdLength) {
	for (var i = 0; i < loopCount; i++) {
		randomPassword(obj+i, pwdLength);
	}
}

function award(obj) {
	var award = ['iphone7', '10元豹子号连钞套票', '20元豹子号连钞套票', 'ThinkPad E450 笔记本'];
	var index = Math.floor(award.length * Math.random());
	$("#"+obj).html(award[index]);
}

function award_for (obj, loopCount) {
	for (var i = 0; i < loopCount; i++) {
		award(obj+i);
	}
}

//})