/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'selection',
        $datachange: false,

        $exec: [
            'move', 'range'
        ],

        $query: [
            'allrange', 'range'
        ],

        exec_range: function (start, end) {
            this.$dep.setRange(start, end);
        },

        exec_move: function (rowCount, colCount) {
            this.$dep.move(rowCount, colCount);
        },

        query_range: function () {
            return this.$dep.getRange();
        },

        query_allrange: function () {
            return this.$dep.getRanges();
        }
    });
});