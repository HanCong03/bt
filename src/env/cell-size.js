/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CellSize', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
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

        },

        __initService: function () {
            this.registerService({

            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.widths)) {
                return;
            }

            heap.widths = {};
            heap.heights = {};
        },

        getColumnWidth: function (col) {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.widths[col])) {
                return heap.widths[col];
            }
        },

        getRowHeight: function (row) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.heights[row])) {
                heap.heights[row] = this.__calculateRowHeight(row);
            }

            return heap.heights[row];
        },

        /**
         * 计算指定行的高度
         * @param row
         * @private
         */
        __calculateRowHeight: function (row) {
            var rowCells = this.rs('get.row.cells', row);
        }
    });
});