/*37e90805a7dd41e93f02c7e4810ee440*/
function addBookmark(t, e) {
	try {
		window.external.addFavorite(e, t)
	} catch(n) {
		try {
			window.sidebar.addPanel(t, e, "")
		} catch(n) {
			alert("加入收藏失败，请使用Ctrl+D进行添加")
		}
	}
}

function loadJs(t, e) {
	var n = document.getElementsByTagName("head")[0],
		a = document.createElement("script");
	return a.setAttribute("type", "text/javascript"), a.setAttribute("src", t), n.appendChild(a), a.onload = function() {
		e()
	}, !1
}

function addBookmarkCB(t, e) {
	try {
		window.external.addFavorite(e, t)
	} catch(n) {
		try {
			window.sidebar.addPanel(t, e, "")
		} catch(n) {
			alert("加入收藏失败，请使用Ctrl+D进行添加")
		}
	}
}

function cb_global_js(t, e) {
	function n(t) {
		for(var e = document.cookie.split("; "), n = 0; n < e.length; n++) {
			var a = e[n].split("=");
			if(a[0] == t) return a[1]
		}
		return ""
	}

	function a(t) {
		if(t.length % 2) return "";
		var e = "";
		for(i = 0; i < t.length; i += 2) e += "%" + t.charAt(i) + t.charAt(i + 1);
		return decodeURI(e)
	}
	t.CBfn = t.CBfn || {}, CBfn.getCMS = function(t, n) {
		e.ajax({
			url: "https://newcms.9666.cn/cowboycms/ajaxShow",
			data: {
				key: t
			},
			dataType: "jsonp",
			success: function(t) {
				n(t)
			}
		})
	};
	var s = !!n("cowboy_login"),
		o = a(n("cowboy_nick_name")),
		c = n("cowboy_user_name");
	e.extend(CBcfg, {
		isLogin: s,
		nickName: o,
		userName: c
	});
	var r = e("#cowboyIsLoginInfo"),
		p = "";
	r.length > 0 && (p = s ? '<a class="pl5 pr10 cblue" target="_blank" href="http://product.9666.cn/order/toMyOrder?s=1">我的订单</a><span class="c000">欢迎您：</span><a href="http://user.9666.cn/home/index" class="c000">' + o + '</a><a onclick="location.href=\'http://acs.9666.cn/logout.action\';return false;" href="javascript:;" class="pl10 c000">退出</a>' : '<a href="https://security.9666.cn/login.action" class="pl10 c000 js-noLogin">登录</a> | <a href="http://www.9666.cn/register.action" class="c000 js-noLogin">注册</a>', r.html(p));
	var h = {
		$dom: e("#realTimeQuotes"),
		$date: function() {
			return this.$dom.find(".js-date")
		},
		$ul: function() {
			return this.$dom.find("ul")
		},
		$zs000001: function() {
			return this.$ul().find("#codezs000001")
		},
		$zs399001: function() {
			return this.$ul().find("#codezs399001")
		},
		$zs399006: function() {
			return this.$ul().find("#codezs399006")
		},
		$zs399005: function() {
			return this.$ul().find("#codezs399005")
		},
		isFirst: !0,
		getData: function() {
			var t = this.isFirst ? {} : {
				stop: !0
			};
			e.ajax({
				url: "http://hq.9666.cn/exp/roll",
				data: t,
				dataType: "jsonp",
				success: function(t) {
					h.render(t)
				}
			}), this.isFirst = !1
		},
		render: function(t) {
			var n = this;
			if(t.stop !== !0) {
				var a = t.marketDate + "";
				a = a.substr(0, 4) + "." + a.substr(4, 2) + "." + a.substr(6, 2), this.dom.date.text(a), e.each(t.expInfos, function(t, e) {
					var a = n.dom[e[0] + "Span"],
						s = n.dom[e[0] + "Ems"],
						o = e[3] >= 0 ? "+" : "";
					a.css("color", e[3] >= 0 ? "red" : "green"), s.eq(0).text(e[1]), s.eq(1).text(o + e[2]), s.eq(2).text(o + e[3] + "%")
				})
			}
		},
		init: function() {
			var t = this;
			this.dom = {
				box: t.$dom,
				date: t.$date(),
				ul: t.$ul(),
				zs000001: t.$zs000001(),
				zs399001: t.$zs399001(),
				zs399006: t.$zs399006(),
				zs399005: t.$zs399005(),
				zs000001Span: t.$zs000001().find("span"),
				zs000001Ems: t.$zs000001().find("em"),
				zs399001Span: t.$zs399001().find("span"),
				zs399001Ems: t.$zs399001().find("em"),
				zs399006Span: t.$zs399006().find("span"),
				zs399006Ems: t.$zs399006().find("em"),
				zs399005Span: t.$zs399005().find("span"),
				zs399005Ems: t.$zs399005().find("em")
			}, this.getData(), setInterval(t.getData, 3e4), e("#realTimeQuotes ul").RollTitle({
				tagNames: "li",
				line: 1,
				speed: 900,
				timespan: 3e3
			})
		}
	};
	e("#realTimeQuotes").length > 0 && h.init(), e("body").delegate(".qqServer_help", "click", function() {
			t.open("http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAyNzcxMF8yMDM4MzlfODAwMDI3NzEwXzJf", "_blank", "height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no")
		}), e("body").delegate(".qqServer_licai", "click", function() {
			t.open("http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAyNzcxMF8yMDM4MDZfODAwMDI3NzEwXzJf", "_blank", "height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no")
		}), e(".service_telephone").text("010-64405008"),
		function() {
			if(setTimeout(function() {
					var t = e("#topSysTip"),
						n = e("#topSysTipBtn");
					if(n.length) {
						var a = parseInt(n.position().left - t.width() / 2);
						t.css("left", a + "px"), e("#topSysTipBtn").hover(function() {
							t.show()
						}, function() {
							t.hide()
						})
					}
				}, 2e3), e("#header2015")) {
				var t = e("#header2015 dt:first a"),
					n = e("#header2015 dd");
				t.click(function() {
					var a = e(this).index(t);
					e(this).addClass("curren").siblings("a").removeClass("curren"), n.eq(a).show().siblings("dd").hide()
				})
			}
			var a = e(".js-getCMSjsonp");
			a.length > 0 && e.each(a, function() {
				var t = e(this),
					n = t.data("key");
				"" != n && CBfn.getCMS(n, function(e) {
					t.append(e)
				})
			})
		}(), e(".js-commonStockSearchKey").length > 0 && "undefined" == typeof codes && loadJs("http://js.9666sr.com/sr/js/common/stockCode.js?ver=" + CBcfg.staticVersion || 0, function() {
			"undefined" == typeof e().autocomplete && loadJs("http://js.9666sr.com/sr/js/common/" + CBcfg.minjs + "/jquery.autocomplete.min.js?ver=" + CBcfg.staticVersion || 0, function() {
				loadJs("http://js.9666sr.com/sr/js/common/stockSearch.js?ver=" + CBcfg.staticVersion || 0, function() {})
			})
		});
	var l = {
		cb_header_nav: function() {
			var t = [];
			return t.push('<div id="cb_header_nav" class="w960 pt10 pb10 cccc">'), t.push('    <p class="fr">'), t.push('        <a href="http://pay.9666.cn/bank/toRecharge.action" class="ml10"><span class="iblock pl20" style="color:red; background:url(http://css.9666sr.com/sr/images/common/icon.png) no-repeat  -57px -2px;">金币充值</span></a>'), t.push('        <a href="http://product.9666.cn/order/toMyOrder/" class="ml10">我的订单</a>'), t.push('        <a href="javascript:;" class="ml10 qqServer_help">在线客服</a>'), t.push('        <a href="javascript:;" class="ml10" onclick="addBookmarkCB(\'牛仔网_中国第一股民社区\',\'http://www.9666.cn/\')">收藏本站</a>'), t.push("    </p>"), t.push("    <p>"), t.push('        <a href="http://www.9666.cn/">首页</a><span> | </span>'), t.push('        <a href="http://live.9666.cn/">股市直播</a><span> | </span>'), t.push('        <a href="http://pinglun.9666.cn/">股市评论</a><span> | </span>'), t.push('        <a href="http://gupiao.9666.cn/">股票</a><span> | </span>'), t.push('        <a href="http://xue.9666.cn/">股民学院</a><span> | </span>'), t.push('        <a href="http://act.9666.cn/">缤纷牛仔</a><span> | </span>'), t.push('        <a href="http://app.9666.cn/">牛仔客户端<img src="http://img.9666sr.com/sr/images/common/new.gif"></a>'), t.push("    </p>"), t.push("</div>"), t.join("")
		},
		cb_header_logo: function() {
			var t = [];
			return t.push('<div class="w960">'), t.push('    <p class="fr pt15">'), t.push('        <a href="https://security.9666.cn/login.action" class="cblue">登录</a>'), t.push('        <a href="http://www.9666.cn/register.action" class="cblue ml10">注册</a>'), t.push("    </p>"), t.push('    <a href="http://www.9666.cn/"><img src="http://img.9666sr.com/sr/images/common/logo_new.jpg" width="76" /></a>'), t.push("</div>"), t.join("")
		},
		cb_copyright: function() {
			var t = [];
			return t.push('<div class="w960 tc copyrightCon" style="border:1px solid #ebe7e8; padding:30px 0;">'), t.push('\t<p class="cccc">'), t.push('    \t<a href="http://corp.9666.cn/about/2014guanyuwomen.html">关于我们</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/2014hezuohuoban.html">合作伙伴</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/2014zhaoxiannashi.html">招贤纳士</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/2014lianxiwomen.html">联系我们</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/map.html">网站地图</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/help/">帮助中心</a><span> | </span>'), t.push('        <a href="http://admin.9666.cn/cpl/complain.action">意见反馈</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/nzly.html">社区公约</a><span> | </span>'), t.push('        <a href="http://corp.9666.cn/about/2014falvshengming.html">法律声明</a>'), t.push("    </p>"), t.push('    <p class="pt15 pb15">'), t.push('    \t<a href="http://www.hd315.gov.cn/beian/view.asp?bianhao=010202009120700003" target="_blank"><img alt="网站备案信息" src="http://img.9666sr.com/sr/images/common/top/foot_bg_2.png"></a>'), t.push('      \t<a href="http://www.isc.org.cn/" target="_blank"><img alt="中国互联网协会" src="http://img.9666sr.com/sr/images/common/top/foot_bg_3.png"></a>'), t.push('      \t<a href="https://search.szfw.org/cert/l/CX20141219006076006176" target="_blank"><img alt="可信网站" src="http://srimg.9666.cn/static/images/common/top/knetSealLogo.png" ></a>'), t.push('      \t<a href="http://www.315online.com.cn/member/315100008.html" target="_blank"><img alt="网上交易保障中心" src="http://img.9666sr.com/sr/images/common/top/foot_bg_4.png"></a>'), t.push('        <a target="_blank" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1787761718"><img src="http://corp.9666.cn/common/images/wzdzbs.png" alt="中国互联网信用评价中心"></a>'), t.push('        <img  src="http://img.9666sr.com/sr/images/common/top/foot_bg_1.gif" alt="东金管理">'), t.push("    </p>"), t.push("    <p>渝B2-20160007 渝ICP备15006358号-3 Copyright Copyright &copy; 2009-2016 www.9666.cn</p>"), t.push("</div>"), t.join("")
		}
	};
	e("#cb_header_nav").length && e("#cb_header_nav").html(l.cb_header_nav()), e("#cb_header_logo").length && e("#cb_header_logo").html(l.cb_header_logo()), e("#cb_copyright").length && e("#cb_copyright").html(l.cb_copyright()), loadJs(("https:" == document.location.protocol ? "https://s" : "http://") + "js.9666sr.com/sr/js/common/2016/" + CBcfg.minjs + "tongji_setcookie.js?ver=" + CBcfg.staticVersion || 0, function() {})
}
var CBcfg = CBcfg || {
	staticVersion: "9666",
	minjs: ""
};
jQuery.fn.extend({
	RollTitle: function(t, e) {
		if(!t) var t = {};
		var n = this;
		n.tagNames = t.tagNames || "p", n.timer = null, n.lineH = n.find(n.tagNames).eq(0).height() || 20, n.line = t.line ? parseInt(t.line) : parseInt(n.height() / n.lineH, 10), n.speed = t.speed ? parseInt(t.speed) : 3e3, n.timespan = t.timespan ? parseInt(t.timespan) : 5e3, 0 == n.line && (this.line = 1), n.upHeight = 0 - n.line * n.lineH, n.scrollUp = function() {
			n.children.length > 0 && n.animate({
				marginTop: n.upHeight
			}, n.speed, function() {
				for(i = 1; i <= n.line; i++) n.find(n.tagNames).eq(0).appendTo(n);
				n.css({
					marginTop: 0
				})
			})
		}, n.hover(function() {
			clearInterval(n.timer)
		}, function() {
			n.timer = setInterval(function() {
				n.scrollUp()
			}, n.timespan)
		}).mouseout()
	}
});
var JPlaceHolder = {
	_check: function() {
		return "placeholder" in document.createElement("input")
	},
	init: function() {
		this._check() || this.fix()
	},
	fix: function() {
		jQuery(":input[placeholder]").each(function(t, e) {
			var n = $(this),
				a = n.attr("placeholder"),
				s = n.css("font-size");
			n.wrap($("<div></div>").css({
				position: "relative",
				zoom: "1",
				border: "none",
				background: "none",
				padding: "none",
				margin: "none"
			}));
			var o = n.position(),
				c = n.outerHeight(!0),
				i = n.css("padding-left"),
				r = $("<span></span>").text(a).attr("class", "JPlaceHolder-span").css({
					position: "absolute",
					left: o.left,
					top: o.top,
					height: c,
					lineHeight: c + "px",
					fontSize: s,
					paddingLeft: i,
					color: "#aaa"
				}).appendTo(n.parent());
			n.focusin(function(t) {
				r.hide()
			}).focusout(function(t) {
				n.val() || r.show()
			}), r.click(function(t) {
				r.hide(), n.focus()
			})
		})
	}
};
jQuery(function() {
	JPlaceHolder.init()
}), "undefined" == typeof jQuery ? loadJs("http://js.9666sr.com/sr/js/common/headsettings.js", function() {
	cb_global_js(window, jQuery)
}) : cb_global_js(window, jQuery);
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-3110801-4"]), _gaq.push(["_addOrganic", "soso", "w"]), _gaq.push(["_addOrganic", "yodao", "q"]), _gaq.push(["_addOrganic", "bing", "q"]), _gaq.push(["_addOrganic", "vnet", "kw"]), _gaq.push(["_addOrganic", "sogou", "query"]), _gaq.push(["_setDomainName", ".9666.cn"]), _gaq.push(["_trackPageview"]), _gaq.push(["_setVisitorCookieTimeout", 31536e7]), _gaq.push(["_setCampaignCookieTimeout", 31536e7]),
	function() {
		var t = document.createElement("script");
		t.type = "text/javascript", t.async = !0, t.src = ("https:" == document.location.protocol ? "https://" : "http://") + "ga.9666sr.com/sr/js/common/ga.js?v=" + +new Date;
		var e = document.getElementsByTagName("script")[0];
		e.parentNode.insertBefore(t, e);
		var n = "https:" == document.location.protocol ? " https://" : " http://";
		document.write(unescape("%3Cspan id='cnzz_stat_icon_1255319797'%3E%3C/span%3E%3Cscript src='" + n + "w.cnzz.com/q_stat.php%3Fid%3D1255319797' type='text/javascript'%3E%3C/script%3E")), $("body").delegate(".js-cbga", "click", function() {
			if("undefined" != typeof window._gaq) {
				var t = window.location.href,
					e = $(this).data("gak"),
					n = $(this).data("href"),
					a = $(this).attr("href");
				a || (a = n ? n : t), "" != e && _gaq.push(["_trackEvent", t, e, a, 0, !0])
			}
		})
	}();
var _hmt = _hmt || [];
! function() {
	var t = document.createElement("script");
	t.src = "//hm.baidu.com/hm.js?94656c824ef4eacf1a61cd662f7a7f17";
	var e = document.getElementsByTagName("script")[0];
	e.parentNode.insertBefore(t, e)
}();