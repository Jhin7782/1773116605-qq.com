/*
*依赖于layer 弹框插件 适合pc端
*
* 在引用此js前需引入 layer.js 必须
*/
var actRegister = {
		 flag: false,
		 hasCaptcha: false,
		 hostName: 'https://security.9666.cn',
		 option: {
		 	an: 'default',
		 	isLayer : false, //是否弹窗 默认非弹窗
		 	isShowImgCode : false//是否显示图片验证码 默认不显示
		 },
		 //错误提示
		 errorTips: function(errMsg){
			var page2 = layer.msg(errMsg);// pc端使用
		 },
		 //倒计时
	     countDown: function(dom, m){
	        dom.text(m + '秒后可重发');
	        var t = setInterval(function(){
	            m--;
	            if(m == 0){ 
	                dom.text('获取验证码').removeAttr('disabled');
	                clearInterval(t);
	                return;
	            }
	            dom.text(m + '秒后可重发');
	        }, 1000);
	     },
	     //判断是否存在图片验证码
 		 isHasCaptcha: function(){
 			var _this = this;
 			if(_this.option.$captcha.is(':hidden')){
 				_this.hasCaptcha = false;return _this.hasCaptcha;
 			}
 			_this.hasCaptcha = true;return _this.hasCaptcha;
		 },
		 //刷新验证码
		 reloadCaptcha: function(){
		 	var _this = this;
			_this.option.$imgCode.attr('src', _this.hostName + '/captcha.action?t='+(+new Date()));
		 },
		 getPhone: function(){var _this = this;return _this.option.$phone.val();},
		 getCaptcha: function(){var _this = this;if(_this.isHasCaptcha()){return _this.option.$captcha.val();}},
		 getCode: function(){var _this = this;return _this.option.$code.val();},
		
		//检查手机号是否合法
		 checkPhone: function(){
			var _this = this, phoneVal = this.getPhone();
	        if(phoneVal == ''){_this.errorTips('手机号不能为空' ); _this.flag = false; return false; }
	        if(phoneVal.length != 11 || !/^\d*$/.test(phoneVal)){_this.errorTips('手机号必须是11位数字' ); _this.flag = false; return false; }
	        if(!/^(13|14|15|17|18)\d{9}$/.test(phoneVal)){_this.errorTips('手机号不正确' ); _this.flag = false; return false; }
	        this.flag = true; return true;
		 },
		//检查图片验证码是否为空
		 checkCaptcha: function(){
			var _this = this, captchaVal = this.getCaptcha();
		     if(captchaVal == ''){_this.errorTips('图片验证码不能为空' ); _this.flag = false; return false; }
		     this.flag = true; return true;
		 },
		 //检查验证码是否为空
		 checkCode: function(){
			var _this = this, codeVal = this.getCode(); 
			if(codeVal == ''){_this.errorTips('短信验证码不能为空' ); _this.flag = false; return false; }
		    this.flag = true; return true;
		 },
		 //注册用户
		 regSubmit: function(){
		 	// debugger;
			 var _this = this;
			 // var win = window.open();
			 var param = {
				phone: _this.getPhone(),
				phoneCode: _this.getCode(),
				partner: _this.option.an
			}
			$(this).attr('disabled','disabled').addClass('noClick');
			$.ajax({
				url: _this.hostName + '/p/jsonp/registerPureAjax.action',
				data: param,
				dataType: 'jsonp',
				success: function(d){
					if(d.success){
						_this.option.$submitBtn.removeAttr('disabled').removeClass('noClick');
						_this.option.isLayer && layer.closeAll();
						 if(d.dataMap.isPhoneExist){
				    		layer.open({
                                content: '您已经注册过啦！',
                                btn: ['确定'],
                                title: false,
								closeBtn:0,
                                yes: function(){
                                	_this.autoLogin(d.dataMap.loginToken);
                                }
                    		});
                    		return;
						}
					//注册成功跳转URL自动登录
						_this.autoLogin(d.dataMap.loginToken);
					}else{
						_this.option.$submitBtn.removeAttr('disabled').removeClass('noClick');
						_this.errorTips(d.message);
					}
				},
				error: function(){
					_this.errorTips('网络出错，请稍后再试！');
				}
			});
		 },
		 //注册成功跳转URL自动登录
		 autoLogin:function(token){
		 	$.ajax({
                url: 'http://acs.9666.cn/loginJsonpAjax.action?token=' + token,
                dataType:"jsonp",
                success: function(data){
                    if(data.success){
                    	window.location.href = newUrl;
                    }else{
                      _this.errorTips(data.message,'#phone');
                    }
                } 
            });
		 },						
		 //获取手机验证码
		 sendPhone: function(){
			 var _this = this;
			 var param = {
			 	an: _this.option.an,
				phone: _this.getPhone(),
				code: _this.getCaptcha()
			 }
			 $.ajax({
				 url: _this.hostName + '/p/jsonp/sendPhoneValidatePureAjax.action',
				 data: param,
				 dataType: 'jsonp',
				 success:function(d){
					 if(d.success){
						 _this.option.$getCode.attr('disabled','disabled').addClass('noClick');
						 _this.countDown(_this.option.$getCode,60);
					 }else{
					 	 _this.option.$getCode.removeAttr('disabled').removeClass('noClick');
						 _this.errorTips(d.message);
						 if(d.errorType == 6){
							 _this.reloadCaptcha();
						 }
						 if(d.errorType == 5){
							 $('.imgCode').show();
						 }
					 }
				 }
			 });
		 },
		 getData : function(args){
		 	var _this = this;
		 	var data = $.extend(_this.option,args);
		 	//console.log(_this.option);
		 },
		 init: function(args){
			 var _this = this;
			 //获取手机验证码
			 _this.getData(args);
			 _this.option.$getCode.click(function(){
				 if(_this.isHasCaptcha()){
					 if(_this.checkPhone() && _this.checkCaptcha()){
						 _this.sendPhone();
					 } 
				 }else{
					 if(_this.checkPhone()){
						 _this.sendPhone();
					 }
				 }
				 
			 })
			 //注册用户先判断是否验证图片验证码
			 _this.option.$submitBtn.click(function(){
			 	//alert(1);
			 	// debugger;
				 if(_this.isHasCaptcha()){
					 if(_this.checkPhone() && _this.checkCaptcha() && _this.checkCode()){
						_this.regSubmit();
					 }
				 }
				 else{
					 if(_this.checkPhone() && _this.checkCode()){
						 _this.regSubmit();
					 }
				 }
				 
			 });

			if(_this.option.isShowImgCode){
				$('.imgCode').show();
			}
			 
			 //点击切换验证码
			 _this.option.$imgCode.click(function(){
				 _this.reloadCaptcha();
			 });
		 }
	 }