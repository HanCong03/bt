/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        /**
         * 按指定的方向扩展选区
         * @param rowDir 大于零表示向下扩展行，小于零表示向上扩展行，零表示不扩展行
         * @param colDir
         */
        expand: function (rowDir, colDir) {
            var row = this.__expandRow(rowDir);
            var col = this.__expandColumn(colDir);

            this.execCommand('scrollin', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });
        },

        /**
         * 扩展行
         * 返回扩展后的新行索引
         * @param count
         * @private
         */
        __expandRow: function (dir) {
            var range = this.getActiveRange();

            if (dir === 0) {
                return range.start.row;
            }

            var entry = range.entry;
            var mergeInfo = this.queryCommandValue('mergecell', entry.row, entry.col);

            var start;
            var end;

            if (!mergeInfo) {
                start = entry;
                end = entry;
            } else {
                start = mergeInfo.start;
                end = mergeInfo.end;
            }

            if (dir > 0) {
                return this.__expandRowToDown(start, end);
            } else {
                return this.__expandRowToUp(start, end);
            }
        },

        __expandColumn: function (dir) {
            var range = this.getActiveRange();

            if (dir === 0) {
                return range.end.col;
            }
        },

        /**
         * 向下扩展活动选区指定数量的行
         * @param count
         * @private
         */
        __expandRowToDown: function (start, end) {
            var range = this.getActiveRange();
            var rangeStart = range.start;
            var rangeEnd = range.end;

            // 目标行
            var row;

            // 收缩起始行
            if (rangeStart.row < start.row) {
                row = this.__getNextRow(rangeStart.row);

                // 获取到的行满足要求，则修改选区的起始行
                if (row <= start.row) {
                    rangeStart.row = row;
                    // 结束操作
                    return row;
                }

                /* 获取到的行已经超出焦点位置，则执行向下扩展 */
            }

            row = rangeEnd.row + 1;

            // 下溢出
            if (row > MAX_ROW_INDEX) {
                return rangeEnd.row;
            }

            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: 0
            }, {
                row: row,
                col: MAX_COLUMN_INDEX
            });

            // 新行不包含合并单元格，则更新选区结束行即可。
            if ($$.isNdef(mergecells)) {
                rangeEnd.row = row;
                return row;
            }

            // 否则，需要更新行，使其包含所有的合并单元格。
            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                row = Math.max(row, mergecells[key].end.row);
            }

            rangeEnd.row = row;

            return row;
        },

        __expandRowToUp: function (start, end) {
            var range = this.getActiveRange();
            var rangeStart = range.start;
            var rangeEnd = range.end;

            // 目标行
            var row;

            // 收缩结束行
            if (rangeEnd.row > end.row) {
                row = this.__getPrevRow(rangeEnd.row);

                // 获取到的行满足要求，则修改选区的结束行
                if (row >= end.row) {
                    rangeEnd.row = row;
                    // 结束操作
                    return row;
                }

                /* 获取到的行已经超出焦点位置，则执行向上扩展 */
            }

            row = rangeStart.row - 1;

            // 上溢出
            if (row < 0) {
                return rangeStart.row;
            }

            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: 0
            }, {
                row: row,
                col: MAX_COLUMN_INDEX
            });

            // 新行不包含合并单元格，则更新选区起始行即可。
            if ($$.isNdef(mergecells)) {
                rangeStart.row = row;
                return row;
            }

            // 否则，需要更新行，使其包含所有的合并单元格。
            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                row = Math.min(row, mergecells[key].start.row);
            }

            rangeStart.row = row;

            return row;
        },

        /**
         * 获取给定行之后的完整行。
         * 获取到的行，要么不存在合并单元格，要么所有的合并单元格的其实点都在该行上。
         * @param row
         * @private
         */
        __getNextRow: function (row) {
            row += 1;

            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: 0
            }, {
                row: row,
                col: MAX_COLUMN_INDEX
            });

            if ($$.isNdef(mergecells)) {
                return row;
            }

            var mergeInfo;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                mergeInfo = mergecells[key];

                // 递归获取
                if (mergeInfo.start.row < row) {
                    return this.__getNextRow(mergeInfo.end.row);
                }
            }

            return row;
        },

        /**
         * __getNextRow()的方向操作
         * @param row
         * @private
         */
        __getPrevRow: function (row) {
            row -= 1;

            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: 0
            }, {
                row: row,
                col: MAX_COLUMN_INDEX
            });

            if ($$.isNdef(mergecells)) {
                return row;
            }

            var mergeInfo;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                mergeInfo = mergecells[key];

                // 递归获取
                if (mergeInfo.end.row > row) {
                    return this.__getPrevRow(mergeInfo.start.row);
                }
            }

            return row;
        }
    };
});