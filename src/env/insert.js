/**
 * @file 插入行列，单元格
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Dimension', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        insertTopCell: function (row, col) {
            this.__$api.insertCell('top', row, col);
        },

        insertLeftCell: function (row, col) {
            this.__$api.insertCell('left', row, col);
        }
    });
});