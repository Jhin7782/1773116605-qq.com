<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <script type="text/javascript" src="/themes/v2/static/js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="/themes/comm/js/layer/layer.js"></script>
    <script>
		console.log("<?php echo $_SERVER['DOCUMENT_ROOT']; ?>");
		
        function postData(formid, action, callback) {
            $("#" + formid).ajaxSubmit(
                {
                    type: "post",
                    url: action,
                    success: function (data) {
                        eval(callback + '((' + data + '))');
                    }
                });
        }
        function login() {
            console.log("提交表单");
            postData('loginForm', "/index.php/user/login/2", 'showResult');
        }
        function showResult(data) {
            console.log(data);
//            layer.msg(data.msg);
            if (data.code == '1') {
                window.setTimeout(function () {
                    this.location.href = data.url;
                }, 1000);
            } else {
                layer.msg(data.msg);
                console.log(data.roomId);
            }
        }
    </script>

    <style>
			* {
				margin: 0;
				padding: 0;
			}
			
			body {
				border: 1px solid black;
				background: url(/themes/v2/static/images/loginPage.jpg) no-repeat center;
				background-size: cover;
				font-family: "微软雅黑";
				overflow: hidden;
			}
			
			form {
				background-color: rgba(0, 0, 0, 0.2);
				width: 14rem;
				height: 8rem;
				box-sizing: border-box;
				padding: 0.5rem 1.75rem;
				text-align: center;
				/*margin: 40% auto 0;*/
				color: #ccc;
				position: relative;
				top: calc(50% - 4rem);
				left: calc(50% - 7rem);
			}
			
			li {
				list-style: none;
				font-size: 0.85rem;
				margin-bottom: 0.5rem;
			}
			
			li:nth-of-type(2),
			li:nth-of-type(3) {
				display: -webkit-flex;
				justify-content: space-between;
			}
			
			li> span {
				/*margin-right: 25px;*/
			}
			
			input {
				background-color: transparent;
				border: 1px solid #FE5B5B;
				border-radius: 6px;
				width: 8.125rem;
				height: 1.2rem;
				vertical-align: middle;
				font-family: "微软雅黑";
				font-size: 24px;
				color: white;
				box-sizing: border-box;
				padding-left: 0.5rem;
			}
			
			input:focus {
				outline: none;
			}
			
			input:-webkit-autofill,
			textarea:-webkit-autofill,
			select:-webkit-autofill {
				-webkit-box-shadow: 0 0 0 100px #484D58 inset;
				-webkit-text-fill-color: white;
			}
			
			li:last-of-type input {
				background-color: #FE5B5B;
				border-radius: 8px;
				width: 100%;
				height: 1.5rem;
				color: white;
				font-size: 0.975rem;
				padding-left: 0;
				appearance: none;
				-webkit-appearance: none;
			}
			
			hr {
				border: 1px dashed #00bcd4;
			}
			
			p {
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				-webkit-justify-content: space-around;
				font-size: 0.5rem;
			}
			
			#getAccount,
			#forgetPwd {
				cursor: pointer;
			}
			
			#forgetShow {
				color: #fed943;
				border: 1px solid #fed943;
				border-radius: 0.1rem;
				width: 7rem;
				position: relative;
				left: 4.75rem;
				top: 5px;
				display: none;
				font-size: 0.5rem;
			}
			
			#popup {
				position: relative;
				top: -3rem;
				left: calc(50% - 6rem);
				width: 12rem;
				border: 1px solid black;
				display: none;
			}
			
			#popup img {
				width: 100%;
				display: block;
			}
			
			#closeBtn {
				position: absolute;
				top: 0.2rem;
				right: 0.2rem;
				border: 1px solid currentcolor;
				border-radius: 0.5rem;
				display: block;
				width: .7rem;
				height: .7rem;
				font-size: .7rem;
				text-align: center;
				line-height: .55rem;
				cursor: pointer;
				color: #444;
			}
			
			#closeBtn:hover {
				background-color: #444;
				color: white;
			}
		</style>
</head>
<body>
    	<form id="loginForm" onsubmit="login();return false;">
			<ul>
				<li><input type="hidden" name="roomid" value="<?php echo $jumpRoom; ?>" /></li>
				<li><span>账号</span><input type="text" name="loginname" autocomplete="off" placeholder="user name"></li>
				<li><span>密码</span><input type="password" name="password" ispwd="1" autocomplete="off" placeholder="password"></li>
				<li>
					<hr />
				</li>
				<li><input type="submit" value="登录"></li>
				<p><span id="getAccount">如何获取帐号</span><span id="forgetPwd">忘记密码</span></p>
				<div id="forgetShow">请联系您的专属客服重置密码</div>
			</ul>
		</form>
		<div id="popup">
			<img id="accountShow" src="/themes/v2/static/images/accountShow.png" />
			<span id="closeBtn">x</span>
		</div>
		
		<script type="text/javascript">
			(function() {
				var html = document.documentElement,
					a = function() {
						var width = html.getBoundingClientRect().width;
						html.style.fontSize = 0.0625 * (width >= 640 ? 640 : width) + "px"
					},
					c = null;
				window.addEventListener("resize", function() {
					clearTimeout(c);
					c = setTimeout(a, 100)
				});
				window.addEventListener("load", function() {
					clearTimeout(c);
					c = setTimeout(a, 100)
				});
				a()
			})();

			if(/Android (\d+\.\d+)/.test(navigator.userAgent)) {
				var version = parseFloat(RegExp.$1);
				if(version > 2.3) {
					var phoneScale = parseInt(window.screen.width) / 640;
					if(/MZ-M571C/.test(navigator.userAgent)) {
						document.write('<meta name="viewport" content="width=640">');
					} else {
						document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
					}
				} else {
					document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
				}
			} else {
				document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
			}
		</script>
    
    <script type="text/javascript">
			var docEle_clientHeight = document.documentElement.clientHeight;
			var docEle_offsetHeight = document.documentElement.offsetHeight;
			var docEle_scrollHeight = document.documentElement.scrollHeight;

			var body_clientHeight = document.body.clientHeight;
			var body_offsetHeight = document.body.offsetHeight;
			var body_scrollHeight = document.body.scrollHeight;

			var screen_height = window.screen.height;
			var screen_availHeight = window.screen.availHeight;
			
			document.body.style.height = docEle_clientHeight + "px";
//			document.body.style.height = body_scrollHeight + "px";
//			document.body.style.height = screen_height + "px";
//			document.body.style.height = screen_availHeight + "px";
			console.log(docEle_clientHeight);
			console.log(body_scrollHeight);
			console.log(screen_height);
			console.log(screen_availHeight);
			
//			$('#loginForm input').each(function(){
// 				$(this).attr("value","");
//			});
			
			var forgetPwd = document.getElementById("forgetPwd");
			var forgetShow = document.getElementById("forgetShow");
			forgetPwd.onclick = function() {
				forgetShow.style.display = "block";
				var hideItv = setTimeout(function() {
					forgetShow.style.display = "none";
				}, 3000)
			}

			var getAccount = document.getElementById("getAccount");
			var popup = document.getElementById("popup");
			var closeBtn = document.getElementById("closeBtn");
			getAccount.onclick = function() {
				popup.style.display = "block";
			}
			closeBtn.onclick = function() {
				popup.style.display = "none";
			}
		</script>
</body>
</html>