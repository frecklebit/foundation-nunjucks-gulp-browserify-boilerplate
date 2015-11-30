'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('fonts', function () {
  
  return gulp.src( config.fonts.src )
    
    // Ignore unchanged files
    .pipe( changed( config.fonts.dest ) )
    
    // Write files to destination dir
    .pipe( gulp.dest( config.fonts.dest ) )
    
    // Reload the browser once
    .pipe( browserSync.stream({ once: true }) );
  
});