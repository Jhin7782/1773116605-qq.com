var wW = $(window).width(),
    wH = $(window).height(),
    $arrow = $('.arrow');
var queue_content = [],
    ani_list = [],
    queue_data = [],
    initialled = false,
    loadingNext = false,
    $num1 = $('.num-1'),
    $num2 = $('.num-2');
var aniEnd = false,arrowEnd = false,fbiSound = false;
var bgm = $('#bgm').get(0);
var $music = $('.music img');
var realName,mobile,realName1,mobile1;
var myscroll,iscroll = false;
var shareImgH;
var gifOld = 1;
var listGoto = false;
var testBusy = false;

$(function() {
    $(document).on('touchmove', function(event) {
        event.preventDefault();
    });
    stslide.init();
});

var manifest = [
    // {'src':"//staticssl.gotokeep.com/encore/images/page1/home.json"},
    {'src':"//staticssl.gotokeep.com/encore/images/canvas/1/tun.json"},
    {'src':"//staticssl.gotokeep.com/encore/images/canvas/1/fbi1.json"},
    {'src':"//staticssl.gotokeep.com/encore/images/canvas/2/liuhan.json"}
];

function loadEvent(obj) {
    queue = new createjs.LoadQueue();
    queue.on("complete", obj.complete, this);
    queue.on("fileload", obj.handleFile, this);
    queue.on("progress", obj.progress, this);
    queue.loadManifest(obj.queue);
}
loadEvent({
    queue: manifest,
    progress: function(e) {
        if (!initialled) {
            var n = parseInt(e.loaded * 99);
            n = n < 10 ? '0' + String(n) : n;
            formatNum(n);
        }
    },
    handleFile: function(e) {
        if (e.item.ext == "json") {
            var mi = [];
            var ids = [];
            for (var i in e.result.images) {
                var id = "ss_" + e.result.images[i].replace(/[\/\.\-]/g, "");
                mi.push({
                    src: e.result.images[i],
                    id: id
                });
                ids.push(id);
            }
            e.result.preload = true;
            e.result.images = ids;
            queue.loadManifest(mi);
            ani_list.push(e.result);
        }
    },
    complete: function() {
        if (initialled) {
            var qi = ani_list.shift();
            while (qi) {
                if (qi.name) {
                    console.info('loaded:', qi.name);
                    genAni(qi, null, queue);
                }
                qi = ani_list.shift();
            }
            //二次加载开始
            if (!loadingNext) {
                $('#loading').fadeOut(function() {
                    $(this).remove();
                    init();
                });
                var manifest = [
                    "//staticssl.gotokeep.com/encore/images/canvas/2/fbi2.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/3/xiongji.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/3/fbi3.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/4/tui.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/4/fbi4.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/5/xiong.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/5/fbi5.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/6/yizima.json",
                    "//staticssl.gotokeep.com/encore/images/canvas/6/fbi6.json",
                    "//staticssl.gotokeep.com/encore/images/share.json"
                ];
                queue.loadManifest(manifest);
                loadingNext = true;
            } else {
                //二次加载完毕
                canvasJsonLoad();
                loadAni = true;
            }
        } else {
            initialled = true;
            queue_data.push('//staticssl.gotokeep.com/encore/media/bgm.mp3');
            queue.loadManifest(queue_data);
        }
    }
});

function formatNum(n) {
    var num = String(n).split('');
    $('#loading').show();
    $num1.attr('src', '//staticssl.gotokeep.com/encore/images/loading/' + num[0] + '.png');
    $num2.attr('src', '//staticssl.gotokeep.com/encore/images/loading/' + num[1] + '.png');
}

