'use strict';

import config         from '../config';
import gulp           from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import data       from 'gulp-data';
import inject         from 'gulp-inject';
import handleErrors   from '../util/handleErrors';
import browserSync    from 'browser-sync';

gulp.task( 'views', function () {
  
  nunjucksRender.nunjucks.configure( config.views.templates );
  
  return gulp.src( config.views.src )
    
    // Add data to Nunjucks templates
    .pipe( data( function () {
      return require( '../../' + config.views.data );
    }))
    
    // Render Nunjucks templates
    .pipe( nunjucksRender() )
    
    // Display any errors
    .on( 'error', handleErrors )
    
    // Write to destination
    .pipe( gulp.dest( config.views.dest ) )
    
    // Refresh browser stream
    .pipe(browserSync.stream({ once: true }));
  
});