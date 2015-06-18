/**
 * @file 显示内容管理模块
 * 提供对单元格的可视化内容的维护服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('DisplayContent', {
        base: require('module'),

        init: function () {
            //this.__initHeap();
            //this.__initEvent();
            //this.__initService();
            //
            //var _self = this;
            //window.setTimeout(function () {
            //    _self.execCommand('color', 'red', {
            //        row: 0,
            //        col: 0
            //    }, {
            //        row: 4,
            //        col: 4
            //    });
            //    console.log(_self.getRowHeight(3));
            //}, 0);
        },

        getDisplayContent: function (row, col) {

        }
    });
});