/**
 * @file 提供边框存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RowColumn', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        setRowHeight: function (height, startIndex, endIndex) {
            this.__$api.setRowHeight(height, startIndex, endIndex);
        },

        setColWidth: function (width, startIndex, endIndex) {
            this.__$api.setColWidth(width, startIndex, endIndex);
        },

        getRowHeight: function (row) {
            return this.__$api.getRowHeight(row);
        },

        getColWidth: function (col) {
            return this.__$api.getColWidth(col);
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