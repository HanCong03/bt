/**
 * @file 单元格标准大小：列宽、行高
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('StandardSize', {
        base: require('module'),

        init: function () {
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'ready': this.recalculate
            });
        },

        /**
         * 计算标准列宽和行高
         */
        recalculate: function () {
            var heap = this.getActiveHeap();


        }
    });
});
