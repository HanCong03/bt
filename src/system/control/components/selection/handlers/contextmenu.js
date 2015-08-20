/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var STATUS = require('../definition/status');

    module.exports = {
        __oncontextmenu: function (evt) {
            if (this.status !== STATUS.NORMAL) {
                return;
            }

            var index = this.__getIndex(evt);
            var type;

            if (index.row === -1 && index.col === -1) {
                this.postMessage('control.compolete.all.selection');
                type = 'cell';

            } else if (index.row === -1 && index.col >= 0) {
                type = this.__processColumn(index);

            } else if (index.row >= 0 && index.col === -1) {
                type = this.__processRow(index);

            } else if (index.row >= 0 && index.col >= 0) {
                type = this.__processCell(index);
            }

            // 通知右键被点击。
            this.emit('contextmenu', type, evt);
        },

        __processColumn: function (index) {
            var hasChange = true;
            var ranges = this.queryCommandValue('allrange');
            var col = index.col;

            $$.forEach(ranges, function (range) {
                var startCol = range.start.col;
                var endCol = range.end.col;

                if (col >= startCol && col <= endCol) {
                    hasChange = false;
                    return false;
                }
            });

            // 改变选区
            if (hasChange) {
                this.postMessage('control.compolete.column.selection', col, col);
            }

            return 'column';
        },

        __processRow: function (index) {
            var hasChange = true;
            var ranges = this.queryCommandValue('allrange');
            var row = index.row;

            $$.forEach(ranges, function (range) {
                var startRow = range.start.row;
                var endRow = range.end.row;

                if (row >= startRow && row <= endRow) {
                    hasChange = false;
                    return false;
                }
            });

            // 改变选区
            if (hasChange) {
                this.postMessage('control.compolete.row.selection', row, row);
            }

            return 'row';
        },

        __processCell: function (index) {
            var hasChange = true;
            var ranges = this.queryCommandValue('allrange');
            var row = index.row;
            var col = index.col;

            var type = 'cell';

            $$.forEach(ranges, function (range) {
                var startRow = range.start.row;
                var startCol = range.start.col;
                var endRow = range.end.row;
                var endCol = range.end.col;

                if (row >= startRow && row <= endRow
                    && col >= startCol && col <= endCol) {
                    hasChange = false;
                    return false;
                }
            });

            // 点击位置不在选区上
            if (hasChange) {
                this.postMessage('control.compolete.cell.selection', {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });

                return 'cell';
            }

            // 点击位置在选区上，要判断选区类型
            $$.forEach(ranges, function (range) {
                var startRow = range.start.row;
                var startCol = range.start.col;
                var endRow = range.end.row;
                var endCol = range.end.col;

                var isMinStartRow = startRow === 0;
                var isMinStartCol = startCol === 0;
                var isMaxEndRow = endRow === MAX_ROW_INDEX;
                var isMaxEndCol = endCol === MAX_COLUMN_INDEX;

                var isColumnSelected = isMinStartRow && isMaxEndRow;
                var isRowSelected = isMinStartCol && isMaxEndCol;

                if (isColumnSelected && isRowSelected) {
                    type = 'cell';
                    return false;
                }

                if (isColumnSelected) {
                    type = 'column';
                    return false;
                }

                if (isRowSelected) {
                    type = 'row';
                    return false;
                }
            });

            return type;
        }
    };
});