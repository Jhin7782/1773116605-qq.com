/**
 * Created by Administrator on 2016.10.25.
 */

var chatContainer;
var chatInteraction = '#chat_interaction'; //聊天显示块选择器
var topicBox = '#topic_box';

// var userListContainer;
// var usesListContent = '#uses_list_content'; //用户列表显示块选择器
// var allUser = '#all_user';

var liveChatContainer;
var liveChatInteraction = '#word_live_view'; //文字直播显示块选择器
var liveTopicBox = '#live_topic_box';

var scrollConf = {
	scrollButtons: {
		enable: false
	}
};

var scrollChat = {
	scrollButtons: {
		enable: false
	},
	callbacks: {
		onScroll: function() {
			if(chatContainer.dynamicscroll) {
				chatContainer.dynamicscroll = false;
				$('#bt_gundong').attr('select', false);
			}
		},
		onTotalScroll: function() {
			if(!chatContainer.dynamicscroll) {
				chatContainer.dynamicscroll = true;
				$('#bt_gundong').attr('select', true);
			}

		}
	}
};
var scrollTeacher = {
	scrollButtons: {
		enable: false
	},
	callbacks: {
		onTotalScrollBack: function() {
			if(liveChatContainer.dynamicscroll)
				liveChatContainer.dynamicscroll = false;
			$('#bt_live_roll').attr('select', false);
			layer.msg('正在加载历史记录');
			$('#scrollToLiveDIV').remove();
			getTeacherChatHistory();
		},
		onScrollStart: function() {
			if(liveChatContainer.dynamicscroll) {
				liveChatContainer.dynamicscroll = false;
				$('#bt_live_roll').attr('select', false);
			}
		},
		onTotalScroll: function() {
			if(!liveChatContainer.dynamicscroll) {
				liveChatContainer.dynamicscroll = true;
				$('#bt_live_roll').attr('select', true);
			}

		}
	}
};

var refreshUserListTime;

$(document).ready(function() {
	resize();
	// layer.msg('网站加载完成');
});
$(window).resize(function() {
	resize();
});

(function($) {
	$(window).load(function() {
		if(document.getElementById('tip_sound')){
			document.getElementById('tip_sound').controls=false;
		}
		initScrollBar();
		addUserOnline();
		initChatInteraction();
		initHeaderNavigation();
		initLiveChatInteraction();
		replaceChatExpression();
		replaceLiveExpression();
		initEnter();
		chatToolBarInit();
		if((document.getElementById('live_chat_input'))) {
			liveToolBarInit();
		}
		setTimeout("chatContainer.scrollToLast();", 1000);
	});
})(jQuery);

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
	$('#remarks').mCustomScrollbar();
	getLastAnalysisNews();
	setInterval(getLastAnalysisNews, 25000);
}

