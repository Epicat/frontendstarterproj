#SCSS
Notes on the file structure in the scss folder.

##Structure and terminology

###Base

In base you put all styles that are applied to **elements** using element selectors. Some examples are body, the default link style etc. Normally you would also put reset or normalize SCSS-files here, but we prefer to include them using Bower.

###Layouts

Layouts are major components that give the page its primary layout without having a clearly specified content of their own. Top level layout elements like header, container, main and footer are good examples of elements defined here.

###Modules

Modules are components that have a specific purpose on the site. In a typical project you will find the majority of the SCSS code defined in modules. Examples of modules are navigation bars, image sliders, search fields, teaser blocks, different types of lists etc.

###Organisms

Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface, such as a header or a footer.

###Templates

Templates consist mostly of groups of organisms stitched together to form pages. Templates are very concrete and provide context to all these relatively abstract molecules and organisms by applying some layout rules.

##Further reading
[Our CSS/Sass Project Architecture and Styleguide](https://blog.groupbuddies.com/posts/32-our-css-sass-project-architecture-and-styleguide)
