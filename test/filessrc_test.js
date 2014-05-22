'use strict';

var grunt = require('grunt');
require('./fixtures/gruntfile')(grunt);

var sortedFiles = function(configName) {
  var result = grunt.task.filesSrc(configName);
  result.sort();
  return result;
};

var expected = [
  'src/file1.js',
  'src/file2.js'
];

exports.filessrc = {

  exists: function(test) {
    test.expect(1);
    test.strictEqual(typeof grunt.task.filesSrc, 'function', 'should define grunt.task.filesSrc');
    test.done();
  },

  compact: function(test) {
    test.expect(2);
    test.deepEqual(sortedFiles(['run', 'dist/built.js']), ['src/file1.js'], 'should work with "compact" format (1)');
    test.deepEqual(sortedFiles(['run', 'dist/built1.js']), expected, 'should work with "compact" format (2)');
    test.done();
  },

  built: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.built'), expected, 'should work with "medium" format');
    test.done();
  },

  long1: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long1'), expected, 'should work with "full" format (1)');
    test.done();
  },

  long2: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long2'), expected, 'should work with "full" format (2)');
    test.done();
  },

  long3: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long3'), expected, 'should work with "full" format (3)');
    test.done();
  },

  mapping: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.built_mapping'), expected, 'should work with mapping');
    test.done();
  },

  mapping_with_opts: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long3_mapping'), expected, 'should work with mapping (with options)');
    test.done();
  },

  mapping_as_template: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long4_mapping'), expected, 'should work with mapping (as a template)');
    test.done();
  },

  mapping_duplicated: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.long5_mapping'), expected, 'should work with mapping (duplicated)');
    test.done();
  },

  empty: function(test) {
    test.expect(1);
    test.deepEqual(sortedFiles('run.no_files_or_options'), [], 'should work with an empty config');
    test.done();
  },

};
