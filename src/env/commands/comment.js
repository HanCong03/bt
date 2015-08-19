/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'comment',

        commands: {
            comment: {
                exec: function (content, row, col) {
                    this.$dep.setComment(content, row, col);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    var mergeInfo = this.queryCommandValue('mergecell', range.entry.row, range.entry.col);

                    if (mergeInfo) {
                        args.push(mergeInfo.start.row, mergeInfo.start.col);
                    } else {
                        args.push(range.entry.row, range.entry.col);
                    }

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getComment(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    var mergeInfo = this.queryCommandValue('mergecell', range.entry.row, range.entry.col);

                    if (mergeInfo) {
                        args.push(mergeInfo.start.row, mergeInfo.start.col);
                    } else {
                        args.push(range.entry.row, range.entry.col);
                    }

                    return args;
                }
            },

            clearcomment: {
                exec: function (start, end) {
                    this.$dep.clearComment(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    var mergeInfo = this.queryCommandValue('mergecell', range.entry.row, range.entry.col);

                    if (mergeInfo) {
                        args.push(mergeInfo.start.row, mergeInfo.start.col);
                    } else {
                        args.push(range.entry.row, range.entry.col);
                    }

                    return args;
                }
            }
        }
    });
});