<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <meta name="renderer" content="webkit">
    <title><?php echo $roomInfo['title']; ?></title>
    <meta name="keywords" content="<?php echo $roomInfo['keywords']; ?>"/>
    <meta name="description" content="<?php echo $roomInfo['desc']; ?>"/>
    <link rel="shortcut icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>
    <link rel="icon" href="<?php echo $cfg['img_favicon']; ?>" type="image/x-icon"/>

    <link rel="stylesheet" type="text/css" href="/themes/v2/static/mobile/css/vip_room_mobile.css"/>
    <link rel="stylesheet" href="/themes/v2/static/css/jquery.mCustomScrollbar.css"/>
    <link rel="stylesheet" href="/themes/v2/static/css/jquery.sinaEmotion.css"/>

    <!--[if lt IE 9]>
    <link href="/themes/v2/static/css/less.css" rel="stylesheet" type="text/css">
    <script src="/themes/v2/static/js/css3-mediaqueries.js"></script>
    <![endif]-->

    <script type="text/javascript" src="/themes/v2/static/js/html5.js"></script>

    <script type="text/javascript" src="/themes/v2/static/js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery-ui-1.10.4.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.mCustomScrollbar.mobile.js"></script>

    <script type="text/javascript" src="/themes/v2/static/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/jquery.sinaEmotion.js"></script>
    <script type="text/javascript" src="/themes/v2/static/js/tinybox.js"></script>
    <script type="text/javascript" src="/themes/comm/js/layer/layer.js"></script>
    <script type="text/javascript" src="/themes/v2/static/mobile/js/room_mobile.api.js"></script>
    <script type="text/javascript" src="/themes/v2/static/mobile/js/vip_room_mobile.init.js"></script>

    <script>var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?767e5957a20e7146fe5d3600fb3039c2";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();</script>

</head>
<body>
<!--<div id="onlineUser">-->
<!--    <p class="onlineUserContent">在线人数: &nbsp;</p>-->
<!--    <p class="onlineUserContent" id="onlineUserNumber">153</p>-->
<!--    <div class="clear"></div>-->
<!--</div>-->


<div id="VIP_head">
    <img src="/themes/v2/static/images/vip_logo.png" id="vip_logo_mobile">
    <?php if (!empty($userInfo['serviceTeacherIdList'])) { ?>
        <!--<div id="btn_change_teacher" onclick="changeSelectedTeacherStatus()">更换老师</div>-->
        <input type="hidden" name="" id="accessAuthority" value="<?php echo $userInfo['serviceTeacherIdList']; ?>"/>
        <input type="hidden" name="" id="preference" value="<?php echo $userInfo['preference']; ?>"/>
        <select id="btn_change_teacher" name="更换老师" onchange="selectedOption(this.selectedIndex)">
            <option value="13">摇老师战队</option>
            <option value="14">柯老师战队</option>
            <!--<option value="12">柯老师</option>
            <option value="11">徐老师</option>-->
        </select>
    <?php } ?>
</div>

</div>


<script type="text/javascript">
	var selectTeacher = document.getElementById("btn_change_teacher");
    var preference = $("#preference").val();
    var accessAuthority = $("#accessAuthority").val();
    var arrAccess = accessAuthority.split("-");
    if (arrAccess.indexOf("18")!=-1) {
				var option3 = document.createElement("option");
				option3.setAttribute("value", "18");
				option3.innerHTML = "杨老师战队";
				selectTeacher.appendChild(option3);
				console.log("yangOpt create");
	}
    var NL_options = document.querySelectorAll("#btn_change_teacher> option");
    console.log("accessAuthority: " + accessAuthority + ", arrAccess: " + arrAccess);
    var temp = "";

    if (preference != "" || preference != null) {
        console.log("preference: " + preference + ", typeof preference: " + typeof preference);
        if (preference == "1") {
            NL_options[0].setAttribute("selected", "selected");
        } else if (preference == "2") {
            NL_options[1].setAttribute("selected", "selected");
        } else if (preference == "3") {
            NL_options[2].setAttribute("selected", "selected");
        }
    }

    function selectedOption(optionIndex) {
        console.log("selectedIndex: " + optionIndex);
        switch (optionIndex) {
            case 0:
                if (accessAuthority.indexOf("13") != -1) {
                    changeSelectTeacher(1);
                } else {
                    alert("权限不足");
                    window.location.reload(true);
                }
                break;
            case 1:
                if (accessAuthority.indexOf("14") != -1) {
                    changeSelectTeacher(2);
                } else {
                    alert("权限不足");
                    window.location.reload(true);
                }
                break;
            case 2:
                if (accessAuthority.indexOf("18") != -1) {
                    changeSelectTeacher(3);
                } else {
                    alert("权限不足");
                    window.location.reload(true);
                }
                break;
            default:

                break;
        }
    }
