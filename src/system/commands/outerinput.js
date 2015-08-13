/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'outerinput',

        commands: {
            bindinput: {
                exec: function (node) {
                    this.$dep.bind(node);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});