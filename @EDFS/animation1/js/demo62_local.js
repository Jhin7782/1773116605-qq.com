var formprepare62;
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
		$("#getCode62").text(time);
		setTimeout('timeCount()', 1000);
	} else {
		click = true;
		$("#getCode62").text("获取验证码");
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
		if ($('#refer62').size() > 0) {
			$('#refer62').val(getReferrer());
		}
		if ($('#land62').size() > 0) {
			$('#land62').val(window.top.location.href);
		}
		var tableid = 62;
		$("#getCode62").click(function() {
			if (click) {
				var v = $('#phone62').val();
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
	formprepare62 = function(oform) {
		var ntime = new Date().getTime();
		var regex, fval;
		/*  */
		if ($('#delay_time62').size() > 0) {
			$('#delay_time62').val(ntime - form_begin_time);
		}
		$.post($(oform).attr('action'), $(oform).serialize(), function(json) {
			if (json.status == 1 && $('#redirect62').size() > 0 && $('#redirect62').val() != '') {
				if ($('#redirect62').data('title'))
					alert($('#redirect62').data('title'));
				else
					alert(json.info);
//				location.href = $('#redirect62').val();
			} else {
				alert(json.info);
			}
		}, 'JSON');
		return false;
	}
})(jQuery);