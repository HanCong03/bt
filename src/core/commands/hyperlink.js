/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'hyperlink',

        commands: {
            hyperlink: {
                exec: function (text, link, row, col) {
                    this.$dep.setHyperlink(text, link, row, col);
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
                    return this.$dep.getHyperlink(row, col);
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

            containhyperlink: {
                query: function (start, end) {
                    return this.$dep.hasHyperlink(start, end);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    return [range.start, range.end];
                }
            },

            clearhyperlink: {
                exec: function (start, end) {
                    this.$dep.clearHyperlink(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    return [range.start, range.end];
                }
            }
        }
    });
});