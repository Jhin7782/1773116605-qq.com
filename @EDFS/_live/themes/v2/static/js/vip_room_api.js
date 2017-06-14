

function new_upImage(){

    var isIE=document.all && window.external;
    if(!isIE){
        document.getElementById('filedata').click();
    }
}

function new_upImageLive(){

    var isIE=document.all && window.external;
    if(!isIE){
        document.getElementById('fileLiveData').click();
    }
}

function postdata(formid, action, callback)
{
    $("#" + formid).ajaxSubmit(
        {
            type:"post",
            url:action,
            success:function(data){
                // alert(data);
                eval(callback + '((' + data + '))');
            }
        });
}


//处理聊天语言，替换表情
function msgFilter(msg){
    var key=[];

    var str = msg.match(/^:caitiao\[([a-z0-9\.\/\u4e00-\u9fa5]+?)\]$/g);
    if( str ){
        var ckey = str[0].substr(9, str[0].indexOf(']')-9 );
        msg = '<img src="' + phiz_path +'color_bar/'+caitiao[ckey]+'"/>';
        return msg;
    }
    key =msg.match(/\[([a-zA-Z0-9=\.\/\u4e00-\u9fa5]+?)\]/g);
    if( key == null) return msg;
    for(i = 0;i< key.length;i++){
        var pkey = key[i].substr(1,key[i].indexOf(']')-1 );
        if( pkey.length >24 && pkey.substr(0,4) =='img='){
            pkeys=pkey.split('/');
            if(pkeys.length == 2){
                msg = msg.replace(key[i],'<img class="talk_pic" src="' + image_url + '/Uploads/' + pkeys[0].substr(4) + '/m_' + pkeys[1] + '" title="点击看大图" onClick="talk_pic(\'' +pkeys[0].substr(4) + '/' + pkeys[1] + '\')">');
            }
        }else{
            if(!phiz.hasOwnProperty(pkey)){
                continue;
            }

            msg = msg.replace( key[i],'<img src="' + phiz_path +'phiz/'+phiz[pkey]+'"/>');
        }
    }
    return  msg;
}

//用户列表显示块
function UserListContainer(){
    this.scroolwrap;
    this.container;
    this.tabType;//all manager follow
    this.create = function(scrollwrapid,containerid,scrollconf){
        this.container = $(containerid);
        this.Type = 'all';
        this.scroolwrap = $(scrollwrapid);
        this.scroolwrap.mCustomScrollbar(scrollconf);
    };

    //切换显示
    this.tabToType = function(type){
        this.tabType = type;
        if(type=='all'){
            this.container.children().show();
            this.container.children('.manager').hide();
        }else{
            this.container.children().hide();
            this.container.children('.'+type).show();
        }
        this.update();
    };
    //清空
    this.clear = function(){
        this.container.empty();
    };
    //搜索
    this.search = function(word){
        this.container.children().hide();
        this.container.children('#'+word).show();
        this.container.children('[name='+word+']').show();
    };
    //更新
    this.update = function(){
        this.scroolwrap.mCustomScrollbar('update');
    };

    //替换全部内容
    this.replaceUser=function(userlist){
        this.container.html(userlist);
        this.scroolwrap.mCustomScrollbar('update');
    };
}


//聊天显示块类
function ChatContainer(){
    this.maxNum;
    this.container;
    this.scroolwrap;
    this.tabType; //public member private
    this.dynamicscroll;
    this.create = function(scroolwrap,containerid,max,scroll){
        this.privateNum = 0;
        this.publicNum = 0;
        this.maxNum = max;
        this.tabType = 'public';
        this.container = $(containerid);
        this.scroolwrap = $(scroolwrap);
        this.dynamicscroll =true;

        this.scroolwrap.mCustomScrollbar(scroll);
    };

    this.push = function(msgItem){

        this.container.append(msgItem);
        this.scrollToLast();
    };

    this.insert = function(msgItem){
        var scrollToDIV=document.createElement('div');
        scrollToDIV.setAttribute('id','scrollToLiveDIV');
        this.container.prepend(scrollToDIV);
        this.container.prepend(msgItem);
        this.scroolwrap.mCustomScrollbar("update");
        this.scroolwrap.mCustomScrollbar("scrollTo","#scrollToLiveDIV");
    };
    //滚动到底部
    this.scrollToLast = function(){
        this.scroolwrap.mCustomScrollbar("update");
        if(this.dynamicscroll){
            this.scroolwrap.mCustomScrollbar("scrollTo","bottom");
        }
    };
    //内容切换显示
    this.tabToType = function(type){
        this.tabType = type;
        this.container.children().hide();
        this.container.children('.'+type).show();
        this.scrollToLast();

    };
    //清屏
    this.clear = function(){
        this.container.children('.'+this.tabType).remove();
    }
}


