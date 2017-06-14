$.format = function (source, params) 
{
	if (arguments.length == 1)
	return function () {
	var args = $.makeArray(arguments);
	args.unshift(source);
	return $.format.apply(this, args);
	};
	if (arguments.length > 2 && params.constructor != Array) {
	params = $.makeArray(arguments).slice(1);
	}
	if (params.constructor != Array) {
	params = [params];
	}
	$.each(params, function (i, n) {
	source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
}; 
jQuery.fn.extend({     
    /**    
     * 选中内容    
     */    
    selectContents: function(){     
        $(this).each(function(i){     
            var node = this;     
            var selection, range, doc, win;     
            if ((doc = node.ownerDocument) &&     
                (win = doc.defaultView) &&     
                typeof win.getSelection != 'undefined' &&     
                typeof doc.createRange != 'undefined' &&     
                (selection = window.getSelection()) &&     
                typeof selection.removeAllRanges != 'undefined')     
            {     
                range = doc.createRange();     
                range.selectNode(node);     
                if(i == 0){     
                    selection.removeAllRanges();     
                }     
                selection.addRange(range);     
            }     
            else if (document.body &&     
                     typeof document.body.createTextRange != 'undefined' &&     
                     (range = document.body.createTextRange()))     
            {     
                range.moveToElementText(node);     
                range.select();     
            }     
        });     
    },     
    /**    
     * 初始化对象以支持光标处插入内容    
     */    
    setCaret: function(){     
        if(!$.browser.msie) return;     
        var initSetCaret = function(){     
            var textObj = $(this).get(0);     
            textObj.caretPos = document.selection.createRange().duplicate();     
        };     
        $(this)     
        .click(initSetCaret)     
        .select(initSetCaret)     
        .keyup(initSetCaret);     
    },     
    /**    
     * 在当前对象光标处插入指定的内容    
     */    
    insertAtCaret: function(textFeildValue){     
       var textObj = $(this).get(0);     
       if(document.all && textObj.createTextRange && textObj.caretPos){     
           var caretPos=textObj.caretPos;     
           caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?     
                               textFeildValue+'' : textFeildValue;     
       }     
       else if(textObj.setSelectionRange){     
           var rangeStart=textObj.selectionStart;     
           var rangeEnd=textObj.selectionEnd;     
           var tempStr1=textObj.value.substring(0,rangeStart);     
           var tempStr2=textObj.value.substring(rangeEnd);     
           textObj.value=tempStr1+textFeildValue+tempStr2;     
           textObj.focus();     
           var len=textFeildValue.length;     
           textObj.setSelectionRange(rangeStart+len,rangeStart+len);     
           textObj.blur();     
       }     
       else {     
           textObj.value+=textFeildValue;     
       }     
    }  
}); 
function InsertMsgPic(e,i)
{
	$('#sendMsgInput').insertAtCaret('[img='+e+']');
	$('#sourceimg').val(i);
	$('#imgthumb').val(e);
}

//去除网页标签
function removeHTMLTag(str)
{
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    // str = str.replace(/(^\s*)|(\s*$)/g, "");
    // str = str.replace(/(^\s*)/g, "");
    // str = str.replace(/(\s*$)/g, "");
    str = str.replace(/&nbsp/ig, '');//去掉&nbsp;
    return str;
}

/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }

    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}



function ChatContainer() {
	this.maxNum;
	this.container;
	this.scroolwrap;
	this.tabType; //public member private
	this.dynamicscroll;
	this.create = function (scroolwrap, containerid, max,scrollconf) {
		this.privateNum = 0;
		this.publicNum = 0;
		this.maxNum = max;
		this.tabType = 'public';
		this.container = $(containerid);
		this.scroolwrap = $(scroolwrap);
		this.dynamicscroll = true;

		this.scroolwrap.mCustomScrollbar(scrollconf);
	};

	this.insert = function(msgItem){
		var scrollToDIV=document.createElement('div');
		scrollToDIV.setAttribute('id','scrollToLiveDIV');
		this.container.prepend(scrollToDIV);
		this.container.prepend(msgItem);
		this.scroolwrap.mCustomScrollbar("update");
		this.scroolwrap.mCustomScrollbar("scrollTo","#scrollToLiveDIV");
	};

	this.push = function (msgItem) {
		this.container.append(msgItem);
		this.scrollToLast();
	};
	//滚动到底部
	this.scrollToLast = function () {
		this.scroolwrap.mCustomScrollbar("update");
		if (this.dynamicscroll) {
			this.scroolwrap.mCustomScrollbar("scrollTo", "bottom");
		}
	};
	//内容切换显示
	this.tabToType = function (type) {
		this.tabType = type;
		$('#talk_filter a').removeClass();
		$('#talk_filter a[rel=' + type + ']').addClass('cur');
		this.container.children().hide();
		this.container.children('.' + type).show();
		this.scrollToLast();

	};
	//清屏
	this.clear = function () {
		this.container.children('.' + this.tabType).remove();
	}
}


//输入框
function send_image(value){
	$('#sendMsgInput').insertAtCaret('['+value+']');
}

//聊天图片
function talk_pic(img){
	// TINY.box.show({image: img});
	var width=document.body.offsetWidth-10;
	var height=document.body.offsetHeight-30;
	TINY.box.show({
		image: img,animate:true, openjs: function () {
			$('.tbox').css('position', 'absolute');
		}
	});
}



function new_upImage(){

	var isIE=document.all && window.external;
	if(!isIE){
		document.getElementById('filedata').click();
	}
}



function hoverDel(){
	$('#topicbox > div').hover(
		function(){
			$(this).find('.delete').show();
		},function(){
			$(this).find('.delete').hide();
		}
	);
}

active_session = function(){
    $.ajax({
          async: false, 
          url: "/active_session.html?" +new Date().valueOf(),
          success: function(data){
          },
          dataType: "html"
    });
};


function postdata(formid, action, callback)
{
	//layer.load(2);
	$("#" + formid).ajaxSubmit(
	{			
		type:"post",
		url:action,
		success:function(data){	
			eval(callback + '((' + data + '))');
		}
	})
}

function showForm(){
	// alert('你准备登陆');
	var roomid=document.getElementById('roomid').value;
	var form = '<div id="popup">' +
		'<div id="tabs"><a href="javascript:void(0)" onclick="openLogin()">登录</a></div>' +
		'<div id="loginDIV">' +
		'<form id="loginForm" action="" onsubmit="login();return false">' +
		'<input type="hidden" name="roomid" value="'+roomid+'" />' +
		'<input type="text" placeholder="帐号" name="loginname" class="text_input us_input"/>' +
		'<input type="password" placeholder="密码"name="password" ispwd="1" class="text_input us_input"/>' +
		'<input type="submit" style="background-color: #ff1320"value="登 录"/>' +
		'</form></div></div>';

	TINY.box.show({html:form,openjs:function(){
		$('.alert_title').hide();
		$('.tbox').css('position','absolute');
	}});
}
function login() {
	postdata('loginForm', "/index.php/user/login", 'show');
}

function register(){
	postdata('registerForm',"/index.php/user/reg",'show');
}

function refreshPid(){
	$("#imgyzm").attr('src', '/index.php/code/create_vcode' + '/' + Math.random());
}


function show(d) {
	if (d.code == '1') {
		layer.msg(d.msg);
		window.setTimeout(function () {
			parent.window.location.reload();
		}, 1000);
	} else {
		layer.msg(d.msg);
	}
}

/*刷新在线人数*/
function refreshOnlineNumber(){
	$('#onlineUserNumber').html(896+parseInt(Math.random()*30));
}

