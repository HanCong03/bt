/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'workbook',

        $query: [
            'activesheetindex'
        ],

        query_activesheetindex: function () {
            return this.$dep.getActiveSheetIndex();
        }
    });
});