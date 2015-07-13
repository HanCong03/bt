/**
 * @file 插入行列，单元格
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Insert', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        insertTopCell: function (start, end) {
            this.__$api.insertCell('top', start, end);
        },

        insertLeftCell: function (start, end) {
            this.__$api.insertCell('left', start, end);
        },

        insertRow: function (start, end) {
            this.__$api.insertRow(start, end);
        },

        insertColumn: function (start, end) {
            this.__$api.insertColumn(start, end);
        }
    });
});