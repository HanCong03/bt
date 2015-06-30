/**
 * @file 选区模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var SystemUtils = require('system/utils/utils');
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        coverScreen: null,

        mixin: [
            require('./components/cover'),
            require('./components/outer')
        ],

        init: function () {
            this.__initEvent();
            this.__initSelection();
        },

        __initSelection: function () {
            var size = this.getContainerSize();
            this.coverScreen = new Screen(this.getMiddleContainer(), size.width, size.height)
        },

        __initEvent: function () {
            this.on({
                'control.cell.select': this.__cellSelect,
                'control.row.select': this.__rowSelect,
                'control.column.select': this.__columnSelect,
                'control.all.select': this.__allSelect,
                'control.outer.cell.select': this.__scrollCellSelect,
                'viewchange': this.__viewchange
            });
        },

        __viewchange: function () {
            var ranges = this.queryCommandValue('allrange');
            var lastRange = ranges[ranges.length - 1];

            //this.__reselection(lastRange.start, lastRange.end);
        },

        __cellSelect: function (start, end) {
            var originalStart = start;
            var originalEnd = end;

            // 获取完整的range对象，处理合并后的单元格
            var range = this.__getFullRange(start, end);

            start = range.start;
            end = range.end;

            var rect = SystemUtils.getVisibleRect(this.rs('get.visual.data'), start, end);

            this.__draw(originalStart, originalEnd, start, end, rect);
            this.coverScreen.toggle();
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
            var originalEnd;

            // 整行都被合并
            if ($$.isNdef(col)) {
                originalStart = {
                    row: startRow,
                    col: 0
                };

                originalEnd = {
                    row: startRow,
                    col: MAX_COLUMN_INDEX
                };
            } else {
                originalStart = {
                    row: startRow,
                    col: col
                };

                originalEnd = {
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

            var rect = SystemUtils.getVisibleRect(visualData, start, end);

            this.__draw(originalStart, originalEnd, start, end, rect);
            this.coverScreen.toggle();
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
            var originalEnd;

            // 整行都被合并
            if ($$.isNdef(row)) {
                originalStart = {
                    row: 0,
                    col: startCol
                };

                originalEnd = {
                    row: MAX_ROW_INDEX,
                    col: endCol
                };
            } else {
                originalStart = {
                    row: row,
                    col: startCol
                };

                originalEnd = {
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

            var rect = SystemUtils.getVisibleRect(visualData, start, end);

            this.__draw(originalStart, originalEnd, start, end, rect);
            this.coverScreen.toggle();
        },

        __allSelect: function () {
            var visualData = this.rs('get.visual.data');

            var originalStart = {
                row: visualData.row,
                col: visualData.col
            };

            var originalEnd = {
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

            var rect = SystemUtils.getVisibleRect(visualData, start, end);

            this.__draw(originalStart, originalEnd, start, end, rect);
            this.coverScreen.toggle();
        },

        __scrollCellSelect: function (start, end) {
            console.log(start, end)
        },

        __getFullRange: function (start, end) {
            var range = SystemUtils.standardRange(start, end);
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
        }
    });
});