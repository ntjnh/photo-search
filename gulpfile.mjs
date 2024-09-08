import gulp from 'gulp'

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import cleanCSS from 'gulp-clean-css'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import postcssNested from 'postcss-nested'

import webpack from 'webpack-stream'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

import * as bSync from 'browser-sync'
const browserSync = bSync.create()

import { deleteAsync } from 'del'

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(postcss([
      autoprefixer(),
      tailwind({
        content: ['./index.html']}),
        postcssNested
    ]))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'))
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
    })
  } else {
    return webpack({
      mode: 'development',
      output: {
        filename: 'app.js',
        clean: false
      }
    })
  }
}

gulp.task('js', function() {
  return gulp.src(['./src/js/app.js', './src/js/modules/*.js'])
    .pipe(jsStages())
    .pipe(gulp.dest('./build/js'))
})

function changeHandler(err, stats, done) {
  log('[webpack]', stats.toString({
    colors: true,
  }))

  browser.reload()
  done()
}

gulp.task('js:watch', gulp.series('js'), function() {
  const watchConfig = Object.assign(webpack.config, {
    watch: true,
    devtool: 'inline-source-map'
  })

  return gulp.src(['./src/js/app.js', './src/js/modules/*.js'])
    .pipe(webpack(watchConfig, compiler, changeHandler)
      .on('error', function(err) {
        log('[webpack:error]', err.toString({
          colors: true
        }))
      }))
    .pipe(gulp.dest('./build/js'))
})

gulp.task('serve', function(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  done()
})

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('./src/css/*.css', gulp.series('css'))
  gulp.watch('./index.html').on('change', browserSync.reload)
  gulp.watch('./src/js/**/*.js', gulp.series('js:watch'))
})

gulp.task('clean', function() {
  return deleteAsync(['build/css/*', 'build/js/*'])
})

gulp.task('default', gulp.series('sass', 'css', 'js', 'serve', 'watch'))
gulp.task('build', gulp.series('clean', 'sass', 'css', 'js'))
