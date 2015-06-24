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

        $query: [
            'merge'
        ],

        exec_mergecell: function (start, end) {
            this.$dep.mergeCell(start, end);
        },

        exec_unmergecell: function (start, end) {
            this.$dep.unmergeCell(start, end);
        },

        exec_togglemergecell: function (start, end) {
            this.$dep.toggleMergeCell(start, end);
        },

        /**
         * 查询给定的区域中是否包含合并后的单元格，如果包含，则返回这些合并后单元格的根单元格。
         * @param start
         * @param end
         */
        query_merge: function (start, end) {
            return this.$dep.getMergeCells(start, end);
        }
    });
});