function init(){
    $('body').one('touchstart',function(){
        bgm.play();
    });
    musicPlayPaue('play');
    pageInit();
    wshow(0);
    $music.on('touchstart', function(event) {
        if (createjs.Sound.muted == true) {
            musicPlayPaue('play');
        } else {
            musicPlayPaue('pause');
        }
    });

    $('.testdrive .btn-back').on('touchstart',function(){
        createjs.Sound.play("btn");
        createjs.Sound.stop();
        stslide.goTOpage(1);
    });

    $('.testdrive-pop .btn-back').on('touchstart',function(){
        createjs.Sound.play("btn");
        stslide.goTOpage(1);
        $('.testdrive-pop').delay(800).fadeOut(function(){
            $('.head .btn-share .ani').removeAttr('style');
            createjs.Sound.stop();
        });
    });

    $('.testdrive-pop .btn-linkPg').on('touchstart',function(){
        createjs.Sound.play("btn");
        var idx = stslide.flag;
        ga && ga('send', 'event', 'event_encore', 'click', 'gokeep_page_' + idx);
        switch(idx){
            case 2:
                window.location.href = 'http://show.gotokeep.com/workouts/565bdd6f9c8ade2885c9b976';
                break;
            case 3:
                window.location.href = 'http://show.gotokeep.com/workouts/54afa35c35fb7f5912e3c6de';
                break;
            case 4:
                window.location.href = 'http://show.gotokeep.com/workouts/565bfb0f2f5f272b8a7880eb';
                break;
            case 5:
                window.location.href = 'http://show.gotokeep.com/workouts/563b33a9bab30bf333565dc5';
                break;
            case 6:
                window.location.href = 'http://show.gotokeep.com/plans/54afac01e06249cb13904c17';
                break;
            case 7:
                window.location.href = 'http://show.gotokeep.com/workouts/56de7a0e805806eb12087419';
                break;
        }
    });

    $('.li-mod').on('click',function(){
        if(!listGoto){
            var idx = $(this).index();
            var gotoPg = $(this).data('page');
            aniEnd = false;
            arrowEnd = false;
            fbiSound = false;
            $('.canvas .pageTx').removeClass('fadeIn fadeIn2 active');
            $('.canvas .btn-try').removeClass('fadeIn fadeIn2');
            $('.li-mod .gif').removeClass('active');
            $(this).children('.gif').addClass('active');
            if($(this).children('.gif').hasClass('active')){
                $(this).children('.gif').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/group/'+idx+'.gif');
            }
            $('.li-mod').eq(gifOld).children('.gif').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/group/'+gifOld+'a.gif');
            setTimeout(function(){
                $('.group').removeClass('fadeIn');
                stslide.goTOpage(gotoPg);
            },2000);
            gifOld = idx;
            listGoto = true;
        }
    });

    $('.btn-link').on('touchstart',function(){
        createjs.Sound.play("btn");
        setTimeout(function(){
            window.location.href = 'http://m.buick.com.cn/v3/car_encore.html';
        },500)
    });

    $('.btn-share').on('touchstart',function(){
        createjs.Sound.play("share");
        $('.share-pop').fadeIn();
    });
    $('.share-pop').on('touchstart',function(){
        $(this).fadeOut();
    });
    $('.btn-try').on('touchstart',function(){
        createjs.Sound.play("yizima");
        var flag = stslide.flag;
        fbiSound = true;
        tryStage.removeAllChildren();
        $('.testdrive-pop .tx-con').find('div').removeClass('fadeIn');
        $('.testdrive-pop form').removeClass('fadeIn');
        $('.testdrive-pop').fadeIn(function(){
            $('.head .btn-share').addClass('fadeIn');
            shareImgH = $('.head .btn-share .ani').find('img').height();
            $('.head .btn-share .ani').animate({'height': shareImgH/2},500).delay(800).animate({'height': shareImgH},500);
        });
        ga && ga('send', 'event', 'event_encore', 'click', 'click_page_' + flag);
        switch(flag){
            case 2:
                tryStage.addChild(fbi1Ani);
                fbi1Ani.gotoAndPlay('start');
                fbi1Ani.on("change",function(){
                    if(fbiSound && this.currentFrame==7){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi1");
                    }
                });
                break;
            case 3:
                $('.testdrive-pop .tx-con .tx1').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/canvas/2/tx2.png');
                $('.testdrive-pop .tx-con .tx1').find('img').eq(1).attr('src','//staticssl.gotokeep.com/encore/images/canvas/2/tx2-1.png');
                tryStage.addChild(fbi2Ani);
                fbi2Ani.gotoAndPlay('start');
                break;
            case 4:
                $('.testdrive-pop .tx-con .tx1').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/canvas/3/tx2.png');
                $('.testdrive-pop .tx-con .tx1').find('img').eq(1).attr('src','//staticssl.gotokeep.com/encore/images/canvas/3/tx2-1.png');
                tryStage.addChild(fbi3Ani);
                fbi3Ani.gotoAndPlay('start');
                fbi3Ani.on("change",function(){
                    if(fbiSound && this.currentFrame==7){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi3");
                    }
                });
                break;
            case 5:
                $('.testdrive-pop .tx-con .tx1').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/canvas/4/tx2.png');
                $('.testdrive-pop .tx-con .tx1').find('img').eq(1).attr('src','//staticssl.gotokeep.com/encore/images/canvas/4/tx2-1.png');
                tryStage.addChild(fbi4Ani);
                fbi4Ani.gotoAndPlay('start');
                fbi4Ani.on("change",function(){
                    if(fbiSound && this.currentFrame==7){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi4");
                    }
                });
                break;
            case 6:
                $('.testdrive-pop .tx-con .tx1').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/canvas/5/tx2.png');
                $('.testdrive-pop .tx-con .tx1').find('img').eq(1).attr('src','//staticssl.gotokeep.com/encore/images/canvas/5/tx2-1.png');
                tryStage.addChild(fbi5Ani);
                fbi5Ani.gotoAndPlay('start');
                fbi5Ani.on("change",function(){
                    if(fbiSound && this.currentFrame==5){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi5");
                    }
                });
                break;
            case 7:
                $('.testdrive-pop .tx-con .tx1').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/canvas/6/tx2.png');
                $('.testdrive-pop .tx-con .tx1').find('img').eq(1).attr('src','//staticssl.gotokeep.com/encore/images/canvas/6/tx2-1.png');
                tryStage.addChild(fbi6Ani);
                fbi6Ani.gotoAndPlay('start');
                fbi6Ani.on("change",function(){
                    if(fbiSound && this.currentFrame==12){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi6-1");
                    }else if(fbiSound && this.currentFrame==61){
                        createjs.Sound.stop();
                        createjs.Sound.play("fbi6");
                    }
                });
                break;
        }
        $('.testdrive-pop .tx-con .tx1,.testdrive-pop .tx-con .tx2').addClass('fadeIn');
    });
}
//滑动事件
var stslide = {};
stslide.slidebox = $('#slidePage');
stslide.section = stslide.slidebox.find('.container');
stslide.isDone = false;
stslide.flag = 0;
stslide.max = 9;
stslide.bindEvent = function() {
    var _this = this;
    var hammer = new Hammer($('#slidePage').get(0));
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_VERTICAL,
        threshold: 5,
        velocity: 0
    });
    hammer.on('swipe', function(ev) {
        _this.getDirection(ev.direction);
    });
};
stslide.init = function() {
    var boxHeight = this.max <= 10 ? 1 : 2;
    this.slidebox.height(boxHeight * 1000 + '%');
    this.sliderY = 10 / boxHeight;
    this.section.height(this.sliderY + '%');
    this.bindEvent();
};
stslide.getDirection = function(e) {
    var type = e;
    if (type == 8 && this.isDone && this.flag < stslide.max) {
        this.slideEvent(type);
    }
};
stslide.slideEvent = function(type) {
    var e = {}
    stslide.isDone = false;
    if (type == 8) {
        this.flag++;
    }
    e.curIndex = this.flag;
    if (this.flag < 9) {
        this.moveEvent(e);
    }
};
stslide.moveEvent = function(e, sp) {
    var _this = this;
    var speed = 600;
    var flag = this.flag;
    var num = flag-3;
    this.isDone = false;
    if(this.flag < 2){
        y = -100 + '%';
    }else{
        y = -200 + '%';
    }
    arrow('hide');
    if(this.flag <= 1){
        this.slidebox.animate({
            top: y
        }, speed, function() {
            $('.group').addClass('fadeIn');
            if (_this.slideCallback) _this.slideCallback(e);
        });
    }else{
        $('.canvas .btn-try.fadeIn').addClass('fadeIn2');
        $('.canvas .pageTx').eq(num).addClass('fadeIn2');
        createjs.Tween.get(pageTween).to({y:-790}, 500,createjs.Ease.quartOut).call(function(){
            if (_this.slideCallback) _this.slideCallback(e);
        });
    }
};
stslide.slideCallback = function(e) {
    if (e.curIndex < stslide.max) {
        wshow(e.curIndex);
    }
};
stslide.goTOpage = function(n, sp) {
    var speed = this.pageSpeed,
        e = {};
    e.oldIndex = this.flag;
    this.pageSpeed = sp || this.pageSpeed;
    this.flag = n;
    e.curIndex = this.flag;
    this.moveEvent(e);
    this.pageSpeed = speed;
};
function wshow(i){
    pageTween.y = 0;
    $('.testdrive').removeClass('fadeIn');
    pageTween.removeAllChildren();
    tryStage.removeAllChildren();
    createjs.Sound.stop();
    ga && ga('send', 'event', 'event_encore', 'click', 'in_page_' + i);
    switch(i){
        case 0:
            // pageTween.addChild(homeAni);
   //          stagePage.addChild(pageTween);
   //          homeAni.gotoAndPlay('start');
   //          homeAni.on("change",function(){
   //              if(!aniEnd && this.currentFrame==11){
   //                  createjs.Sound.play("tx");
   //              }
   //              if(!aniEnd && this.currentFrame>34){
   //                  createjs.Sound.play("icon");
   //                  aniEnd = true;
   //              }
   //              if(this.currentFrame>=36){
   //                  arrow('show');
   //              }
   //          });
            $('.page1').addClass('fadeIn');
            $('.page1 .box2').on('webkitTransitionEnd',function(){
                setTimeout(function(){
                    createjs.Sound.play("tx");
                },500)
            });
            break;
        case 1:
            group();
            break;
        case 2:
            pageTween.addChild(page1Ani);
            stagePage.addChild(pageTween);
            page1Ani.gotoAndPlay('start');
            page1Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("lalian");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
        case 3:
            pageTween.addChild(page2Ani);
            stagePage.addChild(pageTween);
            page2Ani.gotoAndPlay('start');
            page2Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("tuoyi");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
        case 4:
            pageTween.addChild(page3Ani);
            stagePage.addChild(pageTween);
            page3Ani.gotoAndPlay('start');
            page3Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("xiongji");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
        case 5:
            pageTween.addChild(page4Ani);
            stagePage.addChild(pageTween);
            page4Ani.gotoAndPlay('start');
            page4Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("qiaotui");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
        case 6:
            pageTween.addChild(page5Ani);
            stagePage.addChild(pageTween);
            page5Ani.gotoAndPlay('start');
            page5Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("xiong");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
        case 7:
            pageTween.addChild(page6Ani);
            stagePage.addChild(pageTween);
            page6Ani.gotoAndPlay('start');
            page6Ani.on("change",function(){
                if(!fbiSound && this.currentFrame==8){
                    createjs.Sound.play("yizima");
                }
                if(!aniEnd && this.currentFrame>=15){
                    $('.canvas .btn-try').addClass('fadeIn');
                    aniEnd = true;
                }
            });
            break;
         case 8:
            $('.testdrive').addClass('fadeIn');
            break;
    }
    if(i>1){
        $('.canvas .pageTx').eq(i-2).addClass('active fadeIn').siblings().removeClass('active');
    }
}

