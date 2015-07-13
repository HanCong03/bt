/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'insert',

        $exec: [
            'inserttopcell',
            'insertleftcell',
            'insertrow',
            'insertcolumn'
        ],

        exec_inserttopcell: function (start, end) {
            this.$dep.insertTopCell(start, end);
        },

        exec_insertleftcell: function (start, end) {
            this.$dep.insertLeftCell(start, end);
        },
        
        exec_insertrow: function (start, end) {
            this.$dep.insertRow(start, end);
        },

        exec_insertcolumn: function (start, end) {
            this.$dep.insertColumn(start, end);
        }
    });
});