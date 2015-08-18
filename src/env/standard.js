/**
 * @file 单元格标准大小：列宽、行高
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_V_PADDING = 2 * CELL_PADDING.v;
    var DOUBLE_H_PADDING = 2 * CELL_PADDING.h;

    module.exports = $$.createClass('StandardSize', {
        base: require('env-module'),

        shadowBox: null,

        // 单位字符的px大小值
        charUnit: 0,

        init: function () {
            this.__initShadowBox();
            this.__initService();
            this.__initEvent();
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initService: function () {
            this.registerService({
                'get.char.unit': this.getCharUnit
            });
        },

        __initEvent: function () {
            this.on({
                'beforedataready': this.__onBeforeDataReady,
                'standardchange': this.__recalculate
            });
        },

        __onBeforeDataReady: function () {
            this.shadowBox.style.fontSize = '11pt';
            this.shadowBox.style.fontFamily = this.getAPI().getStandardFont();
            this.shadowBox.innerHTML = '1234567890';

            this.__recalculate();
        },

        getCharUnit: function () {
            return this.charUnit;
        },

        /**
         * 计算标准列宽和行高
         */
        __recalculate: function () {
            var heap = this.getWorkbookHeap();
            var minorFont = this.queryCommandValue('minorfont');

            this.shadowBox.style.fontFamily = minorFont;

            var unit = this.shadowBox.offsetWidth / 10;

            this.charUnit = unit;

            heap.width = Math.round(this.getAPI().getStandardWidth() * unit) + DOUBLE_H_PADDING;
            heap.height = Math.round(this.getAPI().getStandardHeight() * 4 / 3) + DOUBLE_V_PADDING;
        },

        getStandard: function () {
            return {
                font: this.getStandardFont(),
                fontsize: this.getStandardFontSize(),
                color: this.getStandardColor(),
                width: this.getStandardWidth(),
                height: this.getStandardHeight()
            };
        },

        getStandardFontSize: function () {
            return this.getAPI().getStandardFontSize();
        },

        getStandardFont: function () {
            return this.getAPI().getStandardFont();
        },

        getStandardColor: function () {
            return this.getAPI().getStandardColor();
        },

        getStandardWidth: function () {
            var heap = this.getWorkbookHeap();
            return heap.width;
        },

        getStandardHeight: function () {
            var heap = this.getWorkbookHeap();
            return heap.height;
        }
    });
});
