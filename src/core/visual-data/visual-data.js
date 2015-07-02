/**
 * @file 可视化数据对象 --- 包含布局数据，供上层渲染使用
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = $$.createClass('VisualData', {
        base: require('module'),

        mixin: [
            require('./collector/row'),
            require('./collector/col'),
            require('./scroll'),
            require('./scroll-in'),
            require('./scroll-to'),
            require('./directivity-scroll')
        ],

        init: function () {
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                ready: this.__initHeap,
                datachange: this.refresh
            });
        },

        __initService: function () {
            this.registerService({
                'get.visual.data': this.getVisualData,
                'scrollin': this.scrollIn
            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            heap.row = 0;
            heap.col = 0;

            this.__refresh();
        },

        getVisualData: function () {
            return this.getActiveHeap();
        },

        refresh: function () {
            this.__refresh();

            this.emit('refresh');
        },

        /**
         * 刷新操作
         * 注：最终所有的滚动操作都会调用该操作刷新可视化数据对象
         * @private
         */
        __refresh: function () {
            var heap = this.getActiveHeap();
            var containerSize = this.getContentContainerSize();

            heap.pane = this.queryCommandValue('pane');

            // 头部高度
            heap.headHeight = this.queryCommandValue('standardheight');
            this.__refreshRow(containerSize.height - heap.headHeight);

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);
            this.__refreshColumn(containerSize.width - heap.headWidth);
        },

        /**
         * 必须先计算行，才能计算列
         * @private
         */
        __refreshRow: function (spaceHeight) {
            var heap = this.getActiveHeap();
            var start = this.__getMinStart();

            if (heap.row < start.row) {
                heap.row = start.row;
            }

            var rowInfo = this.__collectRowInfo(spaceHeight);

            // 行索引
            heap.rows = rowInfo.indexes;
            // 行高列表
            heap.rowHeights = rowInfo.heights;
            // 行网格线列表
            heap.rowPoints = rowInfo.points;
            // 可用空间高度
            heap.spaceHeight = rowInfo.space;
            // 行数
            heap.rowCount = rowInfo.count;
            // 行结束索引
            heap.endRow = rowInfo.indexes[rowInfo.count - 1];
            // 可见内容区域高度
            heap.boundaryHeight = rowInfo.boundary;
            // 行映射
            heap.rMap = rowInfo.rMap;
        },

        /**
         * 必须先计算行，才能计算列
         * @private
         */
        __refreshColumn: function (spaceWidth) {
            var heap = this.getActiveHeap();
            var start = this.__getMinStart();

            if (heap.col < start.col) {
                heap.col = start.col;
            }

            var colInfo = this.__collectColumnInfo(spaceWidth);

            // 列索引
            heap.cols = colInfo.indexes;
            // 列宽列表
            heap.colWidths = colInfo.widths;
            // 列网格线绘制点
            heap.colPoints = colInfo.points;
            // 可用空间宽度
            heap.spaceWidth = colInfo.space;
            // 列数
            heap.colCount = colInfo.count;
            // 列结束索引
            heap.endCol = colInfo.indexes[colInfo.count - 1];
            // 可见内容区域宽度
            heap.boundaryWidth = colInfo.boundary;
            // 列映射
            heap.cMap = colInfo.cMap;
        },

        __getMinStart: function () {
            var pane = this.queryCommandValue('pane');

            if ($$.isNdef(pane)) {
                return {
                    row: 0,
                    col: 0
                };
            } else {
                return {
                    row: pane.start.row,
                    col: pane.start.col
                };
            }
        },

        __calculateHeadWidth: function (rowIndex) {
            // 所有行被隐藏，则默认按3个字符计算
            var count;

            if ($$.isNdef(rowIndex)) {
                count = 3;
            } else {
                count = (rowIndex[rowIndex.length - 1] + '').length;
            }

            // 左右各增加一个字符，以放置padding空间
            count += 2;

            return Math.round(this.rs('get.char.unit') * count);
        }
    });
});