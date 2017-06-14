<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><?php echo $roomInfo['title']; ?></title>
    <meta name="keywords" content="<?php echo $roomInfo['keywords']; ?>"/>
    <meta name="description" content="<?php echo $roomInfo['desc']; ?>"/>
    <link rel="shortcut icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>
    <link rel="icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>
    <link rel="stylesheet" href="/themes/v2/static/css/free_room.css"/>
    <link rel="stylesheet" href="/themes/v2/static/css/jquery.sinaEmotion.css"/>
    <link rel="stylesheet" type="text/css" href="/themes/v2/static/css/jquery.mCustomScrollbar.css"/>

    <!--[if lt IE 9]>
    <link href="/themes/v2/static/css/less.css" rel="stylesheet" type="text/css">
    <script src="/themes/v2/static/js/css3-mediaqueries.js"></script>
    <![endif]-->


    <script type="text/javascript" src="/themes/v2/static/js/html5.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery-ui-1.10.4.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.mCustomScrollbar.js"></script>
    <script type="text/javascript" src="/themes/comm/js/layer/layer.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.form.js"></script>

    <script type="text/javascript" src="/themes/v2/static/js/jquery.sinaEmotion.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/tinybox.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/free_room_api.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/free_room_init.js"></script>

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?767e5957a20e7146fe5d3600fb3039c2";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>
<header id="top">
    <span id="top_left">
        <div id="station_logo">
            <img id="station_logo_img" src="<?php echo $cfg['station_logo']; ?>">
            <input id="roomIdInput" type="hidden" name="roomIdInput" value="<?php echo $roomInfo['id']?>">
        </div>
        <div class="navigationOne" id="header_navigation">
            <?php if (!empty($adlist[2])) {
                foreach ($adlist[2] as $k => $v) {
                    if(strpos($v['roomid'],$roomInfo['id']) === false){
                        continue;
                    }else{
                        if ($v['adtype'] == 4) {
                            echo $v['desc'];
                        } else { ?>
                            <a class="navigationOne_open_box" id="<?php echo $v['name'] . '_btn' ?>"
                               href="javascript:void(0);" rel="tiny"
                               data-url="<?php if ($v['adtype'] == 2) {
                                   echo $v['sourceimage'];
                               } else {
                                   echo $v['link'];
                               } ?>"
                               adtype="<?php echo $v['adtype'] ?>"><?php echo $v['title'] ?></a>
                        <?php }
                    }

                }
            } ?>
        </div>
    </span>
    <span class="top_right" id="login_status">
        <span id="use_info">
            <img class="use_info_content" src="/themes/v2/static/images/grade_mark/tourist.png" style="display: none">
            <?php if ($userInfo['level'] != -1) { ?>
                <a class="use_info_content" href="javascript:void(0);"
                   onclick="editUserInfo()"><?php echo $userInfo['name']; ?></a>
            <?php } else { ?>
                <a class="use_info_content"><?php echo $userInfo['name']; ?></a>
            <?php } ?>
            <div class="clearDiv"></div>
        </span>
  		<span>
        <?php if ((!empty($userInfo)) && ($userInfo['level'] != '-1')) { ?>
            <a class="use_btn" id="bt_logout" href="/index.php/user/logout">退出</a>
        <?php } else { ?>
            <a class="use_btn" id="bt_register" href="javascript:void(0)" onclick="showRegForm();">注册会员</a>
            <a class="use_btn" id="bt_login" href="javascript:void(0)" onclick="showLoginForm();">登录</a>
        <?php } ?>

 	    </span>
		<span>
            <a class="use_btn" style="letter-spacing:normal;padding:5px 10px" href="/index.php/live/saveShort/1/<?php echo $_SERVER['QUERY_STRING'];?>">保存到桌面</a>
        </span>
		
    </span>
    <div class="clearDiv"></div>