</script>

<div id="contentModule">
    <div class="tabs" id="tabs_list">
        <div class="tab" id="live_view" onclick="showWordLive()"></div>
        <div class="tab" id="tabChats" onclick="showChatLive()"></div>
        <div class="tab" id="analysisOperation">
            <!--<a href="javascript:void(0);" onclick="showAccountTip()""></a>-->
            <a href="javascript:void(0);" onclick="showAnalystInfo()""></a>
        </div>

        <div class="tab" id="register">
            <?php if ((!empty($userInfo)) && ($userInfo['level'] != '-1')) { ?>
                <a id="btLoginOut" href="/index.php/user/logout/2"></a>
            <?php } else { ?>
                <a id="btForm" onclick="showForm();"></a>
            <?php } ?>
        </div>
    </div>
    <div class="content" id="chats">
        <div class="wordLive mCustomScrollbar _mCS_1" id="wordLive">
            <div class="mCustomScrollBox mCS-light" id="mCSB_1"
                 style="position:relative; height:100%; overflow:hidden; max-width:100%;">
                <div class="mCSB_container" style="position: relative;">
                    <div id="live_topic_box">
                        <?php $this->load->module('live/chat/getTeacherItem', array('roomId' => $roomInfo['id'])); ?>
                    </div>
                </div>
            </div>
            <div class="mCSB_scrollTools" style="position: absolute; display: block; opacity: 0;">
                <a class="mCSB_buttonUp" oncontextmenu="return false;"></a>
                <div class="mCSB_draggerContainer">
                    <div class="mCSB_dragger" style="position: absolute; top: 268px; height: 33px;"
                         oncontextmenu="return false;">
                        <div class="mCSB_dragger_bar" style="position: relative; line-height: 33px;"></div>
                    </div>
                    <div class="mCSB_draggerRail"></div>
                </div>
                <a class="mCSB_buttonDown" oncontextmenu="return false;"></a>
            </div>
            <input id="teacher_chat_id" type="hidden" value="0">
            <input id="teacher_first_chat_id" type="hidden" value="">
        </div>

        <div id="interaction">
            <!-- 聊天开始 -->
            <div class="topiccontent mCustomScrollbar _mCS_2" id="chatsContent">
                <div class="mCustomScrollBox mCS-light" id="mCSB_2"
                     style="position:relative; height:100%; overflow:hidden; max-width:100%;">
                    <div class="mCSB_container" style="position: relative;">
                        <div id="topic_box">
                            <?php $this->load->module('live/chat/getitem', array('roomid' => $roomInfo['id'])); ?>
                        </div>
                    </div>
                </div>
                <div class="mCSB_scrollTools" style="position: absolute; display: block; opacity: 0;">
                    <a class="mCSB_buttonUp" oncontextmenu="return false;"></a>
                    <div class="mCSB_draggerContainer">
                        <div class="mCSB_dragger" style="position: absolute; top: 268px; height: 33px;"
                             oncontextmenu="return false;">
                            <div class="mCSB_dragger_bar" style="position: relative; line-height: 33px;"></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                    </div>
                    <a class="mCSB_buttonDown" oncontextmenu="return false;"></a>
                </div>
            </div>
            <div id="chatsInput">
                <img class="foot" id="face_btn" src="/themes/v2/static/mobile/image/expression.png">
                <?php $this->load->module('live/content/getlivedata', array($roomInfo)); ?>
                <a href="javascript:void(0)" onclick="sendMsg_Mobile()" class="sub_btn"></a>
            </div>
        </div>
    </div>

    <div id="analyst_info_modular">
        <div id="analyst_id" style="display: none">0</div>
        <div id="analyst_ctime" style="display: none">0</div>
        <div id="analyst_mtime" style="display: none">0</div>
        <!--        <div class="analyst_info mCustomScrollbar _mCS_3" id="analyst_info_scroll">-->
        <div class="analyst_info" id="analyst_info_scroll">
            <!--            <div class="mCustomScrollBox mCS-light" id="mCSB_3"-->
            <!--                 style="position:relative; height:100%; overflow:hidden; max-width:100%;">-->
            <!--                <div class="mCSB_container" style="position: relative;">-->
            <div id="analyst_title">
                <img id="analyst_author_img" src="">
                <div id="analyst_title_desc">
                    <p><span id="analyst_authorTitle">****</span></p>
                    <p><span id="analyst_authorName">****</span></p>
                </div>
            </div>
            <div id="analyst_info">
                <div id="analyst_content">
                    <div class="analyst_content" id="analyst_create">
                        <p id="analyst_product">****</p>
                        <div id="analyst_create_left">
                            <p id="analyst_create_price">****</p>
                        </div>
                        <p id="analyst_create_type">****</p>
                        <div id="analyst_create_right">
                            <p>
                                <span>止盈: </span><span id="analyst_stop_surplus">****</span>
                                <span>仓位: </span><span id="analyst_position">***</span><span>%</span>
                            </p>
                            <p>
                                <span>止损: </span><span id="analyst_stop_price">****</span>
                                <span class='analyst_time' id="analyst_create_time">**-** **:**</span>
                            </p>
                        </div>
                    </div>
                    <div class="analyst_content">
                        <div id="remarks">
                            <span style="margin-left: 0%; font-size: 14px;">备注：</span>
                            <span id="remarks_tips"
                                  style="display:block;width: 75%;color: #ff424e;text-align: center;"><b>请联系投顾获取权限查看</b></span>
                        </div>
                    </div>
                    <div class="analyst_content" id="analyst_close">
                        <div id="analyst_close_price">****</div>
                        <div id="analyst_close_text">*****</div>
                        <span id="analyst_close_time"></span>
                    </div>
                </div>
                <?php
                if (!empty($userInfo['serviceTeacherIdList'])) {
                    echo '<script>getAnalysisAuto();</script>';
                }
                ?>
                <!--                    </div>-->
                <!--                </div>-->
            </div>
            <!--            <div class="mCSB_scrollTools" style="position: absolute; display: block; opacity: 0;">-->
            <!--                <a class="mCSB_buttonUp" oncontextmenu="return false;"></a>-->
            <!--                <div class="mCSB_draggerContainer">-->
            <!--                    <div class="mCSB_dragger" style="position: absolute; top: 268px; height: 33px;"-->
            <!--                         oncontextmenu="return false;">-->
            <!--                        <div class="mCSB_dragger_bar" style="position: relative; line-height: 33px;"></div>-->
            <!--                    </div>-->
            <!--                    <div class="mCSB_draggerRail"></div>-->
            <!--                </div>-->
            <!--                <a class="mCSB_buttonDown" oncontextmenu="return false;"></a>-->
            <!--            </div>-->
        </div>
    </div>
    <div class="clear"></div>
