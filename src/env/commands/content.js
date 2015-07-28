/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'content',

        $query: [
            'content',
            'contenttype',
            'contentinfo',
            'rangecontentinfo'
        ],

        query_content: function (row, col) {
            return this.$dep.getContent(row, col);
        },

        query_contenttype: function (row, col) {
            return this.$dep.getContentType(row, col);
        },

        query_contentinfo: function (row, col) {
            return this.$dep.getContentInfo(row, col);
        },

        query_rangecontentinfo: function (start, end) {
            return this.$dep.getContentInfoByRange(start, end);
        }
    });
});