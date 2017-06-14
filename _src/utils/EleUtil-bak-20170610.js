var EleUtil = {
	createEle: function createEle(parentObj, eleName, eleId, eleSrc) {
		console.log("onclick");
		var parentObj = document.getElementById(parentObj);
		var newEle = document.createElement(eleName);
		if(eleId) {
			newEle.id = eleId;
		}
		if (eleSrc) {
			newEle.src = eleSrc;
		}
		parentObj.appendChild(newEle);
		return newEle;
	}
}