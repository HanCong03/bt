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

                'control.mouse.expand.selection': this.__mouseExpandSelection
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

        __change: function (entry, start, end) {
            this.drawer.change(entry, start, end);
        },

        __cellSelect: function (start, end) {
            var originalStart = start;
            // 获取完整的range对象，处理合并后的单元格
            var range = this.rs('get.full.range', start, end);

            start = range.start;
            end = range.end;

            this.__change(originalStart, start, end);
        },

        __cellSelectComplete: function (start, end) {
            var originalStart = start;

            // 获取完整的range对象，处理合并后的单元格
            var range = this.rs('get.full.range', start, end);

            start = range.start;
            end = range.end;

            this.execCommand('range', start, end, originalStart);
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

            this.__change(originalStart, start, end);
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

            this.execCommand('range', {
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

            this.__change(originalStart, start, end);
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

            this.execCommand('range', {
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

            this.__change(originalStart, start, end);
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

            this.execCommand('range', start, end, originalStart);
        }
    });
});