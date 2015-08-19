/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'selection',

        commands: {
            range: {
                exec: function (start, end, entry) {
                    this.$dep.setRange(start, end, entry);
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function () {
                    return this.$dep.getActiveRange();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            selectall: {
                exec: function () {
                    this.$dep.selectAll();
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function () {
                    return this.$dep.isSelectAll();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            allrange: {
                query: function () {
                    return this.$dep.getRanges();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            addrange: {
                exec: function (start, end, entry) {
                    this.$dep.addRange(start, end, entry);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            uprange: {
                exec: function () {
                    this.$dep.upRange();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            downrange: {
                exec: function () {
                    this.$dep.downRange();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            updatefocus: {
                exec: function (row, col) {
                    this.$dep.updateFocus(row, col);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            move: {
                exec: function (rowCount, colCount) {
                    this.$dep.move(rowCount, colCount);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            expandrange: {
                exec: function (rowDir, colDir) {
                    this.$dep.expand(rowDir, colDir);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            updaterange: {
                exec: function (start, end, entry) {
                    this.$dep.updateRange(start, end, entry);
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});