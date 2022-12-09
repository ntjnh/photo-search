const { dest, parallel, series, src, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

const scss = () => {
  return src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./build/css"));
};

const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
};

module.exports = {
  default: series(scss, serve),
  sass: scss,
  serve
}
