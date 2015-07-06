/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('../definition/status');

    module.exports = {
        __oncontextmenu: function (evt) {
            if (this.status !== STATUS.NORMAL) {
                return;
            }

            var index = this.__getIndex(evt);
            var ranges;
            var row = index.row;
            var col = index.col;
            var changed = true;

            if (index.row === -1 && index.col === -1) {
                this.postMessage('control.compolete.all.selection');

            } else if (index.row === -1 && index.col >= 0) {
                this.postMessage('control.compolete.column.selection', index.col, index.col);

            } else if (index.row >= 0 && index.col === -1) {
                this.postMessage('control.compolete.row.selection', index.row, index.row);

            } else if (index.row >= 0 && index.col >= 0) {
                ranges = this.queryCommandValue('allrange');

                $$.forEach(ranges, function (range) {
                    var startRow = range.start.row;
                    var startCol = range.start.col;
                    var endRow = range.end.row;
                    var endCol = range.end.col;

                    if (row >= startRow && row <= endRow
                        && col >= startCol && col <= endCol) {
                        changed = false;
                        return true;
                    }
                });

                // 点击位置不在选区上
                if (changed) {
                    this.postMessage('control.compolete.cell.selection', {
                        row: row,
                        col: col
                    }, {
                        row: row,
                        col: col
                    });
                }
            }

            // 通知右键被点击。
            this.postMessage('control.contextmenu');
        }
    };
});