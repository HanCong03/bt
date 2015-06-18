/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'comment',

        $exec: ['comment', 'clearcomment'],

        exec_comment: function (content, row, col) {
            this.getAPI().setComment(content, row, col);
        },

        exec_clearcomment: function (start, end) {
            this.getAPI().removeComment(start, end);
        }
    });
});