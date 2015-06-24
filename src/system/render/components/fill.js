/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('definition/none');

    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __fill: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            if ($$.isNdef(visualData.cols) || $$.isNdef(visualData.rows)) {
                return;
            }

            screen.save();

            screen.translate(visualData.headWidth, visualData.headHeight);

            this.__fillGlobal();
            this.__fillColumn();
            this.__fillRow();
            this.__fillCell();

            screen.restore();
        },

        __fillGlobal: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            var fill = this.queryCommandValue('settedglobalstyle', 'fill');

            if (!fill || fill === NONE) {
                return;
            }

            var width = visualData.spaceWidth;
            var height = visualData.spaceHeight;

            screen.fillColor(fill);
            screen.fillRect(0, 0, width, height);
        },

        __fillColumn: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            $$.forEach(visualData.cols, function (col, index) {
                var fill = this.queryCommandValue('settedcolumnstyle', 'fill', col);

                if (!fill) {
                    return;
                }

                var x;
                var y;
                var width;
                var height;

                if (fill === NONE) {
                    x = visualData.colPoints[index] + GRIDLINE_CONFIG.offset;
                    y = 0;
                    width = visualData.colWidths[index];
                    height = visualData.spaceHeight;

                    screen.clearRect(x, y, width, height);
                } else {
                    x = visualData.colPoints[index] - GRIDLINE_CONFIG.offset;
                    y = 0;
                    width = visualData.colWidths[index] + 2 * WIDTH;
                    height = visualData.spaceHeight;

                    screen.fillColor(fill);
                    screen.fillRect(x, y, width, height);
                }
            }, this);
        },

        __fillRow: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            $$.forEach(visualData.rows, function (row, index) {
                var fill = this.queryCommandValue('settedrowstyle', 'fill', row);

                if (!fill) {
                    return;
                }

                var x;
                var y;
                var width;
                var height;

                if (fill === NONE) {
                    x = 0;
                    y = visualData.rowPoints[index] + GRIDLINE_CONFIG.offset;
                    width = visualData.spaceWidth;
                    height = visualData.rowHeights[index];

                    screen.clearRect(x, y, width, height);
                } else {
                    x = 0;
                    y = visualData.rowPoints[index] - GRIDLINE_CONFIG.offset;
                    width = visualData.spaceWidth;
                    height = visualData.rowHeights[index] + 2 * WIDTH;

                    screen.fillColor(fill);
                    screen.fillRect(x, y, width, height);
                }
            }, this);
        },

        __fillCell: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            $$.forEach(visualData.rows, function (row, i) {
                $$.forEach(visualData.cols, function (col, j) {
                    var fill = this.queryCommandValue('settedcellstyle', 'fill', row, col);

                    if (!fill) {
                        return;
                    }

                    var rect;

                    if (fill === NONE) {
                        rect = this.__getClearRect(i, j);

                        screen.clearRect(rect.x, rect.y, rect.width, rect.height);
                    } else {
                        rect = this.__getFillRect(i, j);

                        screen.fillColor(fill);
                        screen.fillRect(rect.x, rect.y, rect.width, rect.height);
                    }
                }, this);
            }, this);
        },

        __getClearRect: function (i, j) {
            var visualData = this.visualData;
            var rows = visualData.rows;
            var cols = visualData.cols;

            var topFill;
            var rightFill;
            var bottomFill;
            var leftFill;

            // top
            if (i === 0) {
                topFill = false;
            } else {
                topFill = this.queryCommandValue('userfill', rows[i - 1], cols[j]);
            }

            // right
            if (j === cols.length - 1) {
                rightFill = false;
            } else {
                rightFill = this.queryCommandValue('userfill', rows[i], cols[j + 1]);
            }

            // bottom
            if (i === rows.length - 1) {
                bottomFill = false;
            } else {
                bottomFill = this.queryCommandValue('userfill', rows[i + 1], cols[j]);
            }

            // left
            if (j === 0) {
                leftFill = false;
            } else {
                leftFill = this.queryCommandValue('userfill', rows[i], cols[j - 1]);
            }

            /* ---- rect 计算 ---- */
            var x = visualData.colPoints[j] + OFFSET;
            var y = visualData.rowPoints[i] + OFFSET;
            var width = visualData.colWidths[j];
            var height = visualData.rowHeights[i];

            var topDiff = topFill ? 0 : WIDTH;
            var bottomDiff = bottomFill ? 0 : WIDTH;
            var leftDiff = leftFill ? 0 : WIDTH;
            var rightDiff = rightFill ? 0 : WIDTH;

            return {
                x: x - leftDiff,
                y: y - topDiff,
                width: width + leftDiff + rightDiff,
                height: height + topDiff + bottomDiff
            };
        },

        /**
         * 获取指定单元格的填充范围
         * @param i 单元格在visual-data中的行编号，注意，这不是实际的行索引。
         * @param j 单元格在visual-data中的列编号，注意，这不是实际的列索引。
         * @returns {{x: number, y: number, width: *, height: *}}
         * @private
         */
        __getFillRect: function (i, j) {
            /*
                填充区域的左边和上边是一定要覆盖的，所以不需要计算。
             */
            var visualData = this.visualData;
            var rows = visualData.rows;
            var cols = visualData.cols;

            var rightFill;
            var bottomFill;

            // right
            if (j === cols.length - 1) {
                rightFill = false;
            } else {
                rightFill = this.queryCommandValue('userfill', rows[i], cols[j + 1]);
            }

            // bottom
            if (i === rows.length - 1) {
                bottomFill = false;
            } else {
                bottomFill = this.queryCommandValue('userfill', rows[i + 1], cols[j]);
            }

            /* ---- rect 计算 ---- */
            var x = visualData.colPoints[j] - OFFSET;
            var y = visualData.rowPoints[i] - OFFSET;
            var width = visualData.colWidths[j] + WIDTH;
            var height = visualData.rowHeights[i] + WIDTH;

            var bottomDiff = bottomFill ? 0 : WIDTH;
            var rightDiff = rightFill ? 0 : WIDTH;

            return {
                x: x,
                y: y,
                width: width + rightDiff,
                height: height + bottomDiff
            };
        }
    };
});