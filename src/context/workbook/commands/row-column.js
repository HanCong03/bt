/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'rowColumn',

        $exec: [
            'rowheight',
            'columnwidth',
            'hasrowheight',
            'hascolumnwidth',
            'hiderow',
            'hidecolumn',
            'showrow',
            'showcolumn'
        ],

        $query: [
            'rowheight',
            'columnwidth',
            'hiderow',
            'hidecolumn'
        ],

        /* ----- exec ------ */

        exec_rowheight: function (height, startIndex, endIndex) {
            this.getAPI().setRowHeight(height, startIndex, endIndex);
        },

        exec_columnwidth: function (width, startIndex, endIndex) {
            this.getAPI().setColWidth(width, startIndex, endIndex);
        },

        exec_hasrowheight: function (row) {
            return this.getAPI().hasRowHeight(row);
        },

        exec_hascolumnwidth: function (col) {
            return this.getAPI().hasColWidth(col);
        },

        exec_hiderow: function (startIndex, endIndex) {
            return this.getAPI().hideRow(startIndex, endIndex);
        },

        exec_hidecolumn: function (startIndex, endIndex) {
            return this.getAPI().hideCol(startIndex, endIndex);
        },

        exec_showrow: function (startIndex, endIndex) {
            return this.getAPI().showRow(startIndex, endIndex);
        },

        exec_showcolumn: function (startIndex, endIndex) {
            return this.getAPI().showCol(startIndex, endIndex);
        },

        /* ----  query ---- */
        query_rowheight: function (row) {
            return this.getAPI().getRowHeight(row);
        },

        query_columnwidth: function (col) {
            return this.getAPI().getColWidth(col);
        },

        query_hiderow: function (row) {
            return this.getAPI().isHideRow(row);
        },

        query_hidecolumn: function (col) {
            return this.getAPI().isHideColumn(col);
        }
    });
});