$('.canvas .btn-try').on('webkitTransitionEnd',function(){
    if(!arrowEnd){
        arrow('show');
        arrowEnd = true;
    }else if($('.canvas .btn-try').hasClass('fadeIn2')){
        $('.canvas .btn-try').removeClass('fadeIn fadeIn2');
        aniEnd = false;
        arrowEnd = false;
    };
});
$('.testdrive-pop .tx-con .tx2').on('webkitTransitionEnd',function(){
    $('.testdrive-pop form').addClass('fadeIn');
});
$('.page1 .icon').on('webkitTransitionEnd',function(){
    createjs.Sound.play("icon");
    arrow('show');
});

function arrow(e){
    if(e == 'show'){
        $arrow.fadeIn(function(){
            stslide.isDone = true;
        });
    }else if(e == 'hide'){
        $arrow.fadeOut();
    }
};

//Canvas初始化
var stagePage,tryStage,shareStage;
stagePage = new createjs.Stage('canvas');
tryStage = new createjs.Stage('canvasTry');
shareStage = new createjs.Stage('canvasShare');
//首页
var homeAni;
//翘臀,试驾动画
var pageTween,page1Ani,fbi1Ani;
//腹肌,试驾动画
var page2,page2Ani,fbi2Ani;
//胸肌,试驾动画
var page3,page3Ani,fbi3Ani;
//翘腿,试驾动画
var page4,page4Ani,fbi4Ani;
//胸,试驾动画
var page5,page5Ani,fbi5Ani;
//一字马,试驾动画
var page6,page6Ani,fbi6Ani;
//分享序列针
var shareAni;

