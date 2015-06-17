/**
 * @file 单元格标准大小：列宽、行高
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STANDARD_SIZE = require('./definition/standard-size');

    module.exports = $$.createClass('StandardSize', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initEvent();
            this.__initService();
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.shadowBox.style.fontSize = '11pt';
            this.shadowBox.innerHTML = '1234567890';

            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initEvent: function () {
            this.on({
                'ready': this.recalculate
            });
        },

        __initService: function () {
            this.registerService({
                'get.standard.size': this.getStandardSize
            });
        },

        /**
         * 计算标准列宽和行高
         */
        recalculate: function () {
            var heap = this.getActiveHeap();
            var minorFont = this.queryCommandValue('minorfont');

            this.shadowBox.style.fontFamily = minorFont;

            var unit = this.shadowBox.offsetWidth / 10;

            heap.width = Math.round(STANDARD_SIZE.width * unit);
            heap.height = Math.round(STANDARD_SIZE.height * 4 / 3);
        },

        getStandardSize: function () {
            var heap = this.getActiveHeap();
            return {
                width: heap.width,
                height: heap.height
            };
        }
    });
});
