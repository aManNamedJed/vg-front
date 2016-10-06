var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var expect = require('gulp-expect-file');

/**
 * Sass Compilation
 */
 
gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

/**
 * Javascript Compilation
 */

gulp.task('js', function () {
    gulp.src('./js/modules/**/*.js')
    	.pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./js/modules/**/*.js', ['js']);
});

var nodeFiles = [
  
  'node_modules/jquery/dist/jquery.js',
  'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
  'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
  'node_modules/imagesloaded/imagesloaded.pkgd.js',
  'node_modules/dropzone/dist/min/dropzone.min.js',
  'node_modules/vue/dist/vue.js',
  'node_modules/vue-resource/dist/vue-resource.js',
  'node_modules/vue-router/dist/vue-router.js',

  
];

gulp.task('node:js', function () {
	gulp.src(nodeFiles)
        .pipe(expect(nodeFiles))
		.pipe(concat('nodeModules.js'))
	    .pipe(gulp.dest('./js/modules'));

});

var componentFiles = [
  'js/components/config.js',
  'js/components/game.js',
  'js/components/games.js',
  'js/components/gameIndex.js',
  'js/components/gameNew.js',
  'js/components/genre.js',
  'js/components/genres.js',
  'js/components/genreMenu.js',
];

gulp.task('vue', function () {
  gulp.src(componentFiles)
        .pipe(expect(componentFiles))
    .pipe(concat('vue-components.js'))
      .pipe(gulp.dest('./js'));

});