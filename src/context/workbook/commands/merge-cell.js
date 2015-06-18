/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'mergeCell',

        $exec: ['mergecell', 'unmergecell', 'togglemergecell'],

        exec_mergecell: function (start, end) {
            this.getAPI().mergeCell(start, end);
        },

        exec_unmergecell: function (start, end) {
            this.getAPI().unmergeCell(start, end);
        },

        exec_togglemergecell: function (start, end) {
            this.getAPI().toggleMergeCell(start, end);
        }
    });
});