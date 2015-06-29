/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var VTYPE = require('definition/vtype');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_H_PADDING = 2 * CELL_PADDING.h;

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        mixin: [
            require('./scroll')
        ],

        init: function () {
            this.__initHeap();
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

        setRange: function (start, end, entry) {
            this.__setRange(start, end, entry);

            this.emit('viewchange');
        },

        __setRange: function (start, end, entry) {
            var heap = this.getActiveHeap();

            heap.ranges = [{
                start: start,
                end: end,
                entry: entry || start
            }];
        },

        getRange: function () {
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

        __moveRow: function (count) {
            var mainRange = this.getRange();

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
            var mainRange = this.getRange();

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