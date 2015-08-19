/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'frozen',

        commands: {
            frozen: {
                exec: function () {
                    this.$dep.frozen();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            frozenfirstrow: {
                exec: function () {
                    this.$dep.frozenFirstRow();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            frozenfirstcolumn: {
                exec: function () {
                    this.$dep.frozenFirstColumn();
                },

                exec_arguments: function (args) {
                    return args;
                }
            },

            cancelfrozen: {
                exec: function () {
                    this.$dep.cancelFrozen();
                },

                exec_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});