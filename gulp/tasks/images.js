'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import browserSync from 'browser-sync';

gulp.task( 'images', function () {
  
  return gulp.src( config.images.src )
    
    // Ignore unchanged files
    .pipe( changed( config.images.dest ) )
    
    // Optimize images if production
    .pipe( gulpif( global.isProd, imagemin() ) )
    
    // Save the image to the destination folder
    .pipe( gulp.dest( config.images.dest ) )
    
    // Reload the browser
    .pipe( browserSync.stream({ once: true }) );
  
})