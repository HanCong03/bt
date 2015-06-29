/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'visualData',
        $datachange: false,

        $exec: [
            'scroll'
        ],

        exec_scroll: function (rowCount, colCount) {
            this.$dep.scroll(rowCount, colCount);
        }
    });
});