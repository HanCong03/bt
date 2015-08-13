/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'workbook',

        commands: {
            addsheet: {
                exec: function (sheetName) {
                    return this.$dep.addSheet(sheetName);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            renamesheet: {
                exec: function (sheetName, index) {
                    return this.$dep.renameSheet(sheetName, index);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            switchsheet: {
                exec: function (index) {
                    return this.$dep.switchSheet(index);
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            activesheetindex: {
                query: function () {
                    return this.$dep.getActiveSheetIndex();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            sheetnames: {
                query: function () {
                    return this.$dep.getSheetNames();
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});