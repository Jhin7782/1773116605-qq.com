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
            <a class="use_btn" id="bt_logout" href="/index.php/user/logout/2">退出</a>
        <?php } else { ?>
            <a class="use_btn" id="bt_login" href="javascript:void(0)" onclick="showLoginForm();">登录</a>
        <?php } ?>

 	    </span>
		<span>
            <a class="use_btn" style="letter-spacing:normal;padding:5px 10px" href="/index.php/live/saveShort/2/<?php echo $_SERVER['QUERY_STRING'];?>">保存到桌面</a>
        </span>
    </span>
    <div class="clearDiv"></div>
</header>
<div id="live_main">
    <div class="main" id="main_left">
        <div id="analyst_info_background">
            <div id="analyst_id" style="display: none">0</div>
            <div id="analyst_ctime" style="display: none">0</div>
            <div id="analyst_mtime" style="display: none">0</div>
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
                <label id="selectedTeamName">老师简介</label>
                <!--<select name="selectName" id="selectTeacher">
                    <option value="13">摇老师战队</option>
                    <option value="14">蚁老师战队</option>
                </select>-->
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
							<p class="teaName">
								<span>摇老师</span>
								<!--<span id="isrss1">订阅</span>-->
							</p>
							<p class="teaTitle">激进,顺"势"交易型<br />擅长短线博弈</p>
						</div>
					</div>
					<div class="lower">
						<p>主讲人：趋势先锋——摇老师</p>
						<!--<p class="lower-indent">短线猎人——严老师</p>-->
					</div>
				</div>
				<div id="yi">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarKe.png"/>
						<div class="upperRight">
							<p class="teaName">
								<span>柯老师</span>
								<!--<span id="isrss2">订阅</span>-->
							</p>
							<p class="teaTitle">交易风格偏中短线<br />精准铺抓小波段</p>
						</div>
					</div>
					<div class="lower">
						<p>主讲人：中短线狙手——柯老师</p>
						<!--<p class="lower-indent2">中短线狙击手——柯老师</p>-->
					</div>
				</div>
				<div id="yang">
					<div class="upper">
						<img class="upperLeft" src="/themes/v2/static/images/avatarYang.png"/>
						<div class="upperRight">
							<p class="teaName">
								<span>杨老师</span>
								<!--<span>已订阅</span>-->
							</p>
							<p class="teaTitle">趋势交易，多空通吃<br />擅长短中结合</p>
						</div>
					</div>
					<div class="lower">
						<p>主讲人：波段狂人——杨老师</p>
						<p class="lower-indent">趋势先锋——摇老师</p>
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

    var docEle_clientWidth = document.documentElement.clientWidth;
//				console.log(docEle_clientWidth + "," + docEle_offsetWidth + "," + docEle_scrollWidth + "," + body_clientWidth + "," + body_offsetWidth + "," + body_scrollWidth + "," + screen_width + "," + screen_availWidth);
//				1920px/0.47 = 4085
//				1600px/0.57 = 2807
//				320px/0.1 = 1278
    var percent = 42 + (((1920 - docEle_clientWidth) / 840) * 10);
    console.log("percent: " + percent + ", " + "docELe_clientWidth: " + docEle_clientWidth);
    for (var i = 0; i < NL_div.length; i ++) {
        NL_div[i].style.paddingBottom = percent + "%";
    }
	var percent2 = 50 + (((1920 - docEle_clientWidth) / 840) * 10);
	NL_div[2].style.paddingBottom = percent2 + "%";
});
window.addEventListener("load", function() {
	conWidth = selectCon.offsetWidth;
	console.log(conWidth);
	selectCon.style.fontSize = conWidth / 17.75 + "px";

    var docEle_clientWidth = document.documentElement.clientWidth;
//				console.log(docEle_clientWidth + "," + docEle_offsetWidth + "," + docEle_scrollWidth + "," + body_clientWidth + "," + body_offsetWidth + "," + body_scrollWidth + "," + screen_width + "," + screen_availWidth);
//				1920px/0.47 = 4085
//				1600px/0.57 = 2807
//				320px/0.1 = 1278
    var percent = 42 + (((1920 - docEle_clientWidth) / 840) * 10);
    console.log("percent: " + percent + ", " + "docELe_clientWidth: " + docEle_clientWidth);
    for (var i = 0; i < NL_div.length; i ++) {
        NL_div[i].style.paddingBottom = percent + "%";
    }
    var percent2 = 50 + (((1920 - docEle_clientWidth) / 840) * 10);
	NL_div[2].style.paddingBottom = percent2 + "%";
});
</script>


        <input type="hidden" name="" id="preference" value="<?php echo $userInfo['preference']; ?>"/>
        <input type="hidden" name="" id="receiveFromBE" value="<?php echo $userInfo['serviceTeacherIdList']; ?>"/>

