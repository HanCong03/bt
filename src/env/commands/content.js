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

        $query: [
            'read', // 是“content”的同义词
            'content',
            'contenttype',
            'contentinfo'
        ],

        exec_write: function (value, contentType, row, col) {
            this.$dep.setContent(value, contentType, row, col);
        },

        exec_content: function (value, contentType, row, col) {
            this.$dep.setContent(value, contentType, row, col);
        },

        query_read: function (row, col) {
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