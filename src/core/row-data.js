/**
 * @file 行单元格数据维护组件
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RowData', {
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
                'get.row.data': this.getRowData
            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.rows)) {
                return;
            }

            heap.rows = [];
            heap.cols = [];
        },

        getRowData: function (row) {
            var dimension = this.queryCommandValue('dimension');

            if (dimension.max.row < row || dimension.min.row > row) {
                return null;
            }

            var cells = [];
            var contentInfo;
            var fullStyle;

            for (var i = dimension.min.col, limit = dimension.max.col; i <= limit; i++) {
                contentInfo = this.queryCommandValue('contentinfo', row, i);
                fullStyle = this.rs('get.full.style', row, i);

                // 无样式和内容，则跳过
                if (!contentInfo && !fullStyle) {
                    continue;
                }

                cells[i] = {
                    style: fullStyle || null,
                    content: contentInfo || null
                };
            }

            return cells;
        }
    });
});