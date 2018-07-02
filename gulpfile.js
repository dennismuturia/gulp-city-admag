var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minify = require('gulp-minify-css');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var opn = require('gulp-open');
var build = require('gulp-build');
var imagemin = require('gulp-imagemin');
const Parralax = require('parallax-js');


/*Test code block
gulp.task("hello", function () {
   console.log("Hello world");
});
*/
//This is for compressing js files
gulp.task("compressJS", function (cb) {
    pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],cb)
});
//Minify the css files
gulp.task("compressCSS", function (cb) {
    pump([
        gulp.src('css/*.css'),
        minify(),
        gulp.dest('dist/css')
    ],cb)
});
//This minifies
gulp.task("minifyImage", function () {
    gulp.src('image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image'))
})
//Catching errors on the JS file
gulp.task("lint", function () {
    gulp.src("js/*js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Watch the projects as we are building it
gulp.task("watchCSS", function (cb) {
    gulp.watch('css/*.css',["compressCSS"])
});
//Watch the projects as we are building it
gulp.task("watchJS", function (cb) {
    gulp.watch('js/*.js',["compressJS"])
});
//Copying the html file to the dist
gulp.task("html", function () {
    gulp.src("index.html").pipe(gulp.dest("dist"));

});
//Bulding the whole project
gulp.task("build", function () {
    gulp.src("*.html")
        .pipe(build())
        .pipe(gulp.dest("dist"))
});


//Serve the project
gulp.task('webserver', function() {
    gulp.src( '.' )
        .pipe(webserver({
            host:'localhost',
            port:'8002',
            livereload:       true,
            directoryListing: false
        }));
});

//Open the browser
gulp.task('openbrowser', function() {
    opn( 'http://' + 'localhost' + ':' + '8002' );
});
gulp.task('default', ['build','minifyImage','compressJS','lint', 'compressCSS','html', 'watchJS', 'webserver', 'watchCSS', 'openbrowser']);
