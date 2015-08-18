/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'columnTitle',

        commands: {
            columntitle: {
                query: function (col) {
                    return this.$dep.getColumnTitle(col);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});