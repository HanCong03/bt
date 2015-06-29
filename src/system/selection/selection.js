/**
 * @file 选区模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var SystemUtils = require('system/utils/utils');

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
                'controlstatuschange': this.__reselection,
                'controlcomplete': this.__completeSelection,
                'viewchange': this.__viewchange
            });
        },

        __completeSelection: function (start, end) {
            this.execCommand('range', start, end);
        },

        __viewchange: function () {
            var ranges = this.queryCommandValue('allrange');
            var lastRange = ranges[ranges.length - 1];

            this.__reselection(lastRange.start, lastRange.end);
        },

        __reselection: function (start, end) {
            if (end.row < 0 || end.col < 0) {
                return this.__outerReselection(start, end);
            }

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