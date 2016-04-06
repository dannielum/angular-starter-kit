var argv = require('yargs').argv;
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var history = require('connect-history-api-fallback');
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
        'gulp-protractor': 'protractor'
    },
    //renameFn: function (name) { } // a function to handle the renaming of plugins (the default works) 
});
var Karma = require('karma').Server;

var paths = {
    tests: ['./app/tests/**/*.ts'],
    scripts: ['./app/ts/**/*.ts'],
    html: ['./**/*.html'],
    styles: ['./app/scss/**/*.scss']
};

gulp.task('tsc', function () {
    return gulp.src(paths.scripts)
        .pipe(plugins.tsc({ sourceMap: false, declaration: false, emitError: true, safe: true }))
        .pipe(gulp.dest('./app/javascripts/tmp/'));
});

gulp.task('test-tsc', ['bundle'], function () {
    return gulp.src(paths.tests)
        .pipe(plugins.tsc())
        .pipe(gulp.dest('./test-runner/'));
});

gulp.task('scss', function () {
    return gulp.src(paths.styles)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest('./app/css/'))
});

gulp.task('bundle', ['tsc'], function () {
    return gulp.src('./bundle.config.js')
        .pipe(plugins.bundle())
        .pipe(plugins.rename("bundle.js"))
        .pipe(gulp.dest('./app/javascripts'));
});

gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(plugins.connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['compile', 'html']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.styles, ['scss']);
});

gulp.task('connect', ['compile'], function () {
    var middleware = history({
        rewrites: [{
            from: /^\/\/.*$/,
            to: function(context) {
                return '/#/index.html' + context.parsedUrl.pathname;
            }
        }]
    });
    plugins.connect.server({
        root: 'app',
        livereload: false,
        middleware: function(connect, opt) {
            return [middleware];
        }
        //fallback: 'app/index.html'
    });
});

gulp.task('compile', ['bundle', 'scss'], function (done) {
    console.log('Cleaning up js files...');
    return gulp.src('./app/javascripts/tmp/', { read: false })
        .pipe(plugins.clean({ force: true }));
});

gulp.task('test', ['compile', 'test-tsc'], function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !argv.debug
    }, function () {
        console.log('Cleaning up test files...');
        return gulp.src('./test-runner/', { read: false })
            .pipe(plugins.clean({ force: true }));
        done();
    }).start();
});

gulp.task('webtest', ['compile'], function (done) {
    spawn('webdriver-manager', ['start'], {
        stdio: 'inherit'
    }).once('close', function () {
        gulp.src('./e2e-tests/scenarios.js')
            .pipe(protractor({
                configFile: './e2e-tests/protractor.config.js'
            }))
            .on('error', function (e) {
                throw e;
            });
    });
});

gulp.task('run', ['connect'], function () {
});

// gulp.task('default', ['compile', 'watch'], function () {
// });

gulp.task('default', ['connect', 'watch'], function () {
});
