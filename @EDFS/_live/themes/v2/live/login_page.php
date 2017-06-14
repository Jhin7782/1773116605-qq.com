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
				background-color: rgba(0,0,0,0.2);
				width: 600px;
				height: 330px;
				
				box-sizing: border-box;
				padding: 20px 90px;
				text-align: center;
				margin: 200px auto 0;
				
				color: #ccc;
			}
			
			li {
				list-style: none;
				font-size: 36px;
				margin-bottom: 20px;
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
				width: 325px;
				height: 48px;
				vertical-align: middle;
				font-family: "微软雅黑";
				font-size: 24px;
				color: white;
				box-sizing: border-box;
				padding-left: 20px;
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
				height: 60px;
				color: white;
				font-size: 30px;
				padding-left: 0;
			}
			
			hr {
				border: 1px dashed #00bcd4;
			}
			
			p {
				display: -webkit-flex;
				justify-content: space-between;
			}
			
			#forgetShow {
				color: #fed943;
				border: 1px solid #fed943;
				border-radius: 4px;
				width: 240px;
				position: relative;
				left: 265px;
				top: 5px;
				display: none;
			}
			#accountShow {
				position: relative;
				bottom: 450px;
				right: 20px;
				display: none;
			}
		</style>
</head>
<body>
    <form id="loginForm" onsubmit="login();return false;">
        <ul>
            <li><input type="hidden" name="roomid" value="<?php echo $jumpRoom; ?>" /></li>
			<li><span>账号</span><input type="text" name="loginname" autocomplete="off" placeholder="user name"></li>
			<li><span>密码</span><input type="password" name="password" ispwd="1" autocomplete="off" placeholder="password"></li>
			<li><hr / ></li>
			<li><input type="submit" value="登录"></li>
			<p><span id="getAccount">如何获取帐号</span><span id="forgetPwd">忘记密码</span></p>
			<div id="forgetShow">请联系您的专属客服重置密码</div>
			<img id="accountShow" src="/themes/v2/static/images/accountShow.png"/>
        </ul>
    </form>
    
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
			forgetPwd.onmouseover = function() {
				forgetShow.style.display = "block";
			}
			forgetPwd.onmouseout = function() {
				forgetShow.style.display = "none";
			}
			
			var getAccount = document.getElementById("getAccount");
			var accountShow = document.getElementById("accountShow");
			getAccount.onmouseover = function() {
				accountShow.style.display = "block";
			}
			getAccount.onmouseout = function() {
				accountShow.style.display = "none";
			}
		</script>
</body>
</html>