</header>
<div id="live_main">
    <div class="main" id="main_left">
        <div id="uses_list">
            <div class='title_or_bar' id="uses_list_title">
                <input type="hidden" id="haveBroadcast" value="<?php echo $haveBroadcast;?>">
                <!--<span>在线人数:</span>-->
                <!--<span id="use_online_number">****</span>-->
                <!--<span>人</span>-->
                <span>
                	老师介绍
                </span>
            </div>
            <div id="uses_list_content">
<!--                <p>--><?php //var_dump($userInfo);?><!--</p>-->
<!--                <ul id="all_user">-->
<!--                </ul>-->
<!--                <p>更多.....</p>-->

				<!--code begin-->
				<style type="text/css">
			#wrapper-select {
	/*border: 1px solid black;*/
	background-color: white;
	/*width: 325px;*/
	font-family: "微软雅黑";
	font-size: 16px;
	/*overflow: scroll;*/
}

#selectCon {
	/*padding-left: 0.5em;
	padding-right: 0.5em;*/
	overflow: hidden;
    overflow-x: hidden;
	text-align: center;
	color: #444;
}

#selectCon> img {
	width: 100%;
	box-sizing: border-box;
}

#selectCon div.selectedTeacher {
	border: 1px solid gray;
	box-shadow: 3px 3px 6px gray;
}

