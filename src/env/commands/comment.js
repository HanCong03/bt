/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'comment',

        $exec: [
            'comment',
            'clearcomment'
        ],

        $query: [
            'comment'
        ],

        exec_comment: function (content, row, col) {
            this.$dep.setComment(content, row, col);
        },

        exec_clearcomment: function (start, end) {
            this.$dep.clearComment(start, end);
        },

        query_comment: function (row, col) {
            return this.$dep.getComment(row, col);
        }
    });
});