/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'content',

        $exec: [
            'content'
        ],

        exec_content: function (value, row, col, isCESMode) {
            this.$dep.setContent(value, row, col, isCESMode);
        }
    });
});