module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'www/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        phonegap: {
            config: {
                platforms: ['android'],
                plugins: ['https://github.com/apache/cordova-plugin-device-orientation']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('run', ['phonegap:build', 'phonegap:run']);
};