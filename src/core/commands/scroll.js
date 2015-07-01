/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'visualData',
        $datachange: false,

        $exec: [
            'scroll',
            'scrollin',
            'directivityscroll'
        ],

        exec_scroll: function (rowCount, colCount) {
            this.$dep.scroll(rowCount, colCount);
        },

        exec_scrollin: function (start, end) {
            this.$dep.scrollIn(start, end);
        },

        exec_directivityscroll: function (rowCount, colCount) {
            this.$dep.directivityScroll(rowCount, colCount);
        }
    });
});