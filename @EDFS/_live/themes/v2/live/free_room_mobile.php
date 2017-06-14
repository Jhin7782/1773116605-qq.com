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

    <link rel="stylesheet" type="text/css" href="/themes/v2/static/mobile/css/free_room_mobile.css"/>
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
    <script type="text/javascript" src="/themes/v2/static/mobile/js/free_room_mobile.init.js"></script>

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
<!--<div id="onlineUser">-->
<!--    <p class="onlineUserContent">在线人数: &nbsp;</p>-->
<!--    <p class="onlineUserContent" id="onlineUserNumber">153</p>-->
<!--    <div class="clear"></div>-->
<!--</div>-->

<div id="broadcast">
    <?php if ($haveBroadcast == '1') {
        echo '<div id="leshiTV" style="height: 100%;width: 100%">' .
            '<script type="text/javascript" charset="utf-8" src="http://yuntv.letv.com/player/live/blive.js"></script>' .
            '<script>var player = new CloudLivePlayer();player.init({activityId: \'A201612280000050\',auto_play:\'0\'});</script></div>';
        if (($cfg['open_live_password'] == 1) && ($userInfo['level'] < 2)) {
            if (empty($cfg['set_live_password'])) {
                $open_live_key = 0;
            } else {
                $open_live_key = $cfg['set_live_password'];
            }
            echo '<script> hidenLeshiTV();</script>';
            echo '<div id="pass_video">' .
                '<li> 请输入视频密码：</li>' .
                '<li><input id="video_password"></li>' .
                '<li><a id="confirm_pass" href="javascript:void(0);" onclick="removePassVideoView(' . $open_live_key . ')" >确定</a></li>' .
                '<li>(视频密码请咨询您的专属投资顾问)</li></div>';
        }
    } ?>

</div>
<div id="contentModule">
    <div class="tabs" id="tabs_list">
        <div class="tab" id="live_view" onclick="showWordLive()"></div>
        <div class="tab" id="tabChats" onclick="showChatLive()"></div>
        <div class="tab" id="analysisOperation">
            <a href="javascript:void(0);" onclick="showAccountTip()""></a>
        </div>
        <div class="tab" id="register">
            <?php if ((!empty($userInfo)) && ($userInfo['level'] != '-1')) { ?>
                <a id="btLoginOut" href="/index.php/user/logout"></a>
            <?php } else { ?>
                <a id="btForm" onclick="showForm();"></a>
            <?php } ?>
        </div>
    </div>
    <div class="content" id="chats">
        <div id="interaction">
            <!-- 聊天开始 -->
            <div class="topiccontent mCustomScrollbar _mCS_1" id="chatsContent">
                <div class="mCustomScrollBox mCS-light" id="mCSB_1"
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
        <div class="wordLive mCustomScrollbar _mCS_2" id="wordLive" style="display: none">
            <div class="mCustomScrollBox mCS-light" id="mCSB_2"
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
        </div>
        <input id="teacher_chat_id" type="hidden" value="0">
        <input id="teacher_first_chat_id" type="hidden" value="">
    </div>
    <div class="clear"></div>
</div>
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

