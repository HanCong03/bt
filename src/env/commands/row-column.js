/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'rowColumn',

        $exec: [
            'hiderow',
            'hidecolumn',
            'showrow',
            'showcolumn',
            'removerowheight',
            'removecolumnwidth'
        ],

        $query: [
            'hiddenrow',
            'hiddencolumn',
            'bestfitrowheight',
            'bestfitcolumnwidth'
        ],

        /* ----- exec ------ */
        exec_hiderow: function (startIndex, endIndex) {
            return this.$dep.hideRow(startIndex, endIndex);
        },

        exec_hidecolumn: function (startIndex, endIndex) {
            return this.$dep.hideCol(startIndex, endIndex);
        },

        exec_showrow: function (startIndex, endIndex) {
            return this.$dep.showRow(startIndex, endIndex);
        },

        exec_showcolumn: function (startIndex, endIndex) {
            return this.$dep.showCol(startIndex, endIndex);
        },

        exec_removerowheight: function (row) {
            this.$dep.removeRowHeight(row);
        },

        exec_removecolumnwidth: function (col) {
            this.$dep.removeColumnWidth(col);
        },

        /* ----  query ---- */
        query_hiddenrow: function (row) {
            return this.$dep.isHiddenRow(row);
        },

        query_hiddencolumn: function (col) {
            return this.$dep.isHiddenColumn(col);
        },

        query_bestfitrowheight: function (row) {
            return this.$dep.isBestFitRowHeight(row);
        },

        query_bestfitcolumnwidth: function (col) {
            return this.$dep.isBestFitColumnWidth(col);
        }
    });
});