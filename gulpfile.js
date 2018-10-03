var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', ['nodemon'], function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    })
})

// gulp.task('browserSync', ['nodemon'], function () {
//     browserSync.init(null, {
//         proxy: "http://localhost:5000",
//         files: ["app/**/*.*"],
//         port: 7000
//     });
// });

gulp.task('sass', function () {
    return gulp.src('app/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('watch', function () {
    gulp.watch('app/assets/scss/**/*.scss', ['sass']);
    gulp.watch('app/assets/*.html', browserSync.reload);
    gulp.watch('app/assets/js/**/*.js', browserSync.reload);
})

gulp.task('useref', function () {

    return gulp.src('app/assets/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function () {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync'], 'watch',
        callback
    )
})

gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        'sass',
        ['useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app/src/server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});