/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'visualData',
        $datachange: false,

        $exec: [
            'scroll',
            'scrollrow',
            'scrollcolumn',
            'scrollto',
            'scrollrowto',
            'scrollcolumnto',
            'scrollin'
        ],

        exec_scroll: function (rowCount, colCount) {
            this.$dep.scroll(rowCount, colCount);
        },

        exec_scrollrow: function (rowCount) {
            this.$dep.scrollRow(rowCount);
        },

        exec_scrollcolumn: function (colCount) {
            this.$dep.scrollColumn(colCount);
        },

        exec_scrollto: function (row, col) {
            this.$dep.scrollTo(row, col);
        },

        exec_scrollrowto: function (row) {
            this.$dep.scrollRowTo(row);
        },

        exec_scrollcolumnto: function (col) {
            this.$dep.scrollColumnTo(col);
        },

        exec_scrollin: function (start, end) {
            this.$dep.scrollIn(start, end);
        }
    });
});