/*唉*/
			#selectCon> div {
				width: 100%;
				height: 0px;
				padding-bottom: 46%;
				box-sizing: border-box;
				margin-bottom: 5px;
				/*border: 1px solid #333;*/
				border-radius: 1em;
				background-color: #eee;
				font-size: 0.8em;
				cursor: pointer;
			}
			
			.upper {
				display: -webkit-flex;
				border-bottom: 1px dashed #C62F2F;
			}
			.upperLeft {
				/*flex: 1;*/
				display: block;
				width: 5.5em;
				height: 5.5em;
				margin: 0.5em;
				margin-left: 1.25em;
				margin-right: 0;
				/*border: 1px solid red;*/
				
			}
			.upperRight {
				text-align: left;
				flex: 1;
				display: -webkit-flex;
				flex-flow: column;
				justify-content: center;
				align-items: flex-start;
				/*margin-left: 0.25em;*/
			}
			.teaName {
				color: #C62F2F;
				font-size: 1.6em;
				font-weight: bold;
				/*margin-top: 0.6em;*/
				margin-bottom: 0.3em;
				
				width: 100%;
				/*display: -webkit-flex;*/
			}
			.teaName> span:first-of-type {
				flex: 1;
			}
			.teaName> span:last-of-type {
				color: #ff782f;
				font-size: 0.5em;
				border: 1px solid;
				border-radius: 0.5em;
				padding: 0.05em 0.4em;
				margin-right: 3%;
				/*float: right;*/
				height: 100%;
				align-self: center;
			}
			.teaTitle {
				font-size: 1em;
				/*font-weight: bold;*/
				/*text-align: left !important;*/
			}
			.lower {
				font-size: 1em;
				margin-top: 0.5em;
			}
		</style>
				<!--老师选择开始-->
        <div id="wrapper-select">
            <div id="selectCon">
                <!--<img src="/themes/v2/static/images/selectWANG.png"/>
                <img src="/themes/v2/static/images/selectYI.png"/>
                <img src="/themes/v2/static/images/selectKE.png"/>
                <img src="/themes/v2/static/images/selectXU.png"/>-->
                <div id="wang">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarYao.png"/>
						<div class="upperRight">
							<p class="teaName">摇钱術</p>
							<p class="teaTitle">趋势先锋</p>
						</div>
					</div>
					<div class="lower">
						<p>激进，顺“势”交易型</p>
						<p>擅长短线博弈</p>
					</div>
				</div>
				<div id="yi">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarChen.png"/>
						<div class="upperRight">
							<p class="teaName">陈老师</p>
							<p class="teaTitle">擒龙大师</p>
						</div>
					</div>
					<div class="lower">
						<p>抄底逃顶牛熊</p>
						<p>捕捉爆发潜力股</p>
					</div>
				</div>
				<!--<div id="ke">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarKe.png"/>
						<div class="upperRight">
							<p class="teaName">柯杨</p>
							<p class="teaTitle">中短线狙击手</p>
						</div>
					</div>
					<div class="lower">
						<p>交易风格偏中短线 </p>
						<p>精准捕抓小波段</p>
					</div>
				</div>
				<div id="xu">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarYan.png"/>
						<div class="upperRight">
							<p class="teaName">严立锦</p>
							<p class="teaTitle">短线猎人</p>
						</div>
					</div>
					<div class="lower">
						<p>善于短线狙击，遵从“趋势为王”</p>
						<p>结合盘面，顺势操作</p>
					</div>
				</div>-->
            </div>
        </div>
        
        <script type="text/javascript">
        	var NL_div = document.querySelectorAll("#selectCon> div");
        	window.addEventListener("load", function() {
    			var docEle_clientWidth = document.documentElement.clientWidth;
//				console.log(docEle_clientWidth + "," + docEle_offsetWidth + "," + docEle_scrollWidth + "," + body_clientWidth + "," + body_offsetWidth + "," + body_scrollWidth + "," + screen_width + "," + screen_availWidth);
//				1920px/0.47 = 4085
//				1600px/0.57 = 2807
//				320px/0.1 = 1278
				var percent = 46 + (((1920 - docEle_clientWidth) / 320) * 10);
				console.log("percent: " + percent + ", " + "docELe_clientWidth: " + docEle_clientWidth);
	        		for (var i = 0; i < NL_div.length; i ++) {
    	    			NL_div[i].style.paddingBottom = percent + "%";
        			}
				});
        	window.addEventListener("resize", function() {
    			var docEle_clientWidth = document.documentElement.clientWidth;
//				console.log(docEle_clientWidth + "," + docEle_offsetWidth + "," + docEle_scrollWidth + "," + body_clientWidth + "," + body_offsetWidth + "," + body_scrollWidth + "," + screen_width + "," + screen_availWidth);
//				1920px/0.47 = 4085
//				1600px/0.57 = 2807
//				320px/0.1 = 1278
				var percent = 46 + (((1920 - docEle_clientWidth) / 320) * 10);
				console.log("percent: " + percent + ", " + "docELe_clientWidth: " + docEle_clientWidth);
	        		for (var i = 0; i < NL_div.length; i ++) {
    	    			NL_div[i].style.paddingBottom = percent + "%";
        			}
				});
        </script>
				
				
				
				
				
				
				
				<!--code end-->
            </div>
        </div>
        <div class="clearDiv"></div>
    </div>
    <div class="main" id="main_center">
        <div id="video_live">
            <div class='title_or_bar' id="video_live_bar">
                <a class="video_live_bar" id="open_video_live" href="javascript:void(0);" onclick="showVideoLive()">
                    <img id='open_video_live_img' src="/themes/v2/static/images/open_video_live_onclick.png">
                </a>
                <a class="video_live_bar" id="open_word_live" href="javascript:void(0);" onclick="showWordLive()">
                    <img id='open_word_live_img' src="/themes/v2/static/images/open_viewpoint.png">
                </a>
                <a class="video_live_bar" id="open_play_back" href="javascript:void(0);" onclick="showPlayBack()">
                    <img style="height: 35px;" id='open_play_back_img' src="/themes/v2/static/images/vod_play_list.png">
                </a>
                <a class="video_live_bar" id="refresh_page" href="javascript:void(0);" onclick="refreshPage()">
                    <img id='refresh_page_img' src="/themes/v2/static/images/refresh_page.png">
                </a>
                <div class="clearDiv"></div>
            </div>
            <div id="live_content">
                <div id="video_live_view">
                    <?php
                    if (!empty($cfg['yy_subchannel'])) {
                        echo "/" . $cfg['yy_subchannel'];
                    }
                    ?>
                    <?php if ($cfg['open_camera_model'] == '1') {
//                        var_dump($haveBroadcast);
                        if ($haveBroadcast == '1') {
//                        if(false==true){
                            echo '<div id="leshiTV" style="height: 100%;width: 100%">' .
                                '<object type="application/x-shockwave-flash" id="videoplayer" name="videoplayer" align="middle"data="http://sdk.lecloud.com/live.swf" width="100%" height="100%">' .
                                '<param name="wmode" value="direct">' .
                                '<param name="quality" value="high">' .
                                '<param name="bgcolor" value="#000000">' .
                                '<param name="allowscriptaccess" value="always">' .
                                '<param name="allowfullscreen" value="true">' .
                                '<param name="flashvars" value="activityId=A201612280000050">' .
                                '<param name="wmode" value="transparent">' .
                                '<param name="quality" value="high"></object></div>';
                            if (($cfg['open_live_password'] == 1) && ($userInfo['level'] < 2)) {
                                if (empty($cfg['set_live_password'])) {
                                    $open_live_key = 0;
                                } else {
                                    $open_live_key = $cfg['set_live_password'];
                                }
                                echo '<script> hidenLeshiTV();</script>';
                                echo '<div id="pass_video" style="width:100%;height:100%;align-content: center;padding-top: 100px;background-color: #7a91a0">' .
                                    '<li style="text-align: center;color: #fbf8ff;list-style-type:none;"> 请输入视频密码：</li><li style="text-align: center;list-style-type:none;">' .
                                    '<input id="video_password" style="width:150px;height:25px;line-height:25px;font-size:16px;padding-left:5px; border:#ccc 1px solid;">' .
                                    '</li><li style="text-align: center;list-style-type:none;">' .
                                    '<a id="confirm_pass" href="javascript:void(0);" onclick="removePassVideoView(' . $open_live_key . ')"style="background: #619958; border-radius:2px; box-shadow:0 0 2px #555;color: #fff;font-size: 16px; height: 32px; line-height: 32px; padding: 0 10px; text-align: center; text-decoration: none; width: 68px;">确定</a></li>' .
                                    '<li style="text-align: center;color: #fbf8ff;list-style-type:none;">(视频密码请咨询您的专属投资顾问)</li></div>';
                            }
                        }
                    }
                    ?>
                </div>
                <div id="word_live_view">
                    <div id="live_topic_box">
                        <?php $this->load->module('live/chat/getTeacherItem', array('roomId' => $roomInfo['id'])); ?>
                    </div>
                </div>
                <input id="teacher_chat_id" type="hidden" value="0">
                <input id="teacher_first_chat_id" type="hidden" value="">
                <input id="service_teacher_id" type="hidden" value="<?php echo $userInfo['serviceTeacherIdList']; ?>">
                <div id="play_back_view" style="display: none">
                    <div id="VOD_player_list" style="width: 100%;display=none;">
                        <?php foreach ($VODList as $k=>$v){ ?>
                            <div class="VODListItem">
                                <a href="javascript:void(0);"  title='点击播放' onclick='<?php echo "createVODPlayer(\"".$v['video_unique']."\")";?>'>
                                    <img src="<?php echo $v['img'] ?>">
                                    <p class="video_name"><?php echo $v['video_name'] ?></p>
                                    <p class="video_desc"><?php echo $v['video_desc'] ?></p>
                                </a>
                            </div>
                        <?php } ?>
                    </div>
                    <div id="VOD_player" style="width: 100%;display=none;"></div>
                </div>
            </div>
        </div>
        <?php if ($userInfo['level'] >= 6) { ?>
            <div id="word_live_input">
                <div class="chat_tool_bar">
                <span>
                    <a href="javascript:void(0)" class="char_bar_face chat_bar" id="bt_live_face" isface="2">表情</a>
                    <a href="javascript:void(0)" class="char_bar_color chat_bar" id="bt_live_color">彩条</a>
                    <a href="javascript:void(0)" onclick="new_upImageLive()" class="chat_bar_img chat_bar"
                       id="bt_live_upImage">图片</a>
                    <a href="javascript:void(0)" class="char_bar_clear chat_bar" id="bt_live_clear">清屏</a>
                    <a href="javascript:void(0)" class="char_bar_roll chat_bar" id="bt_live_roll" select="true">滚动</a>
                </span>
                <span class="s_right"></span>
                </div>
                <div id="live_color_bar" class="color_bar_content" style="display: none">
                    <dl class="color_bar_dl" isface="2" pack="3">
                        <dd onclick="sendLiveColorBar('pt顶一个')">顶一个</dd>
                        <dd onclick="sendLiveColorBar('pt赞一个')">赞一个</dd>
                        <dd onclick="sendLiveColorBar('pt掌声')">掌声</dd>
                        <dd onclick="sendLiveColorBar('pt鲜花')">鲜花</dd>
                        <dd onclick="sendLiveColorBar('pt看多')">看多</dd>
                        <dd onclick="sendLiveColorBar('pt看空')">看空</dd>
                        <dd onclick="sendLiveColorBar('pt震荡')">震荡</dd>
                    </dl>
                </div>
                <form id="imgUploadLive" name="imgUploadLive" action="http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200"
                      method="post" enctype="multipart/form-data" target="frameLiveFile">
                    <input id="fileLiveData" contenteditable="false" type="file" style="display:none;"
                           onchange="setUploadLiveCallBack();" name="imgFile">
                </form>
                <iframe id="frameLiveFile" name="frameLiveFile" style="display: none;"></iframe>
                <div id="live_chat_input">
                    <?php $this->load->module('live/content/getTeacherChatData',array('teacherRoomInfo'=> $roomInfo)); ?>
                    <a id='sendTeacherMsg' href="javascript:void(0)" onclick="sendTeacherMsg()" class="sub_btn"
                       style="background-color: rgb(244, 107, 10);"></a>
                    <div class="clearDiv"></div>
                </div>
            </div>
        <?php } else { ?>
            <div id="advertisement">
                <div id="advertisement_content">
        <div id="wrapper-slider">
			<ul>
				<li>
					<img src="/themes/v2/static/images/sliderOne170307.png" />
				</li>
				<li>
					<img src="/themes/v2/static/images/sliderTwo170307.png" />
				</li>
			</ul>
		</div>
                	
                	
                	
                </div>
                <div id="copyright_notice">
                                  <?php //echo $cfg['station_copyright']?>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="main" id="main_right">
        <div class='title_or_bar' id="announcement">
        	<img style="height: 35px;" src="/themes/v2/static/images/hudong.png"/>
            <!--<marquee direction="left" id="announcement_notice" scrollamount="3">-->
                <?php //echo $cfg['announcement']; ?>
            <!--</marquee>-->
            <style type="text/css">
            	#zaixianrenshu {
            		float: right;
    				color: white;
    				font-size: .95em;
            	}
            </style>
            <div id="zaixianrenshu">
        	    <span>在线人数:</span>
    	        <span id="use_online_number">****</span>
	            <span>人</span>
            </div>
        </div>
        <div id="chat_module">
            <div id="chat_interaction">
                <div id="topic_box">
                    <?php $this->load->module('live/chat/getitem', array('roomid' => $roomInfo['id'])); ?>
                </div>
            </div>
            <div id="chat_bar">
                <!--<div id="warnmsg">
                    <p style="text-align: center">★想了解更多资讯，请点击下方QQ交谈进行咨询★</p>
                </div>-->
                <!--<p class="qq_service">
                    <span>高级客服：</span>
                    <?php
