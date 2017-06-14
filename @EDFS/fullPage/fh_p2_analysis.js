! function(a, b) {
	function d() {
		if ("object" == typeof localStorage) return localStorage;
		if ("object" == typeof globalStorage) return globalStorage[location.href];
		if ("object" == typeof userData) return globalStorage[location.href];
		throw new Error("no support localStore")
	}

	function f() {}
	var c = {
			userData: null,
			name: location.href,
			init: function() {
				if (!c.userData) try {
					c.userData = b.createElement("INPUT"), c.userData.type = "hidden", c.userData.style.display = "none", c.userData.addBehavior("#default#userData"), b.body.appendChild(c.userData);
					var a = new Date;
					a.setDate(a.getDate() + 365), c.userData.expires = a.toUTCString()
				} catch (d) {
					return !1
				}
				return !0
			},
			setItem: function(a, b) {
				c.init() && (c.userData.load(c.name), c.userData.setAttribute(a, b), c.userData.save(c.name))
			},
			getItem: function(a) {
				return c.init() ? (c.userData.load(c.name), c.userData.getAttribute(a)) : void 0
			},
			removeItem: function(a) {
				c.init() && (c.userData.load(c.name), c.userData.removeAttribute(a), c.userData.save(c.name))
			}
		},
		e = d();
	f.prototype = {
		setItem: function(b, d) {
			a.localStorage ? e.setItem(b, d) : c.setItem(b, d)
		},
		getItem: function(b) {
			return a.localStorage ? e.getItem(b) : c.getItem(b)
		},
		removeItem: function(b) {
			a.localStorage ? e.removeItem(b) : c.removeItem(b)
		}
	}, a._localStorage = new f
}(window, document),
function(a) {
	function R() {
		return Date.now()
	}

	function U(a) {
		var b, c;
		return a = a || window.event, a.pageX || a.clientX && (b = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, a.pageX = a.clientX + b, a.pageY = a.clientY + c), a
	}

	function V() {
		var a = document;
		return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
	}

	function W() {
		var a = document;
		return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth))
	}

	function X() {
		return I("fjr_did") || G("fjr_did") || Y()
	}

	function Y() {
		var a = (new Date).getTime(),
			b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
				var c = 0 | (a + 16 * Math.random()) % 16;
				return a = Math.floor(a / 16), ("x" == b ? c : 8 | 3 & c).toString(16)
			});
		return b
	}

	function $(b) {
		var c, d, e;
		if (m) {
			if (q || bb(), c = {
					key: "view",
					view: 0,
					type: b || 0,
					path_name: m,
					domain: A.hostname,
					origin: A.href,
					platform: q
				}, c.duration = R() - n, 0 == b) {
				d = {}, c.count = 1, c.timestamp = R();
				for (e in c) d[y[e]] = c[e];
				_({
					events: JSON.stringify([d])
				}, 0)
			} else a.add_event(c);
			m = null
		}
	}

	function _(b, c) {
		var d, e, f;
		if (!a.ignore_bots || !v) {
			b.app_key = a.app_key, b.device_id = a.device_id, b.country_code = a.country_code, b.city = a.city, b.host_url = A.origin, b.ip_address = a.ip_address, b.channel = I("fjr_channel") || null, b.channel_code = I("fjr_channel_code") || null, b.resolution = r, b.user_id = I("fjr_user_id") || null, b.system_id = window.system_id || a.system_id || I("fjr_system_id") || "", b.source = window.source || a.source || I("fjr_source") || "", b.timestamp = R(), d = document.referrer, e = {}, b.organic = d && u.test(d) ? d.match(u)[0] : "-";
			for (f in b) b[f] && (e[y[f]] = b[f]);
			0 == c ? cb(e) : (g.push(e), G("fjr_queue", g, !0))
		}
	}

	function ab() {
		var b, d, e, i, l;
		if ("undefined" != typeof a.q && a.q.length > 0) {
			for (d = 0; d < a.q.length; d++) b = a.q[d], "function" == typeof b ? b() : b.constructor === Array && b.length > 0 && "undefined" != typeof a[b[0]] && a[b[0]].apply(null, b.slice(1));
			a.q = []
		}
		c && j && w && (e = R(), e - k > 60 && (a.session_duration(e - k), k = e)), h.length > 0 && (h.length <= 10 ? (_({
			events: JSON.stringify(h)
		}), h = []) : (i = h.splice(0, 10), _({
			events: JSON.stringify(i)
		})), G("fjr_event", h)), g.length > 0 && p && (l = g.shift(), cb(l), G("fjr_queue", g, !0)), setTimeout(ab, f)
	}

	function bb() {
		var c, d, e, f, g, h, i, j, k, l, m, n, o, p, u, v, w, x, b = {};
		for (b[y.app_version] = a.app_version, screen.width && (c = screen.width ? screen.width : "", d = screen.height ? screen.height : "", b[y.resolution] = "" + c + "x" + d, r = "" + c + "x" + d), e = navigator.appVersion, f = D, g = navigator.appName, j = "Internet Explorer", k = [
				["Chrome"],
				["Firefox"],
				["MSIE", j],
				["Trident", j],
				["Android"],
				["Safari"],
				["iPhone"],
				["Edge"],
				["Opera"],
				["OPR", "Opera"],
				["Opera Mini"],
				["IEMobile"],
				["Chromium"],
				["FxiOS", "Firefox"],
				["FBAV/", "Facebook app"],
				["baiduboxapp/", "Baidu Box App"],
				["baidubrowser"],
				["Dolfin"],
				["Skyfire"],
				["bolt"],
				["teashark"],
				["Blazer"],
				["Tizen"],
				["UCWEB", "UCBrowser"],
				["UC.", "UCBrowser"],
				["DiigoBrowser"],
				["Puffin"],
				["Mercury"],
				["Obigo"],
				["NF-Browser"],
				["amaya"],
				["Arora"],
				["Avant"],
				["BlackBerry"],
				["RIM", "BlackBerry"],
				["CFNetwork"],
				["Camino"],
				["Coast"],
				["Dalvik"],
				["Dillo"],
				["DoCoMo"],
				["ELinks"],
				["Espial", "Espial TV Browser"],
				["FlyFlow"],
				["GSA", "Google App"],
				["Google Desktop"],
				["GooglePlus", "Google+ App"],
				["IBrowse"],
				["Jasmine"],
				["Kindle"],
				["Konqueror"],
				["Links"],
				["Lotus-Notes"],
				["Lynx"],
				["WAP"],
				["MiuiBrowser"],
				["Nokia"],
				["OneBrowser"],
				["Outlook"],
				["Palm"],
				["Pinterest", "Pinterest App"],
				["Playstation"],
				["PlayStation"],
				["PLAYSTATION"],
				["Polaris"],
				["QQ"],
				["Qt"],
				["QuickTime"],
				["SEMC-Browser"],
				["SamsungBrowser"],
				["SeaMonkey"],
				["Sleipnir"],
				["SmartTV"],
				["Viera", "SmartViera"],
				["Thunderbird"],
				["Vivaldi"],
				["wOSBrowser", "webOS"],
				["WebTV"],
				["wp-", "WordPress App"],
				["YaBrowser"],
				["iCab"],
				["iTunes"],
				["rekonq"],
				["rekonq"]
			], l = 0; l < k.length; l++)
			if (-1 != f.indexOf(k[l][0])) {
				m = k[l].length, g = 1 == m ? k[l][0] : k[l][1];
				break
			}!g && (h = f.lastIndexOf(" ") + 1) < (i = f.lastIndexOf("/")) && (g = f.substring(h, i), g.toLowerCase() == g.toUpperCase() && (g = navigator.appName)), b[y.browser] = g, n = "unknown", o = [{
			s: "Windows ME",
			r: /(Win 9x 4.90|Windows ME)/
		}, {
			s: "Windows 2000",
			r: /(Windows NT 5.0|Windows 2000)/
		}, {
			s: "Windows XP",
			r: /(Windows NT 5.1|Windows XP)/
		}, {
			s: "Windows Server 2003",
			r: /Windows NT 5.2/
		}, {
			s: "Windows Vista",
			r: /Windows NT 6.0/
		}, {
			s: "Windows 7",
			r: /(Windows 7|Windows NT 6.1)/
		}, {
			s: "Windows 8.1",
			r: /(Windows 8.1|Windows NT 6.3)/
		}, {
			s: "Windows 8",
			r: /(Windows 8|Windows NT 6.2)/
		}, {
			s: "Windows NT 4.0",
			r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
		}, {
			s: "Windows ME",
			r: /Windows ME/
		}, {
			s: "Windows Phone",
			r: /Windows Phone/
		}, {
			s: "Android",
			r: /Android/
		}, {
			s: "Open BSD",
			r: /OpenBSD/
		}, {
			s: "Sun OS",
			r: /SunOS/
		}, {
			s: "Linux",
			r: /(Linux|X11)/
		}, {
			s: "iOS",
			r: /(iPhone|iPad|iPod)/
		}, {
			s: "Mac OSX",
			r: /Mac OS X/
		}, {
			s: "Mac OS",
			r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
		}, {
			s: "QNX",
			r: /QNX/
		}, {
			s: "UNIX",
			r: /UNIX/
		}, {
			s: "BeOS",
			r: /BeOS/
		}, {
			s: "OS/2",
			r: /OS\/2/
		}, {
			s: "SearchBot",
			r: t
		}];
		for (p in o)
			if (u = o[p], u.r.test(f)) {
				n = u.s;
				break
			}
		switch (v = "unknown", /Windows/.test(n) && "Windows Phone" != n && (v = /Windows (.*)/.exec(n)[1], n = "Windows"), n) {
			case "Mac OSX":
				v = /Mac OS X (10[\.\_\d]+)/.exec(f)[1];
				break;
			case "Windows Phone":
				v = (/Windows Phone ([\.\_\d]+)/.exec(f) || ["", "8.0"])[1];
				break;
			case "Android":
				v = /Android ([\.\_\d]+)/.exec(f)[1];
				break;
			case "iOS":
				v = /OS (\d+)_(\d+)_?(\d+)?/.exec(e), v = v[1] + "." + v[2] + "." + (0 | v[3])
		}
		return b[y.os] = n, q = n, b[y.os_version] = v, w = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage, "undefined" != typeof w && (b[y.locale] = w), "undefined" != typeof document.referrer && document.referrer.length && (x = s.exec(document.referrer), x && x[11] && x[11] != A.hostname && (b[y.referrer] = document.referrer)), b
	}

	function cb(a) {
		var b = new Image(1, 1);
		b.src = d + "a.gif?" + db(a)
	}

	function db(a) {
		var c, b = [];
		for (c in a) b.push(c + "=" + encodeURIComponent(a[c]));
		return b.join("&")
	}

	function eb(a) {
		return a && "/" == a.substr(a.length - 1) ? a.substr(0, a.length - 1) : a
	}
	var k, q, r, x, M, N, O, P, Q, b = !1,
		c = !1,
		d = ("https:" == location.protocol ? "https://" : "http://") + "analysis.fengjr.com/analysis/",
		f = 1e3,
		g = [],
		h = [],
		i = {},
		j = !0,
		l = 0,
		m = null,
		n = 0,
		o = 0,
		p = !0,
		s = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
		t = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver|bingbot|Google Web Preview|Mediapartners-Google|AdsBot-Google|Baiduspider|Ezooms|YahooSeeker|AltaVista|AVSearch|Mercator|Scooter|InfoSeek|Ultraseek|Lycos|Wget|YandexBot|Yandex|YaDirectFetcher|SiteBot|Exabot|AhrefsBot|MJ12bot|TurnitinBot|magpie-crawler|Nutch Crawler|CMS Crawler|rogerbot|Domnutch|ssearch_bot|XoviBot|netseer|digincore|fr-crawler|wesee|AliasIO)/,
		u = /(sogou|soso|baidu|google|youdao|yahoo|bing|118114|biso|gougou|ifeng|ivc|sooule|niuhu|biso|360)/gi,
		v = !1,
		w = !0,
		y = {
			app_key: "ak",
			secret_key: "sk",
			device_id: "did",
			user_id: "uid",
			channel: "cl",
			channel_code: "clc",
			timestamp: "t",
			ip_address: "ip",
			city: "cy",
			country_code: "cc",
			host_url: "hu",
			begin_session: "bs",
			session_duration: "sd",
			end_session: "es",
			events: "ets",
			key: "k",
			type: "tp",
			count: "c",
			duration: "d",
			width: "w",
			height: "h",
			x: "x",
			y: "y",
			domain: "dm",
			name: "n",
			value: "ve",
			segments: "sgt",
			title: "tl",
			referrer: "rfr",
			origin: "o",
			path_name: "pn",
			view: "v",
			last_view: "lv",
			id: "id",
			href: "hf",
			text: "txt",
			metrics: "ms",
			os: "os",
			os_version: "osv",
			app_version: "av",
			browser: "bs",
			resolution: "r",
			locale: "ln",
			platform: "p",
			source: "s",
			system_id: "sysid",
			organic: "ogc",
			sum: "sm"
		},
		z = !0,
		A = window.location,
		C = {
			domain: ".fengjr" + A.hostname.match(/\.inc|\.com/),
			path: "/",
			expires: 30
		},
		D = navigator.userAgent,
		E = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
		F = window._localStorage,
		G = function(a, b, c) {
			c = c || !1;
			var e, d = !1;
			if ("undefined" != typeof localStorage) {
				d = !0;
				try {
					F.setItem("testLocal", !0)
				} catch (f) {
					d = !1
				}
			}
			if ("undefined" != typeof b && null !== b && ("object" == typeof b && (b = JSON.stringify(b)), d ? F.setItem(a, b) : c || I(a, b, {
					expires: 30
				})), "undefined" == typeof b) {
				d ? e = F.getItem(a) : c || (e = I(a));
				try {
					e = JSON.parse(e)
				} catch (f) {
					e = e
				}
				return e
			}
			null === b && (d ? F.removeItem(a) : c || I(a, null))
		},
		H = function(a, b) {
			for (var c in b) a[c] = b[c];
			return a
		},
		I = function(a, b, c) {
			var d, e, f, g, h, i, j, k, l;
			if ("undefined" == typeof b) {
				if (i = null, document.cookie && "" != document.cookie)
					for (j = document.cookie.split(";"), k = 0; k < j.length; k++)
						if (l = j[k].replace(/(^\s*)|(\s*$)/g, ""), l.substring(0, a.length + 1) == a + "=") {
							i = decodeURIComponent(l.substring(a.length + 1));
							break
						}
				return i
			}
			c = c || {}, null === b && (b = "", c = H({}, c), c.expires = -1), d = "", c.expires && ("number" == typeof c.expires || c.expires.toUTCString) && ("number" == typeof c.expires ? (e = new Date, e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c.expires)) : e = c.expires, d = "; expires=" + e.toUTCString()), f = c.path ? "; path=" + c.path : "", g = c.domain ? "; domain=" + c.domain : "", h = c.secure ? "; secure" : "", document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join("")
		},
		J = function(a, b, c) {
			return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
		},
		B = H(C, {
			expires: 5e3
		});
	for (M = 0; M < E.length; M++)
		if (D.indexOf(E[M]) > 0) {
			z = !1;
			break
		}
	if (Date.now || (Date.now = function() {
			return (new Date).getTime() || +new Date
		}), location.search)
		for (N = location.search.substring(1).split("&"), O = 0; O < N.length; O++) P = N[O].split("="), "fjr_did" == P[0] ? I("fjr_did", P[1], B) : "fjr_uid" == P[0] ? I("fjr_uid", P[1], C) : "channel_code" == P[0] ? I("fjr_channel_code", P[1], C) : ("channel" == P[0] || "c" == P[0]) && (I("fjr_channel", P[1], C), I("fjr_channel_date", 1e3 * R(), C), Q = I("fjr_ad_channel_date"), (!Q || Q && R() - Q / 1e3 > 2592e6) && (I("fjr_ad_channel", P[1], C), I("fjr_ad_channel_date", 1e3 * R(), C)));
	a.init = function(c) {
		b || (x = R(), b = !0, g = G("fjr_queue") || [], i = G("fjr_timed") || {}, h = G("fjr_event") || [], c = c || {}, f = c.interval || a.interval || f, a.debug = c.debug || a.debug || !1, a.app_key = c.app_key || a.app_key || null, a.device_id = c.device_id || a.device_id || X(), a.host_url = eb(c.host_url || a.host_url), a.app_version = c.app_version || a.app_version || "0.1", a.country_code = c.country_code || a.country_code || "", a.city = c.city || a.city || null, a.ip_address = c.ip_address || a.ip_address || null, a.ignore_bots = c.ignore_bots || a.ignore_bots || !0, a.q = a.q || [], t.test(D) && (v = !0), a.q.constructor !== Array && (a.q = []), ab(), I("fjr_did") ? G("fjr_did", I("fjr_did")) : G("fjr_did", a.device_id), I("fjr_did", a.device_id, B))
	}, a._setProperty = function(a, b) {
		a && I(a, b, C)
	}, a._setUserId = function(a) {
		I("fjr_user_id", a, H(C, {
			expires: 182
		}))
	}, a.begin_session = function(a) {
		if (!c) {
			k = R(), c = !0, j = a ? !1 : !0;
			var b = {};
			b.begin_session = 1, b.domain = A.hostname, b.path_name = A.pathname, b.origin = A.href, b.metrics = JSON.stringify(bb()), _(b)
		}
	}, a.session_duration = function(a) {
		c && _({
			session_duration: a
		})
	}, a.end_session = function(a) {
		$(0 == a || 2 == a ? a : 1), c && (c = !1, ab())
	}, a.change_id = function(b, c) {
		var d = a.device_id;
		a.device_id = b, G("fjr_did", a.device_id), c && _({
			old_device_id: d
		})
	}, a.add_event = function(a) {
		var b, c;
		if (a.key) {
			a.domain = A.hostname, a.path_name = m || A.pathname, a.origin = A.href, a.timestamp = R(), a.count || (a.count = 1), b = {};
			for (c in a)(a[c] || 0 == a[c]) && (b[y[c]] = a[c]);
			h.push(b), G("fjr_event", h)
		}
	}, a.custom_event = function(b) {
		b = b || {}, b.key = b.key || "custom_event", a.add_event(b)
	}, a.start_event = function(a) {
		i[a] || (i[a] = R(), G("fjr_timed", i))
	}, a.end_event = function(b) {
		"string" == typeof b && (b = {
			key: b
		}), b.key && i[b.key] && (b.duration = R() - i[b.key], a.add_event(b), delete i[b.key], G("fjr_timed", i))
	}, a.stop_time = function() {
		w = !1, l = R() - k, o = R() - n
	}, a.start_time = function() {
		w = !0, k = R() - l, n = R() - o, o = 0
	}, a.track_sessions = function() {
		function c() {
			document[b] ? a.stop_time() : a.start_time()
		}
		a.begin_session(!0), a.start_time(), window.onbeforeunload = function() {
			a.end_session(0)
		}, J(window, "unload", function() {
			a.end_session(0)
		});
		var b = "hidden";
		b in document ? document.addEventListener("visibilitychange", c) : (b = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", c) : (b = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", c) : (b = "msHidden") in document ? document.addEventListener("msvisibilitychange", c) : "onfocusin" in document ? (J(window, "focusin", function() {
			a.start_time()
		}), J(window, "focusout", function() {
			a.stop_time()
		})) : (J(window, "focus", function() {
			a.start_time()
		}), J(window, "blur", function() {
			a.stop_time()
		}), J(window, "pageshow", function() {
			a.start_time()
		}), J(window, "pagehide", function() {
			a.stop_time()
		}))
	}, a.track_pageview = function(b, c) {
		b = b || A.pathname, m = b, n = R(), q || bb();
		var d = {
			key: "view",
			view: 1,
			title: document.title,
			referrer: c || document.referrer || null,
			path_name: b,
			domain: A.hostname,
			origin: A.href
		};
		a.add_event(d)
	}, a.track_view = function(b, c) {
		a.track_pageview(b, c)
	}, a.track_clicks = function(b) {
		function d(b) {
			if (c) {
				c = !1, U(b);
				var d = V(),
					e = W();
				a.add_event({
					key: "action",
					type: "click",
					x: b.pageX,
					y: b.pageY,
					width: e,
					height: d,
					origin: A.href
				}), setTimeout(function() {
					c = !0
				}, 300)
			}
		}
		b = b || document;
		var c = !0;
		z ? J(b, "mousedown", d) : J(b, "click", d)
	}, a.track_links = function(b) {
		function c() {
			function c(b, c) {
				var d, e;
				U(b), d = {
					key: "link_click",
					href: c.href,
					name: c.attributes["fen"] && c.attributes["fen"].nodeValue || c.id || c.name || null,
					origin: A.href,
					x: b.pageX,
					y: b.pageY
				}, a.add_event(d), "undefined" == typeof c.href || "_blank" === c.target || b.metaKey || b.altKey || b.ctrlKey || b.shiftKey || (e = c.href.replace(A.href.split("#")[0], ""), 0 !== e.indexOf("#") && a.end_session(2))
			}
			"undefined" != typeof b.getElementsByTagName && J(b, "click", function(a) {
				var b, d;
				a = a || event, b = a.target || a.srcElement, d = !1;
				do "a" == b.nodeName.toLowerCase() ? (d = !1, c(a, b)) : (d = !0, b = b.parentNode); while (b && d)
			})
		}
		b = b || document, "complete" === document.readyState ? c() : J(window, "load", c)
	}
}(window._fja = window._fja || {}), _fja.q = _fja.q || [], _fja.q.push(["track_pageview"]), _fja.q.push(["track_sessions"]), _fja.q.push(["track_clicks"]), _fja.q.push(["track_links"]);