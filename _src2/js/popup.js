jQuery(document).ready(function() {

	var t = setTimeout(function() {
		$(".center_fixed").show();
		$(".shadow, .center_fixed_bg").hide();
	}, 8000)

	$(".sider_fixed, .btn_register, .btn_register2").click(function() {
		$(".shadow, .center_fixed_bg").show();
		$(".center_fixed").hide();
	})

	$(".center_fixed_entry").click(function() {
		$(".shadow, .center_fixed_bg").show();
		$(".center_fixed").hide();
	})

	$(".close_btn, .close_btnn, .close_btn2").click(function() {
		$(".shadow, .center_fixed, .center_fixed_bg").hide();
	})

})

function popup_show(popupSwitch, targetObj) {
	$("." + popupSwitch).click(function() {
		addEleCover("coverWrap", "cover");
		$("." + targetObj).show();
	})
}

function popup_hide (clsoeSwitch, targetObj) {
	$("." + clsoeSwitch).click(function() {
		removeEleCover("coverWrap", "cover");
		$("." + targetObj).hide();
	})
}