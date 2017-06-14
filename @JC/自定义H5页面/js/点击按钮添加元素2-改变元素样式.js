var dragTarget1 = document.getElementById("dragTarget1");
var dragTarget2 = document.getElementById("dragTarget2");
var addImg = document.getElementById("addImg");
var addBtn = document.getElementById("addBtn");
var btn_radius = document.getElementById("btn_radius");
var dragEle_img = null;
var dragEle_btn = null;
var idCount_img = 0,
	idCount_btn = 0;

//添加图片
EventUtil.addHandler(addImg, "click", function() {
	var id_img = "img" + ++idCount_img;
	EleUtil.createEle("dragTarget1", "img", id_img, "img/yasuo.jpg");
	dragEle_img = document.getElementById(id_img);
	dragEle_img.draggable = true;
	EventUtil.addHandler(dragEle_img, "dragstart", function(e) {
		e.dataTransfer.setData("text", EventUtil.getTarget(e).id);
	});
});

//添加按钮
EventUtil.addHandler(addBtn, "click", function() {
	idCount_btn++;
	var newEle = EleUtil.createEle("btnGroup", "a", "btn"+idCount_btn);
	dragEle_btn = document.getElementById("btn"+idCount_btn);
	newEle.className = "btn";
	newEle.innerText = "超链接";
	newEle.draggable = true;
	EventUtil.addHandler(newEle, "dragstart", function(e) {
		e.dataTransfer.setData("text", EventUtil.getTarget(e).id);
	});
});

//圆角按钮
EventUtil.addHandler(btn_radius, "click", function() {
	var btn_NL = document.querySelectorAll(".btn");
	for (var i = 0; i < btn_NL.length; i++) {
		btn_NL[i].style.borderRadius = "8px";
	}
	
});

//dragover阻止默认事件
EventUtil.addHandler(dragTarget1, "dragover", function(e) {
	EventUtil.preventDefault(e);
});
EventUtil.addHandler(dragTarget2, "dragover", function(e) {
	EventUtil.preventDefault(e);
});
//drop阻止默认事件并appendChild
EventUtil.addHandler(dragTarget1, "drop", function(e) {
	EventUtil.preventDefault(e);
	EventUtil.getTarget(e).appendChild(document.getElementById(e.dataTransfer.getData("text")));
});
EventUtil.addHandler(dragTarget2, "drop", function(e) {
	EventUtil.preventDefault(e);
	EventUtil.getTarget(e).appendChild(document.getElementById(e.dataTransfer.getData("text")));
});