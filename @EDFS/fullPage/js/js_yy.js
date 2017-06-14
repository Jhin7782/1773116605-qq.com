$(document).ready(function() { //$(function() {
	$('#fullpage').fullpage({
		//基础样式
		sectionsColor: ['slateblue', 'palevioletred', 'sandybrown', 'seagreen', 'rosybrown'],
		controlArrows: false,
		verticalCentered: false,
		//resize: true,
		scrollingSpeed: 700,
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
		lockAnchors: false,
		easing: 'easeInOutCubic',
		css3: true,
		//循环
		//continuousVertical: true, 
		loopTop: false,
		loopBottom: false,
		loopHorizontal: true,
		//滚动条
		autoScrolling: true,
		scrollBar: false,
		scrollOverflow: false,
		//间距与固定元素
		paddingTop: 0,
		paddingBottom: 0,
		fixedElements: '#header',
		//键盘控制与灵敏度
		keyboardScrolling: true,
		touchSensitivity: 5,
		//锚点动画与历史纪录
		animateAnchor: true,
		recordHistory: true,
		//菜单项
		menu: '#fullpageMenu',
		//导航
		navigation: false,
		navigationPosition: 'right',
		//navigationTooltips: ['page1', 'page2', 'page3', 'page4', 'page5'],
		showActiveTooltip: false,
		slidesNavigation: false,
		slidesNavPosition: 'top',
		//选择器
		sectionSelector: '.section',
		slideSelector: '.slide',
		/*回调函数*/
		afterLoad: function(anchorLink, index) {
			//console.log("afterLoad: anchorLink="+anchorLink+"; index="+index);
			switch (index) {
				case 1:
					move('.section1 #logo').scale(1.2).end();
					break;
				case 2:
					move('.section2 #p2_btn').set('margin-top', '-5.2rem').end();
					move('.section2 #p2_joinus').set('margin-top', '-5.2rem').end();
					break;
				case 3:
					move('.section3 #p3_btn').set('margin-top', '-6.2rem').end();
					move('.section3 #p3_joinus').set('margin-top', '-6.2rem').end();
					break;
				case 4:
					move('.section4 #p4_title1').scale(0.8).duration('1s').end();
					move('.section4 #p4_title1').set('opacity', '1').duration('1s').end();
					move('.section4 #p4_title2').scale(0.8).duration('1s').end();
					move('.section4 #p4_title2').set('opacity', '1').duration('1s').end(function() {
						move('.section4 #p4_content1').set('margin-left', '15.2875rem').end();
						move('.section4 #p4_content2').set('margin-right', '15.2875rem').end(function() {
							move('.section4 #p4_btn').set('margin-top', '-6rem').end();
							move('.section4 #p4_span').set('margin-top', '-6rem').end();
						});
					});
					break;
				case 5:
					move('.section5 #p5_span2').set('opacity', '1').scale(1.1).duration('2s').end();
					break;
				default:
					break;
			}
		},
		onLeave: function(index, nextIndex, direction) {
			//console.log("onLeave: index="+index+"; nextIndex="+nextIndex+"; direction="+direction);
			switch (index) {
				case 1:
					move('.section1 #logo').scale(1).end();
					break;
				case 2:
					move('.section2 #p2_btn').set('margin-top', '4.2rem').end();
					move('.section2 #p2_joinus').set('margin-top', '4.2rem').end();
					break;
				case 3:
					move('.section3 #p3_btn').set('margin-top', '4.2rem').end();
					move('.section3 #p3_joinus').set('margin-top', '4.2rem').end();
					break;
				case 4:
					move('.section4 #p4_title1').scale(0.8).end();
					move('.section4 #p4_title1').set('opacity', '0').end();
					move('.section4 #p4_title2').scale(0.8).end();
					move('.section4 #p4_title2').set('opacity', '0').end(function() {
						move('.section4 #p4_content1').set('margin-left', '-15.2875rem').end();
						move('.section4 #p4_content2').set('margin-right', '-15.2875rem').end(function() {
							move('.section4 #p4_btn').set('margin-top', '6rem').end();
							move('.section4 #p4_span').set('margin-top', '6rem').end();
						});
					});
					break;
				case 5:
					move('.section5 #p5_span2').set('opacity', '0').scale(1).duration('2s').end();
					break;
				default:
					break;
			}
		},
		afterRender: function() {
			//console.log("afterRender");
		},
		afterResize: function() {
				console.log("afterResize");
			}
			//afterSlideLoad(anchorLink, index, slideAnchor, slideIndex)
			//onSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex)
	});
	//$.fn.fullpage.moveSectionUp();
	//$.fn.fullpage.moveSectionDown();
	//$.fn.fullpage.moveSectionDown();
	//$.fn.fullpage.moveTo(4);
	//$.fn.fullpage.slientMoveTo(3);
	//$.fn.fullpage.moveSlideRight();
	//$.fn.fullpage.moveSlideLeft();
	//$.fn.fullpage.setAutoScrolling(boolean);
	//$.fn.fullpage.setLockAnchors(boolean);
	//$.fn.fullpage.setRecordHistory(boolean);
	//$.fn.fullpage.setScrollingSpeed(milliseconds);
	//$.fn.fullpage.setAllowScrolling(true, 'up', 'down');
	//$.fn.fullpage.destroy('all');
	//$.fn.fullpage.reBuild();
	/*
	 * Lazy Loading(延迟加载)
	 * <img data-src="image.png">
	 * <video>
	 * 		<source data-src="video.webm" type="video/webm" />
	 * 		<source data-src="video.mp4" type="video/mp4" />
	 * </video>
	 * */
});