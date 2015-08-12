/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'writable',

        commands: {
            writable: {
                query: function (start, end) {
                    return this.$dep.isWritable(start, end);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});