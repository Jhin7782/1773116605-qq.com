//为什么？？？？？？？？？？？？？？？？？？？w？？？？？？？？？？？？？
//			添加onclick事件不行
//			只能用jq代码添加绑定事件，且必须放在按钮之后

//var money = 180;
$('#p2_location').bind("click", function() {
	console.log("bind click");
	var money_float = $("#p2_input").val() * 0.09;
	var money_double = Math.round(money_float);
	$("#p2_input").val("-" + money_double);
});

$('#p2_location').bind("click", function() {
	$('#omg_lost').show();
});

$('#p5_hongbao,#p5_coin,#p5_span0,#p5_mouth').bind("click", function() {
	$('#p5_span0').css({
		'top': '5.8rem',
		'left': '4.45rem'
	});
	$('#p5_span0').html("领取100000操盘金<br />实操实战赚翻番");

	setTimeout(function() {
		$('#shadow').show();
		$('#pop_bg').show("normal", "linear");
		$('#close').show("normal", "linear");
	}, 600);
	
	$.fn.fullpage.setAllowScrolling(false, 'up');
});
$('#shadow, #close').bind("click", function() {
	$('#close').hide();
	$('#pop_bg').hide("normal", "swing");
	$('#shadow').hide();
	$.fn.fullpage.setAllowScrolling(true, 'up');
});

//			$("#p2_input").focus(function() {
//				console.log("focus")
//				var account_value = $(this).val();
////				if (account_value == "-9") {
//					$(this).val("123");
////				}
//			});
//			$("#p2_input").blur(function() {
//				console.log("blur");
//				var account_value = $(this).val();
//				$(this).val(account_value);
//			});

//			$('#p2_input').each(function() {
//				var vdefault = $(this).val();
//				$(this).focus(function() {
//					console.log("focus");
//					if($(this).val()==vdefault) {
//						$(this).val('');
//					}
//				});
//				$(this).blur(function() {
//					console.log("blur");
//					if ($(this).val()=="") {
//						console.log("blur.val()==''");
//						$(this).val($(this).val());
//					}
//				});
//			});