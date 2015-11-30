'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import debowerify   from 'debowerify';

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {
  
  var bundler = browserify({
    entries: [config.sourceDir + 'js/' + file],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });
  
  if ( ! global.isProd ) {
    bundler = watchify( bundler );
    
    bundler.on( 'update', function () {
      rebundle();
      gutil.log('Rebundle...');
    });
  }
  
  const transforms = [
    { 'name':babelify, 'options': {}},
    { 'name':debowerify, 'options': {}},
    { 'name':'brfs', 'options': {}},
    { 'name':'bulkify', 'options': {}}
  ];
  
  transforms.forEach(function(transform) {
    bundler.transform(transform.name, transform.options);
  });
  
  function rebundle() {
    const stream = bundler.bundle();
    const createSourcemap = global.isProd && config.browserify.prodSourcemap;
    
    return stream.on( 'error', handleErrors )
      
      // Source file
      .pipe( source( file ) )
      
      // Buffer
      .pipe( gulpif( createSourcemap, buffer() ) )
      
      // Create source map
      .pipe( gulpif( createSourcemap, sourcemaps.init() ) )
      
      // Uglify scripts
      .pipe( gulpif( global.isProd, streamify( uglify({
        compress: { drop_console: true }
      }))))
      
      // Write source maps
      .pipe( gulpif( createSourcemap, sourcemaps.write('./') ) )
      
      // Store main
      .pipe( gulp.dest( config.scripts.dest ) )
      
      // Reload browser once
      .pipe( browserSync.stream({ once: true }) );
      
  }
  
  return rebundle();
  
}

gulp.task('browserify', function () {
  
  return buildScript( config.browserify.bundleName );
  
});