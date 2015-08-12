/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'content',

        commands: {
            content: {
                exec: function (value, row, col, isCESMode) {
                    return this.$dep.setContent(value, row, col, isCESMode);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.splice(1, 0, range.entry.row, range.entry.col);

                    return args;
                }
            },

            rangecontent: {
                exec: function (content, row, col, ranges) {
                    return this.$dep.setRangeContent(content, row, col, ranges);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.splice(1, 0, range.entry.row, range.entry.col, range.start, range.end);

                    return args;
                }
            },

            clearcontent: {
                exec: function (start, end) {
                    return this.$dep.clearContent(start, end);
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