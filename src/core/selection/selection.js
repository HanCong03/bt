/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        mixin: [
            require('./scroll'),
            require('./expand')
        ],

        init: function () {
            this.__initHeap();
            this.__initService();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.ranges)) {
                return;
            }

            heap.ranges = [{
                start: {
                    row: 0,
                    col: 0
                },
                end: {
                    row: 0,
                    col: 0
                },
                entry: {
                    row: 0,
                    col: 0
                }
            }];
        },

        __initService: function () {
            this.registerService({
                'get.full.range': this.__getFullRange
            });
        },

        setRange: function (start, end, entry) {
            this.__setRange(start, end, entry);

            this.emit('rangechange');
        },

        updateRange: function (start, end, entry) {
            var heap = this.getActiveHeap();
            var ranges = heap.ranges;
            var range = ranges[ranges.length - 1];

            range.start = {
                row: start.row,
                col: start.col
            };

            range.end = {
                row: end.row,
                col: end.col
            };

            if (entry) {
                range.entry = {
                    row: entry.row,
                    col: entry.col
                };
            }

            this.emit('rangechange');
        },

        /**
         * 更新当前的焦点单元格。
         * 注：如果新的焦点单元格不在活动选区内，则操作无效。
         * @param row
         * @param col
         */
        updateFocus: function (row, col) {
            var heap = this.getActiveHeap();
            var ranges = heap.ranges;
            var range = ranges[ranges.length - 1];
            var rangeStart = range.start;
            var rangeEnd = range.end;

            if (row >= rangeStart.row && col >= rangeStart.col
                && row <= rangeEnd.row && col <= rangeEnd.col) {
                range.entry = {
                    row: row,
                    col: col
                };
            }
        },

        /**
         * 提升选区操作
         * 注1：提升选区会使得最老的选区被提升为活动选区。
         * 注2：如果当前仅有一个选区，则该操作什么也不做。
         */
        upRange: function () {
            var heap = this.getActiveHeap();
            var ranges = heap.ranges;

            if (ranges.length === 1) {
                return;
            }

            var oldRange = ranges.shift();
            ranges.push(oldRange);
        },

        /**
         * 降低选区操作
         * 注1：降低选区会使得当前的活动选区成为最老的选区，同时，次新的选区将成为活动选区。
         * 注2：如果当前仅有一个选区，则该操作什么也不做。
         */
        downRange: function () {
            var heap = this.getActiveHeap();
            var ranges = heap.ranges;

            if (ranges.length === 1) {
                return;
            }

            var activeRange = ranges.pop();
            ranges.unshift(activeRange);
        },

        getActiveRange: function () {
            var ranges = this.getActiveHeap().ranges;
            return ranges[ranges.length - 1];
        },

        getRanges: function () {
            return this.getActiveHeap().ranges;
        },

        move: function (rowCount, colCount) {
            var row = this.__moveRow(rowCount);
            var col = this.__moveColumn(colCount);

            // 检查新的单元格是否处于一个合并的单元格内
            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });

            var keys;
            var mergeInfo;

            if ($$.isNdef(mergecells)) {
                this.__moveToNormalCell(row, col);
            } else {
                keys = Object.keys(mergecells);
                mergeInfo = mergecells[keys[0]];

                this.__moveToMergeCell(mergeInfo, row, col);
            }
        },

        /**
         * 根据给定的区域，获取一个完整的选区。
         * @param start
         * @param end
         * @returns {*}
         * @private
         */
        __getFullRange: function (start, end) {
            var range = $$.standardRange(start, end);
            start = range.start;
            end = range.end;

            var mergecells = this.queryCommandValue('mergecell', start, end);

            if ($$.isNdef(mergecells)) {
                return {
                    start: start,
                    end: end
                };
            }

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var current;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                current = mergecells[key];

                startRow = Math.min(startRow, current.start.row);
                startCol = Math.min(startCol, current.start.col);
                endRow = Math.max(endRow, current.end.row);
                endCol = Math.max(endCol, current.end.col);
            }

            // 递归查找
            if (startRow !== start.row
                || startCol !== start.col
                || endRow !== end.row
                || endCol !== end.col) {
                return this.__getFullRange({
                    row: startRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: endCol
                });
            }

            return {
                start: {
                    row: startRow,
                    col: startCol
                },
                end: {
                    row: endRow,
                    col: endCol
                }
            };
        },

        __setRange: function (start, end, entry) {
            var heap = this.getActiveHeap();

            heap.ranges = [$$.clone({
                start: start,
                end: end,
                entry: entry || start
            })];
        },

        __moveRow: function (count) {
            var mainRange = this.getActiveRange();

            if (count === 0) {
                return mainRange.entry.row;
            }

            var mergecells = this.queryCommandValue('mergecell', mainRange.entry, mainRange.entry);

            if ($$.isNdef(mergecells)) {
                return this.__moveNormalRow(mainRange.entry.row, count);
            } else {
                return this.__moveMergeCellRow(mergecells, count);
            }
        },

        __moveColumn: function (count) {
            var mainRange = this.getActiveRange();

            if (count === 0) {
                return mainRange.entry.col;
            }

            var mergecells = this.queryCommandValue('mergecell', mainRange.entry, mainRange.entry);

            if ($$.isNdef(mergecells)) {
                return this.__moveNormalColumn(mainRange.entry.col, count);
            } else {
                return this.__moveMergeCellColumn(mergecells, count);
            }
        },

        __moveNormalRow: function (row, count) {
            if (count < 0) {
                return this.rs('get.up.row', row, -count);
            } else {
                return this.rs('get.down.row', row, count);
            }
        },

        __moveMergeCellRow: function (mergecells, count) {
            var keys = Object.keys(mergecells);
            var mergeInfo = mergecells[keys[0]];

            if (count < 0) {
                return this.rs('get.up.row', mergeInfo.start.row, -count);
            } else {
                return this.rs('get.down.row', mergeInfo.end.row, count);
            }
        },

        __moveNormalColumn: function (col, count) {
            if (count < 0) {
                return this.rs('get.left.column', col, -count);
            } else {
                return this.rs('get.right.column', col, count);
            }
        },

        __moveMergeCellColumn: function (mergecells, count) {
            var keys = Object.keys(mergecells);
            var mergeInfo = mergecells[keys[0]];

            if (count < 0) {
                return this.rs('get.left.column', mergeInfo.start.col, -count);
            } else {
                return this.rs('get.right.column', mergeInfo.end.col, count);
            }
        }
    });
});