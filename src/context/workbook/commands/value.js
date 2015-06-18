/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'value',

        $exec: [
            'write'
        ],

        $query: [
            'content',
            'contenttype',
            'contentinfo'
        ],

        exec_write: function (value, contentType, row, col) {
            this.getAPI().write(value, contentType, row, col);
        },

        query_content: function (row, col) {
            return this.getAPI().getContent(row, col);
        },

        query_contenttype: function (row, col) {
            return this.getAPI().getContentType(row, col);
        },

        query_contentinfo: function (row, col) {
            return this.getAPI().getContentInfo(row, col);
        }
    });
});