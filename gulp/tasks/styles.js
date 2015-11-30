'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import sass         from 'gulp-sass';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('styles', function () {
  
  const createSourcemap = !global.isProd || config.styles.prodSourcemap;
  
  return gulp.src( config.styles.src )
    
    // Initialize source maps if not production
    .pipe( gulpif( createSourcemap, sourcemaps.init() ) )
    
    // Compile SASS files
    .pipe( sass({
      sourceComments: !global.isProd,
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: config.styles.sassIncludePaths
    }))
    
    // Display any errors
    .on( 'error', handleErrors )
    
    // Prefix the CSS
    .pipe( autoprefixer( 'last 2 versions', '> 1%', 'ie 8' ) )
    
    // Write the sourcemap if not production
    .pipe( gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null )
    ))
    
    // Write the destination css
    .pipe( gulp.dest( config.styles.dest ) )
    
    // Reload the browser
    .pipe( browserSync.stream({ once: true }) );
  
});