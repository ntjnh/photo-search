const { dest, parallel, series, src, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const scss = () => {
  return src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./build/css"));
};

module.exports = {
  default: scss,
  sass: scss
}