//                  if (!empty($qqservice)) {
//                      foreach ($qqservice as $k => $v) {
                            ?>
                            <a target="_blank"
                               href="http://wpa.qq.com/msgrd?v=3&amp;uin=<?php echo $v['link'] ?>&amp;site=qq&amp;menu=yes">
                                <img border="0" src="/themes/v2/static/images/qqTalk.png"
                                     alt="<?php echo $v['title'] ?>" title="请加QQ：<?php echo $v['link'] ?>">
                            </a>
                            <?php
//                      }
//                  }
                    ?>
                    <a id="more_service" href="javascript: void(0)" onclick="">更多客服</a>
                </p>-->
                <div class="chat_tool_bar">
                <span>
                    <a href="javascript:void(0)" class="char_bar_face chat_bar" id="bt_chat_face" isface="2">表情</a>
                    <a href="javascript:void(0)" class="char_bar_color chat_bar" id="bt_chat_color">彩条</a>
                    <a href="javascript:void(0)" onclick="javascript:new_upImage()" class="chat_bar_img chat_bar"
                       id="bt_chat_upImage">图片</a>
                    <a href="javascript:void(0)" class="char_bar_clear chat_bar" id="bt_chat_clear">清屏</a>
                    <a href="javascript:void(0)" class="char_bar_roll chat_bar" id="bt_chat_roll" select="true">滚动</a>
                    <!--                    <a href="javascript:void(0)" class="bar_6" id="bt_share" onclick="javascript:openShare()">分享</a>-->
                </span>
                    <span class="s_right"></span>
                </div>
            </div>
            <div id="caitiao" class="hid ption_a" style="display: none">
                <dl id="c_pt" class="clearfix " isface="2" pack="3">
                    <dd onclick="sendCaitiao('pt顶一个')">顶一个</dd>
                    <dd onclick="sendCaitiao('pt赞一个')">赞一个</dd>
                    <dd onclick="sendCaitiao('pt掌声')">掌声</dd>
                    <dd onclick="sendCaitiao('pt鲜花')">鲜花</dd>
                    <dd onclick="sendCaitiao('pt看多')">看多</dd>
                    <dd onclick="sendCaitiao('pt看空')">看空</dd>
                    <dd onclick="sendCaitiao('pt震荡')">震荡</dd>
                </dl>
                <div class="clearfix"></div>
            </div>
            <form id="imgUpload" name="imgUpload" action="http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200"
                  method="post" enctype="multipart/form-data" target="frameFile">
                <input id="fileData" contenteditable="false" type="file" style="display:none;"
                       onchange="setUploadCallBack();" name="imgFile">
            </form>
            <iframe id="frameFile" name="frameFile" style="display: none;"></iframe>
            <div id="chat_input">
                <?php $this->load->module('live/content/getlivedata',array($roomInfo)); ?>
                <a id='sendMsg' href="javascript:void(0)" onclick="sendMsg()" class="sub_btn"
                   style="background-color: rgb(244, 107, 10);"></a>
                <div class="clearDiv"></div>
            </div>
        </div>
    </div>
    <div class="clearDiv"></div>
