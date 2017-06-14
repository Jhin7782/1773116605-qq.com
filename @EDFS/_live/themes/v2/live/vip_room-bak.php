<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <title><?php echo $roomInfo['title']; ?></title>
    <meta name="keywords" content="<?php echo $roomInfo['keywords']; ?>"/>
    <meta name="description" content="<?php echo $roomInfo['desc']; ?>"/>
    <link rel="shortcut icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>
    <link rel="icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>
    <link rel="stylesheet" href="/themes/v2/static/css/vip_room.css"/>
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
    <script type="text/javascript" src="/themes/v2/static/js/vip_room_api.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/vip_room_init.js"></script>

    <script>var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?767e5957a20e7146fe5d3600fb3039c2";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();</script>

</head>
<body>
<header id="top">
    <span id="top_left">
        <div id="station_logo">
            <img id="station_logo_img" src="/themes/v2/static/images/vip_logo.png">
            <input id="roomIdInput" type="hidden" name="roomIdInput" value="<?php echo $roomInfo['id'] ?>">
        </div>
        <div class="navigationOne" id="header_navigation">
            <?php if (!empty($adlist[2])) {
                foreach ($adlist[2] as $k => $v) {
                    if (strpos($v['roomid'], $roomInfo['id']) === false) {
                        continue;
                    } else {
                        if ($v['adtype'] == 4) {
                            echo $v['desc'];
                        } else { ?>
                            <a class="navigationOne_open_box" id="<?php echo $v['name'] . '_btn' ?>"
                               href="javascript:void(0);" rel="tiny"
                               data-url="<?php
							if ($v['adtype'] == 2) {
								echo $v['sourceimage'];
							} else {
								echo $v['link'];
							}
                               ?>"
                               adtype="<?php echo $v['adtype'] ?>"><?php echo $v['title'] ?></a>
                        <?php }
								}

								}
								}
            ?>
        </div>
    </span>
    <span class="top_right" id="login_status">
        <span id="use_info">
            <img class="use_info_content" src="/themes/v2/static/images/grade_mark/tourist.png" style="display: none">
            <?php if ($userInfo['level'] != -1) { ?>
                <!--                <span id="serviceTeacherIdList" style="color:#ffffff">--><?php //echo $serviceTeacherIdList; ?><!--</span>-->
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
            <a class="use_btn" id="bt_login" href="javascript:void(0)" onclick="showLoginForm();">登录</a>
        <?php } ?>

 	    </span>
    </span>
    <div class="clearDiv"></div>
