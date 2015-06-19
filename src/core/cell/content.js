/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CellContent', {
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

        setContent: function (content, row, col) {
            debugger;
        }
    });
});