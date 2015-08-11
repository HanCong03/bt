/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'workbook',

        $exec: [
            'addsheet'
        ],

        $query: [
            'activesheetindex'
        ],

        exec_addsheet: function (sheetName) {
            return this.$dep.addSheet(sheetName);
        },

        query_activesheetindex: function () {
            return this.$dep.getActiveSheetIndex();
        }
    });
});