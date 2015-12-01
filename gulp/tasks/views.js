'use strict';

import config         from '../config';
import changed        from 'gulp-changed';
import gulp           from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import data       from 'gulp-data';
import inject         from 'gulp-inject';
import handleErrors   from '../util/handleErrors';
import browserSync    from 'browser-sync';

gulp.task( 'views', function () {
  
  nunjucksRender.nunjucks.configure( config.views.templates );
  
  return gulp.src( config.views.src )
  
    // Ignore unchanged files
    .pipe( changed( config.views.dest ) )
    
    // Add data to Nunjucks templates
    .pipe( data( function () {
      return require( '../../' + config.views.data );
    }))
    
    // Render Nunjucks templates
    .pipe( nunjucksRender() )
    
    // Inject source files
    .pipe( inject( gulp.src( [config.styles.dest + '/*.css', config.scripts.dest + '/*.js'], { read: false } ), { relative: true }))
    
    // Display any errors
    .on( 'error', handleErrors )
    
    // Write to destination
    .pipe( gulp.dest( config.views.dest ) )
    
    // Refresh browser stream
    .pipe(browserSync.stream({ once: true }));
  
});