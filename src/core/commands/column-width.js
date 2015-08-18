/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'columnWidth',

        commands: {
            columnwidth: {
                exec: function (wdith, startCol, endCol) {
                    this.$dep.setColumnWidth(wdith, startCol, endCol);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start.col, range.end.col);

                    return args;
                },

                query: function (col) {
                    return this.$dep.getColumnWidth(col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.col];

                    return args;
                }
            },

            bestfitcolumnwidth: {
                exec: function (col) {
                    this.$dep.setBestFitColumnWidth(col);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.entry.col);

                    return args;
                }
            }
        }
    });
});