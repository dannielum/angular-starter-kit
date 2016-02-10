var argv = require('yargs').argv;
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging 
    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for 
    //config: 'package.json', // where to find the plugins, by default searched up from process.cwd() 
    scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within 
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context 
    camelize: true, // if true, transforms hyphenated plugins names to camel case 
    lazy: true, // whether the plugins should be lazy loaded on demand
    rename: {
        'gulp-bundle-assets': 'bundle',
        'gulp-ruby-sass': 'sass'
    },
    //renameFn: function (name) { } // a function to handle the renaming of plugins (the default works) 
});
var Karma = require('karma').Server;

var paths = {
  tests: ['./app/tests/**/*.ts'],
  scripts: ['./app/ts/**/*.ts'],
  html: ['./**/*.html']
};

gulp.task('tsc', function(){
  return gulp.src(paths.scripts)
    .pipe(plugins.tsc())
    //.pipe(plugins.uglify())
    .pipe(gulp.dest('./app/js/tmp/'));
});

gulp.task('test-tsc', ['bundle'], function(){
  return gulp.src(paths.tests)
    .pipe(plugins.tsc())
    .pipe(gulp.dest('./test-runner/'));
});

gulp.task('bundle', ['tsc'], function() {
  return gulp.src('./bundle.config.js')
    .pipe(plugins.bundle())
    .pipe(plugins.rename("bundle.js"))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('html', function () {
  return gulp.src('./app/*.html')
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['compile', 'html']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('connect', ['compile'], function() {
  plugins.connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('compile', ['bundle'], function (done) {
  console.log('Cleaning up js files...');
  return gulp.src('./app/js/tmp/', {read: false})
    .pipe(plugins.clean({force: true}));
});

gulp.task('test', ['compile', 'test-tsc'], function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !argv.debug
  }, function() {
    console.log('Cleaning up test files...');
    return gulp.src('./test-runner/', {read: false})
        .pipe(plugins.clean({force: true}));
    done();
  }).start();
});

gulp.task('run', ['connect'], function () {
});

gulp.task('default', ['connect', 'watch'], function() {
});
