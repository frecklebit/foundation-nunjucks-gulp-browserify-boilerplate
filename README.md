# Website Boilerplate

A boilerplate modeled after [Jake Marsh's Angular Boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) using SASS, Gulp, and Browserify that also utilizes Gulp [best practices](https://github.com/greypants/gulp-starter).

## Getting up and running

1. Clone this repo from `https://github.com/adamcolejenkins/website-gulp-browserify-boilerplate.git`
2. Run `npm install` from the root directory
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/src` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

---

This boilerplate uses the latest versions of the following libraries:

- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `src/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `build/` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3002` once you run the `gulp` task. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (within this boilerplate will by default be `localhost:3000`). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.

##### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.

The resulting file (`main.js`) is placed inside the directory `/build/js/`.

##### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. Autoprefixer is recommended by Google and used in Twitter, WordPress, Bootstrap and CodePen.

##### Images

Any images placed within `/src/images` will be automatically copied to the `build/images` directory. If running `gulp prod`, they will also be compressed via imagemin.

##### Views

HTML files inside `/src/` will simply be copied to the `/build/` directory without any changes occurring.

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/src` directory are changed, and this is thanks to our Gulp watch tasks. Running `gulp dev` will begin watching all of these files, while also serving to `localhost:3002`, and with browser-sync proxy running at `localhost:3000` (by default).


