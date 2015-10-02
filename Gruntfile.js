

module.exports = function(grunt){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            Requirements
    */
    /* -------------------------------------------------------------------- */


    var horde = require("horde");


    /* -------------------------------------------------------------------- */
    /*
            Configuration
    */
    /* -------------------------------------------------------------------- */


    var statics = [
        "src/app/{static,pages}",
        "! src/app/{static,pages}/**/{lib,resized}"
    ];

    var port = 1150;

    var paths = {
        gae : "src",
        bower : "lib/bower",
        build : "src/app/build",
        logo : "Grunt.png",
        cwd : "src/app",
        bundles : "bundles",
        templates : [
            "src/app/{pages,extensions}"
        ],
        clean : [
            "src/**/*.pyc",
            "src/app/build",
            "src/app/bundles"
        ]
    };

    var minify = {
        dest : "build",
        cwd : paths.cwd
    };

    var bundle = {
        dest : "bundles",
        cwd : paths.cwd
    }


    /* -------------------------------------------------------------------- */
    /*
            Promises
    */
    /* -------------------------------------------------------------------- */


    var build = function(){

        return new Promise(function(resolve, reject){

            var path = require("path");

            horde.utils.promise()
            .then(function(){ return horde.tasks.bower.install(statics, paths.bower); })
            .then(function(){ return horde.tasks.lint.all(statics); })
            .then(function(){ return horde.tasks.images.responsive(statics); })
            .then(function(){ return horde.tasks.images.sizes(statics); })
            .then(function(){ return compress(); })
            .catch(reject)
            .then(resolve);

        });

    };

    var compress = function(){

        return new Promise(function(resolve, reject){

            var path = require("path");

            horde.utils.promise()
            .then(function(){ return horde.tasks.compile.all(statics, minify); })
            .then(function(){

                return horde.tasks.compile.less([
                    "src/app/static/lib/bower/bootstrap/less/bootstrap.less"
                ], horde.utils.extend(minify, {
                    less : {
                        paths : [
                            "src/app/static/lib/bower/bootstrap/less/"
                        ],
                        modifyVars : {
                            "icon-font-path" : "'/static/lib/bower/bootstrap/fonts/'"
                        }
                    }
                }));

            })
            .then(function(){ return horde.tasks.minify.all([ paths.build ]); })
            .then(function(){ return horde.tasks.minify.all(statics, minify); })
            .then(function(){ return horde.tasks.compress(paths.templates, bundle, minify); })
            .catch(reject)
            .then(resolve);

        });

    };

    var clean = function(){

        return new Promise(function(resolve, reject){

            horde.utils.promise()
            .then(function(){ return horde.utils.cache.clean(); })
            .then(function(){ return horde.tasks.clean(paths.clean); })
            .then(resolve);

        });

    };


    /* -------------------------------------------------------------------- */
    /*
            Tasks
    */
    /* -------------------------------------------------------------------- */


    grunt.registerTask("build", "Builds the site.", function(){

        horde.utils.promise()
        .then(function(){ return build(); })
        .then(function(){ return horde.tasks.display.image(paths.logo, 15); })
        .then(function(){ return horde.tasks.display.complete("Built all the things"); })
        .then(this.async());

    });

    grunt.registerTask("compress", "Compresses all assets.", function(){

        horde.utils.promise()
        .then(function(){ return compress(); })
        .then(this.async());

    });

    grunt.registerTask("clean", "Clean horde cache and build directories", function(){

        horde.utils.promise()
        .then(function(){ return clean(); })
        .then(this.async());

    });

    grunt.registerTask("images", "Losslessly compresses all images.", function(){

        var images = horde.utils.files.expand(statics, "*.{jpg,jpeg,png}");

        horde.utils.promise()
        .then(function(){ return horde.tasks.images.responsive(statics); })
        .then(function(){ return horde.tasks.images.sizes(statics); })
        .then(function(){ return horde.tasks.images.compress(images); })
        .then(function(){ return horde.tasks.display.image(paths.logo, 15); })
        .then(function(){ return horde.tasks.display.complete("Built all the images"); })
        .then(this.async());

    });

    grunt.registerTask("local", "Starts the local development server.", function(){

        horde.utils.promise()
        .then(function(){ return build(); })
        .then(function(){ return horde.tasks.gae.start({ path : paths.gae, port : port }); })
        .catch(function(err){console.log(err.stack)})
        .then(this.async());

    });

    grunt.registerTask("deploy", "Deploys the site.", function(){

        horde.utils.promise()
        .then(function(){ return clean(); })
        .then(function(){ return build(); })
        .then(function(){ return horde.tasks.gae.update({ path : paths.gae }); })
        .then(function(){ return horde.tasks.display.image(paths.logo, 15); })
        .then(function(){ return horde.tasks.display.complete("Deployed all the things"); })
        .catch(function(err){console.log(err.stack)})
        .then(this.async());

    });

    grunt.registerTask("open", "Opens the site in your browser.", function(){

        horde.tasks.prompt.get([
            {
                id : "open",
                label : "site",
                choices : [
                    { name : "local site", value : "http://localhost:{0}/".format(port) },
                    { name : "local admin", value : "http://localhost:{0}/".format(port + 1) }
                ]
            }
        ])
        .then(function(data){ horde.utils.execSync("open {0}".format(data.open)); })
        .then(this.async());

    });

    grunt.registerTask("default", ["local"]);

};