

(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.UI.banner
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.UI.banner");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.UI.banner = {

        initialize : function(){

            var wrap = $("#banner div.stretch-wrap");
            var stretch = $("#banner div.stretch");
            var image = $("#banner img");
            var doc = $(document);
            var win = $(window);

            image.load(function(){

                $(window).trigger("resize.banner");
                $(window).trigger("scroll.banner");

            });

            win.bind("resize.banner", function(){

                var widthWin = win.width();
                var width = Math.floor(widthWin + (widthWin * (10 / 100)));
                var offset = Math.floor((width - image.width()) / 2);

                stretch.css({
                    width : width
                });

                image.css("left", offset);

            });

            win.bind("scroll.banner", function(){

                var height = stretch.height();
                var scroll = doc.scrollTop();

                if(scroll < height){

                    var ratio = (height - scroll) / height;
                    var opacity = ratio;
                    var translate = ((height / 3) * ratio) - (height / 3);
                    var scale = 1 + (0.3 * (1 - ratio));
                    var transform = "translate3d(0, " + String(translate) + "px, 0) scale(" + String(scale) + ")";

                    stretch.css({
                        opacity : opacity,
                        "-webkit-transform" : transform,
                        "-moz-transform"    : transform,
                        "-ms-transform"     : transform,
                        "-o-transform"      : transform,
                        transform           : transform
                    });

                }

            });

        }

    };


})();