</div>

<script type="text/javascript">$('#bt_live_face').SinaEmotion($('#sendTeacherMsgInput'));</script>
<script type="text/javascript">$('#bt_chat_face').SinaEmotion($('#sendMsgInput'));</script>
<script type="text/javascript">setRefreshUserListTime('<?php echo $cfg['userlist_refresh_time']?>')</script>

<!--<script-->
<!--    type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");-->
<!--    document.write(unescape("%3Cspan id='cnzz_stat_icon_1260919866'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260919866' type='text/javascript'%3E%3C/script%3E"));</script>-->


<?php //require_once 'cs.php';echo '<img src="' . _cnzzTrackPageView(1260919866) . '" width="0" height="0" style="display:none"/>'; ?>

<!--    延时弹出客服QQ代码-->
<iframe style="display:none;" class="qq_iframe" ></iframe>
<script>
    $(function(){
        setTimeout(function(){
            var src = "tencent://message/?uin=201094631&Site=&menu=yes";
            $('.qq_iframe').attr('src', src);
        },10000);
    })
</script>

<div style="display: none;">
    <!-- Piwik -->
    <script type="text/javascript">var _paq = _paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function () {
            var u = "//www.edfs555.com/piwik/";
            _paq.push(['setTrackerUrl', u + 'piwik.php']);
            _paq.push(['setSiteId', 1]);
            var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = u + 'piwik.js';
            s.parentNode.insertBefore(g, s);
        })();</script>
    <noscript>
        <p>
            < img src="//www.edfs555.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" />
        </p>
    </noscript>
    <!-- End Piwik Code -->
</div>
</body>
</html>
