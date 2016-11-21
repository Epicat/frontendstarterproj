var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var sourceMaps = require('gulp-sourcemaps');
var gif = require('gulp-if');
var filter = require('gulp-filter');
var vinylPaths = require('vinyl-paths');

module.exports = function (gulp, SETTINGS, useminArtifacts) {
  return function () {

    // Process referenced js / css and replace references to output files
    // --env (-e) target environment (should only be used with build task)
    gulp.task('usemin', ['cleanDist', 'css', 'html'], function (cb) {
console.log('1');
    	var uglifySettings = {
        compress: {
          'drop_console': false,
        },
      };
    	var cwd = __dirname;
console.log('2');
    	if (SETTINGS.options.env === 'prod') uglifySettings.compress['drop_console'] = true;

    	gulp.src(
    		SETTINGS.paths.html + '/*.html',
    		{
          base: SETTINGS.paths.html, // for non prototype environments
        })
    		// Get usemin resource blocks from html files.
    		// Map named blocks against configs.
    		.pipe(usemin({
    			path: SETTINGS.paths.html,
    			outputRelativePath: '/',
    			jsVendor: [
    				uglify.bind(this, uglifySettings), // minify
    				rev // cachebuster filename
    			],
    			js: [
    				sourceMaps.init, // initialize sourcemap
    				uglify.bind(this, uglifySettings), // minify
    				rev, // cachebuster filename
    				sourceMaps.write.bind(this, '.') // finalize sourcemap
    			],
    			css: [
    				cssmin, // minify
    				rev // cachebuster filename
    			]
    		}))
    		// Log errors
    		.on('error', function (err) {
    			console.log(err);
    		})
    		.pipe(gulp.dest(SETTINGS.paths.dist))
    		// (if prototype) Collect task artifacts as an array of filepaths
    		// ...only assets
    		.pipe(gif(SETTINGS.prototype === true,
          filter('**/*.+(css|js|map)')))
    		// ...add paths to collection
    		.pipe(gif(SETTINGS.prototype === false,
    			vinylPaths(function (artifactPath) {
    				if (useminArtifacts === false) useminArtifacts = [];
    				// remove system portion of file path
    				artifactPath = SETTINGS.paths.getRelative(cwd, artifactPath, '\\');
    				if (useminArtifacts.indexOf(artifactPath) === -1) {
    					useminArtifacts.push(artifactPath);
    				}
    				return Promise.resolve();
    			})
    		));
        console.log('3');
        cb();
    });

  };
};
