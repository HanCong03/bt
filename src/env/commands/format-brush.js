/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'formatBrush',

        commands: {
            formatbrush: {
                exec: function (fromRange, toRange) {
                    this.$dep.brush(fromRange, toRange);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});