//各个模块大小初始化
function resize() {

	var windowHeight = $(window).height();
	var headHeight = document.getElementById('top').offsetHeight;
	var mainHeight = windowHeight - headHeight - 2;
	// console.log(windowHeight +","+headHeight+","+mainHeight);

	//整体宽高计算
	var mainCenterWidth = document.getElementById('main_center').offsetWidth;
	var mainRightWidth = document.getElementById('main_right').clientWidth;

	//左边模块宽高计算
	var importantTimeHeight = $('#analyst_info').height();
	// document.getElementById('uses_list').style.height = (mainHeight - importantTimeHeight - 25) + 'px';
	document.getElementById('wrapper-select').style.height = (mainHeight - importantTimeHeight - 5) + 'px';
	document.getElementById('selectCon').style.height = (mainHeight - importantTimeHeight - 55) + 'px';
	// document.getElementById('uses_list_content').style.height = (mainHeight - importantTimeHeight - 65) + 'px';

	//中间模块宽高计算
	if (document.getElementById("word_live_input")) {
		document.getElementById('live_content').style.height = mainHeight*0.7 + 'px';
		document.getElementById('word_live_view').style.height = mainHeight*0.7 + 'px';
	} else {
		document.getElementById('live_content').style.height = mainHeight*1 - 39 + 'px';
		document.getElementById('word_live_view').style.height = mainHeight*1 - 39 + 'px';
	}
	var advertisementHeight = mainHeight * 0.3 - 36;
	if(document.getElementById('live_chat_input')) {
		document.getElementById('live_chat_input').style.height = (advertisementHeight - 40) + 'px';
		document.getElementById('teacher_chat_form').style.width = (mainCenterWidth - 135) + 'px';
		document.getElementById('teacher_chat_form').style.height = (advertisementHeight - 55) + 'px';
	}

	//右边模块宽高计算
	var chatModuleHeight = mainHeight - 2;
	document.getElementById('chat_module').style.height = chatModuleHeight + 'px';
	var chatBarHeight = document.getElementById('chat_bar').offsetHeight;
	document.getElementById('chat_interaction').style.height = (chatModuleHeight - chatBarHeight - 114) + 'px';
	var chatBarLeft = document.getElementById('chat_bar').offsetLeft;
	document.getElementById('caitiao').style.left = (chatBarLeft + 70) + 'px';
	document.getElementById('chat_form').style.width = (mainRightWidth - 135) + 'px';
}

//刷新页面
function refreshPage() {
	window.location.href = window.location.href;
	window.location.reload;
}


function liveToolBarInit() {

	$('#bt_live_color').on('click', function() {
		// alert('点击触发');
		if($('#live_color_bar').is(":hidden")) {
			$('#live_color_bar').show();
		} else {
			$('#live_color_bar').hide();
		}
	});

	$(document).bind('mouseup', function(e) {
		if($(e.target).attr('isnav') != '1') {
			$('#live_color_bar').hide();
		}
	});

	//清屏
	$('#bt_live_clear').on('click', function() {
		liveChatContainer.clear();
	});
	//滚动
	$('#bt_live_roll').on('click', function() {
		if(!liveChatContainer.dynamicscroll) {
			liveChatContainer.dynamicscroll = true;
			liveChatContainer.scrollToLast();
		} else {
			liveChatContainer.dynamicscroll = false;
		}
		var iss = $(this).attr('select');
		var issele = iss == 'true' ? 'false' : 'true';
		$(this).attr('select', issele);

	});
}

function chatToolBarInit() {

	$('#bt_chat_color').on('click', function() {
		$('#caitiao').show();
	});

	$(document).bind('mouseup', function(e) {
		if($(e.target).attr('isnav') != '1') {
			$('#caitiao').hide();
		}
	});

	//清屏
	$('#bt_chat_clear').on('click', function() {
		chatContainer.clear();
	});
	//滚动
	$('#bt_chat_roll').on('click', function() {
		if(!chatContainer.dynamicscroll) {
			chatContainer.dynamicscroll = true;
			chatContainer.scrollToLast();
		} else {
			chatContainer.dynamicscroll = false;
		}
		var iss = $(this).attr('select');
		var issele = iss == 'true' ? 'false' : 'true';
		$(this).attr('select', issele);

	});
}

//初始化滚动插件
function initScrollBar() {
}

//聊天模块的初始化
function initChatInteraction() {
	chatContainer = new ChatContainer();
	chatContainer.create(chatInteraction, topicBox, 50, scrollChat);
	// chatContainer.scroolwrap.mCustomScrollbar("scrollTo","bottom");
	// chatContainer.scrollToLast();
}

//文字直播模块的初始化
function initLiveChatInteraction() {
	liveChatContainer = new ChatContainer();
	liveChatContainer.create(liveChatInteraction, liveTopicBox, 50, scrollTeacher);
	liveChatContainer.scrollToLast();
}

//设置刷新用户列表的时间
function setRefreshUserListTime(refreshTime) {
	refreshUserListTime = refreshTime * 1000;
	// console.log(refreshUserListTime);
	if(null != refreshUserListTime)
		setInterval(addUserOnline, refreshUserListTime);
}

