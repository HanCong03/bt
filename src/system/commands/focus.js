/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'input',

        commands: {
            focus: {
                exec: function () {
                    this.$dep.focus();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            blur: {
                exec: function () {
                    this.$dep.blur();
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});