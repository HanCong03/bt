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
                query: function (row, col) {
                    return this.$dep.getContent(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            contenttype: {
                query: function (row, col) {
                    return this.$dep.getContentType(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            contentinfo: {
                query: function (row, col) {
                    return this.$dep.getContentInfo(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            formula: {
                query: function (row, col) {
                    return this.$dep.getFormula(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            formulatype: {
                query: function (row, col) {
                    return this.$dep.getFormulaType(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            formulainfo: {
                query: function (row, col) {
                    return this.$dep.getFormulaInfo(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            rangecontentinfo: {
                query: function (start, end) {
                    return this.$dep.getContentInfoByRange(start, end);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            }
        }
    });
});