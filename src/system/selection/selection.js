/**
 * @file 选区模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var FACE_THEME = require('definition/face-theme');
    var SystemUtils = require('system/utils/utils');

    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Selection', {
        base: require('module'),

        selectionWrap: null,
        selectionNode: null,
        selectionCover: null,
        coverScreen: null,

        mixin: [
            require('./components/cover')
        ],

        init: function () {
            this.__initEvent();
            this.__initSelection();
        },

        __initSelection: function () {
            var selectionWrap = document.createElement('div');
            selectionWrap.className = 'btb-selection-wrap';

            selectionWrap.innerHTML = '<div class="btb-selection" style="border-color: ' + FACE_THEME.color + '"><div class="btb-selection-cover"></div></div>'

            this.selectionCover = $(".btb-selection-cover", selectionWrap)[0];
            this.selectionNode = $(".btb-selection", selectionWrap)[0];

            this.getMiddleContainer().appendChild(selectionWrap);

            var size = this.getContainerSize();
            this.coverScreen = new Screen(this.getMiddleContainer(), size.width, size.height)

            this.selectionWrap = selectionWrap;
        },

        __initEvent: function () {
            this.on({
                'ready': this.__reset,
                'refresh': this.__refresh,
                'controlstatuschange': this.__reselection
            });
        },

        __reset: function () {
            this.__reselection({
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 0
            });
        },

        __refresh: function () {
            var visualData = this.rs('get.visual.data');

            $(this.selectionWrap).css({
                width: visualData.spaceWidth,
                height: visualData.spaceHeight,
                top: visualData.headHeight,
                left: visualData.headWidth
            });
        },

        __reselection: function (start, end) {
            var originalStart = start;
            var originalEnd = end;

            // 获取完整的range对象，处理合并后的单元格
            var range = this.__getFullRange(start, end);

            start = range.start;
            end = range.end;

            var rect = SystemUtils.getVisibleRect(this.rs('get.visual.data'), start, end);

            // 当前区域不可见
            if (!rect) {
                this.selectionNode.style.display = 'none';
                return;
            }

            var selectionNode = this.selectionNode;
            var selectionCover = this.selectionCover;

            var borders = [
                'solid', 'solid', 'solid', 'solid'
            ];

            var translate = ['-2px', '-2px'];

            if (rect.ot) {
                borders[0] = 'none';
                translate[0] = '0';
            }

            if (rect.or) {
                borders[1] = 'none';
            }

            if (rect.ob) {
                borders[2] = 'none';
            }

            if (rect.ol) {
                borders[3] = 'none';
                translate[1] = '0';
            }

            borders = borders.join('');

            this.__drawCover(originalStart, originalEnd, start, end, rect);
            this.coverScreen.toggle();

            selectionNode.style.borderStyle = borders;
            selectionCover.style.borderStyle = borders;

            selectionCover.style.width = rect.width + 'px';
            selectionCover.style.height = rect.height + 'px';

            selectionNode.style.top = rect.y + 'px';
            selectionNode.style.left = rect.x + 'px';
            selectionNode.style.transform = 'translate(' + translate.join(',') + ')';
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