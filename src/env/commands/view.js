/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'view',

        $exec: [
            'gridline',
            'showgridline',
            'hidegridline',

            'header',
            'showheader',
            'hideheader',

            'pane',
            'clearpane'
        ],

        $query: [
            'gridline',
            'header',
            'pane',
            'hiddenallrow',
            'hiddenallcolumn'
        ],

        /* ------ exec start ---- */
        // gridline
        exec_gridline: function () {
            this.$dep.toggleGridLine();
        },

        exec_showgridline: function () {
            this.$dep.setGridLine(true);
        },

        exec_hidegridline: function () {
            this.$dep.setGridLine(false);
        },

        // header
        exec_header: function () {
            this.$dep.toggleRowColHeader();
        },

        exec_showheader: function () {
            this.$dep.setRowColHeader(true);
        },

        exec_hideheader: function () {
            this.$dep.setRowColHeader(false);
        },

        // pane
        exec_pane: function (start, end) {
            this.$dep.setPane(start, end);
        },

        exec_clearpane: function () {
            this.$dep.clearPane();
        },

        /* -------- query start -------- */
        query_gridline: function () {
            return this.$dep.gridlineIsVisible();
        },

        query_header: function () {
            return this.$dep.headerIsVisible();
        },

        query_pane: function () {
            return this.$dep.getPane();
        },

        query_hiddenallrow: function () {
            return this.$dep.isHideAllRow();
        },

        query_hiddenallcolumn: function () {
            return this.$dep.isHideAllColumn()
        }
    });
});