</header>
<div id="live_main">
    <div class="main" id="main_left">
        <div id="analyst_info_background">
            <div id="analyst_info">
                <div id="analyst_title">
                    <img id="analyst_author_img" src="">
                    <div id="analyst_title_desc">
                        <p><span id="analyst_authorTitle">***</span></p>
                        <p><span id="analyst_authorName">***</span></p>

                        <!--<p>
                        	<span style="color: #fdfd9b;font-weight:bold;">品种：</span>
                        	<span id="analyst_product">***</span>
                        </p>-->
                    </div>
                </div>
                <div id="analyst_content">
                    <!--<div class="analyst_content" id="analyst_create">
                        <div id="product">
                            <span id="analyst_product">***</span>
                        </div>
                        <div id="maichu">
                            <div id="maichu_l">
                                <span id="analyst_create_price">****</span>
                                <span id="analyst_create_type">****</span>
                            </div>
                            <div id="maichu_r">
                                <p>
                                    <span>止盈:</span><span id="analyst_stop_surplus">****</span>
                                    <span>仓位:</span><span id="analyst_position">****</span><span>%</span>
                                </p>
                                <p>
                                    <span>止损:</span><span id="analyst_stop_price">****</span>
                                    <span class='analyst_time' id="analyst_create_time">**-** **:**</span>
                                </p>
                            </div>
                        </div>
                    </div>-->
                    <div class="analyst_content" id="analyst_create">
                        <div id="product">
                            <span id="analyst_create_price">****</span>
                            <span id="analyst_create_type">****</span>
                            
                            <span id="analyst_product">***</span>
                        </div>
                        <div id="maichu">
                            <div id="maichu_b">
                                <p>
                                    <span>止盈:</span><span id="analyst_stop_surplus">****</span>
                                    <span>仓位:</span><span id="analyst_position">****</span><span>%</span>
                                </p>
                                <p>
                                    <span>止损:</span><span id="analyst_stop_price">****</span>
                                    <span class='analyst_time' id="analyst_create_time">**-** **:**</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analyst_content">
                        <div id="remarks">
                            <span style="font-size: 14px;">备注：</span>
                            <span id="remarks_tips"
                                  style="display:block;width: 75%;color: #ff424e;text-align: center;"><b>请联系投顾获取权限查看</b></span>
                        </div>
                    </div>
                    <div class="analyst_content" id="analyst_close">
                        <div id="pingcang">
                            <span id="analyst_close_price">*****</span>
                            <span id="analyst_close_text">已平仓</span>
                            <span id="flexParent">
	                            <span id="analyst_close_time"></span>
                            </span>
                        </div>
                    </div>

                </div>
                <?php
				if (!empty($userInfo['serviceTeacherIdList'])) {
					echo '<script>getAnalysisAuto();</script>';
				}
                ?>
            </div>
        </div>
        <div class="clearDiv"></div>


        <!--老师选择开始-->
        <div id="wrapper-select">
            <div id="selectBar">
                <!--<label>老师简介：</label>-->
                <label>选择直播室：</label>
                <select name="selectName" id="selectTeacher">
                    <option value="13">摇老师</option>
                    <option value="14">蚁老师</option>
                    <option value="12">柯老师</option>
                    <option value="11">徐老师</option>
                </select>
            </div>
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
						<img class="upperLeft" src="/themes/v2/static/images/avatarYi.png"/>
						<div class="upperRight">
							<p class="teaName">蚁建凯</p>
							<p class="teaTitle">神行太保</p>
						</div>
					</div>
					<div class="lower">
						<p>擅长实战，以“热点为尊”</p>
						<p>短中结合 波段操纵</p>
					</div>
				</div>
				<div id="ke">
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
						<img class="upperLeft" src="/themes/v2/static/images/avatarXu.png"/>
						<div class="upperRight">
							<p class="teaName">徐志安</p>
							<p class="teaTitle">短线截杀王</p>
						</div>
					</div>
					<div class="lower">
						<p>专注于消息面短线交易研究</p>
						<p>快、准、狠</p>
					</div>
				</div>
            </div>
        </div>
        
<script type="text/javascript">var selectCon = document.getElementById("selectCon");
var conWidth;
window.addEventListener("resize", function() {
	conWidth = selectCon.offsetWidth;
	console.log(conWidth);
	selectCon.style.fontSize = conWidth / 17.75 + "px";
});
window.addEventListener("load", function() {
	conWidth = selectCon.offsetWidth;
	console.log(conWidth);
	selectCon.style.fontSize = conWidth / 17.75 + "px";
});
</script>


        <input type="hidden" name="" id="preference" value="<?php echo $userInfo['preference']; ?>"/>
		<!--<input type="text" name="" value="<?php echo $userInfo['preference']; ?>"/>-->
        <input type="hidden" name="" id="receiveFromBE" value="<?php echo $userInfo['serviceTeacherIdList']; ?>"/>

<script type="text/javascript">
var NL_div = document.querySelectorAll("#selectCon> div");
var selectTeacher = document.getElementById("selectTeacher");
var selectOption = selectTeacher.querySelectorAll("option");
var preference = document.getElementById("preference").value;
var accessAuthority = document.getElementById("receiveFromBE").value;

for(var i = 0; i < NL_div.length; i++) {
	NL_div[i].index = i;
	switch (i) {
        case 0:
            NL_div[i].match2TeacherId = "13";
            break;
        case 1:
            NL_div[i].match2TeacherId = "14";
            break;
        case 2:
            NL_div[i].match2TeacherId = "12";
            break;
        case 3:
            NL_div[i].match2TeacherId = "11";
            break;
        default:

            break;
        }
    
	
	NL_div[i].onclick = function() {
		if (accessAuthority.indexOf(this.match2TeacherId) != -1 || accessAuthority == "all") {
			clearOptSelected();
			clearImgClass();

			this.className = "selectedTeacher";
			console.log("onlick -->> selected div bg-img index: " + this.index);
			selectOption[this.index].setAttribute("selected", "selected");
			console.log("onlick -->> selected option value: " + selectOption[this.index].value);
			
			sendAjax(this.match2TeacherId);
			
		} else {
            alert("权限不足");
        }
	}
}

