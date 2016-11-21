var eventStream = require('event-stream');

module.exports = function (gulp, SETTINGS) {
  return function () {

    // Inject files into csproj
    gulp.task('includeFilesInCsproj', ['usemin'], function () {

    	var inject = function (artifacts) {
    		return eventStream.map(function (file, cb) {

          // file as text
    			var fileContent = file.contents.toString();

          // find first include tag with whitespace.
    			// add filepath as capture group for easy replacement.
    			var firstInclude = /<Content Include="(.*)".*\/>\s*/.exec(fileContent);

          // start point of injection before first include tag
    			var injectStart = firstInclude.index;

          // text block to inject
    			var injection = '';

    			// loop through artifacts
    			for (var a = 0, aLen = artifacts.length; a < aLen; a++) {
    				var artifact = artifacts[a];
    				// construct an include tag replacing template file path with artifact file path
    				artifact = firstInclude[0].replace(firstInclude[1], artifact);
    				injection += artifact;
    			}

    			// inject in file content
    			fileContent = fileContent.substr(0, injectStart);
          fileContent += injection;
          fileContent += fileContent.substr(injectStart);

    			// write to vinyl
    			file.contents = new Buffer(fileContent);

    			// trigger task end
    			cb(null, file);
    		});
    	};

    	return gulp.src('*.csproj')
    		// Inject usemin artifacts
    		.pipe(inject(useminArtifacts))
    		.pipe(gulp.dest(SETTINGS.paths.dist));
    });

  };
};
