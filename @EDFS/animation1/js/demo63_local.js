var formprepare63;
var url_search = window.location.search;
url_search = url_search.split('?');
url_search = url_search[1];

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)')
		.exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
var getReferrer = function() {
	var referrer = '';
	try {
		referrer = window.top.document.referrer;
	} catch (e) {
		if (window.parent) {
			try {
				referrer = window.parent.document.referrer;
			} catch (e2) {
				referrer = '';
			}
		}
	}
	if (referrer === '') {
		referrer = document.referrer;
	}
	return referrer;
};
click = true;
time = 0;

function timeCount() {
	if (time > 1) {
		time--;
		$("#getCode63").text(time);
		setTimeout('timeCount()', 1000);
	} else {
		click = true;
		$("#getCode63").text("获取验证码");
	}
}
(function($) {
	var form_begin_time = new Date().getTime();
	$(function() {
		try {
			url_search.split('&').forEach(function(param) {
				param = param.split('=');
				var name = param[0],
					val = param[1];
				try {
					val = decodeURIComponent(val);
				} catch (e) {
					// console.log(e)
				}
				//console.log(val)
				//console.log(name)
				//$('#'+name).attr('type','text').val(val);
				//console.log( $('#'+name+'').val(val))
				$('#form').find('input[name=' + name + ']').val(val);
			})
		} catch (e) {}
		if ($('#refer63').size() > 0) {
			$('#refer63').val(getReferrer());
		}
		if ($('#land63').size() > 0) {
			$('#land63').val(window.top.location.href);
		}
		var tableid = 63;
		$("#getCode63").click(function() {
			if (click) {
				var v = $('#phone63').val();
				data = {
					'phone': v,
					'tableid': tableid
				}
				$.get($(this).data('url'), data, function(r) {
					if (r.status == 1) {
						click = false;
						time = 60;
						timeCount();
					}
					alert(r.msg);
				})
			}
		})
	});
	formprepare63 = function(oform) {
		var ntime = new Date().getTime();
		var regex, fval;
		/*  */
		if ($('#delay_time63').size() > 0) {
			$('#delay_time63').val(ntime - form_begin_time);
		}
		$.post($(oform).attr('action'), $(oform).serialize(), function(json) {
			if (json.status == 1 && $('#redirect63').size() > 0 && $('#redirect63').val() != '') {
				if ($('#redirect63').data('title'))
					alert($('#redirect63').data('title'));
				else
					alert(json.info);
//				location.href = $('#redirect63').val();
			} else {
				alert(json.info);
			}
		}, 'JSON');
		return false;
	}
})(jQuery);