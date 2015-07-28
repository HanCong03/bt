/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'name',

        $exec: [
            'name'
        ],

        $query: [
            'name',
            'validname'
        ],

        exec_name: function (name, ref, refSheet, scope, comment) {
            return this.$dep.defineName(name, ref, refSheet, scope, comment);
        },

        query_name: function (name) {
            return this.$dep.getNameDefine(name);
        },

        query_validname: function (name, scope) {
            return this.$dep.getName(name, scope);
        }
    });
});