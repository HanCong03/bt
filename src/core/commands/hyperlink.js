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
                    args = [range.entry.col, range.entry.col];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getHyperlink(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            clearhyperlink: {
                exec: function (start, end) {
                    this.$dep.clearHyperlink(start, end);
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