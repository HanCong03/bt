/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('NONE');

    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;
    var CELL_PADDING = require('definition/cell-padding');

    var LeftDrawer = require('./left-drawer');
    var RightDrawer = require('./right-drawer');
    var CenterDrawer = require('./center-drawer');

    var StyleHelper = require('./style-helper');

    module.exports = {
        __drawContent: function () {
            var visualData = this.visualData;
            var layoutData = this.layoutData;
            var screen = this.contentScreen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            $$.forEach(layoutData, function (currentRow) {
                $$.forEach(currentRow, function (currentCell) {
                    if (!currentCell || !currentCell.content) {
                        return;
                    }

                    this.__drawCellContent(currentCell);
                }, this);
            }, this);

            screen.restore();
        },

        __drawCellContent: function (cellInfo) {
            cellInfo = $$.clone(cellInfo);

            if (cellInfo.fonts.name.value) {
                cellInfo.fonts.name = cellInfo.fonts.name.value;
            }

            if (cellInfo.fonts.color.value) {
                cellInfo.fonts.color = cellInfo.fonts.color.value;
            }

            if (cellInfo.mergecell) {
                this.__drawMergeCellContent(cellInfo);
            } else {
                this.__drawNormalContent(cellInfo);
            }
        },

        __drawMergeCellContent: function (cellInfo) {
            var mergeCellRect = this.__getMergeCellRect(cellInfo);
            var visibleRect = this.__getVisibleMergeCellRect(cellInfo);
            var screen = this.contentScreen;

            if (!mergeCellRect) {
                return;
            }

            screen.save();

            screen.beginPath();
            screen.rect(visibleRect.x, visibleRect.y, visibleRect.width, visibleRect.height);
            screen.closePath();
            screen.clip();

            this.__drawMergeCellText(cellInfo, mergeCellRect);

            screen.restore();
        },

        __drawNormalContent: function (cellInfo) {
            var rect;

            // 获取独立单元格的rect信息，需要区别wraptext类型的单元格
            if (cellInfo.alignments.wraptext) {
                rect = this.__getWraptextCellRect(cellInfo);
            } else {
                rect = this.__getCellRect(cellInfo);
            }

            this.__drawText(cellInfo, rect);
        },

        __getVisibleMergeCellRect: function (cellInfo) {
            var visualData = this.visualData;

            var width = -WIDTH;
            var height = -WIDTH;

            // height
            for (var i = cellInfo.r, limit = cellInfo.mergecell.er; i <= limit; i++) {
                height += visualData.rowHeights[i] + WIDTH;
            }

            // width
            for (var i = cellInfo.c, limit = cellInfo.mergecell.ec; i <= limit; i++) {
                width += visualData.colWidths[i] + WIDTH;
            }

            return {
                x: visualData.colPoints[cellInfo.c] + OFFSET + CELL_PADDING.h,
                y: visualData.rowPoints[cellInfo.r] + OFFSET + CELL_PADDING.v,
                width: width - 2 * CELL_PADDING.h,
                height: height - 2 * CELL_PADDING.v
            };
        },

        __getWraptextCellRect: function (cellInfo) {
            var visualData = this.visualData;

            return {
                x: visualData.colPoints[cellInfo.c] + OFFSET + CELL_PADDING.h,
                y: visualData.rowPoints[cellInfo.r] + OFFSET + CELL_PADDING.v,
                width: visualData.colWidths[cellInfo.c] - 2 * CELL_PADDING.h,
                height: visualData.rowHeights[cellInfo.r] - 2 * CELL_PADDING.v,
                centerX: visualData.colPoints[cellInfo.c] + OFFSET + visualData.colWidths[cellInfo.c] / 2
            };
        },

        __getCellRect: function (cellInfo) {
            var textAlign = cellInfo.alignments.horizontal;

            if (!textAlign) {
                textAlign = this.queryCommandValue('typehorizontal', cellInfo.row, cellInfo.col);
            }

            switch (textAlign) {
                case 'left':
                    return this.__getLeftAlignRect(cellInfo);
                    break;

                case 'right':
                    return this.__getRightAlignRect(cellInfo);

                case 'center':
                    return this.__getCenterAlignRect(cellInfo);
            }
        },

        /**
         * 获取左对齐的独立单元格的rect信息
         * @param cellInfo
         * @returns {{x: *, y: *, width: number, height: number}}
         * @private
         */
        __getLeftAlignRect: function (cellInfo) {
            var visualData = this.visualData;
            var layoutData = this.layoutData;
            var textWidth = this.__getTextWidth(cellInfo);
            var currentLayoutRow = layoutData[cellInfo.r];

            var currentCell;
            var width = visualData.colWidths[cellInfo.c];

            for (var i = cellInfo.c + 1, len = visualData.colCount; i < len; i++) {
                if (width >= textWidth) {
                    break;
                }

                currentCell = currentLayoutRow[i];

                // 遇到合并后的非起始单元格
                if (!currentCell) {
                    break;
                }

                // 遇到合并后的起始单元格
                if (currentCell.mergecell) {
                    break;
                }

                // 遇到有内容的单元格
                if (currentCell.content) {
                    break;
                }

                width += visualData.colWidths[i] + WIDTH;
            }

            return {
                x: visualData.colPoints[cellInfo.c] + OFFSET + CELL_PADDING.h,
                y: visualData.rowPoints[cellInfo.r] + OFFSET + CELL_PADDING.v,
                width: width - 2 * CELL_PADDING.h,
                height: visualData.rowHeights[cellInfo.r] - 2 * CELL_PADDING.v
            };
        },

        __getRightAlignRect: function (cellInfo) {
            var visualData = this.visualData;
            var layoutData = this.layoutData;

            var textWidth = this.__getTextWidth(cellInfo);
            var currentLayoutRow = layoutData[cellInfo.r];

            var currentCell;
            var width = visualData.colWidths[cellInfo.c];

            for (var i = cellInfo.c + 1; i >= 0; i--) {
                if (width >= textWidth) {
                    break;
                }

                currentCell = currentLayoutRow[i];

                // 遇到合并后的非起始单元格
                if (!currentCell) {
                    break;
                }

                // 遇到合并后的起始单元格
                if (currentCell.mergecell) {
                    break;
                }

                // 遇到有内容的单元格
                if (currentCell.content) {
                    break;
                }

                width += visualData.colWidths[i] + WIDTH;
            }

            return {
                x: visualData.colPoints[cellInfo.c] + OFFSET + CELL_PADDING.h,
                y: visualData.rowPoints[cellInfo.r] + OFFSET + CELL_PADDING.v,
                width: width - 2 * CELL_PADDING.h,
                height: visualData.rowHeights[cellInfo.r] - 2 * CELL_PADDING.v
            };
        },

        __getCenterAlignRect: function (cellInfo) {
            var visualData = this.visualData;
            var layoutData = this.layoutData;
            var textWidth = this.__getTextWidth(cellInfo);
            var halfTextWidth = textWidth / 2 + CELL_PADDING.h;

            var currentLayoutRow = layoutData[cellInfo.r];

            // left
            var leftWidth = visualData.colWidths[cellInfo.c] / 2;
            var leftCol = cellInfo.c;
            var currentCell;

            for (var i = cellInfo.c - 1; i >= 0; i--) {
                if (leftWidth >= halfTextWidth) {
                    break;
                }

                currentCell = currentLayoutRow[i];

                // 遇到合并后的非起始单元格
                if (!currentCell) {
                    break;
                }

                // 遇到合并后的起始单元格
                if (currentCell.mergecell) {
                    break;
                }

                // 遇到有内容的单元格
                if (currentCell.content) {
                    break;
                }

                leftCol--;
                leftWidth += visualData.colWidths[i] + WIDTH;
            }

            // right
            var rightWidth = visualData.colWidths[cellInfo.c] / 2;
            var currentCell;

            for (var i = cellInfo.c + 1, len = visualData.colCount; i < len; i++) {
                if (rightWidth >= halfTextWidth) {
                    break;
                }

                currentCell = currentLayoutRow[i];

                // 遇到合并后的非起始单元格
                if (!currentCell) {
                    break;
                }

                // 遇到合并后的起始单元格
                if (currentCell.mergecell) {
                    break;
                }

                // 遇到有内容的单元格
                if (currentCell.content) {
                    break;
                }

                rightWidth += visualData.colWidths[i] + WIDTH;
            }

            return {
                x: visualData.colPoints[leftCol] + OFFSET + CELL_PADDING.h,
                y: visualData.rowPoints[cellInfo.r] + OFFSET + CELL_PADDING.v,
                width: leftWidth + rightWidth - 2 * CELL_PADDING.h,
                height: visualData.rowHeights[cellInfo.r] - 2 * CELL_PADDING.v,
                centerX: visualData.colPoints[cellInfo.c] + OFFSET + visualData.colWidths[cellInfo.c] / 2
            };
        },

        __getMergeCellRect: function (cellInfo) {
            var mergeInfo = cellInfo.mergecell;
            var rect = this.__getRangeRect(mergeInfo.start, mergeInfo.end);

            if (rect.width === 0 || rect.height === 0) {
                return null;
            }

            var x = this.__calculateMergeCellX(cellInfo) + CELL_PADDING.h;
            var y = this.__calculateMergeCellY(cellInfo) + CELL_PADDING.v;
            var width = rect.width - 2 * CELL_PADDING.h;
            var height = rect.height - 2 * CELL_PADDING.v;

            return {
                x: x,
                y: y,
                width: width,
                height: height,
                centerX: x + width / 2
            };
        },

        __getTextWidth: function (cellInfo) {
            var screen = this.contentScreen;
            screen.font(StyleHelper.getCssFont(cellInfo.fonts));

            var contents = cellInfo.content;
            var widths = [];

            for (var i = 0, len = contents.length; i < len; i++) {
                widths.push(screen.measureText(cellInfo.content[i]).width);
            }

            return Math.max.apply(null, widths);
        },

        __calculateMergeCellX: function (cellInfo) {
            var visualData = this.visualData;
            var col = visualData.cols[cellInfo.c];

            var mergeInfo = cellInfo.mergecell;
            var x = visualData.colPoints[cellInfo.c] + OFFSET;

            for (var i = col - 1, min = mergeInfo.start.col; i >= min; i--) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                x -= this.queryCommandValue('columnwidth', i) + WIDTH;
            }

            return x;
        },

        __calculateMergeCellY: function (cellInfo) {
            var visualData = this.visualData;
            var row = visualData.rows[cellInfo.r];

            var mergeInfo = cellInfo.mergecell;
            var y = visualData.rowPoints[cellInfo.r] + OFFSET;

            for (var i = row - 1, min = mergeInfo.start.row; i >= min; i--) {
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                y -= this.queryCommandValue('rowheight', i) + WIDTH;
            }

            return y;
        },

        __getRangeRect: function (start, end) {
            var width = -1;
            var height = -1;

            // height
            for (var i = start.row, limit = end.row; i <= limit; i++) {
                // 被隐藏，则跳过
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                height += this.queryCommandValue('rowheight', i) + WIDTH;
            }

            // width
            for (var i = start.col, limit = end.col; i <= limit; i++) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                width += this.queryCommandValue('columnwidth', i) + WIDTH;
            }

            return {
                width: width === -1 ? 0 : width,
                height: height === -1 ? 0 : height
            };
        },

        __drawText: function (cellInfo, rect) {
            var textAlign = cellInfo.alignments.horizontal;
            var screen = this.contentScreen;

            if (!textAlign) {
                textAlign = this.queryCommandValue('typehorizontal', cellInfo.row, cellInfo.col);
            }

            switch (textAlign) {
                case 'left':
                    LeftDrawer.draw(screen, cellInfo, rect);
                    break;

                case 'right':
                    RightDrawer.draw(screen, cellInfo, rect);
                    break;

                case 'center':
                    CenterDrawer.draw(screen, cellInfo, rect);
                    break;
            }

            // 清理内容区域
            this.__cleanContentArea(rect);
        },

        __drawMergeCellText: function (cellInfo, rect) {
            var textAlign = cellInfo.alignments.horizontal;
            var screen = this.contentScreen;

            if (textAlign === NONE) {
                textAlign = this.queryCommandValue('texthorizontal', cellInfo.row, cellInfo.col);
            }

            switch (textAlign) {
                case 'left':
                    LeftDrawer.draw(screen, cellInfo, rect);
                    break;

                case 'right':
                    RightDrawer.draw(screen, cellInfo, rect);
                    break;

                case 'center':
                    CenterDrawer.draw(screen, cellInfo, rect);
                    break;
            }

            /* mergecell 不用清理内容区域 */
        },

        __cleanContentArea: function (rect) {
            var visualData = this.visualData;

            cleanScreen(this.borderScreen);
            cleanScreen(this.gridlineScreen);

            function cleanScreen(screen) {
                screen.save();
                screen.translate(visualData.headWidth, visualData.headHeight);

                var x = rect.x - CELL_PADDING.h;
                var y = rect.y - CELL_PADDING.v;
                var width = rect.width + 2 * CELL_PADDING.h;
                var height = rect.height + 2 * CELL_PADDING.v;

                screen.clearRect(x, y, width, height);

                screen.restore();
            }
        }
    };
});