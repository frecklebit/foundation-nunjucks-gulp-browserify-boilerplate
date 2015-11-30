'use strict';

import config        from '../config';
import gulp          from 'gulp';
import browserSync   from 'browser-sync';

// Views task
gulp.task( 'views', function() {

  // Process any HTML files from source
  return gulp.src(config.views.src)
    
    // Store in build
    .pipe(gulp.dest(config.views.dest))
    
    // Reload Browser
    .pipe(browserSync.stream({ once: true }));

});