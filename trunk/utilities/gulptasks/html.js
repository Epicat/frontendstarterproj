var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks-html');
var frontMatter = require('front-matter');
var data = require('gulp-data');
var prettify = require('gulp-prettify');

module.exports = function (gulp, SETTINGS) {
  return function () {

    var prettifySettings = {
      'indent_with_tabs': true,
      'preserve_newlines': true,
      'max_preserve_newlines': 2,
      'unformatted': ['pre', 'code', 'script'],
      'extra_liners': [],
    };

    gulp.task('html', function (cb) {
    	if (SETTINGS.prototype === false) return cb();

    	var glob = (SETTINGS.page.changed) ? SETTINGS.page.changed : SETTINGS.paths.njhtml + '/*.njhtml';
    	SETTINGS.page.changed = false;

    	gulp.src(glob)

        // Output error message.
    		// Also keeps watch from stopping when errors occur.
    		.pipe(plumber({
    			errorHandler: function (err) {
    				console.error(
    					err.plugin + ':\n' +
    					err.name + '\n' +
    					err.message + '\n' +
    					'lineno: ' + err.lineno + ', colno: ' + err.colno
    				);
    			}
    		}))

        // Pull front matter data from source files
    		// and pass on to nunjucks.
    		.pipe(data(function (file) {
    			var content = frontMatter(String(file.contents));
    			file.contents = new Buffer(content.body);
    			return content.attributes;
    		}))

        // Parse nunjucks templates
    		.pipe(nunjucks({
    			// feed paths to local variable scope
    			locals: {
    				paths: {
    					js: SETTINGS.paths.getRelative(SETTINGS.paths.html, SETTINGS.paths.js),
    					css: SETTINGS.paths.getRelative(SETTINGS.paths.html, SETTINGS.paths.css),
    					img: SETTINGS.paths.getRelative(SETTINGS.paths.html, SETTINGS.paths.img),
    					dummy: SETTINGS.paths.getRelative(SETTINGS.paths.html, SETTINGS.paths.dummy),
    					bower: SETTINGS.paths.getRelative(SETTINGS.paths.html, SETTINGS.paths.bower)
    				}
    			},
    			// add paths to searchPaths
    			searchPaths: [
    				SETTINGS.paths.njhtml + '/layouts',
    				SETTINGS.paths.njhtml + '/partials'
    			],
    			// output html instead of njhtml
    			ext: '.html'
    		}))

        // Prettify output
    		.pipe(prettify(prettifySettings))
    		.pipe(gulp.dest(SETTINGS.paths.html));

      cb();
    });

  };
};
