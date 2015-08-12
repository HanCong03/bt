/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'dimension',

        commands: {
            dimension: {
                query: function () {
                    return this.$dep.getDimension();
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});