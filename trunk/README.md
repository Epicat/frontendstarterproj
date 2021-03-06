# Limetta FrontEnd
Front-end boilerplate for building static web prototypes.


## Contents

### Prototype index
`prototype.json` for [Limetta Visa](http://visa.limetta.se/)

### HTML

#### Nunjucks
Use [Nunjucks](https://mozilla.github.io/nunjucks/) templating to keep your markup DRY.

#### H5BP layout 
A modified version of the [HTML5 Boilerplate](https://html5boilerplate.com/) HTML document as a layout.

Appart from the H5BP magic:

- Dynamic title
- Version meta tag
- [Open graph](http://ogp.me/) meta tags

#### "Kitchen sink"
Litmus test your styles with the `base-apperance.njhtml` page. Also showcases your, hopefully, pretty CSS.

#### Error pages
Not to be forgotten.

- `404.njhtml`
- `505.njhtml`


### CSS 

#### Sass
Good ol' [Sass](http://sass-lang.com/).

#### Vendor components
These sure do come in handy!

- [Bourbon](http://bourbon.io/) - mixin library
- [Susy](http://susy.oddbird.net/) - grid framework
- [Normalize](https://github.com/appleboy/normalize.scss) - CSS normalizer in Sass

#### SMACCS
The well tested [SMACCS](https://smacss.com/) project structure

#### Grid config
The Sass project comes prepared with some content first grid configurations, helper classes* and debug overlay*.

*Commented out by default.


### JS
Not that much candy, only some pre-packed vendor components:

- [Underscore](http://underscorejs.org/) - utility library
- [Fastclick](https://github.com/ftlabs/fastclick) - plugin for boosting the touch experience


### Task runner
[Gulp](http://gulpjs.com/) is used to do all the tedious grunt work (no pun intended).

#### Server task
- Start a [Browsersync](http://www.browsersync.io/) node server to host your files
- Watch for changes to Sass- and Nunjucks files
- Live reload HTML and CSS changes

#### Build task
- Concatenate and minify JS and CSS
- Add cache buster to resource filenames
- Source maps
- Strip console logs*
 
*When building for production environment

#### Tools
Along with the server and build task the `gulpfile.js` packs a few utility tasks.

- Version bumping - Sets the semantic version number for the prototype


## Installation
When improving the boilerplate you will want to skip step 2.

1. Checkout with Git* or grab zip 
2. Remove .git file
3. Run `$ npm install` and `$ bower install`
4. *Change project name and description in the following files
	- `package.json`
	- `bower.json`
	- `prototype.json`
	- `site.njhtml` 

*Indeed, there should be a task for this.

### Requirements
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Bower](http://bower.io/)*
- *requires [Git](https://git-scm.com/)

No Ruby, yay!


## Comments

### File structure
Moving things around is pretty easy. `gulpfile.js` contains a 'paths' object holding almost all the paths needed for the application to work.

Simply move files to your liking and adjust `paths` accordingly.

> And then search and replace all references in the html templates, right?

Nah, all the asset paths are exposed as variables to the nunjucks `locals` object. When referencing an asset, like so `{{paths.img}}`, all changes made in `gulpfile.js` will follow once you recompile the html.

#### Hm, "almost all the paths" ?
The bower path is read from `.bowerrc`. Moving the bower directory requires adjustments in the config file.

`.bowerrc` configuration holds a static value so changes to `path.src` value must also be implemented in the configuration file.