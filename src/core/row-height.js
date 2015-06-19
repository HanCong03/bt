/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RowHeight', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initService();

            var _self = this;
            window.setTimeout(function () {
                console.log(_self.getRowHeight(3));
            }, 0);
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initService: function () {
            this.registerService({

            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.heights)) {
                return;
            }

            heap.heights = [];
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
            if (this.queryCommandValue('hiddenrow', row)) {
                return 0;
            }

            // 检查是否有显式设定的行高
            var rowHeight = this.queryCommandValue('rowheight', row);

            if ($$.isDefined(rowHeight)) {
                return rowHeight;
            }

            return this.__autoHeight(row);
        },

        /**
         * 计算指定行的自动高度
         * @param row
         * @returns {*}
         * @private
         */
        __autoHeight: function (row) {
            var dimension = this.queryCommandValue('dimension');
            var standard = this.queryCommandValue('standard');

            if (dimension.max.row < row || dimension.min.row > row) {
                return standard.height;
            }

            var cells = this.__getCells(row, dimension.min.col, dimension.max.col);

            return cells;
        },

        __getCells: function (row, startCol, endCol) {
            var cells = [];
            var font;
            var fontsize;

            for (var i = startCol; i <= endCol; i++) {
                font = this.queryCommandValue('userfont', row, i);
                fontsize = this.queryCommandValue('userfontsize', row, i);

                cells[i] = {
                    font: this.queryCommandValue('userfont', row, i),
                    fontsize: this.queryCommandValue('userfontsize', row, i),
                    content: this.rs('get.display.content', row, i)
                };
            }

            if (cells.length === 0) {
                return null;
            }

            return cells;
        }
    });
});