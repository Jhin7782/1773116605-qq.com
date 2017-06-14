//window.onload = function() {
	function addEleDivs(parent, loopCount) {
		var str = '';
		//在html调用js函数的时候，字符串一定要用引号引起，否则会被识别为'[object HTMLDivElement]'
		//在js中输出的时候，传参的引号会被忽略
		console.log(parent+"\",\""+loopCount);
		var mparent = "\""+parent+"\"";
		console.log(mparent);
		for(var i = 0; i < loopCount; i++) {
			//var r = parseInt(Math.random() * 100); //随机生成一个数字
			//str += '<div id=' + i + '>' + r + '</div>'; //拼接str
			str += '<div class="turn_hbs" id="nDiv' + i + '">' +
				'<div class="fl"><img src="Picture/hongbao.jpg" /></div>' +
				'<div class="fr zjmd"><span id="randomPassword' + i + '"></span><br /> <span>抽中</span><span id="award' + i + '"></span></div>' +
				'</div>'
		}
		//getElementById()方法里欲传的id不是要用""引起，而是因为id是string类型
		//换言之，js中接收到的parent就是string类型了，因此不需要在用""引起
		document.getElementById(parent).innerHTML = str;
	}

	function addEleDiv(obj, index) {
		var parent = document.getElementById(obj);
		var nDiv = document.createElement("div");
		nDiv.setAttribute("id", "nDiv" + index);
		//cover.style.width = document.documentElement.offsetWidth + "px";
		//cover.style.height = document.documentElement.offsetHeight + "px";
		nDiv.style.width = document.documentElement.clientWidth + "px";
		nDiv.style.height = document.documentElement.clientHeight + "px";
		div.innerHTML = "js 动态添加div";
		nDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
		nDiv.style.position = "fixed";
		nDiv.style.top = "0";

		parent.appendChild(nDiv);
	}
//}