pageTween = new createjs.Container();

function pageInit(){
    createjs.Ticker.framerate = 12;
    createjs.Ticker.addEventListener("tick", handleTick);

    // homeAni = new ani.home();
    // homeAni.x = 9;

    page1Ani = new ani.tun();
    page1Ani.x = 24;
    
    fbi1Ani = new ani.fbi1();
    fbi1Ani.x = 24;
    fbi1Ani.y = 277;

    page2Ani = new ani.liuhan();
    page2Ani.x = 24;
}
function canvasJsonLoad(){

    fbi2Ani = new ani.fbi2();
    fbi2Ani.x = 24;
    fbi2Ani.y = 277;

    page3Ani = new ani.xiongji();
    page3Ani.x = 24;
    fbi3Ani = new ani.fbi3();
    fbi3Ani.x = 24;
    fbi3Ani.y = 277;

    page4Ani = new ani.tui();
    page4Ani.x = 24;
    fbi4Ani = new ani.fbi4();
    fbi4Ani.x = 24;
    fbi4Ani.y = 277;

    page5Ani = new ani.xiong();
    page5Ani.x = 24;
    fbi5Ani = new ani.fbi5();
    fbi5Ani.x = 24;
    fbi5Ani.y = 277;

    page6Ani = new ani.yizima();
    page6Ani.x = 24;
    fbi6Ani = new ani.fbi6();
    fbi6Ani.x = 24;
    fbi6Ani.y = 277;

    shareAni = new ani.share();
    shareAni.x = 512;
    shareAni.gotoAndPlay('start');
    shareStage.addChild(shareAni);
}
//Canvas监测
function handleTick(e) {
    stagePage.update(e);
    tryStage.update(e);
    shareStage.update(e);
}