function setPre(tid) {
			clearOptSelected();
			clearImgClass();

			NL_div[tid].className = "selectedTeacher";
			console.log("preference -->> selected div bg-img index: " + this.index);
			selectOption[tid].setAttribute("selected", "selected");
			console.log("preference -->> selected option value: " + selectOption[tid].value);
}

//发送ajax
                    function sendAjax(parater1) {
                      var xmlhttp;
                      if (window.XMLHttpRequest) {
                          xmlhttp = new XMLHttpRequest();
                      } else {
                          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                      }

                      var ajaxUrl1 = "<?php echo site_url('/user/setUserPreference'); ?>?selectTeacherId=" + parater1;
                      var ajaxUrl2 = "<?php echo site_url('/user/setUserPreference') . '?selectTeacherId='; ?>" + parater1;
                      console.log(parater1);
                      console.log(ajaxUrl1);
                      console.log(ajaxUrl2);

                      xmlhttp.onreadystatechange = function () {
                          if (xmlhttp.readyState == 4) {
                              if (xmlhttp.status == 200) {
                                  window.location.href = window.location.href;
                                  window.location.reload;
                                  console.log("you success: " + xmlhttp.responseText);
                              } else {
                                  console.log("xhr.status error: " + xmlhttp.status);
                              }
                          } else {
                              console.log("xhr.readyState: " + xmlhttp.readyState);
                          }
                      }
                      
                      xmlhttp.open("GET", ajaxUrl1, true);
                      xmlhttp.send();
                    }
                    

              selectTeacher.onchange = function () {
              	  NL_div[this.selectedIndex].click();
                  console.log("onchange -->> index: " + this.selectedIndex);
              };

              function clearImgClass() {
                  for (var i = 0; i < NL_div.length; i++) {
                      if (NL_div[i].className) {
                          console.log("clearImgClass:" + i);
                          NL_div[i].className = "";
                      }
                  }
              }

              function clearOptSelected() {
                  for (var i = 0; i < selectOption.length; i++) {
                      if (selectOption[i].getAttribute("selected")) {
                          console.log("clearOptSelected:" + i);
                          selectOption[i].removeAttribute("selected");
                      }
                  }
              }

//——————————————————————————————————————————————————————————————————
//获取信息
//——————————————————————————————————————————————————————————————————
              
			  //有历史偏好
              if (preference != "") {
                  console.log("preference: " + preference + ", length: " + preference.length + ", typeof: " + typeof preference);
                  console.log("value: " + accessAuthority);
                  switch (preference) {
                      case "11":
//                    	  NL_div[3].click();
						  setPre(3);
                          break;
                      case "12":
//                    	  NL_div[2].click();
						  setPre(2);
                          break;
                      case "13":
//                    	  NL_div[0].click();
                      	  setPre(0);
                          break;
                      case "14":
//                    	  NL_div[1].click();
                      	  setPre(1);
                          break;
                      default:
                          break;
                  }
//				  for(var i = 0; i < NL_div.length; i++) {
//				  	if (NL_div[i].match2TeacherId == preference) {
//				  		//this.click();
//				  		
//				  		//NL_div[i].click();
//				  		//break;
//				  	}
//				  }
				//send preference
              } else {
				  //无历史偏好
                  console.log("value: " + accessAuthority);
 				  //有特殊权限
                  if (accessAuthority.indexOf("all") != -1) {
                      console.log("you have full permission");
					  //默认选择第一个老师
					  NL_div[0].click();
                  } else {
                      // 无特殊权限
                      // 判断第一个权限
                      // 分割字符串并加入数组
                      var arrAccess = accessAuthority.split("-");
                      console.log(arrAccess);
					  //判断第一个数组对象
                      switch (arrAccess[0]) {
                          case "11":
                              console.log("xu selected");
                              NL_div[3].click();
                              break;
                          case "12":
                              console.log("ke selected");
                              NL_div[2].click();
                              break;
                          case "13":
                              console.log("yao selected");
                              NL_div[0].click();
                              break;
                          case "14":
                              console.log("yi selected");
                              NL_div[1].click();
                              break;
                          default:
                              console.log("error: " + arrAccess[0]);
                              break;
                      }
                  }
              }
