/* global module */
module.exports = function (grunt) {
    'use strict';

    var sourceFiles = ['www/css/**', 'www/*.html'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'www/js/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        phonegap: {
            config: {
                platforms: ['android'],
                plugins: ['https://github.com/apache/cordova-plugin-device-orientation']
            }
        },
        watch: {
            source: {
                files: ['<%= jshint.files %>', sourceFiles],
                tasks: ['default']
            }
        },
        connect: {
            server: {
                options: {
                    base: 'dist'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    { cwd: 'www', expand: true, src: '**',  dest: 'dist/' }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'copy:dist']);
    grunt.registerTask('run', ['default', 'phonegap:build', 'phonegap:run']);
    grunt.registerTask('dev', ['default', 'connect:server', 'watch:source']);
};