/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'rowHeight',

        $exec: [
            'rowheight'
        ],

        $query: [
            'rowheight'
        ],

        exec_rowheight: function (height, startRow, endRow) {
            this.$dep.setRowHeight(height, startRow, endRow);
        },

        query_rowheight: function (row) {
            return this.$dep.getRowHeight(row);
        }
    });
});