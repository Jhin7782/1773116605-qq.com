
<form name="chat_form" id="chat_form" action="javascript:;" onsubmit="return false;">
    <INPUT TYPE="hidden" NAME="roomid" id="roomid" value="<?php echo $roomInfo['id'] ?>">
    <INPUT TYPE="hidden" NAME="lastchatid" id="lastchatid" value="<?php echo (empty($lastchatid)) ? 0 : $lastchatid; ?>">
    <INPUT TYPE="hidden" NAME="chatname" id="chatname" value="<?php echo $u['name'] ?>">
    <INPUT TYPE="hidden" id="nextchat" value="0">
    <INPUT TYPE="hidden" NAME="chatuserid" id="chatuserid" value="<?php echo $u['userid'] ?>">
    <INPUT TYPE="hidden" NAME="level" id="level" value="<?php echo $u['level'] ?>">
    <INPUT TYPE="hidden" NAME="imgthumb" id="imgthumb" value="">
    <INPUT TYPE="hidden" NAME="sourceimg" id="sourceimg" value="">
    <input type="hidden" name="wordcount" class="word_count" id="wordcount" />
    <textarea type="text" id="sendMsgInput" name="chatcontent" ></textarea>
</form>



<script type="text/javascript">

    $(document).ready(function() {
        setInterval(chatFlash, 3000);
        setInterval(TeacherChatFlash, 10000);
    });

    function chatFlash() {
        $.ajax({
            url: '<?php echo site_url("module/live/chat/getitem") ?>' + '/' + $("#roomid").val() + '/' + $("#lastchatid").val() + '?t=' + new Date().getTime(),
            type: "GET",
            ifModified: true,
            success: function (d) {
                if(d != ''){
                    var _s = AnalyticEmotion(d);
                    if (_s != '') {
                        chatContainer.push(_s);
                    }
                }
//                console.log(d);

            }
        });
    }

    function TeacherChatFlash(){

        $.ajax({url: '<?php echo site_url("module/live/chat/getTeacherItem") ?>' + '/' + $("#roomid").val() + '/' + $("#teacher_chat_id").val() + '/'+$("#teacher_first_chat_id").val()+'?t=' + new Date().getTime(),
            type: "GET",
            ifModified: true,
            success: function(d) {
                console.log(d);
                if(d === false){
                    layer.msg('该账户没有观看文字直播的权限，请联系你的投资顾问');
                }else if(d != ""){
                    var _s = AnalyticEmotion(d);
                    if (_s != '') {
                        liveChatContainer.push(_s);
                    }
                }

            }
        });


    }

    //获取老师观点历史记录
    function getTeacherChatHistory(){

        $.ajax({url: '<?php echo site_url("module/live/chat/getTeacherHistoryItem") ?>' + '/' + $("#roomid").val() + '/' + $("#teacher_first_chat_id").val(),
            type: "GET",
            ifModified: true,
            success: function(d) {
//                console.log(d);
                if(d === false){
                    layer.msg("该账号没有查看直播观点的权限");
                }
                if(d == ''){
                    layer.msg('没有更多的历史消息了');
                }else{
                    var _s = AnalyticEmotion(d);
                    if (_s != '') {
                        liveChatContainer.insert(_s);
                    }
                }

            }
        });
    }


    function sendMsg() {
        var _s = removeHTMLTag($("#sendMsgInput").val());
        if ((_s.length == 0))
        {
            $("#sendMsgInput").val('');
            alert('内容不能为空');
            return false;
        }

        if ($('#level').val() == -1) {
            var time = parseInt(Date.parse(new Date()).toString().substring(0, 10));
            var nchat = time - parseInt($('#nextchat').val());
            if (nchat < 30) {
                var boxhtml = '<div class="tinner" id="" style="width: 440px; height: 170px; background-image: none;"><div class="tcontent"><div class="qqalert">	<div class="alert_title">提示信息</div>		<p id="alertmsg">游客的发言时间间隔为30秒,<br />还有<span id="chatTimeSpan">' + (30 - nchat) + '</span>秒！<br>请联系QQ客服，<br />免费获取马甲和老师解答，<br />发言不受限！</p><div class="kflis">';
                <?php if (!empty($adlist[4])) {
                foreach ($adlist[4] as $k => $v) { ?>
                boxhtml += '<li> <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=<?php echo $v['link'] ?>&amp;site=qq&amp;menu=yes"><img border="0" style="vertical-align:middle" src="http://wpa.qq.com/pa?p=2:<?php echo $v['link'] ?>:41" alt="<?php echo $v['link'] ?>" title="请加QQ：<?php echo $v['link'] ?>"></a> </li>';
                <?php }
                } ?>
                boxhtml += '</div></div></div></div>';
                TINY.box.show({html: boxhtml, width: 470, height: 200, openjs: function() {
                    $('.tbox').css('position', 'absolute');
                }});
                return false;
            }
        }

        $("#sendMsgInput").val(_s);
        postdata('chat_form', "/index.php/chat/setContent", "retChat");
        return false;


    }

    function sendMsg_Mobile() {
        var _s = removeHTMLTag($("#sendMsgInput").val());
//        console.log(_s);
        if ((_s.length == 0))
        {
            $("#sendMsgInput").val('');
            alert('内容不能为空');
            return false;
        }
        $("#sendMsgInput").val(_s);
        postdata('chat_form', "/index.php/chat/setContent", "retChat");
        return false;
    }

    function retChat(d)
    {
        console.log(d);
        if (d.code == '1') {
            //$("#questionlasttime").val(d.lasttime);
            //alert(d.msg);
            $("#nextchat").val(parseInt(Date.parse(new Date()).toString().substring(0, 10)));
            $("#sendMsgInput").val('');
            chatContainer.push(AnalyticEmotion(d.content));
            $("#show_img").html("");
            $("#imgthumb").val("");
            $("#sourceimg").val("");
        }
        else if (d.code == '-1')
        {
            alert('你已被踢出,请过一段时间再来!');
            top.location.href = '<?php echo site_url('home'); ?>';
        }
        else {
            layer.msg(d.msg);
        }
    }

    //审核消息
    function chatAudit(chatid, status)
    {
        $.get("<?php echo site_url('module/live/chat/chataudit') ?>" + "/" + chatid + "/" + status, function(data) {
            var d = eval('(' + data + ')');
            if (d.code == '1')
            {
                layer.msg(d.msg);
                $("#audit_" + d.chatid).remove();
            }
            else
            {
                layer.msg(d.msg);
            }
        });
    }

</script>





