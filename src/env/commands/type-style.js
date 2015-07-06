/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'typeStyle',

        $query: [
            'typehorizontal'
        ],

        query_typehorizontal: function (row, col) {
            return this.$dep.getTypeHorizontalAlignments(row, col);
        }
    });
});