

(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.UI.stages.girls
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.UI.stages.girls");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.UI.stages.girls = {

        initialize : function(){

            $(".girls-snowflake").hover(
                function(){
                    $(this).find(".char-wrap").addClass("hover", 1000);
                }, function(){
                    $(this).find(".char-wrap").removeClass("hover", 1000);
                }
            );

        }

    };


})();
