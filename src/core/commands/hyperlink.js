/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'hyperlink',

        $exec: [
            'hyperlink',
            'clearhyperlink'
        ],

        $query: [
            'hyperlink'
        ],

        exec_hyperlink: function (text, link, row, col) {
            this.$dep.setHyperlink(text, link, row, col);
        },

        exec_clearhyperlink: function (start, end) {
            this.$dep.clearHyperlink(start, end);
        },

        query_hyperlink: function (row, col) {
            return this.$dep.getHyperlink(row, col);
        }
    });
});