# grunt-filessrc

This Grunt plugin allows you to access a task's filesSrc (expanded files) from another config.

This can be handy if you want to use the same files as another task, but without redefining them or moving the list of files outside the task config. (See the "watch" example below.)

## Getting Started

This plugin requires Grunt `~0.4.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filessrc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filessrc');
```

## Usage

In your project's Gruntfile, use `grunt.task.filesSrc()` to get an array of source files for any previously-defined task.

```js
module.exports = function(grunt) {

  // Load the filesSrc plugin
  grunt.loadNpmTasks('grunt-filessrc');

  // Example config
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.initConfig({
    copy: {
      example: {
        files: [
          {
            src: 'src/index.html',
            dest: 'dist/index.html'
          },
          {
            expand: true,
            cwd: 'lib',
            src: ['**'],
            dest: 'dist/js/'
          }
        ]
      }
    }
  });

  // Configs that use grunt.task.filesSrc() must be defined after grunt.initConfig()
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    copy: {
      files: grunt.task.filesSrc('copy.example'),
      tasks: ['copy']
    }
  });

  grunt.registerTask('default', ['copy']);

};
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

Copyright 2014 Eric Heikes.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
