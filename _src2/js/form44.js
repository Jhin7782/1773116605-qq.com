var formprepare44;
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
	} catch(e) {
		if(window.parent) {
			try {
				referrer = window.parent.document.referrer;
			} catch(e2) {
				referrer = '';
			}
		}
	}
	if(referrer === '') {
		referrer = document.referrer;
	}
	return referrer;
};
click = true;
time = 0;

function timeCount() {
	if(time > 1) {
		time--;
		$("#getCode44").text(time);
		setTimeout('timeCount()', 1000);
	} else {
		click = true;
		$("#getCode44").text("获取验证码");
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
				} catch(e) {
					// console.log(e)
				}
				//console.log(val)
				//console.log(name)
				//$('#'+name).attr('type','text').val(val);
				//console.log( $('#'+name+'').val(val))
				$('#form').find('input[name=' + name + ']').val(val);
			})
		} catch(e) {

		}
		if($('#refer44').size() > 0) {
			$('#refer44').val(getReferrer());
		}
		if($('#land44').size() > 0) {
			$('#land44').val(window.top.location.href);
		}

		var tableid = 44;
		$("#getCode44").click(function() {
			if(click) {
				var v = $('#phone44').val();
				data = {
					'phone': v,
					'tableid': tableid
				}
				$.get($(this).data('url'), data, function(r) {
					if(r.status == 1) {
						click = false;
						time = 60;
						timeCount();
					}
					alert(r.msg);
				})
			}
		})

	});
	formprepare44 = function(oform) {
		var ntime = new Date().getTime();
		var regex, fval;
		/* regex = /^1[3|4|5|8]\d{9}$/;
            fval = $('#phone44').val();
            if (!regex.test(fval)) {
                alert('手机号码字段格式错误');
                return false;
            }; */

		if($('#delay_time44').size() > 0) {
			$('#delay_time44').val(ntime - form_begin_time);
		}

		$.post($(oform).attr('action'), $(oform).serialize(), function(json) {

			if(json.status == 1 && $('#redirect44').size() > 0 && $('#redirect44').val() != '') {
				if($('#redirect44').data('title'))
					alert($('#redirect44').data('title'));
				else
					alert(json.info);
				//location.href = $('#redirect44').val();
			} else {
				alert(json.info);
			}
		}, 'JSON');
		return false;
	}

})(jQuery);