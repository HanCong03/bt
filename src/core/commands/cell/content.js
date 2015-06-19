/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'content',

        $exec: [
            'write', // 是“content”的同义词
            'content'
        ],

        exec_write: function (value, row, col) {
            this.$dep.setContent(value, row, col);
        },

        exec_content: function (value, row, col) {
            this.$dep.setContent(value, row, col);
        }
    });
});