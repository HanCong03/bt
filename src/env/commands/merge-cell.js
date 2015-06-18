/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'mergeCell',

        $exec: [
            'mergecell',
            'unmergecell',
            'togglemergecell'
        ],

        exec_mergecell: function (start, end) {
            this.$dep.mergeCell(start, end);
        },

        exec_unmergecell: function (start, end) {
            this.$dep.unmergeCell(start, end);
        },

        exec_togglemergecell: function (start, end) {
            this.$dep.toggleMergeCell(start, end);
        }
    });
});