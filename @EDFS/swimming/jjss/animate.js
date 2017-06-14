var ani = ani || {};

(function(obj, window) {
    function constructor(data, name, loader, cb) {
        if (!name) {
            name = data.name;
            if (!name) {
                throw new Error("name must be specified");
            }
        }
        var aniObj = function() {
            this.initialize();
        };
        if (data.preload && loader) {
            var il = [];
            for (var k in data.images) {
                il.push(loader.getResult(data.images[k]));
            }
            data.images = il;
        }

        aniObj._SpriteSheet = new createjs.SpriteSheet(data);
        var func_p = aniObj.prototype = new createjs.Sprite();
        func_p.Sprite_initialize = func_p.initialize;
        func_p.initialize = function() {
            this.Sprite_initialize(aniObj._SpriteSheet);
            //this.paused = false;
            if (data.offset) {
                this.x = data.offset.x;
                this.y = data.offset.y;
            }
            if (data.stop) {
                this.gotoAndPlay("timeline");
            }
            if (cb) {
                this.on("animationend", cb);
            }
        };
        obj[name] = aniObj;
    }

    window.genAni = constructor;
})(ani, window);



