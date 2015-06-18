/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'view',

        $exec: [
            'gridline',
            'showgridline',
            'hidegridline',

            'header',
            'showheader',
            'hideheader',

            'pane',
            'clearpane',

            // 设置默认列宽，行高
            'defaultrowheight',
            'defaultcolumnwidth'
        ],

        $query: [
            'defaultrowheight',
            'defaultcolumnwidth',
            'hideallrow',
            'hideallcolumn'
        ],

        /* ------ exec start ---- */
        // gridline
        exec_gridline: function () {
            var api = this.getAPI();
            api.setGridLine(!api.getGridLine());
        },

        exec_showgridline: function () {
            this.getAPI().setGridLine(true);
        },

        exec_hidegridline: function () {
            this.getAPI().setGridLine(false);
        },

        // header
        exec_header: function () {
            var api = this.getAPI();
            api.setRowColHeader(!api.getRowColHeader());
        },

        exec_showheader: function () {
            this.getAPI().setRowColHeader(true);
        },

        exec_hideheader: function () {
            this.getAPI().setRowColHeader(false);
        },

        // pane
        exec_pane: function (start, end) {
            this.getAPI().setPane(start, end);
        },

        exec_clearpane: function () {
            this.getAPI().clearPane();
        },

        exec_defaultrowheight: function (height) {
            this.getAPI().setDefaultRowHeight(height);
        },

        exec_defaultcolumnwidth: function (width) {
            this.getAPI().setDefaultColWidth(width);
        },

        /* -------- query start -------- */
        // default row height
        query_defaultrowheight: function () {
            return this.getAPI().getDefaultRowHeight();
        },

        // defualt column width
        query_defaultcolumnwidth: function () {
            return this.getAPI().getDefaultColWidth();
        },

        query_hideallrow: function () {
            return this.getAPI().isHideAllRow();
        },

        query_hideallcolumn: function () {
            return this.getAPI().isHideAllCol()
        }
    });
});