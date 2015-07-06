/**
 * @file 提供对单元格最终样式的读取服务；仅提供只读接口。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('FinalStyle', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        getFinalFonts: function (row, col) {
            return this.__$api.getFinalClassifyStyle('fonts', row, col);
        },

        getFinalAlignments: function (row, col) {
            return this.__$api.getFinalClassifyStyle('alignments', row, col);
        },

        getFinalFont: function (row, col) {
            return this.__$api.getFinalStyle('name', row, col);
        },

        getFinalHorizontal: function (row, col) {
            return this.__$api.getFinalStyle('horizontal', row, col);
        }
    });
});