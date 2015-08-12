/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'loader',

        commands: {
            init: {
                exec: function () {
                    this.$dep.load();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            load: {
                exec: function (data) {
                    this.$dep.load(data);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});