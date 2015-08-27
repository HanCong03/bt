/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'exporter',

        commands: {
            export: {
                exec: function () {
                    return this.$dep.export();
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});