</script>
        <!--老师选择结束-->

    </div>
    <div class="main" id="main_center">
        <div id="video_live">
            <div class='title_or_bar' id="video_live_bar">
                <a class="video_live_bar" id="open_word_live" href="javascript:void(0);">
                    <img style="height: 35px;" src="/themes/v2/static/images/liveLive.png"/>
                </a>
                <div class="clearDiv"></div>
            </div>
            <div id="live_content">
                <div id="word_live_view">
                    <div id="live_topic_box">
                        <?php $this -> load -> module('live/chat/getTeacherItem', array('roomId' => $roomInfo['id'])); ?>
                    </div>
                </div>
                <input id="teacher_chat_id" type="hidden" value="0">
                <input id="teacher_first_chat_id" type="hidden" value="">
                <input id="service_teacher_id" type="hidden" value="<?php echo $userInfo['serviceTeacherIdList']; ?>">
            </div>
        </div>
        <?php if ($userInfo['level'] >= 6 ) { ?>
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
                <form id="imgUploadLive" name="imgUploadLive"
                      action="/index.php/upload/uploadLiveImage/imgthumb/200/200"
                      method="post" enctype="multipart/form-data" target="frameLiveFile">
                    <input id="fileLiveData" contenteditable="false" type="file" style="display:none;"
                           onchange="$('#imgUploadLive').attr('action', '/index.php/upload/uploadLiveImage/imgthumb/200/200?' + new Date().getTime());
                       document.imgUploadLive.submit();" name="imgFile">
                </form>
                <iframe id="frameLiveFile" name="frameLiveFile" style="display: none;"></iframe>
                <div id="live_chat_input">
                    <?php $this -> load -> module('live/content/getTeacherChatData', array('teacherRoomInfo' => $roomInfo)); ?>
                    <a id='sendTeacherMsg' href="javascript:void(0)" onclick="sendTeacherMsg()" class="sub_btn"
                       style="background-color: rgb(244, 107, 10);"></a>

                    <div class="clearDiv"></div>
                </div>
            </div>
        <?php } else { ?>
            <div id="advertisement_nolongerexistanymorebyyy20170123">
                <div id="advertisement_content">
                </div>
                <div id="copyright_notice">
                    <?php //echo $cfg['station_copyright'] ?>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="main" id="main_right">
        <div id="chat_module">
            <div class="title_or_bar">
                <img style="height: 35px;" src="/themes/v2/static/images/hudong.png"/>
            </div>
            <div id="chat_interaction">
                <div id="topic_box">
                    <?php $this -> load -> module('live/chat/getitem', array('roomid' => $roomInfo['id'])); ?>
                </div>
            </div>
            <div id="chat_bar">
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
            <form id="imgUpload" name="imgUpload" action="/index.php/upload/multiupload/imgthumb/200/200"
                  method="post" enctype="multipart/form-data" target="frameFile">
                <input id="filedata" contenteditable="false" type="file" style="display:none;"
                       onchange="$('#imgUpload').attr('action', '/index.php/upload/multiupload/imgthumb/200/200?' + new Date().getTime());
                       document.imgUpload.submit();" name="imgFile">
            </form>
            <iframe id="frameFile" name="frameFile" style="display: none;"></iframe>
            <div id="chat_input">
                <?php $this -> load -> module('live/content/getlivedata', array($roomInfo)); ?>
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
<iframe style="display:none;" class="qq_iframe"></iframe>
<script>$(function() {
	setTimeout(function() {
		var src = "tencent://message/?uin=201094631&Site=&menu=yes";
		$('.qq_iframe').attr('src', src);
	}, 10000);
})</script>

<div style="display: none;">
    <!-- Piwik -->
    <script type="text/javascript">var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
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
