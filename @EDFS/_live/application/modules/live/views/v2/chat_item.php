<?php
if (!empty($chatlist)) {
foreach ($chatlist as $k => $v) { ?>

<div id="audit_<?php echo $v['chatid'] ?>" class="talk  public member">
			<span>
			<?php if ($v['level'] == 0) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/ordinary_member.png" title="普通会员">
            <?php } elseif ($v['level'] == 1) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/silver_member.png" title="激活客户">
            <?php } elseif ($v['level'] == 5) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/teacher_assistant.png" title="老师助理">
            <?php } elseif ($v['level'] == 6) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/strategy_analysis.png" title="策略分析师">
            <?php } elseif ($v['level'] == 7) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/lecturer.png" title="讲师">
            <?php } elseif ($v['level'] == 8) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/room_manager.png" title="房间管理员">
            <?php } else { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/tourist.png" title="游客">
            <?php } ?>
		</span>
    <div class="talk_name">
        <a href="javascript:void(0)" class="u_mor" ondblclick="javascript:$('#sendMsgInput').val('@'+$(this).html()+': ');"><?php echo $v['chatname'] ?></a>
        <?php if ($v['touname']) { ?>
            <i>对</i>
            <a href="javascript:void(0)" class="u_mor" ondblclick="javascript:$('#sendMsgInput').val('@'+$(this).html()+': ');"><?php echo $v['touname'] ?></a>
            <i>说:</i>
        <?php } ?>
        <a class="time"><?php echo date("m-d H:i", $v['ctime']) ?></a>
        <?php if (strpos($u['masterid'],$roomId) !== false ) { if($v['status'] == 0){ ?>
            <a id="chat_audit" href="javascript:void(0)" onclick="chatAudit(<?php echo $v['chatid'] ?>, 1)">审核消息</a>
        <?php }else{ ?>
            <a id="delete_audit" href="javascript:void(0)" onclick="chatAudit(<?php echo $v['chatid'] ?>, 3)">删除消息</a>
        <?php }} ?>
    </div>
    <div class="clear"></div>
    <?php if ($v['level'] >= 5 ){ ?>
    <div class="talk_hua_teacher">
        <?php }else{ ?>
        <div class="talk_hua">
            <?php } ?>
            <p>
                <?php
                $content = $v['chatcontent'];
                if (empty($v['sourceimg'])) {
                    $content = preg_replace('/\[img=(.*?)\]/', '<img src="$1">', $content);
                } else {
                    $content = preg_replace('/\[img=(.*?)\]/', '<img src="$1" title="点击看大图" onclick="talk_pic(\'' . $v['sourceimg'] . '\')">', $content);
                }
                echo @$content;
                ?>
            </p>
        </div>
    </div>
    <div class="clear"></div>
    <?php } ?>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#lastchatid").val('<?php echo empty($v["chatid"]) ? 0 : $v["chatid"]?>');
        });
    </script>
    <?php
    } elseif (isset($nextid) && $nextid > 0) {
        echo '<script type="text/javascript">';
        echo '$(document).ready(function () { $("#lastchatid").val(' . $nextid . '); });';
        echo '</script>';
    }
    ?>
