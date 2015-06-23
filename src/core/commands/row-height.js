/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'rowHeight',

        $query: [
            'rowheight'
        ],

        query_rowheight: function (row) {
            return this.$dep.getRowHeight(row);
        }
    });
});