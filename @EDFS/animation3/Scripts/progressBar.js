$("#sm1, #sm2").click(showPB);

function showPB() {
	console.log("click");
	if(($("#gp").val() == "") && ($("#gp1").val() == "")) {
		alert("股票代码不能为空");
	} else {
		$("#popup_block").show();
		$(".progressBar").animate({
			width: "25%"
		}, 3000, "", function() {
			$(".textArea").html("正在通过最小二乘法OLS确定必要报酬率...");
		});
		$(".progressBar").animate({
			width: "50%"
		}, 3000, "", function() {
			$(".textArea").html("正在通过VAR系统确认风险值...");
		});
		$(".progressBar").animate({
			width: "75%"
		}, 5000, "", function() {
			$(".textArea").html("正在通过量价交易模型...");
		});
		$(".progressBar").animate({
			width: "100%"
		}, 5000, "", function() {
			$(".textArea").html("计算完成，数据模型已经发往研究部整合，请通过下方老师助理咨询。");
			closePopup();
			showQR();
		});
	}
}

function showQR() {
	var gpinput = $(this).prev("span").children("input").val();
	if(gpinput == "") {
		//						alert("请输入正确的股票代码")
		//						return false;
	} else {
		$("#zm").fadeIn();
		presstj(774);

	}
}
$('.zm_zz').click(function() {
	$("#zm").fadeOut();

});

$(".close_btn").click(closePopup);

function closePopup() {
	$("#popup_block").hide();
	$(".progressBar").stop(true);
	$(".progressBar").width("0px");
	$(".textArea").html("正在通过事件驱动策略模型...");
}