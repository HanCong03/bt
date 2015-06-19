/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'content',

        $exec: [
            'read' // 是“content”的同义词
        ],

        $query: [
            'content',
            'contenttype',
            'contentinfo'
        ],

        exec_read: function (row, col) {
            return this.$dep.getContent(row, col);
        },

        query_content: function (row, col) {
            return this.$dep.getContent(row, col);
        },

        query_contenttype: function (row, col) {
            return this.$dep.getContentType(row, col);
        },

        query_contentinfo: function (row, col) {
            return this.$dep.getContentInfo(row, col);
        }
    });
});