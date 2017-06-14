	function countTime(targetYear, targetMonth, targetDay, targetHour, targetMin, targetSec, cdName, cdDay, cdHour, cdMin, cdSec) {
		var leftTime = (new Date(targetYear, targetMonth - 1, targetDay, targetHour, targetMin, targetSec)) - (new Date()); //计算剩余的毫秒数  
		var leftDay = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数  
		var leftHour = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时  
		var leftMinute = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟  
		var leftSecond = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数  
		leftDay = checkTime(leftDay);
		leftHour = checkTime(leftHour);
		leftMinute = checkTime(leftMinute);
		leftSecond = checkTime(leftSecond);
		//console.log(leftDay + "," + leftHour + "," + leftMinute + "," + leftMinute);

		//document.getElementById("countdown").innerHTML = leftDay + "天" + leftHour + "小时" + leftMinute + "分" + leftSecond + "秒";
		var cdDay = document.getElementById(cdDay);
		var cdHour = document.getElementById(cdHour);
		var cdMin = document.getElementById(cdMin);
		var cdSec = document.getElementById(cdSec);
		cdDay.innerHTML = leftDay;
		cdHour.innerHTML = leftHour;
		cdMin.innerHTML = leftMinute;
		cdSec.innerHTML = leftSecond;
	}

	function countdown(targetYear, targetMonth, targetDay, targetHour, targetMin, targetSec, cdName, cdDay, cdHour, cdMin, cdSec) {
		window.setInterval(function() {
			countTime(targetYear, targetMonth, targetDay, targetHour, targetMin, targetSec, cdName, cdDay, cdHour, cdMin, cdSec)
		}, 1000);
	}

	function checkTime(i) { //将0-9的数字前面加上0，例1变为01  
		if(i < 10) {
			i = "0" + i;
		}
		return i;
	}