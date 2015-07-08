/**
 * @file 选区模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var Drawer = require('./components/drawer');

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        drawer: null,

        // 选区追加模式是否开启
        appendMode: false,

        init: function () {
            this.__initComponents();
            this.__initMessage();
            this.__initEvent();
        },

        __initComponents: function () {
            this.drawer = this.createComponent(Drawer);
        },

        __initMessage: function () {
            this.onMessage({
                'control.cell.selection': this.__cellSelect,
                'control.row.selection': this.__rowSelect,
                'control.column.selection': this.__columnSelect,
                'control.all.selection': this.__allSelect,

                'control.compolete.cell.selection': this.__cellSelectComplete,
                'control.compolete.row.selection': this.__rowSelectComplete,
                'control.compolete.column.selection': this.__columnSelectComplete,
                'control.compolete.all.selection': this.__allSelectComplete,

                'control.mouse.expand.selection': this.__mouseExpandSelection,

                // 进入选区追加模式
                'control.selection.append.mode': this.__activeAppendMode,
                // 退出选区追加模式
                'control.selection.exit.append.mode': this.__inactiveAppendMode
            });
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh,
                'rangechange': this.__refresh
            });
        },

        __refresh: function () {
            this.drawer.draw();
        },

        /**
         * 进入选区追加模式
         */
        __activeAppendMode: function () {
            this.appendMode = true;
        },

        __inactiveAppendMode: function () {
            this.appendMode = false;
        },

        /**
         * 更新选区视图，不进行数据更新。
         * @private
         */
        __update: function (entry, start, end) {
            if (!this.appendMode) {
                this.drawer.change(entry, start, end);
            } else {
                this.drawer.append(entry, start, end);
            }
        },

        /**
         * 选区已确定，更新数据。
         * @private
         */
        __complete: function (start, end, entry) {
            if (!this.appendMode) {
                this.execCommand('range', start, end, entry);
            } else {
                this.execCommand('appendrange', start, end, entry);
            }
        },

        __cellSelect: function (start, end) {
            var originalStart = start;
            // 获取完整的range对象，处理合并后的单元格
            var range = this.rs('get.full.range', start, end);

            start = range.start;
            end = range.end;

            this.__update(originalStart, start, end);
        },

        __cellSelectComplete: function (start, end) {
            var originalStart = start;

            // 获取完整的range对象，处理合并后的单元格
            var range = this.rs('get.full.range', start, end);

            start = range.start;
            end = range.end;

            this.__complete(start, end, originalStart);
        },

        __mouseExpandSelection: function (index) {
            var range = this.queryCommandValue('range');
            var entry = range.entry;
            var mergeInfo = this.queryCommandValue('mergecell', entry.row, entry.col);

            var startRow;
            var startCol;

            if ($$.isNdef(mergeInfo)) {
                startRow = entry.row;
                startCol = entry.col;
            } else {
                startRow = mergeInfo.start.row;
                startCol = mergeInfo.start.col;
            }

            var row = index.row;
            var col = index.col;

            if (row === -1 && col === -1) {
                this.execCommand('updaterange', {
                    row: 0,
                    col: 0
                }, {
                    row: MAX_ROW_INDEX,
                    col: MAX_COLUMN_INDEX
                }, entry);

            } else if (row === -1) {
                this.execCommand('updaterange', {
                    row: 0,
                    col: Math.min(startCol, col)
                }, {
                    row: MAX_ROW_INDEX,
                    col: Math.max(startCol, col)
                });

            } else if (col == -1) {
                this.execCommand('updaterange', {
                    row: Math.min(startRow, row),
                    col: 0
                }, {
                    row: Math.max(startRow, row),
                    col: MAX_COLUMN_INDEX
                });

            } else {
                this.execCommand('updaterange', {
                    row: Math.min(startRow, row),
                    col: Math.min(startCol, col)
                }, {
                    row: Math.max(startRow, row),
                    col: Math.max(startCol, col)
                });
            }
        },

        __rowSelect: function (startRow, endRow) {
            var visualData = this.rs('get.visual.data');
            var col;

            var keys;
            var mergecells;

            // 找到适合作为焦点的独立单元格
            for (var i = visualData.col; i <= MAX_COLUMN_INDEX; i++) {
                mergecells = this.queryCommandValue('mergecell', {
                    row: startRow,
                    col: i
                }, {
                    row: startRow,
                    col: i
                });

                if (!mergecells) {
                    col = i;
                    break;
                }

                keys = Object.keys(mergecells);
                i = mergecells[keys[0]].end.col;
            }

            var originalStart;

            // 整行都被合并
            if ($$.isNdef(col)) {
                originalStart = {
                    row: startRow,
                    col: 0
                };
            } else {
                originalStart = {
                    row: startRow,
                    col: col
                };
            }

            var start = {
                row: Math.min(startRow, endRow),
                col: 0
            };

            var end = {
                row: Math.max(startRow, endRow),
                col: MAX_COLUMN_INDEX
            };

            this.__update(originalStart, start, end);
        },

        __rowSelectComplete: function (startRow, endRow) {
            var visualData = this.rs('get.visual.data');
            var col;

            var keys;
            var mergecells;

            // 找到适合作为焦点的独立单元格
            for (var i = visualData.col; i <= MAX_COLUMN_INDEX; i++) {
                mergecells = this.queryCommandValue('mergecell', {
                    row: startRow,
                    col: i
                }, {
                    row: startRow,
                    col: i
                });

                if (!mergecells) {
                    col = i;
                    break;
                }

                keys = Object.keys(mergecells);
                i = mergecells[keys[0]].end.col;
            }

            var originalStart;

            // 整行都被合并
            if ($$.isNdef(col)) {
                originalStart = {
                    row: startRow,
                    col: 0
                };
            } else {
                originalStart = {
                    row: startRow,
                    col: col
                };
            }

            this.__complete({
                row: Math.min(startRow, endRow),
                col: 0
            }, {
                row: Math.max(startRow, endRow),
                col: MAX_COLUMN_INDEX
            }, originalStart);
        },

        __columnSelect: function (startCol, endCol) {
            var visualData = this.rs('get.visual.data');
            var row;

            var keys;
            var mergecells;

            // 找到适合作为焦点的独立单元格
            for (var i = visualData.row; i <= MAX_ROW_INDEX; i++) {
                mergecells = this.queryCommandValue('mergecell', {
                    row: i,
                    col: startCol
                }, {
                    row: i,
                    col: startCol
                });

                if (!mergecells) {
                    row = i;
                    break;
                }

                keys = Object.keys(mergecells);
                i = mergecells[keys[0]].end.row;
            }

            var originalStart;

            // 整行都被合并
            if ($$.isNdef(row)) {
                originalStart = {
                    row: 0,
                    col: startCol
                };
            } else {
                originalStart = {
                    row: row,
                    col: startCol
                };
            }

            var start = {
                row: 0,
                col: Math.min(startCol, endCol)
            };

            var end = {
                row: MAX_ROW_INDEX,
                col: Math.max(startCol, endCol)
            };

            this.__update(originalStart, start, end);
        },

        __columnSelectComplete: function (startCol, endCol) {
            var visualData = this.rs('get.visual.data');
            var row;

            var keys;
            var mergecells;

            // 找到适合作为焦点的独立单元格
            for (var i = visualData.row; i <= MAX_ROW_INDEX; i++) {
                mergecells = this.queryCommandValue('mergecell', {
                    row: i,
                    col: startCol
                }, {
                    row: i,
                    col: startCol
                });

                if (!mergecells) {
                    row = i;
                    break;
                }

                keys = Object.keys(mergecells);
                i = mergecells[keys[0]].end.row;
            }

            var originalStart;

            // 整行都被合并
            if ($$.isNdef(row)) {
                originalStart = {
                    row: 0,
                    col: startCol
                };
            } else {
                originalStart = {
                    row: row,
                    col: startCol
                };
            }

            this.__complete({
                row: 0,
                col: Math.min(startCol, endCol)
            }, {
                row: MAX_ROW_INDEX,
                col: Math.max(startCol, endCol)
            }, originalStart);
        },

        __allSelect: function () {
            var visualData = this.rs('get.visual.data');

            var originalStart = {
                row: visualData.row,
                col: visualData.col
            };

            var start = {
                row: 0,
                col: 0
            };

            var end = {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            };

            this.__update(originalStart, start, end);
        },

        __allSelectComplete: function () {
            var visualData = this.rs('get.visual.data');

            var originalStart = {
                row: visualData.row,
                col: visualData.col
            };

            var start = {
                row: 0,
                col: 0
            };

            var end = {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            };

            this.__complete(start, end, originalStart);
        }
    });
});