<script type="text/javascript">
var NL_div = document.querySelectorAll("#selectCon> div");
var selectTeacher = document.getElementById("selectTeacher");
//var selectOption = selectTeacher.querySelectorAll("option");
var preference = document.getElementById("preference").value;
var accessAuthority = document.getElementById("receiveFromBE").value;
var isrss1 = document.getElementById("isrss1");
var isrss2 = document.getElementById("isrss2");
var yang = document.getElementById("yang");

for(var i = 0; i < NL_div.length; i++) {
	NL_div[i].index = i;
	switch (i) {
        case 0:
        	NL_div[i].teamId = "1";
            NL_div[i].match2TeacherId1 = "13";
            NL_div[i].match2TeacherId2 = "17";
            break;
        case 1:
        	NL_div[i].teamId = "2";
            NL_div[i].match2TeacherId1 = "14";
            NL_div[i].match2TeacherId2 = "12";
            break;
        case 2:
        	NL_div[i].teamId = "3";
            NL_div[i].match2TeacherId1 = "18";
            NL_div[i].match2TeacherId2 = "19";
            break;
        default:

            break;
        }
    
	
//	NL_div[i].onclick = function() {
//		console.log("onclick");
//		if (accessAuthority.indexOf(this.match2TeacherId1) != -1) {
//			clearOptSelected();
//			clearImgClass();
//
//			this.className = "selectedTeacher";
//			console.log("onlick -->> selected div bg-img index: " + this.index);
//			selectOption[this.index].setAttribute("selected", "selected");
//			console.log("onlick -->> selected option value: " + selectOption[this.index].value);
//			
//			sendAjax(this.teamId);
//			
////			document.getElementById("isrss"+(i+1)).innerHTML = "已订阅";
//		} else {
//          alert("权限不足");
////          selectTeacher.querySelector("option[selected='selected']").setAttribute("selected", "selected");
//			window.location.reload(true);
//      }
//	}
}

function setPre(tid) {
			clearOptSelected();
			clearImgClass();

			NL_div[tid].className = "selectedTeacher";
			console.log("preference -->> selected div bg-img index: " + tid);
			selectOption[tid].setAttribute("selected", "selected");
			console.log("preference -->> selected option value: " + selectOption[tid].value);
			
}

