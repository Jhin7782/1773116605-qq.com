/**
 * Created by Administrator on 2016.10.25.
 */

var chatContainer;
var chatInteraction = '#chat_interaction';//聊天显示块选择器
var topicBox = '#topic_box';

// var userListContainer;
// var usesListContent = '#uses_list_content';//用户列表显示块选择器
// var allUser = '#all_user';

var liveChatContainer;
var liveChatInteraction = '#word_live_view';//文字直播显示块选择器
var liveTopicBox = '#live_topic_box';

var scrollConf = {
    scrollButtons: {enable: false}
};

var scrollChat = {
    scrollButtons: {enable: false}, callbacks:{
        onScroll:function(){
            if(chatContainer.dynamicscroll){
                chatContainer.dynamicscroll = false;
                $('#bt_gundong').attr('select', false);
            }
        },
        onTotalScroll: function () {
            if(! chatContainer.dynamicscroll) {
                chatContainer.dynamicscroll = true;
                $('#bt_gundong').attr('select', true);
            }

        }
    }
};
var scrollTeacher = {
    scrollButtons: {enable: false}, callbacks: {
        onTotalScrollBack: function () {
            if(liveChatContainer.dynamicscroll)
            liveChatContainer.dynamicscroll = false;
            $('#bt_live_roll').attr('select', false);
            layer.msg('正在加载历史记录');
            $('#scrollToLiveDIV').remove();
            getTeacherChatHistory();
        },
        onScrollStart:function(){
            if(liveChatContainer.dynamicscroll){
                liveChatContainer.dynamicscroll = false;
                $('#bt_live_roll').attr('select', false);
            }
        },
        onTotalScroll: function () {
            if(! liveChatContainer.dynamicscroll){
                liveChatContainer.dynamicscroll = true;
                $('#bt_live_roll').attr('select', true);
            }

        }
    }
};
var refreshUserListTime;

var ulWidth = 0;
$(document).ready(function () {
    resize();
    // layer.msg('网站加载完成');
});
$(window).resize(function () {
    resize();
});

function scrollLeft () {
			var sliderUl = document.querySelector("#wrapper-slider> ul");
			var sliderLis = document.querySelectorAll("#wrapper-slider> ul> li");
			var count = 1;
			var itvl = setInterval(function() {
				if (count<sliderLis.length) {
					sliderUl.style.right = ulWdith/sliderLis.length*count + "px";
					count++;
					console.log("if");
				} else {
					count = 1;
					sliderUl.style.right = "0";
					console.log("eles");
				}
			},10000)
}

(function ($) {
    $(window).load(function () {
        initScrollbar();
        // initUserList();
        getUserOnline();
        initChatInteraction();
        initHeaderNavigation();
        initLiveChatInteraction();
        replaceChatExpression();
        replaceLiveExpression();
        initEnter();
        chatToolBarInit();
        if((document.getElementById('live_chat_input'))){
            liveToolBarInit();
        }
        setTimeout("chatContainer.scrollToLast();",1000);

    });
})(jQuery);

//开始自动获取操作建议
function getAnalysisAuto() {
    var remarksScroll = document.createElement('marquee');
    remarksScroll.setAttribute('id', 'analyst_remarks');
    remarksScroll.setAttribute('direction', 'left');
    remarksScroll.setAttribute('scrollamount', '3');
    remarksScroll.style.float = 'left';
    remarksScroll.style.width = '75%';
    document.getElementById('remarks_tips').remove();
    document.getElementById('remarks').appendChild(remarksScroll);
    getLastAnalysisNews();
    setInterval(getLastAnalysisNews, 25000);
}

