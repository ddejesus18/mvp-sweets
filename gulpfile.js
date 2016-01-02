var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cp          = require('child_process');
var compass     = require('gulp-compass');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
          //changed to local host b/c _site was not being watched and css files not being changed
            host: "localhost"
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  // fixed this broken link to a diff sass folder
    return gulp.src('_sass/styles.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(gulp.dest('stylesheets'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('stylesheets'));
});
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['**/*.scss']).on("change", function(file) {
     browserSync.reload(file.path);
 });
    gulp.watch(['*.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */


 gulp.task('compass', function () {
     return gulp.src(['sass/*.scss', 'sass/**/*.scss'])
     .pipe(compass({
         config_file: './config.rb',
         sass: 'sass',
         css: 'stylesheets',
         task: 'watch'
     }))
 });
gulp.task('default', ['browser-sync', 'watch','compass']);
/* THIS MIGHT NEED TO BE ADDED FOR BS AND JS
var gulp = require('gulp');
var merge = require('gulp-merge');

gulp.task('test', function() {
    var bootstrap = gulp.src('bootstrap/js/*.js')
        .pipe(gulp.dest('public/bootstrap'));

    var jquery = gulp.src('jquery.cookie/jquery.cookie.js')
        .pipe(gulp.dest('public/jquery'));

    return merge(bootstrap, jquery);
});
*/
