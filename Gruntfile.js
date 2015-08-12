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
                files: ["assets/**/*.less"],
                tasks: ['less:build']
            }
        },

        less: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'assets/styles/btable.css': ["assets/styles/**/*.less"]
                }
            }
        },

        btable_build: {
            build: {
                options: {
                    base: './src',
                    alias: {
                        'utils': 'base/utils',
                        'env-module': 'interface/env-module',
                        'module': 'interface/module',
                        'command': 'interface/command',
                        'component': 'interface/component',
                        'NONE': 'kernel/src/workbook/definition/none',
                        'sheet-component': 'kernel/src/workbook/components/sheet/interface/i-sheet-component',
                        'workbook-utils': 'kernel/src/workbook/utils'
                    }
                },
                files: [{
                    src: './src/main.js',
                    dest: './dist/btable2.js'
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('btable-build');


    //grunt.registerTask('default', ['jshint']);
    //grunt.registerTask('test', ['uglify']);
    grunt.registerTask('dev', ['less', 'watch']);
    grunt.registerTask('build', ['btable_build']);
    //grunt.registerTask('build', ['less', 'ngtemplates', 'concat', 'uglify', 'cssmin']);
};
