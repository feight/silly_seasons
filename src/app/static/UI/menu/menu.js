

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
            var anchors = $("a.anchor");
            var body = $("html, body");
            var ul = menu.find("ul");
            var doc = $(document);
            var win = $(window);


            /* ----------------------------------------------------------- */
            /*
                    Scroll Event
            */
            /* ----------------------------------------------------------- */


            win.bind("scroll.banner", function(){

                var st = doc.scrollTop();

                // open class toggle

                menu.toggleClass("open", st > 150);

                // menu item selection

                var closest = null;
                var match = null;

                anchors.each(function(){

                    var abs = Math.abs($(this).offset().top - st);

                    if(closest === null || abs < closest){

                        closest = abs;
                        match = $(this);

                    }

                });

                links.find("a").removeClass("selected");

                links.find("a[href = '#" + match.attr("name")  + "']").addClass("selected");

            });


            /* ----------------------------------------------------------- */
            /*
                    Anchor Link Clicks
            */
            /* ----------------------------------------------------------- */


            menu.find("a").each(function(){

                var href = $(this).attr("href");

                if(
                    href.indexOf("#") === 0 ||
                    $(this).hasClass("logo")
                ){

                    $(this).click(function(e){

                        var id = href.replace(/#/g, "");
                        var top = 0;

                        if(!$(this).hasClass("logo")){
                            top = $("#anchor-" + id).offset().top;
                        }

                        console.log("WTF");

                        body.stop().animate({ scrollTop : top }, 500, "swing");

                        e.preventDefault();

                        e.stopPropagation();

                        return false;

                    });

                }

            });


            /* ----------------------------------------------------------- */
            /*
                    Menu Toggle
            */
            /* ----------------------------------------------------------- */


            menu.find("span.menu-toggle").click(function(){

                menu.toggleClass("toggled");

            });


        }

    };


})();
