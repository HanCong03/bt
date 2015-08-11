/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'content',

        $exec: [
            'content',
            'rangecontent'
        ],

        exec_content: function (value, row, col, isCESMode) {
            this.$dep.setContent(value, row, col, isCESMode);
        },

        exec_rangecontent: function (content, row, col, ranges) {
            this.$dep.setRangeContent(content, row, col, ranges);
        }
    });
});