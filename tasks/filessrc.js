/*
 * grunt-filessrc
 * https://github.com/eheikes/grunt-filessrc
 *
 * Copyright (c) 2014 Eric Heikes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var filesSrc = function(configName) {
    var config = grunt.config(configName);
    if (typeof config === 'undefined') {
      throw grunt.util.error('Unable to find config \'' + configName + '\'');
    }
    var tasks = grunt.task.normalizeMultiTaskFiles(config);
    return grunt.util._(tasks).chain().pluck('src').flatten().uniq().value();
  };

  grunt.task.filesSrc = filesSrc.bind(grunt.task);

};
