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
                    args.push(range.start.row);
                    args.push(range.end.row);

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

            exec_bestfitrowheight: {
                exec: function (height, row) {
                    this.$dep.setBestFitRowHeight(height, row);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});