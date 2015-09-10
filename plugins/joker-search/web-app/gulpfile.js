/**
 * Created by adrake on 9/3/15.
 */
'use strict';
var gulp = require('gulp'),
    open = require('gulp-open'),
    run = require('gulp-run');

var config = {
    devBaseUrl: 'http://localhost',
    port: 8080,
    appName: 'joker-search/',
    paths: {
        root: './',
        js: 'js/*.js',
        css: 'css/*.css'
    }
};

gulp.task('open', function(){
    setTimeout(function(){
        gulp.src('')
            .pipe(open({uri: 'http://localhost:' + config.port + '/' + config.appName}));
    }, 1000);

});

gulp.task('create-docs', function(){
    run('./node_modules/.bin/jsdoc js/search.js').exec();
});

gulp.task('watch', function() {
    gulp.watch(config.paths.js, ['create-docs']);
});

// TODO: Add task for gulp-jasmine

gulp.task('default', ['create-docs', 'open', 'watch']);