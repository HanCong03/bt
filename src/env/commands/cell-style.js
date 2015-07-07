/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'cellStyle',

        $exec: [
            'cellstyle',
        ],

        exec_cellstyle: function (csid, start, end) {
            this.$dep.applyCellStyle(csid, start, end);
        }
    });
});