var timeout, cover, result, error;

window.onload = function() {
	init();
}

function init () {
	cover = document.getElementById("cover");
	result = document.getElementById("result");
	error = document.getElementById("error");
}

function copyArticle(rangeNode) {
	console.log(rangeNode + "  copy command start!");
	// 创建选区对象并设置选区对象节点属性
	const range = document.createRange();
	range.selectNode(document.getElementById(rangeNode));

	// 获取选区对象
	const selection = window.getSelection();

	// 判断选区数量 ? 0 : 1
	if(selection.rangeCount > 0) {
		// 移除选区
		selection.removeAllRanges();
	}

	// 增加选区
	selection.addRange(range);
	// 断点-选区完成

	// 文档对象模型执行"copy"命令
	try {
		if(document.execCommand('copy', false, null)) {
			console.log("execute command succeed!");
			showResult();
			console.log("execute command succeed finished!");
		} else {
			console.log("execute command failed!");
			error.innerHTML = "你的浏览器暂不支持点击复制功能\n请长按微信号复制添加好友";
			showResult();
		}
	} catch(err) {
		console.log("execute command exception!");
		error.innerHTML = "你的浏览器暂不支持点击复制功能\n请长按微信号复制添加好友";
		showResult();
	}
}

function showResult() {
	cover.style.display = "block";
	result.style.display = "block";
	timeout = setTimeout(function() {
		closeResult();
	}, 5000)
	clearTimeout(this);
}

function closeResult() {
	cover.style.display = "none";
	result.style.display = "none";
	clearTimeout(timeout);
}