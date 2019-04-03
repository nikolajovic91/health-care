var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

// PATHS
var SCRIPTS_PATH = "public/scripts/**/*.js";
var SASS_PATH = "public/sass/**/*.scss";
var IMAGE_PATH = "public/assets/*";
var HTML_PATH = 'public/*.html';




// STYLES
gulp.task("styles", async function() {
  console.log("starting styles task");
  return gulp
    .src("public/sass/styles.scss")
    .pipe(
      plumber(function(err) {
        console.log("STYLES:" + err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css/"));
});

// SCRIPTS
gulp.task("scripts", function() {
  console.log("scripts task");

  return gulp
    .src(SCRIPTS_PATH)
    .pipe(
      plumber(function(err) {
        console.log("SCRIPTS:" + err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/js/"));
});

// IMAGES
gulp.task("images", async function() {
  gulp
    .src("public/assets/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// FONTS
gulp.task('fonts', async function() {
  return gulp.src('public/fonts/*')
  .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('copyHtml', async function(){
  gulp.src('public/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('copyJSON', async function(){
  gulp.src('public/**/*.json')
      .pipe(gulp.dest('dist/'));
});

// DEFAULT
gulp.task("default", async function() {
  console.log("default");
});

gulp.task("watch", function() {
  console.log("Gulp watch start");
  gulp.watch(SCRIPTS_PATH, gulp.series("scripts"));
  gulp.watch(SASS_PATH, gulp.series("styles"));
  gulp.watch(IMAGE_PATH, gulp.series("images"));
  gulp.watch(HTML_PATH, gulp.series('copyHtml'));
  gulp.watch('public/database/*.json', gulp.series('copyJSON'));
});
