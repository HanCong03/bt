/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RowColumn', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'get.row.height': this.getRowHeight,
                'get.column.width': this.getColumnWidth,

                'set.row.height': this.setRowHeight,
                'set.column.width': this.setColumnWidth
            });
        },

        setRowHeight: function (height, startIndex, endIndex) {
            this.__$api.setRowHeight(height, startIndex, endIndex);
        },

        setColumnWidth: function (width, startIndex, endIndex) {
            this.__$api.setColumnWidth(width, startIndex, endIndex);
        },

        getRowHeight: function (row) {
            return this.__$api.getRowHeight(row);
        },

        getColumnWidth: function (col) {
            return this.__$api.getColumnWidth(col);
        },

        hideRow: function (startIndex, endIndex) {
            this.__$api.hideRow(startIndex, endIndex);
        },

        hideColumn: function (startIndex, endIndex) {
            this.__$api.hideColumn(startIndex, endIndex);
        },

        showRow: function (startIndex, endIndex) {
            this.__$api.showRow(startIndex, endIndex);
        },

        showCol: function (startIndex, endIndex) {
            this.__$api.showCol(startIndex, endIndex);
        },

        isHiddenRow: function (row) {
            return this.__$api.isHiddenRow(row);
        },

        isHiddenColumn: function (col) {
            return this.__$api.isHiddenColumn(col);
        }
    });
});