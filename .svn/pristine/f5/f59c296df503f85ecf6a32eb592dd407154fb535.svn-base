/// <binding ProjectOpened='watch' />
/* eslint-env node */
'use strict';

var gulp = require('gulp');
var fs = require('fs');
var minimist = require('minimist');
//var iconify = require('gulp-iconify');
var SETTINGS = JSON.parse(fs.readFileSync('.wiringrc', 'utf8'));
		// edit in .bowerrc
		SETTINGS.paths.bower = JSON.parse(fs.readFileSync('.bowerrc', 'utf8')).directory;
		SETTINGS.page = {};
		SETTINGS.page.changed = false;

if (SETTINGS.prototype === true) var browserSync = require('browser-sync').create();

/**
 * CLI options
 */
var knownOptions = {
	string: ['env', 'ver'],
	default: {
		env: 'dev', ver: 'patch',
	},
	alias: {
		e: 'env', v: 'ver',
	},
};
SETTINGS.options = minimist(process.argv.slice(2), knownOptions);

SETTINGS.paths.getRelative = function (context, path, delimiter) {
	//Get relative path
	// context = 'src/js', path = 'src/js/vendor/modernizr.js'
	// -> 'vendor/modernizr.js'
	delimiter = delimiter || '/';
	return path.replace(context + delimiter, '');
};

/**
 * Utility tasks
 */
gulp.task('bump', require('./utilities/gulptasks/bump')(gulp, SETTINGS));

/**
 * Server / build related tasks
 */

// Precompile nunjucks to html
gulp.task('html', require('./utilities/gulptasks/html')(gulp, SETTINGS));

// Reload page after html task
gulp.task('post-html', ['html'], function (cb) {
	browserSync.reload();
	cb();
});

// Precompile scss to css
gulp.task('css', require('./utilities/gulptasks/css')(gulp, SETTINGS));

// Live-reload css, after css task
gulp.task('post-css', ['css'], function (cb) {
	if (SETTINGS.prototype === true) {
		browserSync.reload(SETTINGS.paths.css + '/*.css');
	}
	return cb();
});

// Process referenced js / css and replace references to output files
// --env (-e) target environment (should only be used with build task)
var useminArtifacts = [];
gulp.task('usemin', require('./utilities/gulptasks/usemin')(gulp, SETTINGS, useminArtifacts));

// Inject files into csproj
gulp.task('includeFilesInCsproj', require('./utilities/gulptasks/includeFilesInCsproj')(gulp, SETTINGS, useminArtifacts));

// Clean build dir
gulp.task('cleanDist', function (cb) {
	// do nothing
	if (SETTINGS.prototype === false) return cb();

	var del = require('del');
	del([SETTINGS.paths.dist + '/*'])
	return cb();
});

// Clean export dir
gulp.task('cleanExport', function (cb) {
	var del = require('del');
	del([SETTINGS.paths.export + '/*']);
	return cb();
});

// Copy assets to build dir
gulp.task('copyAssets', ['cleanDist'], function (cb) {
	gulp.src([
			SETTINGS.paths.assets + '/dummy/**/*',
			SETTINGS.paths.assets + '/fonts/*',
			SETTINGS.paths.assets + '/img/**/*',
			SETTINGS.paths.src + '/prototype.json',
			SETTINGS.paths.src + '/robots.txt'
		],
		{
			base: SETTINGS.paths.src,
		})
		.pipe(gulp.dest(SETTINGS.paths.dist));
	return cb();
});

// Watch source files
gulp.task('watch', require('./utilities/gulptasks/watch')(gulp, SETTINGS));

// Build source files and copy assets to dist copy
gulp.task('build', require('./utilities/gulptasks/build')(gulp, SETTINGS));

// Export asset source files and project configuration as an importable bundle
gulp.task('export', require('./utilities/gulptasks/export')(gulp, SETTINGS));

// Start http server and watch for file changes
gulp.task('server', require('./utilities/gulptasks/server')(gulp, SETTINGS, browserSync));

// Gulp iconify : https://github.com/gavro/gulp-iconify
/*gulp.task('iconify', function() {
    iconify({
    	src: '/Assets/images/svg/*.svg',
        pngOutput: paths.css + '/png',
        scssOutput: './scss',
        cssOutput:  './css',
        defaultWidth: '300px',
        defaultHeight: '200px'
    });
});*/

//var PROTOTYPE = true;
//var nm = {}; // node modules collection
/**
 * Paths to files and folders
 */
//var paths = {};
//paths.src = 'src';
//paths.root = paths.src;
//paths.dist = 'dist';
//paths.export = 'export';
//paths.assets = paths.root + '/Assets'; // if you change this, don't forget to edit .bowerrc
//paths.njhtml = paths.src + '/Views'; // changes to this might require change to bump task
//paths.html = paths.src;
//paths.scss = paths.assets + '/scss';
//paths.css = paths.assets + '/css';
//paths.js = paths.assets + '/js';
//paths.img = paths.assets + '/images';
//paths.dummy = paths.root + '/Dummy';
//paths.bower = JSON.parse(fs.readFileSync('.bowerrc', 'utf8')).directory; // edit in .bowerrc
