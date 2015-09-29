

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
