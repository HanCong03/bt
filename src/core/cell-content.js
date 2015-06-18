/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CellContent', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initEvent();
            this.__initService();

            var _self = this;
            window.setTimeout(function () {
                _self.execCommand('color', 'red', {
                    row: 0,
                    col: 0
                }, {
                    row: 4,
                    col: 4
                });
                console.log(_self.getRowHeight(3));
            }, 0);
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

            heap.widths = [];
            heap.heights = [];
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
            // 当前行被隐藏，则直接返回
            if (this.queryCommandValue('hiderow', row)) {
                return 0;
            }

            // 检查是否有显式设定的行高
            var rowHeight = this.queryCommandValue('rowheight', row);

            if ($$.isDefined(rowHeight)) {
                return rowHeight;
            }

            // 否则，通过计算得到行高
            var rowData = this.rs('get.row.data', row);

            // 该行无有效数据，则返回标准行高
            if (!rowData) {
                return this.rs('get.standard.height');
            }

            console.log(rowData)
        }
    });
});