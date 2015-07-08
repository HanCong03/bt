/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'rowHeight',

        $exec: [
            'rowheight',
            'bestfitrowheight'
        ],

        $query: [
            'rowheight'
        ],

        exec_rowheight: function (height, startRow, endRow) {
            this.$dep.setRowHeight(height, startRow, endRow);
        },

        exec_bestfitrowheight: function (height, row) {
            this.$dep.setBestFitRowHeight(height, row);
        },

        query_rowheight: function (row) {
            return this.$dep.getRowHeight(row);
        }
    });
});