//聚合页列表动画
function group() {
    listGoto = false;
    var idx = $('.li-mod').length;
    var imgH = $('.li-mod img').height();
    $('.li-mod').css({'margin-top':wH});
    if(iscroll){
        myscroll.scrollTo(0, 0, 0, IScroll.utils.ease.elastic);
    }
    for (var i = 0; i < idx; i++) {
        var cb;
        if (i == 7) {
            cb = function() {
                if(!iscroll){
                    myscroll = new IScroll('#scroll', {
                        scrollbars: true,
                        scrollbars: 'custom',
                        bounce:false,
                        preventDefault: false
                    });
                    $('.group .li-1').children('.gif').addClass('active');
                    $('.group .li-1').children('.gif').find('img').eq(0).attr('src','//staticssl.gotokeep.com/encore/images/group/1.gif');
                    iscroll = true;
                }

            };
        }
        $('.li-mod').delay(150).eq(i).animate({
            marginTop: 0
        }, 500, cb);
    }
}

function musicPlayPaue(v) {
    if (v == 'play') {
        createjs.Sound.muted = false;
        bgm.play();
        $music.attr('src', '//staticssl.gotokeep.com/encore/images/music-on.gif');
    } else if (v == 'pause') {
        createjs.Sound.muted = true
        bgm.pause();
        $music.attr('src', '//staticssl.gotokeep.com/encore/images/music-off.gif');
    }
}

