
<form name="teacher_chat_form" id="teacher_chat_form" action="javascript:;" onsubmit="return false;">
    <INPUT TYPE="hidden" NAME="roomId" id="roomId" value="<?php echo $roomInfo['id'] ?>">
    <INPUT TYPE="hidden" NAME="lastTeacherChatId" id="lastTeacherChatId" value="<?php echo (empty($lastTeacherChatId)) ? 0 : $lastTeacherChatId; ?>">
    <INPUT TYPE="hidden" NAME="chatTeacherName" id="chatTeacherName" value="<?php echo $u['name'] ?>">
    <INPUT TYPE="hidden" id="nextTeacherChat" value="0">
    <INPUT TYPE="hidden" NAME="chatTeacherId" id="chatTeacherId" value="<?php echo $u['userid'] ?>">
    <INPUT TYPE="hidden" NAME="teacherLevel" id="teacherLevel" value="<?php echo $u['level'] ?>">
    <INPUT TYPE="hidden" NAME="imgTeacherThumb" id="imgTeacherThumb" value="">
    <INPUT TYPE="hidden" NAME="sourceTeacherImg" id="sourceTeacherImg" value="">
    <input type="hidden" name="wordTeacherCount" id="wordTeacherCount" />
    <textarea type="text"  name="chatTeacherContent" id="sendTeacherMsgInput" ></textarea>
</form>



<script type="text/javascript">


    function sendTeacherMsg() {

        var _s = removeHTMLTag($("#sendTeacherMsgInput").val());

        if ((_s.length == 0))
        {
            $("#sendTeacherMsgInput").val('');
            alert('内容不能为空');
            return false;
        }
        $("#sendTeacherMsgInput").val(_s);
        postdata('teacher_chat_form', "/index.php/chat/setTeacherContent", "retChatTeacher");
        return false;

    }

    function retChatTeacher(d){

        if(d.code == '1'){
            $("#sendTeacherMsgInput").val("");
            $("#imgTeacherThumb").val("");
            $("#sourceTeacherImg").val("");
        }
        layer.msg(d.msg);
    }

</script>