//各个模块大小初始化
function resize() {
	var sliderUl = document.querySelector("#wrapper-slider> ul");
	if (sliderUl) {
		var timeOut = setTimeout(function() {
			ulWdith = sliderUl.offsetWidth;
			console.log(ulWdith);
		}, 5000)
	}
	if (document.getElementById("wrapper-slider")) {
	    scrollLeft ();
    }

    var windowHeight = $(window).height();
    var headHeight = document.getElementById('top').offsetHeight;
    var mainHeight = windowHeight - headHeight - 2;


    //整体宽高计算
    var mainCenterWidth = document.getElementById('main_center').offsetWidth;
    var mainRightWidth = document.getElementById('main_right').clientWidth;

    //左边模块宽高计算
    // var importantTimeHeight = $('#analyst_info').height();
    document.getElementById('uses_list').style.height = (mainHeight -15) + 'px';
    document.getElementById('uses_list_content').style.height = (mainHeight - 60) + 'px';

    //中间模块宽高计算
    var videoLiveHeight = mainCenterWidth * 9 / 16;
    document.getElementById('video_live').style.height = videoLiveHeight;
    document.getElementById('live_content').style.height = (videoLiveHeight) + 'px';
    document.getElementById('video_live_view').style.height = (videoLiveHeight) + 'px';
    document.getElementById('word_live_view').style.height = (videoLiveHeight) + 'px';
    document.getElementById('VOD_player_list').style.height=(videoLiveHeight)+'px';
    document.getElementById('VOD_player').style.height=(videoLiveHeight)+'px';
    var advertisementHeight = mainHeight - videoLiveHeight - 55;
    if(document.getElementById('advertisement')){
        document.getElementById('advertisement').style.height = (advertisementHeight) + 'px';
        document.getElementById('advertisement_content').style.height = (advertisementHeight) + 'px';
        // document.getElementById('advertisement_content').style.backgroundPositionY=((advertisementHeight-500)/2)+'px';
        var advertisementContent = document.getElementById('advertisement_content').offsetHeight;
        var copyrightNoticeHeight = advertisementHeight - advertisementContent;
        if (copyrightNoticeHeight > 20) {
            document.getElementById('copyright_notice').style.display = 'block';
            document.getElementById('copyright_notice').style.lineHeight = copyrightNoticeHeight + 'px';
        } else {
            document.getElementById('copyright_notice').style.display = 'none';
        }
    }
    if(document.getElementById('live_chat_input')){
        document.getElementById('live_chat_input').style.height = (advertisementHeight- 40 ) + 'px';
        document.getElementById('teacher_chat_form').style.width = (mainCenterWidth - 135) + 'px';
        document.getElementById('teacher_chat_form').style.height=(advertisementHeight- 55 ) + 'px';
    }



    //右边模块宽高计算
    var chatModuleHeight = mainHeight - 50;
    document.getElementById('chat_module').style.height = chatModuleHeight + 'px';
    var chatBarHeight = document.getElementById('chat_bar').offsetHeight;
    document.getElementById('chat_interaction').style.height = (chatModuleHeight - chatBarHeight - 60) + 'px';
    var chatBarLeft = document.getElementById('chat_bar').offsetLeft;
    document.getElementById('caitiao').style.left = (chatBarLeft + 70) + 'px';
    // alert(document.documentElement.clientHeight);
    document.getElementById('chat_form').style.width = (mainRightWidth - 135) + 'px';
}


//刷新页面
function refreshPage() {
    window.location.href = window.location.href;
    window.location.reload;
}

function showVideoLive() {
    document.getElementById('word_live_view').style.display = 'none';
    document.getElementById('open_word_live_img').src = '/themes/v2/static/images/open_viewpoint.png';
    document.getElementById('play_back_view').style.display='none';
    document.getElementById('VOD_player').innerHTML='';
    document.getElementById('open_play_back_img').src= '/themes/v2/static/images/vod_play_list.png';
    document.getElementById('video_live_view').style.display = 'block';
    document.getElementById('open_video_live_img').src = '/themes/v2/static/images/open_video_live_onclick.png';
}

function showWordLive() {
    document.getElementById('video_live_view').style.display = 'none';
    document.getElementById('open_word_live_img').src = '/themes/v2/static/images/open_viewpoint_onclick.png';
    document.getElementById('play_back_view').style.display='none';
    document.getElementById('VOD_player').innerHTML='';
    document.getElementById('open_play_back_img').src= '/themes/v2/static/images/vod_play_list.png';
    document.getElementById('word_live_view').style.display = 'block';
    document.getElementById('open_video_live_img').src = '/themes/v2/static/images/open_video_live.png';
    liveChatContainer.scrollToLast();
}

function showPlayBack() {
    document.getElementById('video_live_view').style.display = 'none';
    document.getElementById('open_video_live_img').src = '/themes/v2/static/images/open_video_live.png';
    document.getElementById('word_live_view').style.display = 'none';
    document.getElementById('open_word_live_img').src = '/themes/v2/static/images/open_viewpoint.png';
    document.getElementById('VOD_player').innerHTML = '';
    if ($("#play_back_view").is(":hidden")) {
        document.getElementById('play_back_view').style.display = 'block';
    }
    document.getElementById('VOD_player').style.display = 'none';
    document.getElementById('VOD_player_list').style.display = 'block';
    document.getElementById('open_play_back_img').src= '/themes/v2/static/images/vod_play_list_onclick.png';

}

