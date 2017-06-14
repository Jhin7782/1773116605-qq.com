jQuery(document).ready(function() {

	$(".sider_fixed, .btn-register").click(function() {
//		$(this).hide();
		$(".shadow, .center_fixed_bg").show();
	})

	$(".close_btn, .close_btn2").click(function() {
		$(".shadow, .center_fixed_bg").hide();
//		$(".sider_fixed").show();
	})

})