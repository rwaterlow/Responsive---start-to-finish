'use-strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    });
});

gulp.task('sass', function() {
return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload );
    gulp.watch('js/**/*.js', browserSync.reload );
});

gulp.task('default', function(callback) {
    runSequence(
        ['sass', 'browserSync', 'watch'], callback
    );
});