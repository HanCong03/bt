/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;

    var DEFAULT_FILL = require('definition/face-theme').fill;

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
            var layoutData = this.layoutData;
            var mergeCellLayouts = {};

            for (var i = 0, len = layoutData.length; i < len; i++) {
                this.__fillRow(layoutData[i], mergeCellLayouts);

                // 查找是否有当前结束的行
                if (mergeCellLayouts[i]) {
                    this.__fillMergeCells(mergeCellLayouts[i]);
                }
            }
        },

        __fillRow: function (rowLayout, mergeCellLayouts) {
            var lastColor = null;
            var visualData = this.visualData;
            var rMap = visualData.rMap;
            var current;
            var cells = [];
            var currentColor;
            var startRow;
            var endRow;

            var r;

            for (var i = 0, len = rowLayout.length; i < len; i++) {
                current = rowLayout[i];

                if (current && current.mergecell) {
                    startRow = current.mergecell.start.row;
                    endRow = current.mergecell.end.row;

                    r = findR(startRow, endRow);

                    if (!mergeCellLayouts[r]) {
                        mergeCellLayouts[r] = [];
                    }

                    mergeCellLayouts[r].push(current);

                    if (lastColor !== null) {
                        this.__fillCells(cells, lastColor);
                        lastColor = null;
                        cells = [];
                    }
                    continue;
                }

                currentColor = this.__getColor(current);

                if (currentColor === null) {
                    if (lastColor !== null) {
                        this.__fillCells(cells, lastColor);
                    }
                    continue;
                }

                if (lastColor === null) {
                    lastColor = currentColor;
                    cells.push(current);
                    continue;
                }

                if (lastColor === currentColor) {
                    cells.push(current);
                    continue;
                }

                // else -> lastColor !== current
                this.__fillCells(cells, lastColor);

                lastColor = currentColor;
                cells = [current];
            }

            // 收尾工作
            if (lastColor !==  null) {
                this.__fillCells(cells, lastColor);
            }

            /* --- 找到行序号 --- */
            function findR(startRow, endRow) {
                var r;

                for (var i = endRow; i >= startRow; i--) {
                    r = rMap[i];

                    if (r !== undefined) {
                        return r;
                    }
                }
            }
        },

        __fillMergeCells: function (mergeCellLayouts) {
            for (var i = 0, len = mergeCellLayouts.length; i < len; i++) {
                this.__fillMergeCell(mergeCellLayouts[i]);
            }
        },

        __fillMergeCell: function (layout) {
            var mergeInfo = layout.mergecell;
            var rect = this.rs('get.visible.rect', mergeInfo.start, mergeInfo.end);
            var screen = this.contentScreen;
            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            var height = rect.height;

            screen.save();

            // 无颜色
            if (!layout.fills || !layout.fills.fill) {
                screen.fillColor(DEFAULT_FILL);
                screen.fillRect(x, y, width, height);
                screen.clearRect(x, y + height, width, LINE_WIDTH);

            // 有颜色
            } else {
                screen.fillColor(layout.fills.fill.value);
                screen.fillRect(x - LINE_WIDTH, y - LINE_WIDTH, width + LINE_WIDTH, height + DOUBLE_LINE_WIDTH);

                screen.setCompositeOperation('destination-over');
                screen.fillRect(x + width, y - LINE_WIDTH, LINE_WIDTH, height + DOUBLE_LINE_WIDTH);
            }

            screen.restore();
        },

        __fillCells: function (cells, lastColor) {
            var start = cells[0];
            var end = cells[cells.length - 1];

            var rect = this.rs('get.visible.rect', start, end);
            var screen = this.contentScreen;

            screen.fillColor(lastColor);
            screen.fillRect(rect.x - LINE_WIDTH, rect.y - LINE_WIDTH, rect.width + DOUBLE_LINE_WIDTH, rect.height + DOUBLE_LINE_WIDTH);
        },

        __getColor: function (cellLayout) {
            if (!cellLayout) {
                return null;
            }

            if (!cellLayout.fills.fill) {
                return null;
            }

            return cellLayout.fills.fill.value;
        }
    };
});