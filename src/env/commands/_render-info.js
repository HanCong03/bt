/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: '_renderInfo',

        commands: {
            _renderinfo: {
                query: function (rows, cols) {
                    return this.$dep.getRenderInfo(rows, cols);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});