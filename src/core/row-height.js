/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_V_PADDIGN = 2 * CELL_PADDING.v;

    module.exports = $$.createClass('RowHeight', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initBoxSetting();
            this.__initEvent();
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.shadowBox.style.cssText = 'line-height: 1';
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.heights)) {
                return;
            }

            heap.heights = [];
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.__onContentChange
            });
        },

        /**
         * 在底层theme发生改变之后，需要重新初始化shadow-box的style
         * @private
         */
        __initBoxSetting: function () {
            //var standard = this.queryCommandValue('standard');
            //$(this.shadowBox).css({
            //    fontFamily: standard.font,
            //    fontSize: standard.fontsize + 'pt'
            //});
        },

        getRowHeight: function (row) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.heights[row])) {
                heap.heights[row] = this.__calculateRowHeight(row);
            }

            return heap.heights[row];
        },

        __onContentChange: function (start, end) {
            var heap = this.getActiveHeap();

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if (heap.heights[i] !== undefined) {
                    delete heap.heights[i];
                }
            }
        },

        /**
         * 计算指定行的高度
         * @param row
         * @private
         */
        __calculateRowHeight: function (row) {
            // 检查是否有显式设定的行高
            var rowHeight = this.rs('get.row.height', row);

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

            // 当前行无有效数据，则返回标准高度
            if ($$.isNdef(cells)) {
                return standard.height;
            }

            return Math.max(standard.height, this.__calculateHeight(cells));
        },

        __getCells: function (row, startCol, endCol) {
            var cells = [];
            var font;
            var fontsize;
            var current;

            var defaultFont = this.queryCommandValue('minorfont');
            var defaultSize = this.queryCommandValue('basesize');

            for (var i = startCol; i <= endCol; i++) {
                font = this.queryCommandValue('userfont', row, i);
                fontsize = this.queryCommandValue('userfontsize', row, i);

                current = {
                    font: this.queryCommandValue('userfont', row, i),
                    fontsize: this.queryCommandValue('userfontsize', row, i),
                    content: this.rs('get.display.content', row, i)
                };

                if (current.font === null
                    && current.fontsize === null
                    && current.content === null) {

                    // 全为空，则跳过该单元格
                    continue;
                } else {
                    if (current.font === null) {
                        current.font = defaultFont;
                    }

                    if (current.fontsize === null) {
                        current.fontsize = defaultSize;
                    }

                    // 默认内容
                    if (current.content === null) {
                        current.content = '0';
                    }

                    cells.push(current);
                }
            }

            if (cells.length === 0) {
                return null;
            }

            return cells;
        },

        __calculateHeight: function (cells) {
            var box = this.shadowBox;
            var height = 0;

            $$.forEach(cells, function (cell) {
                box.innerHTML = buildHTML(cell);

                var nodes = box.firstChild.children;
                var rect;

                for (var i = 0, len = nodes.length; i < len; i++) {
                    rect = nodes[i].getBoundingClientRect();

                    height += rect.height;
                }
            });

            return height + DOUBLE_V_PADDIGN;
        }
    });

    function buildHTML(cell) {
        var contents = [];
        var html = '<div style="font-family: ${font}; font-size: ${fontsize}pt;">${content}</div>';

        if (cell.content) {
            $$.forEach(cell.content, function (rowContent) {
                contents.push('<span>' + rowContent + '</span>');
            });
        }

        return $$.tpl(html, {
            font: cell.font,
            fontsize: cell.fontsize,
            content: contents.join('')
        });
    }
});