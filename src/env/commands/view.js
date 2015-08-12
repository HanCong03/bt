/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'view',

        commands: {
            gridline: {
                exec: function () {
                    this.$dep.toggleGridLine();
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function () {
                    return this.$dep.gridlineIsVisible();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            showgridline: {
                exec: function () {
                    this.$dep.setGridLine(true);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            hidegridline: {
                exec: function () {
                    this.$dep.setGridLine(false);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            header: {
                exec: function () {
                    this.$dep.toggleRowColHeader();
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function () {
                    return this.$dep.headerIsVisible();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            showheader: {
                exec: function () {
                    this.$dep.setRowColHeader(true);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            hideheader: {
                exec: function () {
                    this.$dep.setRowColHeader(false);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            pane: {
                exec: function (start, end) {
                    this.$dep.setPane(start, end);
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function () {
                    return this.$dep.getPane();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            clearpane: {
                exec: function () {
                    this.$dep.clearPane();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            hiddenallrow: {
                query: function () {
                    return this.$dep.isHideAllRow();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            hiddenallcolumn: {
                query: function () {
                    return this.$dep.isHideAllColumn()
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});