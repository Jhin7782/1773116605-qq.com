

var topicContent = '.topiccontent';//聊天显示块
var topicBox = '#topic_box';
var chatContainer;

var scrollConf = {
    scrollButtons: {enable: false}, callbacks:{
        onScrollStart:function(){
            if(chatContainer.dynamicscroll){
                chatContainer.dynamicscroll = false;
            }
        },
        onTotalScroll: function () {
            if(! chatContainer.dynamicscroll) {
                chatContainer.dynamicscroll = true;
            }

        }
    }
};

var scrollTeacher = {
    scrollButtons: {enable: false}, callbacks: {
        onTotalScrollBack: function () {
            if(liveChatContainer.dynamicscroll)
                liveChatContainer.dynamicscroll = false;
            layer.msg('正在加载历史记录');
            $('#scrollToLiveDIV').remove();
            getTeacherChatHistory();
        },
        onScrollStart:function(){
            if(liveChatContainer.dynamicscroll)
                liveChatContainer.dynamicscroll = false;
        },
        onTotalScroll: function () {
            if(! liveChatContainer.dynamicscroll){
                liveChatContainer.dynamicscroll = true;
            }

        }
    }
};

var liveChatContainer;
var liveChatInteraction='#wordLive';//文字直播显示块选择器
var liveTopicBox='#live_topic_box';

var marginTop;

$(document).ready(function(){
    resize();
    initChatInteraction();
    initLiveChatInteraction();
});

window.onload=function(){
    replaceChatExpression();
    replaceLiveExpression();
};

function resize() {
    var windowHeight =$(window).height();
    var windowWidth = $(window).width();

    document.getElementById('broadcast').style.height=windowWidth*9/16+'px';
    var contentModuleHeight=windowHeight-document.getElementById('broadcast').offsetHeight;
    document.getElementById('contentModule').style.height=contentModuleHeight+'px';
    var contentHeight=contentModuleHeight-document.getElementById('tabs_list').offsetHeight;
    document.getElementById('chats').style.height=contentHeight+'px';
    document.getElementById('interaction').style.height=contentHeight+'px';
    document.getElementById('chatsContent').style.height=(contentHeight-document.getElementById('chatsInput').offsetHeight-10)+'px';
    document.getElementById('wordLive').style.height=(contentHeight-5)+'px';
    document.getElementById('chat_form').style.width= (document.getElementById('chatsInput').offsetWidth-75)+'px';
    var QRCodeBtnTop=document.getElementById('broadcast').offsetHeight+document.getElementById('tabs_list').offsetHeight+10;
    document.getElementById('QRCode_btn').style.top=QRCodeBtnTop+'px';
}

$(window).resize(function(){
    resize();
});

//隐藏视频界面
function hidenLeshiTV(){
    document.getElementById('leshiTV').style.display='none';
}

//解开视频锁
function removePassVideoView($videoPassword){
    var password=document.getElementById('video_password').value;
    // alert(password);
    if(password == $videoPassword){
        // alert('准备解锁');
        document.getElementById('pass_video').style.display='none';
        document.getElementById('leshiTV').style.display='block';
    }else{
        document.getElementById('video_password').value='';
        alert('密码输入错误！请重新输入');
    }
}

//聊天模块的初始化
function initChatInteraction(){
    chatContainer = new ChatContainer();
    chatContainer.create(topicContent, topicBox, 50,scrollConf);
    chatContainer.scrollToLast();
}

//文字直播模块的初始化
function initLiveChatInteraction(){
    liveChatContainer=new ChatContainer();
    liveChatContainer.create(liveChatInteraction,liveTopicBox,50,scrollTeacher);
    liveChatContainer.scrollToLast();
}


function showWordLive(){
    document.getElementById('interaction').style.display='none';
    document.getElementById('tabChats').style.backgroundImage="url(/themes/v2/static/mobile/image/talks.png)";
    document.getElementById('live_view').style.backgroundImage="url(/themes/v2/static/mobile/image/live_view_onclick.png)";
    document.getElementById('wordLive').style.display='block';
    liveChatContainer.scrollToLast();
}

function showChatLive(){
    document.getElementById('wordLive').style.display='none';
    document.getElementById('tabChats').style.backgroundImage="url(/themes/v2/static/mobile/image/talks_onclick.png)";
    document.getElementById('live_view').style.backgroundImage="url(/themes/v2/static/mobile/image/live_view.png)";
    document.getElementById('interaction').style.display='block';
}

function openLogin(){
    document.getElementById('registerDIV').style.display='none';
    document.getElementById('loginDIV').style.display='block';
}

function openRegister(){
    document.getElementById('loginDIV').style.display='none';
    document.getElementById('registerDIV').style.display='block';
}

//设置增加在线用户的时间
function setAddUserListTime(refreshTime){
    refreshUserListTime=refreshTime*1000;
    // console.log(refreshUserListTime);
    if(null!= refreshUserListTime)
        setTimeout(setInterval(getUserOnline, refreshUserListTime),refreshUserListTime);
}

//更新在线用户资料
function getUserOnline() {
    $.ajax({
        url: '/index.php/userstatus/addUserOnline/1?t=' + new Date().getTime(),
        type: "GET",
        ifModified: true,
        async: true
    });
}

//显示e财时间公众号二维码
function openShareQR(){
    document.getElementById('shareQRView').style.display='block';
    $('#shareQRView').animate({bottom:0},1000);
}

//隐藏e财时间公众号二维码
function hiddenShareQR(){
    $('#shareQRView').animate({bottom:"-100%"},1000,function (){
        document.getElementById('shareQRView').style.display='none';
    });

}

function replaceChatExpression() {
    $("#topic_box").find("p").each(function () {
        var _s = $(this).html();
        if (_s.indexOf('[') != -1) {
            var _t = AnalyticEmotion(_s);
            $(this).html(_t);
        }
    });
}

function replaceLiveExpression() {
    $("#live_topic_box").find("p").each(function () {
        var _s = $(this).html();
        if (_s.indexOf('[') != -1) {
            var _t = AnalyticEmotion(_s);
            $(this).html(_t);
        }
    });
}