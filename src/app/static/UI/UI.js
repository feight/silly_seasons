

(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.UI
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.UI");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.UI = {

        initialize : function(){

            this.banner.initialize();

            this.menu.initialize();

            this.stages.initialize();

            $(".modal").on("hidden.bs.modal", function(){
                $(".modal-body").html("<iframe src='https://www.youtube.com/embed/z8z7zVeXBik' frameborder='0' allowfullscreen></iframe>");
            });


            window.setTimeout(function(){

                $(window).trigger("scroll").trigger("resize");

            }, 0);

        }

    };


    /* -------------------------------------------------------------------- */
    /*
            Bootstrap
    */
    /* -------------------------------------------------------------------- */


    $(document).ready(function(){

        App.UI.initialize();

    });


})();
