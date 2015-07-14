/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'formatBrush',

        $exec: [
            'formatbrush',
        ],

        exec_formatbrush: function (fromRange, toRange) {
            this.$dep.brush(fromRange, toRange);
        }
    });
});