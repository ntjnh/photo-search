const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const compiler = require("webpack");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const del = require("del");

gulp.task('sass', function() {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
});

gulp.task('css', function() {
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");
  const autoprefixer = require("autoprefixer");
  const tailwind = require("tailwindcss");

  return gulp.src("src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer(), tailwind({content: ["./index.html"]}), require("postcss-nested") ]))
    .pipe(sourcemaps.write("."))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream())
})

function jsStages() {
  if (argv.production) {
    return webpack({
      mode: 'production',
      output: {
        filename: 'app.js',
        clean: true
      }
    }, compiler);
  } else {
    return webpack({
      mode: 'development',
      output: {
        filename: 'app.js',
        clean: false
      }
    }, compiler);
  }
}

gulp.task('js', function() {
  return gulp.src(["./src/js/app.js", "./src/js/modules/*.js"])
    .pipe(jsStages())
    .pipe(gulp.dest("./build/js"))
});

function changeHandler(err, stats, done) {
  log('[webpack]', stats.toString({
    colors: true,
  }));

  browser.reload();
  done();
}

gulp.task('js:watch', gulp.series('js'), function() {
  const watchConfig = Object.assign(webpack.config, {
    watch: true,
    devtool: 'inline-source-map',
  });

  return gulp.src(["./src/js/app.js", "./src/js/modules/*.js"])
    .pipe(webpack(watchConfig, compiler, changeHandler)
      .on('error', function(err) {
        log('[webpack:error]', err.toString({
          colors: true,
        }));
      }))
    .pipe(gulp.dest("./build/js"));
});

gulp.task('serve', function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  done();
});

gulp.task('watch', function() {
  gulp.watch("./src/scss/**/*.scss", gulp.series('sass'));
  gulp.watch("./src/css/*.css", gulp.series('css'));
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js", gulp.series('js:watch'));
});

gulp.task('clean', function() {
  return del(["build/css/*", "build/js/*"]);
});

gulp.task('default', gulp.series('sass', 'css', 'js', 'serve', 'watch'));
gulp.task('build', gulp.series('clean', 'sass', 'css', 'js'));
