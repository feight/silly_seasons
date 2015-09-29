

(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.UI.stages
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.UI.stages");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.UI.stages = {

        initialize : function(){

            App.UI.stages.cast.initialize();

            App.UI.stages.circus.initialize();

            App.UI.stages.girls.initialize();

            App.UI.stages.synopsis.initialize();

        }

    };


})();
