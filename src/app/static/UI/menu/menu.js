

(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.UI.menu
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.UI.menu");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.UI.menu = {

        initialize : function(){

            var menu = $("#menu");
            var links = menu.find("div.links");
            var ul = menu.find("ul");
            var doc = $(document);
            var win = $(window);

            win.bind("resize.menu", function(){

                links.css({
                    "text-align" : "right",
                    "padding-right" : Math.floor((doc.width() - ul.outerWidth()) / 2)
                });

                window.setTimeout(function(){

                    menu.addClass("loaded");

                }, 1);

            });

            win.bind("scroll.banner", function(){

                var toggle = doc.scrollTop() > 150;

                menu.toggleClass("open", toggle);

            });

        }

    };


})();
