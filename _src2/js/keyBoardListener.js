var _btnSend = document.getElementById("btnSend");
var _localArea = document.getElementById("localArea");
var _targetArea = document.getElementById("targetArea");
var _console = document.getElementById("console");

function init() {
	_btnSend.addEventListener("click", sendMsg, false);
}

window.onload = function() {
	init();
	document.onkeydown = keyDown;
}

function sendMsg() {
	console.log("sendMsg");
	var localMsg = _localArea.value;
	console.log(localMsg);
	_console.innerHTML = localMsg;
	_targetArea.value = localMsg;
}

function appendBr() {
	var localMsg = _localArea.value;
	localMsg.append ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?
}

function keyDown(e) {
	var keyCode = e.which;
	var keyValue = String.fromCharCode(keyCode);
	//console.log("onkeyDown: " + keyCode + " , " + keyValue);

	if(keyCode == 13) {
		console.log("enter");
		appendBr();
	}

	if(e.shiftKey && e.keyCode == 13) {
		console.log("Shift+Enter");
		sendMsg();
	}

}