window.playCreatejsSound=function(id){
    if(!VER_AND&&!offMusic) createjs.Sound.play(id);
}
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/tx.mp3", "tx",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/icon.mp3", "icon",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/lalian.mp3", "lalian",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/tuoyi.mp3", "tuoyi",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/xiongji.mp3", "xiongji",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/qiaotui.mp3", "qiaotui",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/xiong.mp3", "xiong",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/yizima.mp3", "yizima",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fanban.mp3", "fanban");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/btn.mp3", "btn",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi1.mp3", "fbi1");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi3.mp3", "fbi3");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi4.mp3", "fbi4");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi5.mp3", "fbi5");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi6.mp3", "fbi6");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/fbi6-1.mp3", "fbi6-1");
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/share.mp3", "share",1);
createjs.Sound.registerSound("//staticssl.gotokeep.com/encore/media/btn3.mp3", "btn3",1);


//预约试驾-1
$('#submit').on('submit', function(e) {
    createjs.Sound.play("btn");
    e.preventDefault();
    realName = $("#realname").val();
    mobile = $("#mobile").val();
    if (realName == "") {
        alert("请输入您的真实姓名");
        $('#realname').focus();
        return;
    }
    if (!hylink.checkMobile(mobile)) {
        alert("手机格式不正确");
        $('#mobile').focus();
        return;
    }
    if (testBusy) return;
    testBusy = true;
    $.post('http://m.buick.com.cn/act/encore/keep/ajaxget.aspx', {
        type : 'postinfo',
        realName : realName,
        mobile : mobile,
        trycar : '昂科拉'
    }, function(obj) {
        testBusy = false;
        if(obj.status=="suc"){//status的值有"suc", "fal", "err"三种
            $("#realname").val('');
            $("#mobile").val('');
            alert("申请试驾成功");//**NOTE: 当提交成功后，不需要再tracking秒针leadId，这方法已整合在JS里。
        }else{
            alert("申请试驾失败, 原因: "+obj.msg);
        }
        return false;
    },'json');
});


//预约试驾-2
$('#submit1').on('submit', function(e) {
    createjs.Sound.play("btn");
    var idx = stslide.flag;
    e.preventDefault();
    realName1 = $("#realname1").val();
    mobile1 = $("#mobile1").val();
    if (realName1 == "") {
        alert("请输入您的真实姓名");
        $('#realname1').focus();
        return;
    }
    if (!hylink.checkMobile(mobile1)) {
        alert("手机格式不正确");
        $('#mobile1').focus();
        return;
    }
    if (testBusy) return;
    testBusy = true;
    $.post('http://m.buick.com.cn/act/encore/keep/ajaxget.aspx', {
        type : 'postinfo',
        realName : realName1,
        mobile : mobile1,
        trycar : '昂科拉'
    }, function(obj) {
        testBusy = false;
        if(obj.status=="suc"){//status的值有"suc", "fal", "err"三种
            $("#realname1").val('');
            $("#mobile1").val('');
            alert("申请试驾成功");//**NOTE: 当提交成功后，不需要再tracking秒针leadId，这方法已整合在JS里。
        }else{
            alert("申请试驾失败, 原因: "+obj.msg);
        }
        return false;
    },'json');
});