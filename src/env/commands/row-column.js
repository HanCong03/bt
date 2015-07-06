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
            'showcolumn'
        ],

        $query: [
            'hiddenrow',
            'hiddencolumn'
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

        /* ----  query ---- */
        query_hiddenrow: function (row) {
            return this.$dep.isHiddenRow(row);
        },

        query_hiddencolumn: function (col) {
            return this.$dep.isHiddenColumn(col);
        }
    });
});