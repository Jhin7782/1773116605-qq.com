/*
 * Summary: fontsize 1.0
 * Author: xcs
 * Date: 2016.02.26
 */

// 方案一：移动端字体自适应缩放
/**
 * (function(){})();
 * 这种方式叫函数的闭包(closure)，可以让匿名函数立即被执行（最后面的那对括号就是让上面定义的匿名函数立即执行的秘密），
 * 这种闭包有以下几个优势或特点：
	1. 减少了全局变量的个数，可以有效减少命名冲突
   	原因是包在里面的变量对于外面来说是不可见的，他们的作用域仅局限在匿名函数的函数体内
	2. 这种方式可以保存闭包外面的变量的状态
 * 
 * */

(function() {
	var html = document.documentElement,
		a = function() {
			var width = html.getBoundingClientRect().width;
			//任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 16px=1rem  1px=0.0625rem
			//1. em的值并不是固定的；
			//2. em会继承父级元素的字体大小。
			//如果文档宽度大于640px，就设字体大小为40px，否则设为width*0.0625 px
			//1rem = html的fontSize = 屏宽width * 0.0625 px
			//16rem = 1 width px
			html.style.fontSize = 0.0625 * (width >= 640 ? 640 : width) + "px"
		},
		c = null;
	window.addEventListener("resize", function() {
		clearTimeout(c);
		c = setTimeout(a, 100)
	});
	a()
})();
// PS: 1rem = 40px

if(/Android (\d+\.\d+)/.test(navigator.userAgent)) {
	var version = parseFloat(RegExp.$1);
	if(version > 2.3) {
		var phoneScale = parseInt(window.screen.width) / 640;
		if(/MZ-M571C/.test(navigator.userAgent)) {
			document.write('<meta name="viewport" content="width=640">');
		} else {
			document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
		}
	} else {
		document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}

/*
 *方案二：移动端视窗自动适配
 *    if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
 *        var version = parseFloat(RegExp.$1);
 *        if(version>2.3){
 *            var phoneScale = parseInt(window.screen.width)/640;
 *            if(/MZ-M571C/.test(navigator.userAgent)){
 *                document.write('<meta name="viewport" content="width=640">');
 *            }else{
 *                document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
 *            }
 *        }else{
 *            document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
 *        }
 *    }else{
 *        document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
 *    }
 */