</div>
<audio id="tip_sound" controls="controls" height="0" width="0">
    <source src="/themes/v2/static/audio/tip_sound.mp3" type="audio/mp3" />
    <source src="/themes/v2/static/audio/tip_sound.mp3" type="audio/ogg" />
    <embed height="0" width="0" src="/themes/v2/static/audio/tip_sound.mp3"/>
</audio>

<a id="QRCode_btn" href="javascript:void(0);" onclick="openShareQR()">
    <img src="/themes/v2/static/images/ec_time_small.png">
</a>
<div id="shareQRView">
    <a href="javascript:void(0);" onclick="hiddenShareQR()"><span>X</span></a>
    <img src="/themes/v2/static/images/ec_time.jpg">
    <p>长按上图，选择“识别图中二维码”并关注，公众号每日与您分享顶尖分析师团队最新个股、行情分析！</p>
</div>

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
        })();
    </script>
    <noscript>
        <p>
            < img src="//www.edfs555.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" />
        </p>
    </noscript>
    <!-- End Piwik Code -->
</div>

</body>
<script type="text/javascript">
    $('#face_btn').SinaEmotion_Mobile($('#sendMsgInput'));
    setAddUserListTime('<?php echo $cfg['userlist_refresh_time']?>');
</script>

</html>

