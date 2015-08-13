/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'mergeCell',

        commands: {
            mergecell: {
                exec: function (start, end) {
                    this.$dep.mergeCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                /**
                 * 查询给定的区域中是否包含合并后的单元格，如果包含，则返回这些合并后单元格的根单元格。
                 * @param start
                 * @param end
                 */
                query: function (start, end) {
                    if (typeof start === 'number') {
                        return this.$dep.getMergeCell(start, end);
                    }

                    return this.$dep.getMergeCells(start, end);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            unmergecell: {
                exec: function (start, end) {
                    this.$dep.unmergeCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            centermergecell: {
                exec: function (start, end) {
                    this.$dep.centerMergeCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            togglemergecell: {
                exec: function (start, end) {
                    this.$dep.toggleMergeCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            }
        }
    });
});