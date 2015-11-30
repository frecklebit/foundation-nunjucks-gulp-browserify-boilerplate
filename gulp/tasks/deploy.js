'use strict';

import config   from '../config';
import gulp     from 'gulp';
import gulpif   from 'gulp-if';
import s3       from 'gulp-s3-deploy';
import sftp     from 'gulp-sftp';

gulp.task('deploy', ['prod'], function() {

  return gulp.src( config.buildDir + '**' )
  
    // Deploy build to Amazon S3 if bucket != false
    .pipe( gulpif( config.deploy.awsS3.bucket ), s3( config.s3Credentials ) )
    
    // Deploy build to SFTP Server if host != false
    .pipe( gulpif( config.deploy.sftp.host ), sftp( config.s3Credentials ) );

});