function createVODPlayer($video_unique) {
    console.log($video_unique);
    var player = document.createElement('EMBED');
    player.setAttribute('src', 'http://yuntv.letv.com/bcloud.swf');
    player.setAttribute('allowFullScreen', 'true');
    player.setAttribute('quality', 'high');
    player.style.height = '100%';
    player.style.width = '100%';
    player.style.align = 'middle';
    player.setAttribute('allowScriptAccess', 'always');
    player.setAttribute('flashvars', 'uu=ikfrouamwm&vu=' + $video_unique + '&pu=0e5c8d3561&auto_play=1&width=auto&height=auto');
    player.setAttribute('type', 'application/x-shockwave-flash');
    document.getElementById('VOD_player_list').style.display = 'none';
    document.getElementById('open_play_back_img').src= '/themes/v2/static/images/back_vod_list.png';
    document.getElementById('VOD_player').innerHTML = '';
    document.getElementById('VOD_player').appendChild(player);
    document.getElementById('VOD_player').style.display = 'block';
}

//隐藏视频界面
function hidenLeshiTV() {
    document.getElementById('leshiTV').style.display = 'none';
}

//解开视频锁
function removePassVideoView($videoPassword) {
    var password = document.getElementById('video_password').value;
    // alert(password);
    if (password == $videoPassword) {
        // alert('准备解锁');
        document.getElementById('video_live_view').style.backgroundImage = 'url(/themes/v2/static/images/connect_video.jpg)';
        document.getElementById('pass_video').style.display = 'none';
        document.getElementById('leshiTV').style.display = 'block';
    } else {
        document.getElementById('video_password').value = '';
        alert('密码输入错误！请重新输入');
    }
}

function liveToolBarInit() {

    $('#bt_live_color').on('click', function () {
        // alert('点击触发');
        if($('#live_color_bar').is(":hidden")){
            $('#live_color_bar').show();
        }else{
            $('#live_color_bar').hide();
        }
    });

    $(document).bind('mouseup', function (e) {
        if ($(e.target).attr('isnav') != '1') {
            $('#live_color_bar').hide();
        }
    });

    //清屏
    $('#bt_live_clear').on('click', function () {
        liveChatContainer.clear();
    });
    //滚动
    $('#bt_live_roll').on('click', function () {
        if(!liveChatContainer.dynamicscroll){
            liveChatContainer.dynamicscroll=true;
            liveChatContainer.scrollToLast();
        }else{
            liveChatContainer.dynamicscroll=false;
        }
        var iss = $(this).attr('select');
        var issele = iss == 'true' ? 'false' : 'true';
        $(this).attr('select', issele);

    });
}

function chatToolBarInit() {

    $('#bt_chat_color').on('click', function () {
        $('#caitiao').show();
    });

    $(document).bind('mouseup', function (e) {
        if ($(e.target).attr('isnav') != '1') {
            $('#caitiao').hide();
        }
    });

    //清屏
    $('#bt_chat_clear').on('click', function () {
        chatContainer.clear();
    });
    //滚动
    $('#bt_chat_roll').on('click', function () {
        if(!chatContainer.dynamicscroll){
            chatContainer.dynamicscroll=true;
            chatContainer.scrollToLast();
        }else{
            chatContainer.dynamicscroll=false;
        }
        var iss = $(this).attr('select');
        var issele = iss == 'true' ? 'false' : 'true';
        $(this).attr('select', issele);

    });
}

//初始化滚动插件
function initScrollbar() {
    $('#VOD_player_list').mCustomScrollbar();
}

//用户列表模块初始化
function initUserList() {
    userListContainer = new UserListContainer();
    userListContainer.create(usesListContent, allUser,scrollConf);
    // userListContainer.update();
}


//聊天模块的初始化
function initChatInteraction() {
    chatContainer = new ChatContainer();
    chatContainer.create(chatInteraction, topicBox, 50, scrollChat);
    // chatContainer.scroolwrap.mCustomScrollbar("scrollTo","bottom");
    // chatContainer.scrollToLast();
}

