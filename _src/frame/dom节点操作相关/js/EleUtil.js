var EleUtil = {
	createEle: function createEle(parentNode_className, ele_name, ele_className, ele_id, arr, ele_src, insert_position) {
		var parentNode_NL = document.getElementsByClassName(parentNode_className);
		var newEle_NL = document.getElementsByClassName(ele_className);
		console.log(newEle_NL.length);
		for(var i = 0; i < parentNode_NL.length; i++) {
			var newEle = document.createElement(ele_name);
			if(ele_className) { //(undefined || "") == false
				newEle.className = ele_className;
			}
			if(ele_id) {
				newEle["id"] = parentNode_className + "_" + ele_className + "_" + ele_name + newEle_NL.length;
			}
			if(arr && arr.length != 0 && arr.length > newEle_NL.length) {
				var textNode = document.createTextNode(arr[newEle_NL.length]);
				newEle.appendChild(textNode);
			}
			if(ele_src) {
				newEle.src = ele_src;
			}
			if (insert_position || typeof insert_position == "undefined") {
				parentNode_NL[i].appendChild(newEle);
			} else{
				parentNode_NL[i].insertBefore(newEle, parentNode_NL[i].childNodes[0]);
			}
			return newEle;
		}
	}
}