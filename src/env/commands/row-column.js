/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'rowColumn',

        commands: {
            rawrowheight: {
                exec: function (height, startIndex, endIndex) {
                    return this.$dep.setRowHeight(height, startIndex, endIndex);
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

            rawcolumnwidth: {
                exec: function (width, startIndex, endIndex) {
                    return this.$dep.setColumnWidth(width, startIndex, endIndex);
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

            hiderow: {
                exec: function (startIndex, endIndex) {
                    return this.$dep.hideRow(startIndex, endIndex);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.end.row];

                    return args;
                },

                query: function (row) {
                    return this.$dep.isHiddenRow(row);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row];

                    return args;
                }
            },

            hidecolumn: {
                exec: function (startIndex, endIndex) {
                    return this.$dep.hideColumn(startIndex, endIndex);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.col, range.end.col];

                    return args;
                },

                query: function (col) {
                    return this.$dep.isHiddenColumn(col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.col];

                    return args;
                }
            },

            showrow: {
                exec: function (startIndex, endIndex) {
                    return this.$dep.showRow(startIndex, endIndex);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.end.row];

                    return args;
                }
            },

            showcolumn: {
                exec: function (startIndex, endIndex) {
                    return this.$dep.showCol(startIndex, endIndex);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.col, range.end.col];

                    return args;
                }
            },

            removerowheight: {
                exec: function (row) {
                    this.$dep.removeRowHeight(row);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            removecolumnwidth: {
                exec: function (col) {
                    this.$dep.removeColumnWidth(col);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            bestfitrowheight: {
                query: function (row) {
                    return this.$dep.isBestFitRowHeight(row);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            bestfitcolumnwidth: {
                query: function (col) {
                    return this.$dep.isBestFitColumnWidth(col);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});