/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'visualData',

        commands: {
            scroll: {
                exec: function (rowCount, colCount) {
                    this.$dep.scroll(rowCount, colCount);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollrow: {
                exec: function (rowCount) {
                    this.$dep.scrollRow(rowCount);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollcolumn: {
                exec: function (colCount) {
                    this.$dep.scrollColumn(colCount);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollto: {
                exec: function (row, col) {
                    this.$dep.scrollTo(row, col);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollrowto: {
                exec: function (row) {
                    this.$dep.scrollRowTo(row);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollcolumnto: {
                exec: function (col) {
                    this.$dep.scrollColumnTo(col);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            scrollin: {
                exec: function (start, end) {
                    this.$dep.scrollIn(start, end);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});