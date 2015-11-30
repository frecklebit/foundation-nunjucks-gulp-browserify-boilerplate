'use strict';

import config from '../config';
import gulp   from 'gulp';
import gzip   from 'gulp-gzip';

gulp.task( 'gzip', function() {

  return gulp.src( config.gzip.src )
    
    // Compress website
    .pipe( gzip( config.gzip.options ) )
    
    // Store it in build dir
    .pipe( gulp.dest( config.gzip.dest ) );

});
