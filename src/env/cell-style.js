/**
 * @file 提供单元格样式存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CellStyle', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        applyCellStyle: function (csid, start, end) {
            this.__$api.applyCellStyle(csid, start, end);
        }
    });
});