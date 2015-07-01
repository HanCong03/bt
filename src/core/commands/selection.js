/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'selection',

        $exec: [
            'move', 'range', 'uprange', 'downrange', 'updatefocus'
        ],

        $query: [
            'allrange', 'range'
        ],

        exec_range: function (start, end, entry) {
            this.$dep.setRange(start, end, entry);
        },

        exec_uprange: function () {
            this.$dep.upRange();
        },

        exec_downrange: function () {
            this.$dep.downRange();
        },

        exec_updatefocus: function (row, col) {
            this.$dep.updateFocus(row, col);
        },

        exec_move: function (rowCount, colCount) {
            this.$dep.move(rowCount, colCount);
        },

        query_range: function () {
            return this.$dep.getActiveRange();
        },

        query_allrange: function () {
            return this.$dep.getRanges();
        }
    });
});