/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'insert',

        commands: {
            inserttopcell: {
                exec: function (start, end) {
                    this.$dep.insertTopCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            insertleftcell: {
                exec: function (start, end) {
                    this.$dep.insertLeftCell(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            insertrow: {
                exec: function (start, end) {
                    this.$dep.insertRow(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            insertcolumn: {
                exec: function (start, end) {
                    this.$dep.insertColumn(start, end);
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