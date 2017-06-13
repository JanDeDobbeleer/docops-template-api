'use strict';

var jsonrefs = require('json-refs');
var YAML = require('yaml-js');
var fs = require('fs');
var SwaggerParser = require('swagger-parser');
var browserSync = require('browser-sync').create();

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');

gulp.task('watch', function(){

    browserSync.init({
        server: ['swagger-ui', 'output']
    });

    gulp.watch(['paths/**/*.yaml', 'definitions/**/*.yaml'], ['compile']);

    gulp.watch(['output/swagger.json']).on('change', function(){
        validate()
            .then(function(){
                browserSync.reload();
            });
    });

    compile(function(){});
});

function compile(done){
    jsonrefs.clearCache();
    var root = YAML.load(fs.readFileSync('swagger.yaml').toString());
    var options = {
        filter: ['relative', 'remote'],
        loaderOptions: {
            processContent: function(res, callback) {
                callback(null, YAML.load(res.text));
            }
        }
    };

    jsonrefs.resolveRefs(root, options).then(function(results) {
        if (!fs.existsSync('output/')) {
            fs.mkdirSync('output/');
        }
        fs.writeFileSync('output/swagger.json', JSON.stringify(results.resolved, null, 2), null, function(err) {
            if (err) {
                gutil.log(err);
            }
        });
        gutil.log('Created swagger file at output/swagger.json');
        done();
    });
}

function validate(){
    return SwaggerParser.validate("output/swagger.json", {validate: {spec: true}})
    .then(function(){
        fs.writeFileSync('output/errors.json', '{}');
        gutil.log('All valid.');
    })
    .catch(function(error){
        fs.writeFileSync('output/errors.json', JSON.stringify(error, null, 2));
        gutil.log(error);
    });
}

gulp.task('compile', compile);
gulp.task('validate', ['compile'], validate);