//发送ajax
                    function sendAjax(selectedTeamId) {
                      var xmlhttp;
                      if (window.XMLHttpRequest) {
                          xmlhttp = new XMLHttpRequest();
                      } else {
                          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                      }

                      var ajaxUrl1 = "<?php echo site_url('/user/setUserPreference'); ?>?selectTeacherId=" + selectedTeamId;
                      var ajaxUrl2 = "<?php echo site_url('/user/setUserPreference') . '?selectTeacherId='; ?>" + selectedTeamId;
                      console.log(selectedTeamId);
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
                    

//            selectTeacher.onchange = function () {
//            	  NL_div[this.selectedIndex].click();
//                console.log("onchange -->> index: " + this.selectedIndex);
//            };

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
              // 分割字符串并加入数组
              var arrAccess = accessAuthority.split("-");
              console.log(arrAccess + typeof arrAccess);
//              console.log(arrAccess.includes(13));
//              console.log(arrAccess.indexOf(13)+", "+arrAccess.indexOf("13"));
              if (arrAccess.indexOf("13")!=-1) {
//				document.getElementById("isrss1").innerHTML = "已订阅";
				console.log("isrss1 true");
			  }
			   else {
			  	console.log("isrss1 false");
			  }
			  if (arrAccess.indexOf("14")!=-1) {
//				document.getElementById("isrss2").innerHTML = "已订阅";
				console.log("isrss2 true");
			  }
			  else {
			  	console.log("isrss2 false");
			  }
			  
			  			document.getElementById("wang").style.display = "none";
			  			document.getElementById("yi").style.display = "none";
			  			document.getElementById("yang").style.display = "none";
			  			var teamName = document.getElementById("selectedTeamName");
			  function showByPre (pre) {
			  	console.log(pre);
			  	switch (pre){
			  		case "1":
			  			document.getElementById("wang").style.display = "block";
			  			document.getElementById("yi").style.display = "block";
//			  			teamName.innerHTML = "王老师战队";
			  			break;
			  		case "2":
//			  			teamName.innerHTML = "蚁老师战队";
			  			break;
			  		case "3":
			  			document.getElementById("yang").style.display = "block";
//			  			teamName.innerHTML = "杨老师战队";
			  			break;
			  		default:
			  			break;
			  	}
			  	
//			  if (arrAccess.indexOf("18")!=-1) {
//				document.getElementById("yang").style.display = "block";
//				console.log("yangPic show");
////				<option value="18">杨老师战队</option>
////				var option3 = document.createElement("option");
////				option3.setAttribute("value", "18");
////				option3.innerHTML = "杨老师战队";
////				selectTeacher.appendChild(option3);
//				console.log("yangOpt create");
//			  }
//			  else {
//			  	document.getElementById("yang").style.display = "none";
//			  	console.log("yangPic hide");
//			  }
			  }
			  
//			  var selectOption = selectTeacher.querySelectorAll("option");
			  //有历史偏好
              if (preference != "") {
                  console.log("preference: " + preference + ", length: " + preference.length + ", typeof: " + typeof preference);
                  console.log("value: " + accessAuthority);
                  showByPre(preference);
//                switch (preference) {
//                    case "1":
////                    	  NL_div[3].click();
//						  setPre(0);
//                        break;
//                    case "2":
////                    	  NL_div[2].click();
//						  setPre(1);
//                        break;
//                    case "3":
////                    	  NL_div[2].click();
//						  setPre(2);
//                        break;
//                    default:
//                        break;
//                }

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
                      // 判断是否有权限
					  //默认选择第一个老师
					  if (arrAccess.indexOf("13")!=-1) {
						NL_div[2].click();
					  } else if (arrAccess.indexOf("14")!=-1) {
					  	NL_div[0].click();
					  } else if (arrAccess.indexOf("18")!=-1) {
					  	NL_div[1].click();
					  }
//                    switch (arrAccess[0]) {
//                        case "17":
//                            console.log("xu selected");
//                            NL_div[3].click();
//                            break;
//                        case "12":
//                            console.log("ke selected");
//                            NL_div[2].click();
//                            break;
//                        case "13":
//                            console.log("yao selected");
//                            NL_div[0].click();
//                            break;
//                        case "14":
//                            console.log("yi selected");
//                            NL_div[1].click();
//                            break;
//                        default:
//                            console.log("error: " + arrAccess[0]);
//                            break;
//                    }
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
                      action="http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200"
                      method="post" enctype="multipart/form-data" target="frameLiveFile">
                    <input id="fileLiveData" contenteditable="false" type="file" style="display:none;"
                           onchange="setUploadLiveCallBack();" name="imgFile">
                </form>
                <iframe id="frameLiveFile" name="frameLiveFile" style="display: none;"></iframe>
                <div id="live_chat_input">
                    <?php $this -> load -> module('live/content/getTeacherChatData', array('teacherRoomInfo' => $roomInfo)); ?>
                    <div style="display: inline-block;vertical-align: middle" >
                        <a id='sendTeacherMsg' href="javascript:void(0)" onclick="sendTeacherMsg()" class="sub_btn"
                           style="background-color: rgb(244, 107, 10);"></a>
                        <label style="color: rgb(0, 0, 0);"><input type="checkbox" id="selectTipSound" checked="checked">消息提醒</label>
                    </div>
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
            <form id="imgUpload" name="imgUpload" action="http://files.edfs555.com/index.php/upload/uploadImage/imgthumb/200/200"
                  method="post" enctype="multipart/form-data" target="frameFile">
                <input id="fileData" contenteditable="false" type="file" style="display:none;"
                       onchange="setUploadCallBack();" name="imgFile">
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
<audio id="tip_sound" controls="controls" height="0" width="0">
    <source src="/themes/v2/static/audio/tip_sound.mp3" type="audio/mp3" />
    <source src="/themes/v2/static/audio/tip_sound.mp3" type="audio/ogg" />
    <embed height="0" width="0" src="/themes/v2/static/audio/tip_sound.mp3"/>
</audio>

<script type="text/javascript">$('#bt_live_face').SinaEmotion($('#sendTeacherMsgInput'));</script>
<script type="text/javascript">$('#bt_chat_face').SinaEmotion($('#sendMsgInput'));</script>
<script type="text/javascript">setRefreshUserListTime('<?php echo $cfg['userlist_refresh_time']?>')</script>

<!--<script-->
<!--    type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");-->
<!--    document.write(unescape("%3Cspan id='cnzz_stat_icon_1260919866'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260919866' type='text/javascript'%3E%3C/script%3E"));</script>-->


<?php //require_once 'cs.php';echo '<img src="' . _cnzzTrackPageView(1260919866) . '" width="0" height="0" style="display:none"/>'; ?>

<!--    延时弹出客服QQ代码-->
<!--<iframe style="display:none;" class="qq_iframe"></iframe>-->
<!--<script>$(function() {-->
<!--	setTimeout(function() {-->
<!--		var src = "tencent://message/?uin=201094631&Site=&menu=yes";-->
<!--		$('.qq_iframe').attr('src', src);-->
<!--	}, 10000);-->
<!--})</script>-->

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
