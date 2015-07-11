/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'insert',

        $exec: [
            'inserttopcell',
            'insertleftcell'
        ],

        exec_inserttopcell: function (row, col) {
            this.$dep.insertTopCell(row, col);
        },

        exec_insertleftcell: function (row, col) {
            this.$dep.insertLeftCell(row, col);
        }
    });
});