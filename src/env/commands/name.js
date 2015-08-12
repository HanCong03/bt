/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'name',

        commands: {
            name: {
                exec: function (name, ref, refSheet, scope, comment) {
                    return this.$dep.defineName(name, ref, refSheet, scope, comment);
                },

                exec_arguments: function (args) {
                    return args;
                },

                query: function (name) {
                    return this.$dep.getNameDefine(name);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            validname: {
                query: function (name, scope) {
                    return this.$dep.getName(name, scope);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});