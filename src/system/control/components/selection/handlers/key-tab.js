/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __keyTab: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('tab', evt.originalEvent.timeStamp)) {
                return;
            }

            var ranges = this.queryCommandValue('allrange');

            // 多个选区
            if (ranges.length > 1) {
                return this.__multiTabKeyMove(evt, ranges);
            }

            // 单个选区，判断该选区内是否包含多个单元格
            var range = ranges[0];
            var entry = range.entry;

            var rangeStart = range.start;
            var rangeEnd = range.end;

            // 只包含单个单元格
            if (rangeStart.row === rangeEnd.row && rangeStart.col === rangeEnd.col) {
                return this.__singleTabKeyMove(evt);
            }

            var mergeInfo = this.__getMergeCell(entry.row, entry.col);

            // 包含多个单元跟
            if ($$.isNdef(mergeInfo)) {
                return this.__multiTabKeyMove(evt, ranges);
            }

            var mergeStart = mergeInfo.start;
            var mergeEnd = mergeInfo.end;

            // 仅包含一个合并后的单元格
            if (mergeStart.row === rangeStart.row && mergeStart.col === rangeStart.col
                && mergeEnd.row === rangeEnd.row && mergeEnd.col === rangeEnd.col) {
                return this.__singleTabKeyMove(evt);
            }

            return this.__multiTabKeyMove(evt, ranges);
        },

        /**
         * tab键移动，单个单元格被选中的情况。
         * 注：一个合并后的单元格也被视为单个单元格。
         * @param evt
         * @param ranges
         * @private
         */
        __singleTabKeyMove: function (evt) {
            if (evt.shiftKey) {
                this.execCommand('move', 0, -1);
            } else {
                this.execCommand('move', 0, 1);
            }
        },

        /**
         * Tab键移动，多个单元格被选中的情况。
         * 注：多单元格移动
         * @param evt
         * @param ranges
         * @private
         */
        __multiTabKeyMove: function (evt, ranges) {
            var rangeCount = ranges.length;
            // 活动选区
            var range = ranges[rangeCount - 1];
            var entry = range.entry;

            var mergeInfo = this.__getMergeCell(entry.row, entry.col);

            // 当前单元格的完整表示。
            var cell = {
                start: null,
                end: null
            };

            if ($$.isNdef(mergeInfo)) {
                cell.start = entry;
                cell.end = entry;
            } else {
                cell.start = mergeInfo.start;
                cell.end = mergeInfo.end;
            }

            // 目标cell
            var targetCell;

            // up move
            // 不论当前的焦点单元格是否是合并后的单元格，列始终保持在起始列上。
            if (evt.shiftKey) {
                targetCell = this.__getTabDecTargetCell(ranges, cell.start.row, cell.start.col);
            } else {
                targetCell = this.__getTabIncTargetCell(ranges, cell.end.row, cell.start.col);
            }

            // 更新选区焦点
            mergeInfo = this.__getMergeCell(targetCell.row, targetCell.col);

            if ($$.isNdef(mergeInfo)) {
                this.execCommand('updatefocus', targetCell.row, targetCell.col);
                this.execCommand('scrollin', targetCell, targetCell);
            } else {
                this.execCommand('updatefocus', mergeInfo.start.row, mergeInfo.start.col);
                this.execCommand('scrollin', mergeInfo.start, mergeInfo.end);
            }
        },

        /**
         * 参考__getIncTargetCell
         * @param ranges
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        __getTabIncTargetCell: function (ranges, row, col) {
            var newCol = col + 1;
            var rangeCount = ranges.length;
            var range = ranges[rangeCount - 1];

            var mergeInfo;

            if (newCol <= range.end.col) {
                mergeInfo = this.__getMergeCell(row, newCol);

                if ($$.isDefined(mergeInfo) && mergeInfo.start.row !== row) {
                    return this.__getTabIncTargetCell(ranges, row, mergeInfo.end.col);
                }

                return {
                    row: row,
                    col: newCol
                };
            }

            newCol = range.start.col;

            var newRow = row + 1;

            if (newRow <= range.end.row) {
                mergeInfo = this.__getMergeCell(newRow, newCol);

                if ($$.isNdef(mergeInfo)) {
                    return {
                        row: newRow,
                        col: newCol
                    };
                } else {
                    if (mergeInfo.start.row !== newRow) {
                        return this.__getTabIncTargetCell(ranges, newRow, mergeInfo.end.col);

                        // 该合并单元格满足要求,返回该单元格的起始位置。
                    } else {
                        return mergeInfo.start;
                    }
                }
            }

            // 新的列已经不在当前选区中，则提升选区。
            // 提升选区会使得最老的选区被提升为活动选区。
            this.execCommand('uprange');

            // 获取新的活动选区的起始位置作为结果
            return ranges[rangeCount - 1].start;
        },

        __getTabDecTargetCell: function (ranges, row, col) {
            var newCol = col - 1;
            var rangeCount = ranges.length;
            var range = ranges[rangeCount - 1];

            if (newCol >= range.start.col) {
                mergeInfo = this.__getMergeCell(row, newCol);

                if ($$.isDefined(mergeInfo) && mergeInfo.start.col !== col) {
                    return this.__getTabDecTargetCell(ranges, row, mergeInfo.start.col);
                }

                return {
                    row: row,
                    col: newCol
                };
            }

            // 行超出选区范围，行更新
            newCol = range.end.col;

            var newRow = row - 1;
            var mergeInfo;

            // 新的行还在当前选区内
            if (newRow >= range.start.row) {
                mergeInfo = this.__getMergeCell(newRow, newCol);

                if ($$.isNdef(mergeInfo)) {
                    // 新的行和列满足要求
                    return {
                        row: newRow,
                        col: newCol
                    };
                } else {
                    // 该合并后单元格不满足要求，则递归搜索下一个单元格。
                    if (mergeInfo.start.col !== newCol) {
                        return this.__getTabDecTargetCell(ranges, newRow, mergeInfo.start.col);

                        // 该合并单元格满足要求,返回该单元格的起始位置。
                    } else {
                        return mergeInfo.start;
                    }
                }
            }

            this.execCommand('downrange');

            // 获取新的活动选区的结束位置作为结果
            return ranges[rangeCount - 1].end;
        }
    };
});