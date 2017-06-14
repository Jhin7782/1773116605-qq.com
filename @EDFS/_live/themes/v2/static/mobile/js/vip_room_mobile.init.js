

var topicContent = '.topiccontent';//聊天显示块
var topicBox = '#topic_box';
var chatContainer;

var scrollBar={scrollButtons:{enable:false}};

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
    initLiveChatInteraction();
    initChatInteraction();
    // initAnalystInfoModular();
});

window.onload=function(){
    if(document.getElementById('tip_sound')){
        document.getElementById('tip_sound').controls=false;
    }
    replaceChatExpression();
    replaceLiveExpression();
};

function resize() {
    var windowHeight =$(window).height();
    // var windowWidth = $(window).width();

    // document.getElementById('broadcast').style.height=windowWidth*9/16+'px';
    var contentModuleHeight=windowHeight-document.getElementById('VIP_head').offsetHeight;
//  var contentModuleHeight=windowHeight;
    // var contentModuleHeight=(windowHeight-200)+'px';
    document.getElementById('contentModule').style.height=contentModuleHeight+'px';
    var contentHeight=contentModuleHeight-document.getElementById('tabs_list').offsetHeight;
    document.getElementById('chats').style.height=contentHeight+'px';
    document.getElementById('interaction').style.height=contentHeight+'px';
    document.getElementById("analyst_info_modular").style.height=contentHeight+'px';
    document.getElementById('chatsContent').style.height=(contentHeight-document.getElementById('chatsInput').offsetHeight-10)+'px';
    document.getElementById('wordLive').style.height=(contentHeight-5)+'px';
    document.getElementById('chat_form').style.width= (document.getElementById('chatsInput').offsetWidth-75)+'px';
    var QRCodeBtnTop=document.getElementById('analyst_title').offsetHeight+document.getElementById('tabs_list').offsetHeight+10;
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

//操作建议模块的初始化
function initAnalystInfoModular(){
    // $("#analyst_info_scroll").mCustomScrollbar(scrollBar);
}


//更换老师战队
function changeSelectTeacher(teacherId){
	console.log("teacherId: "+teacherId);
    $.ajax({
        type:"GET",
        url:'/index.php/user/setUserPreference',
        data:{"selectTeacherId":teacherId},
        dataType:'json',
        success:function(data){
            console.log(data.code);
            if(data.code == "1"){
                console.log(data.msg);
                location.reload(true);
            }else{
                alert(data.msg);
            }
        }
    });
}


//改变选择老师界面
function changeSelectedTeacherStatus(){
    if($("#selectedTeacherBackground").is(":hidden")){
        $("#selectedTeacherBackground").show();
    }else{
        $("#selectedTeacherBackground").hide();
    }
}

//开始自动获取操作建议
function getAnalysisAuto() {
    var remarks = document.createElement('span');
    remarks.setAttribute('id', 'analyst_remarks');
    remarks.style.fontSize='14px';
    document.getElementById('remarks_tips').remove();
    document.getElementById('remarks').appendChild(remarks);
	var risk=document.createElement('p');
    risk.setAttribute('id', 'risk_tips');
    risk.style.fontSize='14px';
    risk.innerHTML='风险提示：以上策略建议仅供参考，不构成买卖依据，建议投资者自主决策，交易需设置止盈止损，据此操作，风险自担。特别提示：仓位方面，仅供参考，投资者可根据自己的实际情况，选择适宜的仓位。';
    document.getElementById('remarks').appendChild(risk);
//    $('#remarks').mCustomScrollbar();
    getLastAnalysisNews();
    setInterval(getLastAnalysisNews, 25000);
}

//获取最新的操作分析
function getLastAnalysisNews() {
    // console.log('获取操作建议');
    $.ajax({
        type: "GET",
        url: "/index.php/analysisoperation/getLastAnalysisItem/"+$('#analyst_ctime').html()+"/"+$('#analyst_mtime').html(),
        success: function(data) {
            // console.log(data);
            if(data===false) {
                layer.msg('获取操作建议失败，请联系投顾查看账号权限');
            } else if(data != '') {
                $.each(data, function(i, item) {
                    //              	console.log("i: "+i);
                    //              	console.log("item: "+item);
                    if(item != null && item != 0) {
                        if(i=='tip_sound'&& item=='1'){
                            playTipSound();
                        }else if(i.indexOf('_time') != -1) {
                            var lenght = item.length;
                            var newTime = item.substring(5, lenght - 3);
                            $('#analyst_' + i).html(newTime);
                        } else {
                            $('#analyst_' + i).html(item);
                            if(i == 'create_type') {
                                if(item.indexOf('卖出') != -1) {
                                    $('#analyst_create_type').css('color', '#24aa1d');
                                    $('#analyst_create_price').css('color', '#eb5737');
                                } else if(item.indexOf('买入') != -1) {
                                    $('#analyst_create_type').css('color', '#eb5737');
                                    $('#analyst_create_price').css('color', '#eb5737');
                                }
                            }
                            if(i == 'authorid') {
                                switch(item) {
                                    case '11':
                                        $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/xu_teacher.png");
                                        $("#analyst_authorName").html("短线截杀王");
                                        // var authorTitle = $("#analyst_authorName").html().substring(0, 1);
                                        $("#analyst_authorTitle").html("徐老师");
                                        break;
                                    case '12':
                                        $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/ke_teacher.png");
                                        $("#analyst_authorName").html("中短线狙击手");
                                        // var authorTitle = $("#analyst_authorName").html().substring(0, 1);
                                        $("#analyst_authorTitle").html("柯老师");
                                        break;
                                    case '13':
                                        $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/wang_teacher.png");
                                        $("#analyst_authorName").html("趋势先锋");
                                        // var authorTitle = $("#analyst_authorName").html().substring(0, 1);
                                        $("#analyst_authorTitle").html("摇老师");
                                        break;
                                    case '14':
                                        $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/chen_teacher.png");
                                        $("#analyst_authorName").html("擒龙大师");
                                        // var authorTitle = $("#analyst_authorName").html().substring(0, 1);
                                        $("#analyst_authorTitle").html("陈老师");
                                        break;
                                    case'17':
                                        $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/yan_teacher.png");
                                        $("#analyst_authorName").html("短线猎人");
                                        // var authorTitle = $("#analyst_authorName").html().substring(0, 1);
                                        $("#analyst_authorTitle").html("严老师");
                                        break;
									case'18':
										$('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/yang_teacher.png");
										$("#analyst_authorName").html("波段狂人");
										// var authorTitle = $("#analyst_authorName").html().substring(0, 1);
										$("#analyst_authorTitle").html("杨老师");
										break;
									case '19':
										$('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/wang_teacher.png");
										$("#analyst_authorName").html("趋势先锋");
										// var authorTitle = $("#analyst_authorName").html().substring(0, 1);
										$("#analyst_authorTitle").html("摇老师");
										break;
                                }
                            }
                            if(i == 'close_price') {
                                $('#analyst_close_text').html('已平仓');
                            }
                        }

                    } else {
                        if(i == 'close_price') {
                            $('#analyst_close_text').html('未平仓');
                        }
                    }

                });
            }
        },
        dataType: 'json'
    });
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
    document.getElementById("analyst_info_modular").style.display = "none";
    document.getElementById('analysisOperation').style.backgroundImage="url(/themes/v2/static/mobile/image/analysis_operation.png)";
    document.getElementById("chats").style.display = "block";
    document.getElementById('interaction').style.display='none';
    document.getElementById('tabChats').style.backgroundImage="url(/themes/v2/static/mobile/image/talks.png)";
    document.getElementById('live_view').style.backgroundImage="url(/themes/v2/static/mobile/image/word_live_onclick.png)";
    document.getElementById('wordLive').style.display='block';
    liveChatContainer.scrollToLast();

    
}

function showChatLive(){
    document.getElementById("analyst_info_modular").style.display = "none";
    document.getElementById('analysisOperation').style.backgroundImage="url(/themes/v2/static/mobile/image/analysis_operation.png)";
    document.getElementById("chats").style.display = "block";
    document.getElementById('wordLive').style.display='none';
    document.getElementById('tabChats').style.backgroundImage="url(/themes/v2/static/mobile/image/talks_onclick.png)";
    document.getElementById('live_view').style.backgroundImage="url(/themes/v2/static/mobile/image/word_live.png)";
    document.getElementById('interaction').style.display='block';
}

function showAnalystInfo () {
    document.getElementById('tabChats').style.backgroundImage="url(/themes/v2/static/mobile/image/talks.png)";
    document.getElementById('live_view').style.backgroundImage="url(/themes/v2/static/mobile/image/word_live.png)";
    document.getElementById('analysisOperation').style.backgroundImage="url(/themes/v2/static/mobile/image/analysis_operation_onclick.png)";
    document.getElementById("analyst_info_modular").style.height=document.getElementById('contentModule').offsetHeight;
    document.getElementById("chats").style.display = "none";
    document.getElementById("analyst_info_modular").style.display = "block";
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

function showAccountTip(){
    layer.msg("此信息请在电脑端查看");
}

function playTipSound(){
    if(document.getElementById('tip_sound')){
        // alert('1');
        var tip_sound=document.getElementById('tip_sound');
        // console.log(tip_sound.paused);
        if(tip_sound.paused){
            // alert(tip_sound.paused);
            tip_sound.play();
        }
    }

}