jQuery(document).ready(function() {
	var wechatAccountGroup = ['微信1', '微信2', '微信3'];
	var key = Math.floor(wechatAccountGroup.length * Math.random());
	$('.wechat_account').html(wechatAccountGroup[key]);
})