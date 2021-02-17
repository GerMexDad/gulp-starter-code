var gulp = require('gulp');
//requires the gulp-sass plugin
var sass = require('gulp-sass');
//requires the browserSync plugin
var browserSync = require('browser-sync').create();

// complie scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./app/scss/**/*.scss')
    // 2. pass that file through sass computer
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled css
    .pipe(gulp.dest('./app/css'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
    gulp.watch('./app/scss/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.scss').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;