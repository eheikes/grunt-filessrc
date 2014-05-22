'use strict';

module.exports = function(grunt) {
  grunt.file.setBase('./test/fixtures');

  // This config was basically copied from
  //   https://github.com/gruntjs/grunt/blob/master/test/gruntfile/multi-task-files.js
  grunt.initConfig({
    build: '123',
    mappings: {
      cwd: 'src/',
      dest: 'foo/',
      ext: '.bar',
      rename: function(destBase, destPath) {
        return destBase + 'baz/' + destPath.replace(/\.js$/, '<%= mappings.ext %>');
      },
    },
    run: {
      options: {a: 1, b: 11},
      // This is the "compact" format, where the target name is actually the
      // dest filename. Doesn't support per-target options, templated dest, or
      // >1 srcs-dest grouping.
      'dist/built.js': 'src/*1.js',
      'dist/built1.js': ['src/*1.js', 'src/*2.js'],
      // This is the "medium" format. The target name is arbitrary and can be
      // used like "grunt run:built". Supports per-target options, templated
      // dest, and arbitrary "extra" paramters. Doesn't support >1 srcs-dest
      // grouping.
      built: {
        options: {a: 2, c: 22},
        src: ['src/*1.js', 'src/*2.js'],
        dest: 'dist/built-<%= build %>.js',
        extra: 123,
      },
      // This is the "full" format. The target name is arbitrary and can be
      // used like "grunt run:long1". Supports per-target options, templated
      // dest and >1 srcs-dest grouping.
      long1: {
        options: {a: 3, c: 33},
        files: {
          'dist/built-<%= build %>-a.js': ['src/*1.js'],
          'dist/built-<%= build %>-b.js': ['src/*1.js', 'src/*2.js'],
        }
      },
      long2: {
        options: {a: 4, c: 44},
        files: [
          {'dist/built-<%= build %>-a.js': ['src/*.whoops']},
          {'dist/built-<%= build %>-b.js': ['src/*1.js', 'src/*2.js']},
        ]
      },
      // This "full" variant supports per srcs-dest arbitrary "extra" paramters.
      long3: {
        options: {a: 5, c: 55},
        files: [
          {dest: 'dist/built-<%= build %>-a.js', src: ['src/*2.js'], extra: 456},
          {dest: 'dist/built-<%= build %>-b.js', src: ['src/*1.js', 'src/*2.js'], extra: 789},
        ]
      },
      // File mapping options can be specified in these 2 formats.
      built_mapping: {
        options: {a: 6, c: 66},
        expand: true,
        cwd: '<%= mappings.cwd %>',
        src: ['*1.js', '*2.js'],
        dest: '<%= mappings.dest %>',
        rename: '<%= mappings.rename %>',
        extra: 123
      },
      long3_mapping: {
        options: {a: 7, c: 77},
        files: [
          {
            expand: true,
            cwd: '<%= mappings.cwd %>',
            src: ['*1.js', '*2.js'],
            dest: '<%= mappings.dest %>',
            rename: '<%= mappings.rename %>',
            extra: 123
          }
        ]
      },
      long4_mapping: {
        options: {a: 8, c: 88},
        files: [
          '<%= run.long3_mapping.files %>'
        ]
      },
      long5_mapping: {
        options: {a: 9, c: 99},
        files: [
          '<%= run.long3_mapping.files %>',
          '<%= run.long4_mapping.files %>'
        ]
      },
      // Need to ensure the task function is run if no files or options were
      // specified!
      no_files_or_options: {},
    },
  });


  grunt.loadTasks('../../tasks');
  grunt.registerTask('default', []);

};
