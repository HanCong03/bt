/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;

    module.exports = {
        __fill: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight)

            this.__doFill();

            screen.restore();
        },

        __doFill: function () {
            var fills = this.layoutData.fills;
            var cells = this.layoutData.cells;

            this.__fillGlobal(fills.global);
            this.__fillColumn(fills.cols);
            this.__fillRow(fills.rows);
            this.__fillCells(cells);
        },

        __fillGlobal: function (color) {
            if (!color) {
                return;
            }

            var screen = this.contentScreen;

            color = color.fill;

            if (typeof color !== 'string') {
                color = color.value;
            }

            screen.fillColor(color);
            screen.fillRect(0, 0, screen.getWidth(), screen.getHeight());
        },

        __fillColumn: function (cols) {
            var visualData = this.visualData;
            var colPoints = visualData.colPoints;
            var colWidths = visualData.colWidths;

            var screen = this.contentScreen;
            var height = screen.getHeight();
            var current;

            for (var i = 0, len = cols.length; i < len; i++) {
                current = cols[i];

                if (!current) {
                    continue;
                }

                current = current.fill;

                if (typeof current !== 'string') {
                    current = current.value;
                }

                screen.fillColor(current);
                screen.fillRect(colPoints[i] - OFFSET, 0, colWidths[i] + DOUBLE_LINE_WIDTH, height);
            }
        },

        __fillRow: function (rows) {
            var visualData = this.visualData;
            var rowPoints = visualData.rowPoints;
            var rowHeights = visualData.rowHeights;

            var screen = this.contentScreen;
            var width = screen.getWidth();
            var current;

            for (var i = 0, len = rows.length; i < len; i++) {
                current = rows[i];

                if (!current) {
                    continue;
                }

                current = current.fill;

                if (typeof current !== 'string') {
                    current = current.value;
                }

                screen.fillColor(current);
                screen.fillRect(0, rowPoints[i] - OFFSET, width, rowHeights[i] + DOUBLE_LINE_WIDTH);
            }
        },

        __fillCells: function (cells) {
            var rowCells;
            var mergecells = [];
            var result;

            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];

                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    if (!rowCells[j]) {
                        continue;
                    }

                    result = this.__fillCell(rowCells[j]);

                    if (result) {
                        mergecells.push(result);
                    }
                }
            }

            this.__fillMergeCells(mergecells);
        },

        __fillCell: function (cellInfo) {
            // 合并单元格最后处理
            if (cellInfo.mergecell) {
                return cellInfo;
            }

            if (!cellInfo.fills) {
                return;
            }

            var color = cellInfo.fills.fill;
            var row = cellInfo.row;
            var col = cellInfo.col;

            if (typeof color !== 'string') {
                color = color.value;
            }

            var rect = this.rs('get.visible.rect', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });

            // 注意：此时如果无颜色，则表示要清除当前单元格的颜色。
            if (!color) {
                this.__cleanNormalCell(rect, cellInfo.r, cellInfo.c);
            } else {
                this.__fillNormalCell(color, rect, cellInfo.r, cellInfo.c);
            }
        },

        __cleanNormalCell: function (rect, r, c) {
            var hasTop = this.__hasColor(c - 1, c);
            var hasLeft = this.__hasColor(r, c - 1);
            var hasRight = this.__hasColor(r, c + 1);
            var hasBottom = this.__hasColor(r + 1, c);

            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            var height = rect.height;

            if (!hasTop) {
                y -= LINE_WIDTH;
                height += LINE_WIDTH;
            }

            if (!hasLeft) {
                x -= LINE_WIDTH;
                width += LINE_WIDTH;
            }

            if (!hasRight) {
                width += LINE_WIDTH;
            }

            if (!hasBottom) {
                height += LINE_WIDTH;
            }

            this.contentScreen.clearRect(x, y, width, height);
        },

        __fillNormalCell: function (color, rect, r, c) {
            var screen = this.contentScreen;

            var rightColor = this.__getColor(r, c + 1);
            var bottomColor = this.__getColor(r + 1, c);

            var x = rect.x - LINE_WIDTH;
            var y = rect.y - LINE_WIDTH;
            var width = rect.width + LINE_WIDTH;
            var height = rect.height + LINE_WIDTH;

            screen.beginPath();

            // 填充自身的空间，同时把右侧计算进去
            screen.fillColor(color);

            if (!rightColor) {
                screen.fillRect(x, y, width + LINE_WIDTH, height);
            } else {
                screen.fillRect(x, y, width, height);
            }

            // 底部填充
            screen.strokeColor(bottomColor || color);
            // 下一行的右侧有背景色
            if (this.__hasColor(r + 1, c + 1)) {
                screen.hline(x, y + height + OFFSET, width);
            } else {
                screen.hline(x, y + height + OFFSET, width + LINE_WIDTH);
            }
            screen.stroke();
        },

        __fillMergeCells: function (mergecells) {
            for (var i = 0, len = mergecells[i]; i < len; i++) {

            }
        },

        __hasColor: function (r, c) {
            var color = this.__getRawColor(r, c);

            if (!color) {
                return false;
            }

            return !!color.fill;
        },

        __getColor: function (r, c) {
            var color = this.__getRawColor(r, c);

            if (!color || !color.fill) {
                return null;
            }

            if (typeof color.fill !== 'string') {
                return color.fill.value;
            }

            return color.fill;
        },

        __getRawColor: function (r, c) {
            var fills = this.layoutData.fills;
            var cells = this.layoutData.cells;

            var current;

            // cell check
            if (cells[r] && cells[r][c]) {
                current = cells[r][c];

                if (current.fills) {
                    return current.fills;
                }
            }

            // row check
            if (fills.rows[r]) {
                return fills.rows[r];
            }

            // col check
            if (fills.cols[c]) {
                return fills.cols[c];
            }

            // global check
            return fills.global;
        }

    };
});