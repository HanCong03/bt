/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('../definition/status');
    var KEY_CODE = require('system/definition/key-code');

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        __keyEnter: function (evt) {
            evt.preventDefault();

            var ranges = this.queryCommandValue('allrange');

            // 多个选区
            if (ranges.length > 1) {
                return this.__multiEnterKeyMove(evt, ranges);
            }

            // 单个选区，判断该选区内是否包含多个单元格
            var range = ranges[0];
            var entry = range.entry;

            var rangeStart = range.start;
            var rangeEnd = range.end;

            // 只包含单个单元格
            if (rangeStart.row === rangeEnd.row && rangeStart.col === rangeEnd.col) {
                return this.__singleEnterKeyMove(evt, ranges);
            }

            var mergeInfo = this.__getMergeCell(entry.row, entry.col);

            // 包含多个单元跟
            if ($$.isNdef(mergeInfo)) {
                return this.__multiEnterKeyMove(evt, ranges);
            }

            var mergeStart = mergeInfo.start;
            var mergeEnd = mergeInfo.end;

            // 仅包含一个合并后的单元格
            if (mergeStart.row === rangeStart.row && mergeStart.col === rangeStart.col
                && mergeEnd.row === rangeEnd.row && mergeEnd.col === rangeEnd.col) {
                return this.__singleEnterKeyMove(evt, ranges);
            }

            return this.__multiEnterKeyMove(evt, ranges);
        },

        /**
         * enter键移动，单个单元格被选中的情况。
         * 注：一个合并后的单元格也被视为单个单元格。
         * @param evt
         * @param ranges
         * @private
         */
        __singleEnterKeyMove: function (evt, ranges) {
            var range = ranges[0];
            var entry = range.entry;
            var row;
            var col = entry.col;

            // up move
            if (evt.shiftKey) {
                row = entry.row - 1;
            } else {
                row = entry.row + 1;
            }

            if (row < 0) {
                row = 0;
            } else if (row > MAX_ROW_INDEX) {
                row = MAX_ROW_INDEX;
            }

            var mergeInfo = this.__getMergeCell(row, col);

            if ($$.isNdef(mergeInfo)) {
                this.execCommand('range', {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });

                // 把新的选区滚动到视图内
                this.execCommand('scrollin', {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
            } else {
                this.execCommand('range', mergeInfo.start, mergeInfo.end, {
                    row: row,
                    col: col
                });

                // 把新的选区滚动到视图内
                this.execCommand('scrollin', mergeInfo.start, mergeInfo.end);
            }
        },

        /**
         * enter键移动，多个单元格被选中的情况。
         * 注：多单元格移动
         * @param evt
         * @param ranges
         * @private
         */
        __multiEnterKeyMove: function (evt, ranges) {
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
                targetCell = this.__getDecTargetCell(ranges, cell.start.row, cell.start.col);
            } else {
                targetCell = this.__getIncTargetCell(ranges, cell.end.row, cell.start.col);
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

        __getIncTargetCell: function (ranges, row, col) {
            var newRow = row + 1;
            var rangeCount = ranges.length;
            var range = ranges[rangeCount - 1];

            if (newRow <= range.end.row) {
                return {
                    row: newRow,
                    col: col
                };
            }

            // 行超出选区范围，列更新
            newRow = range.start.row;

            var newCol = col + 1;
            var mergeInfo;

            // 新的列还在当前选区内
            if (newCol <= range.end.col) {
                mergeInfo = this.__getMergeCell(newRow, newCol);

                if ($$.isNdef(mergeInfo)) {
                    // 新的行和列满足要求
                    return {
                        row: newRow,
                        col: newCol
                    };
                } else {
                    // 该合并后单元格不满足要求，则递归搜索下一个单元格。
                    if (mergeInfo.start.col <= col) {
                        return this.__getIncTargetCell(mergeInfo.end.row, newCol);

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

        __getDecTargetCell: function (ranges, row, col) {
            console.log('未实现')
            debugger;
        },

        __getMergeCell: function (row, col) {
            var mergecells = this.queryCommandValue('mergecell', row, col);

            if ($$.isNdef(mergecells)) {
                return null;
            }

            var keys = Object.keys(mergecells);
            return mergecells[keys[0]];
        }
    };
});