/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'rowHeight',

        commands: {
            rowheight: {
                exec: function (height, startRow, endRow) {
                    this.$dep.setRowHeight(height, startRow, endRow);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start.row, range.end.row);

                    return args;
                },

                query: function (row) {
                    return this.$dep.getRowHeight(row);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row];

                    return args;
                }
            },

            bestfitrowheight: {
                exec: function (row) {
                    this.$dep.setBestFitRowHeight(row);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    return [range.entry.row];
                }
            }
        }
    });
});