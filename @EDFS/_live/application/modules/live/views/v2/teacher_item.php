<?php
if (!empty($teacherChatList)) {
foreach ($teacherChatList as $k => $v) {
?>
<div id="audit_<?php echo $v['teacherChatId'] ?>" class="teacher_talk">
			<span>
            <?php if ($v['teacherLevel'] == 6) { ?>
                <img class="roleimg" src="/themes/v2/static/images/grade_mark/strategy_analysis.png" title="策略分析师">
            <?php } elseif ($v['teacherLevel'] == 7) {
                if($v['chatTeacherId'] == 11 ){ ?>
                    <img class="roleimg" src="/themes/v2/static/images/teacher_head/xu_teacher.png" title="徐老师">
                <?php }else if( $v['chatTeacherId'] == 12 ){ ?>
                    <img class="roleimg" src="/themes/v2/static/images/teacher_head/ke_teacher.png" title="柯老师">
                <?php }else if( $v['chatTeacherId'] == 13 ){ ?>
                    <img class="roleimg" src="/themes/v2/static/images/teacher_head/wang_teacher.png" title="摇钱树老师">
                <?php }else if( $v['chatTeacherId'] == 14 ){ ?>
                    <img class="roleimg" src="/themes/v2/static/images/teacher_head/yi_teacher.png" title="蚁老师">
                <?php }else if( $v['chatTeacherId'] == 15 ){ ?>
                    <img class="roleimg" src="/themes/v2/static/images/teacher_head/wang_teacher.png" title="e财助理">
            <?php }} ?>
		</span>
    <div class="teacher_talk_name">
        <a href="javascript:void(0)" class="u_mor" ondblclick="javascript:$('#sendTeacherMsgInput').val('@'+$(this).html()+': ');"><?php echo $v['chatTeacherName'] ?></a>
        <?php if ($v['toName']) { ?>
            <i>对</i>
            <a href="javascript:void(0)" class="u_mor"
               ondblclick="javascript:$('#sendTeacherMsgInput').val('@'+$(this).html()+': ');"><?php echo $v['toName'] ?></a>
            <i>说:</i>
        <?php } ?>
        <a class="teacher_time"><?php echo date("Y-m-d H:i", $v['time']) ?></a>
    </div>
    <div class="clear"></div>
    <div class="teacher_talk_hua">
        <p>
            <?php
            $content = $v['chatTeacherContent'];
            if (empty($v['sourceTeacherImg'])) {
                $content = preg_replace('/\[img=(.*?)\]/', '<img src="$1">', $content);
            } else {
                $content = preg_replace('/\[img=(.*?)\]/', '<img src="$1" title="点击看大图" onclick="talk_pic(\'' . $v['sourceTeacherImg'] . '\')">', $content);
            }
            echo @$content;
            ?>
        </p>
    </div>
    <div class="clear"></div>
</div>
    <?php } ?>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#teacher_chat_id").val('<?php echo empty($v["teacherChatId"]) ? 0 : $v["teacherChatId"]?>');
        });
    </script>
    <?php
    } elseif (isset($nextid) && $nextid > 0) {
        echo '<script type="text/javascript">';
        echo '$(document).ready(function () { $("#teacher_chat_id").val(' . $nextTeacherId . '); });';
        echo '</script>';
    }
    if (isset($firstTeacherId) && $firstTeacherId > 0) {
        echo '<script type="text/javascript">';
        echo '$(document).ready(function () { $("#teacher_first_chat_id").val(' . $firstTeacherId . '); });';
        echo '</script>';
    }
    ?>
