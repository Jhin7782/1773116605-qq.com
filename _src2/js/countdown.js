var interval = 1000;

function countTime(targetYear, targetMonth, targetDay, cdName, leftDayId, leftHourId, leftMinId, leftSecId) {
	var now = new Date();
	var endDate = new Date(targetYear, targetMonth - 1, targetDay);
	var leftTime = endDate.getTime() - now.getTime();
	var leftsecond = parseInt(leftTime / 1000);
	//var day=parseInt(leftsecond/(24*60*60*6)); 
	var leftDay = Math.floor(leftsecond / (60 * 60 * 24));
	var leftHour = Math.floor((leftsecond - leftDay * 24 * 60 * 60) / 3600);
	var leftMin = Math.floor((leftsecond - leftDay * 24 * 60 * 60 - leftHour * 3600) / 60);
	var leftSec = Math.floor(leftsecond - leftDay * 24 * 60 * 60 - leftHour * 3600 - leftMin * 60);
	var countdown = document.getElementById(cdName);
	var cdDay = document.getElementById(leftDayId);
	var cdHour = document.getElementById(leftHourId);
	var cdMin = document.getElementById(leftMinId);
	var cdSec = document.getElementById(leftSecId);
	//countdown.innerHTML = day + "D" + hour + "H" + minute + "M" + second + "S";
	cdDay.innerHTML = "0" + leftDay;
	cdHour.innerHTML = "0" +  leftHour;
	cdMin.innerHTML = leftMin;
	cdSec.innerHTML = leftSec;
}

function countdown(targetYear, targetMonth, targetDay, cdName, leftDayId, leftHourId, leftMinId, leftSecId) {
	window.setInterval(function() {
		countTime(targetYear, targetMonth, targetDay, cdName, leftDayId, leftHourId, leftMinId, leftSecId);
	}, interval);
}