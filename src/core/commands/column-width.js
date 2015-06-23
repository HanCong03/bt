/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'columnWidth',

        $query: [
            'columnwidth'
        ],

        query_columnwidth: function (col) {
            return this.$dep.getColumnWidth(col);
        }
    });
});