// 文字直播模块的初始化
function initLiveChatInteraction() {
    liveChatContainer = new ChatContainer();
    liveChatContainer.create(liveChatInteraction, liveTopicBox, 50, scrollTeacher);
    liveChatContainer.scrollToLast();
}


//设置刷新用户列表的时间
function setRefreshUserListTime(refreshTime) {
    refreshUserListTime = refreshTime * 1000;
    // console.log(refreshUserListTime);
    if (null != refreshUserListTime)
        setInterval(getUserOnline, refreshUserListTime);
}


//更新并获取在线用户资料
function getUserOnline() {
    var roomIdInput=document.getElementById('roomIdInput').value;
    // $.ajax({
    //     url: '/index.php/userstatus/setUserOnline/'+roomIdInput+'?t=' + new Date().getTime(),
    //     type: "GET",
    //     ifModified: true,
    //     async: true,
    //     success: function (data) {
    //         if (null != data)
    //         // console.log(data);
    //         userListContainer.replaceUser(data);
    //     }
    // });
    var haveBroadcast=document.getElementById('haveBroadcast').value;
    $.ajax({
        url: '/index.php/userstatus/getUserOnlineCount/'+roomIdInput+'/'+haveBroadcast+'?t=' + new Date().getTime(),
        type: "GET",
        ifModified: true,
        async: true,
        success: function (data) {
            if (null != data){
                // console.log(JSON.parse(data));
                console.log(data);
                document.getElementById('use_online_number').innerHTML=data;
            }


        }
    });
}

//绑定顶部功能区点击事件
function initHeaderNavigation() {
    $('#header_navigation .navigationOne_open_box').click(function () {
        var url = $(this).attr('data-url');
        var adtype = $(this).attr('adtype');
        if (adtype == '1') {
            if (null != url && '' != url) {
                TINY.box.show({
                    iframe: url, width: 1000, height: 500, openjs: function () {
                        $('.tbox').css('position', 'absolute');
                    }
                });
            }
        } else if (adtype == '2') {
            if (null != url && '' != url) {
                TINY.box.show({
                    image: url, animate: true, openjs: function () {
                        $('.tbox').css('position', 'absolute');
                    }
                });
            }
        }

    });

}

//增加输入框对回车的支持
function initEnter() {
    document.onkeydown=function(){
        if (!event.ctrlKey && !event.altKey && !event.shiftKey && event.keyCode == 13) {
            var focusId = document.activeElement.id;
            if (focusId == 'sendMsgInput') {
                document.getElementById('sendMsg').click();
                return false
            }
            if (focusId == 'sendTeacherMsgInput') {
                document.getElementById('sendTeacherMsg').click();
                return false
            }
        }else{
            return true;
        }
    }
}

//获取最新的操作分析
function getLastAnalysisNews() {
    $.getJSON("/index.php/analysisoperation/getLastAnalysisItem/", function (data) {
        // console.log(data.length);
        if (data.length == 1) {
            $.each(data[0], function (i, item) {
                if (item != null && item != 0) {
                    if (i.indexOf('_time') != -1) {
                        var lenght = item.length;
                        var newTime = item.substring(5, lenght - 3);
                        $('#analyst_' + i).html(newTime);
                    } else {
                        $('#analyst_' + i).html(item);
                        if (i == 'create_type') {
                            if (item.indexOf('卖出') != -1) {
                                $('#analyst_create_type').css('color', '#1CBF0C');
                                $('#analyst_create_price').css('color', '#1CBF0C');
                            } else if (item.indexOf('买入') != -1) {
                                $('#analyst_create_type').css('color', '#FE4753');
                                $('#analyst_create_price').css('color', '#FE4753');
                            }
                        }
                        if (i == 'author') {
                            switch (item) {
                                case '徐志安':
                                    $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/xu_teacher.png");
                                    break;
                                case '柯杨':
                                    $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/ke_teacher.png");
                                    break;
                                case '摇钱術':
                                    $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/wang_teacher.png");
                                    break;
                                case '蚁建凯':
                                    $('#analyst_author_img').attr('src', "/themes/v2/static/images/teacher_head/yi_teacher.png");
                                    break;
                            }

                        }
                        if (i == 'close_price') {
                            $('#analyst_close_text').html('已平仓');
                        }
                    }

                } else {
                    if (i == 'close_price') {
                        $('#analyst_close_text').html('未平仓');
                    }
                }

            });
        }

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

function onClickAnalysisOperation(){
    document.getElementById('operation_analysis_btn').click();
}

