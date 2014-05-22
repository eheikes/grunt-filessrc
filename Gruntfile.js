/*
 * grunt-filessrc
 * https://github.com/eheikes/grunt-filessrc
 *
 * Copyright (c) 2014 Eric Heikes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    nodeunit: {
      options: {
        reporter: 'default'
      },
      tests: ['test/*_test.js']
    }
  });

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);

};
