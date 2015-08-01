var gulp = require('gulp'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');

var env = process.env.NODE_ENV || 'development';

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'dist/css',
            sass: 'src/scss',
            bundle_exc: true
        }))
        .on('error', function(err) {
            $.util.log(err.message);
            this.emit('end');
        })
        .pipe(sass({ errLogToConsole: true }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
    gulp.src(['src/js/app.js'])
        .pipe(browserify({
            debug: true
        }))
        //.pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('dist/js'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/css/**/*/*.css', 'assets/js/**/*.js'], {read: false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch([
        'src/js/**/*.js',
        'src/js/app.js'
    ], {
        interval: 500
    }, function() {
        gulp.start('scripts');
    });

    gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'scripts']);
