////////////////////
// REQUIREMENTS
////////////////////
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('gulp-sequence');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

////////////////////
// PATHS
////////////////////
var config = {
    global: {
        all: 'dist/**/.*',
        input: 'app',
        output: 'dist',
        tmp: '.tmp'
    },
    html: {
        input: 'app/**/*.html',
        output: 'dist',
        tmp: '.tmp'
    },
    scripts: {
        input: 'app/js/**/*.js',
        output: 'dist/js',
        tmp: '.tmp/js'
    },
    styles: {
        all: 'app/scss/**/*.scss',
        input: 'app/scss/style.scss',
        output: 'dist/css',
        tmp: '.tmp/css'
    },
    images: {
        input: 'app/img/**/*.*',
        output: 'dist/img',
        tmp: '.tmp/img'
    },
    static: {
        input: ['app/.*', '!app/*.html'],
        output: 'dist',
        tmp: '.tmp'
    }
}

////////////////////
// DEVELOPMENT TASKS
////////////////////

// HTML
gulp.task('html', function() {
    gulp.src(config.html.input)
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.html.tmp))
        .pipe(reload({
            stream: true
        }));
});

// JavaScript
gulp.task('scripts', function() {
    gulp.src(config.scripts.input)
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.tmp))
        .pipe(reload({
            stream: true
        }));
});

// CSS
gulp.task('styles', function() {
    gulp.src(config.styles.input)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(config.styles.tmp))
        .pipe(reload({
            stream: true
        }));
});

// Images
gulp.task('images', function() {
    gulp.src(config.images.input)
        .pipe(plumber())
        .pipe(gulp.dest(config.images.tmp))
        .pipe(reload({
            stream: true
        }))
});

// Static Files
gulp.task('static', function() {
    gulp.src(config.static.input)
        .pipe(plumber())
        .pipe(gulp.dest(config.static.tmp))
});

// Clean
gulp.task('clean', function() {
    return gulp.src(config.global.tmp, {
            read: false
        })
        .pipe(clean());
});

// BrowserSync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './.tmp/'
        }
    });
});

////////////////////
// WATCH
////////////////////
gulp.task('watch', function() {
    gulp.watch(config.html.input, ['html']);
    gulp.watch(config.styles.all, ['styles']);
    gulp.watch(config.scripts.input, ['scripts']);
    gulp.watch(config.images.input, ['images']);
});

////////////////////
// PRODUCTION TASKS
////////////////////

// HTML
gulp.task('html-final', function() {
    gulp.src(config.html.input)
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.html.output))
});

// JavaScript
gulp.task('scripts-final', function() {
    gulp.src(config.scripts.input)
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.output))
});

// CSS
gulp.task('styles-final', function() {
    gulp.src(config.styles.input)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.styles.output))
});

// Images
gulp.task('images-final', function() {
    gulp.src(config.images.input)
        .pipe(plumber())
        .pipe(gulp.dest(config.images.output))
});

// Static Files
gulp.task('static-final', function() {
    gulp.src(config.static.input)
        .pipe(plumber())
        .pipe(gulp.dest(config.static.output))
});

// Clean
gulp.task('clean-final', function() {
    return gulp.src(config.global.output, {
            read: false
        })
        .pipe(clean());
});

// Size
gulp.task('size', function() {
    return gulp.src(config.global.all)
        .pipe(size({
            title: 'Final Size:'
        }));
});

////////////////////
// DEVELOPMENT TASK
////////////////////
gulp.task('default', runSequence('clean', ['html', 'styles', 'scripts', 'images', 'static', 'browser-sync', 'watch']));

////////////////////
// PRODUCTION TASK
////////////////////
gulp.task('build', runSequence('clean-final', ['html-final', 'styles-final', 'scripts-final', 'images-final', 'static-final']));
