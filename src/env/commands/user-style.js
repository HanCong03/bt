/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'userStyle',

        commands: {
            userfont: {
                query: function (row, col) {
                    return this.$dep.getFont(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userfontsize: {
                query: function (row, col) {
                    return this.$dep.getFontSize(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            usercolor: {
                query: function (row, col) {
                    return this.$dep.getColor(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            usernumfmt: {
                query: function (row, col) {
                    return this.$dep.getNumberFormat(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userbold: {
                query: function (row, col) {
                    return this.$dep.isBold(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            useritalic: {
                query: function (row, col) {
                    return this.$dep.isItalic(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userunderline: {
                query: function (row, col) {
                    return this.$dep.getUnderline(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userthroughline: {
                query: function (row, col) {
                    return this.$dep.hasThroughline(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userfill: {
                query: function (row, col) {
                    return this.$dep.getFill(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userhalign: {
                query: function (row, col) {
                    return this.$dep.getHorizontalAlign(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            uservalign: {
                query: function (row, col) {
                    return this.$dep.getVerticalAlign(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userwraptext: {
                query: function (row, col) {
                    return this.$dep.isWraptext(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            userfonts: {
                query: function (row, col) {
                    return this.$dep.getFonts(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            }
        }
    });
});