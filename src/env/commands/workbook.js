/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'workbook',

        $exec: [
            'addsheet',
            'switchsheet'
        ],

        $query: [
            'activesheetindex',
            'sheetnames'
        ],

        exec_addsheet: function (sheetName) {
            return this.$dep.addSheet(sheetName);
        },

        exec_switchsheet: function (index) {
            return this.$dep.switchSheet(index);
        },

        query_activesheetindex: function () {
            return this.$dep.getActiveSheetIndex();
        },

        query_sheetnames: function () {
            return this.$dep.getSheetNames();
        }
    });
});