//更新在线用户资料
function addUserOnline() {
	var roomIdInput = document.getElementById('roomIdInput').value;
	$.ajax({
		url: '/index.php/userstatus/addUserOnline/' + roomIdInput + '?t=' + new Date().getTime(),
		type: "GET",
		ifModified: true,
		async: true,
		success: function(data) {
			// if (null != data)
			// console.log(data);
			// userListContainer.replaceUser(data);
		}
	});
}

//绑定顶部功能区点击事件
function initHeaderNavigation() {
	$('#header_navigation .navigationOne_open_box').click(function() {
		var url = $(this).attr('data-url');
		var adtype = $(this).attr('adtype');
		if(adtype == '1') {
			if(null != url && '' != url) {
				TINY.box.show({
					iframe: url,
					width: 1000,
					height: 500,
					openjs: function() {
						$('.tbox').css('position', 'absolute');
					}
				});
			}
		} else if(adtype == '2') {
			if(null != url && '' != url) {
				TINY.box.show({
					image: url,
					animate: true,
					openjs: function() {
						$('.tbox').css('position', 'absolute');
					}
				});
			}
		}

	});

}

//增加输入框对回车的支持
function initEnter() {
	document.onkeydown = function() {
		if(event.ctrlKey && !event.altKey && !event.shiftKey && event.keyCode == 13) {
			var focusId = document.activeElement.id;
			if(focusId == 'sendMsgInput') {
				document.getElementById('sendMsg').click();
				return false
			}
			if(focusId == 'sendTeacherMsgInput') {
				document.getElementById('sendTeacherMsg').click();
				return false
			}
		} else {
			return true;
		}
	};

}

//获取最新的操作分析
function getLastAnalysisNews() {
	// console.log('获取操作建议');
	$.ajax({
		type: "GET",
		url: "/index.php/analysisoperation/getLastAnalysisItem/"+$('#analyst_ctime').html()+"/"+$('#analyst_mtime').html(),
		success: function(data) {
			 console.log(data);
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
									$('#analyst_create_type').css('color', '#C62F2F');
									$('#analyst_create_price').css('color', '#C62F2F');
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

function replaceChatExpression() {
	$("#topic_box").find("p").each(function() {
		var _s = $(this).html();
		if(_s.indexOf('[') != -1) {
			var _t = AnalyticEmotion(_s);
			$(this).html(_t);
		}
	});
}

function replaceLiveExpression() {
	$("#live_topic_box").find("p").each(function() {
		var _s = $(this).html();
		if(_s.indexOf('[') != -1) {
			var _t = AnalyticEmotion(_s);
			$(this).html(_t);
		}
	});
}

function onClickAnalysisOperation() {
	document.getElementById('operation_analysis_btn').click();
}

function playTipSound(){
	if(document.getElementById('tip_sound')){
		var tip_sound=document.getElementById('tip_sound');
		// console.log(tip_sound.paused);
		if(tip_sound.paused){
			tip_sound.play();
		}
	}

}

function setUploadLiveCallBack(){
	$('#imgUploadLive').attr('action', 'http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200?' + new Date().getTime());
	$('#imgUploadLive').ajaxSubmit({
		success:function(e){
			console.log(e);
			var info=JSON.parse(e);
			if(info.status=='1'){
				insertTeacherMsgPic(info.thumb_url,info.file_url);
			}else{
				layer.msg(info.message);
			}
		}
	});
}

function setUploadCallBack(){
	$('#imgUpload').attr('action', 'http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200?' + new Date().getTime());
	$('#imgUpload').ajaxSubmit({
		success:function(e){
			console.log(e);
			var info=JSON.parse(e);
			if(info.status=='1'){
				InsertMsgPic(info.thumb_url,info.file_url);
			}else{
				layer.msg(info.message);
			}
		}
	});
}
