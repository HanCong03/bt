/**
 * FUI Grunt file
 **/

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ["theme/**/*.less"],
                tasks: ['less:build']
            }
        },

        less: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'dist/theme/btable.css': ["theme/**/*.less"]
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');


    //grunt.registerTask('default', ['jshint']);
    //grunt.registerTask('test', ['uglify']);
    grunt.registerTask('dev', ['less', 'watch']);
    //grunt.registerTask('build', ['less', 'ngtemplates', 'concat', 'uglify', 'cssmin']);
};
