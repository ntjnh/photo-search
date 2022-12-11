const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const compiler = require("webpack");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();

gulp.task('sass', function() {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
});

gulp.task('css', function() {
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");
  const autoprefixer = require("autoprefixer");

  return gulp.src("src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer(), require("tailwindcss"), require("postcss-nested") ]))
    .pipe(sourcemaps.write("."))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream())
})

gulp.task('js', function() {
  return gulp.src(["./src/js/app.js", "./src/js/modules/*.js"])
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js',
        clean: true
      }
    }, compiler))
    .pipe(gulp.dest("./build/js"))
});

gulp.task('js:watch', gulp.series('js'), function(done) {
  browserSync.reload();
  done();
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./src/scss/**/*.scss", gulp.series('sass'));
  gulp.watch("./src/css/*.css", gulp.series('css'));
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js", gulp.series('js:watch'));
});

gulp.task('default', gulp.series('sass', 'css', 'js'));