var regform='<div id="regForm" style="display: block;" class="layer_pageContent">' +
    '<div class="cfix regFormHead"><div class="f1 fl">用户注册</div>' +
    '<div class="f2 fl">设置账户及登录密码</div></div>' +
    '<div style="padding:15px;">' +
    '<form action="javascript:;" id="form1">' +
    '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
    '<tbody><tr><td align="right">账户名：</td><td> ' +
    '<input name="username" type="text" class="input">&nbsp;<span style="color:red">必填</span></td></tr>' +
    '<tr><td align="right">个人昵称：</td><td>' +
    '<input name="name" type="text" class="input">&nbsp;<span style="color:red">必填</span></td></tr>' +
    '<tr><td align="right">设置登录密码：</td><td>' +
    '<input name="passwd" type="password" class="input" value="">&nbsp;<span style="color:red">必填</span></td></tr>' +
    '<tr><td align="right">再输入一遍：</td><td>' +
    '<input name="repasswd" type="password" class="input">&nbsp;<span style="color:red">必填</span></td></tr>' +
    '<tr><td align="right">手机号：</td><td>' +
    '<input name="phone" type="text" class="input">&nbsp;<span style="color:red">必填</span></td><td>&nbsp;</td></tr>' +
    '<tr><td align="right">QQ：</td><td><input name="qq" type="text" class="input">&nbsp;<span style="color:red">选填</span></td><td>&nbsp;</td></tr>' +
    '<tr><td align="right">验证码：</td><td><div class="cfix"><input name="r_code" type="text" class="input" style="width:80px">' +
    ' <img src="/index.php/code/create_vcode" id="imgyzm" style="width:100px; height:32px"> ' +
    '</div>输入图片中的字符，区分大小写。<a href="javascript:void(0)" onclick="refreshPid()">换一张</a></td></tr>' +
    '<tr><td align="right">&nbsp;</td><td><input type="submit" style="width:230px" onclick="register()" class="btn_input us_input" value="提交"></td></tr>' +
    '</tbody></table></form></div></div>';

function refreshPid(){
    $("#imgyzm").attr('src', '/index.php/code/create_vcode' + '/' + Math.random());
}

function register(){
    postdata('form1',"/index.php/user/reg",'show');
}

function showRegForm(){
    TINY.box.show({html:regform,width:600,height:500,openjs:function(){
        $('.alert_title').hide();
        $('.tbox').css('position','absolute');
    }});
}


var loginform = '<div class="us_mian  clearfix" >' +
    '<form action="" onsubmit="login(); return false;" id="loginform">' +
    '<ul class="us_con" style="width:250px">' +
    '<li style="width:250px"><input type="hidden"  name="roomId" value="2"/></li>' +
    '<li style="width:250px"><input type="text" placeholder="帐号" style="width:220px" name="loginname" class="text_input us_input"/></li>' +
    '<li style="width:250px">' +
    '<input type="password" placeholder="密码" style="width:220px" name="password" ispwd="1" class="text_input us_input"/></li>' +
    '<li style="width:250px;height:48px;">' +
    '<input type="submit" style="width:230px" class="btn_input us_input"  value="登 录"/></li>' +
    '</ul></form></div>';


function showLoginForm(){

    TINY.box.show({html:loginform,width:260,height:390,openjs:function(){
        $('.alert_title').hide();
        $('.tbox').css('position','absolute');
    }});
}

function login() {
    postdata('loginform', "/index.php/user/login", 'show');
}

function show(d) {
    // console.log(d);
    if (d.code == '1') {
        layer.msg(d.msg);
        window.setTimeout(function () {
            parent.window.location.reload();
        }, 1000);
    } else {
        layer.msg(d.msg);
    }
}

function sendCaitiao(e){
    $("#sendMsgInput").val('['+e+']');
    // sendMsg();
}

function sendLiveColorBar(e){
    $("#sendTeacherMsgInput").val('['+e+']');
    // sendMsg();
}

//聊天图片
function talk_pic(img){
    TINY.box.show({
        image: img,animate: true, openjs: function () {
            $('.tbox').css('position', 'absolute');
        }
    });
}


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

//去除网页标签
function removeHTMLTag(str)
{
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    // str = str.replace(/(^\s*)|(\s*$)/g, "");
    // str = str.replace(/(^\s*)/g, "");
    // str = str.replace(/(\s*$)/g, "");
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    return str;
}

function insertTeacherMsgPic(e,i){
    $('#sendTeacherMsgInput').insertAtCaret('[img='+e+']');
    $('#sourceTeacherImg').val(i);
    $('#imgTeacherThumb').val(e);
}

//图片上传调用
function InsertMsgPic(e,i)
{
    $('#sendMsgInput').insertAtCaret('[img='+e+']');
    $('#sourceimg').val(i);
    $('#imgthumb').val(e);
}

//用户修改信息
function editUserInfo(){
    TINY.box.show({iframe:'/index.php/user/editUserInfo',width:400,height:400,fixed:false});
}