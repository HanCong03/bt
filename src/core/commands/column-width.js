/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'columnWidth',

        $exec: [
            'columnwidth'
        ],

        $query: [
            'columnwidth'
        ],

        exec_columnwidth: function (wdith, startCol, endCol) {
            this.$dep.setColumnWidth(wdith, startCol, endCol);
        },

        query_columnwidth: function (col) {
            return this.$dep.getColumnWidth(col);
        }
    });
});