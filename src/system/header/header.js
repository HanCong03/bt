/**
 * @file 工作表滚动控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;
    var OFFSET = GRIDLINE_CONFIG.offset;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var FACE_THEME = require('definition/face-theme');

    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Header', {
        base: require('module'),

        mixin: [
            require('./handlers/column'),
            require('./handlers/row'),
            require('./handlers/cell'),
            require('./handlers/all')
        ],

        __r: -1,
        __c: -1,

        init: function () {
            this.__initScreen();
            this.__initEvent();
            this.__initMessage();
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.bgScreen = new Screen('btb-header-screen', this.getMiddleContainer(), size.width, size.height);
            this.lineScreen = new Screen('btb-header-line-screen', this.getMiddleContainer(), size.width, size.height);

            window.bb = this.lineScreen
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __initMessage: function () {
            this.onMessage({
                'control.header.h.hover': this.__hHover,
                'control.header.v.hover': this.__vHover,
                'control.header.out': this.__hoverOut,

                'control.column.selection': this.__updateColumnSelction,
                'control.row.selection': this.__updateRowSelction,
                'control.cell.selection': this.__updateCellSelction,
                'control.all.selection': this.__updateAllSelction
            });
        },

        __refresh: function () {
            this.__reset();
            this.__redrawSelection();
        },

        __reset: function () {
            this.__r = -1;
            this.__c = -1;
        },

        /* ------ drawer ----- */
        __redrawSelection: function () {
            this.__drawSelection();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        },

        __drawSelection: function () {
            var ranges = this.queryCommandValue('allrange');
            var _self = this;

            this.bgScreen.save();

            this.lineScreen.save();

            this.lineScreen.strokeColor(FACE_THEME.color);
            this.lineScreen.setLineWidth(2);

            $$.forEach(ranges, function (range) {
                var layout = _self.rs('get.visiable.layout', range.start, range.end);

                if (!layout) {
                    return;
                }

                _self.__drawHorizontal(range.start, range.end, layout.h, layout.overflow);
                _self.__drawVertical(range.start, range.end, layout.v, layout.overflow);
            });

            this.bgScreen.restore();
            this.lineScreen.restore();
        },

        __drawHorizontal: function (start, end, rect, overflow) {
            if (!rect) {
                return;
            }

            var visualData = this.rs('get.visual.data');

            var bgScreen = this.bgScreen;
            var lineScreen = this.lineScreen;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            /* ---- bg ---- */
            if (start.row === 0 && end.row === MAX_ROW_INDEX) {
                bgScreen.fillColor(FACE_THEME.header.fullColor);
            } else {
                bgScreen.fillColor(FACE_THEME.header.color);
            }
            bgScreen.fillRect(headWidth + rect.x, 0, rect.width, headHeight);

            /* ---- line ---- */
            if (!overflow.ot || visualData.rowPaneCount > 0) {
                lineScreen.hline(headWidth + rect.x - LINE_WIDTH, headHeight, rect.width + DOUBLE_LINE_WIDTH);
            }

            lineScreen.stroke();
        },

        __drawVertical: function (start, end, rect, overflow) {
            if (!rect) {
                return;
            }

            var visualData = this.rs('get.visual.data');

            var bgScreen = this.bgScreen;
            var lineScreen = this.lineScreen;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            /* ---- bg ---- */
            if (start.col === 0 && end.col === MAX_COLUMN_INDEX) {
                bgScreen.fillColor(FACE_THEME.header.fullColor);
            } else {
                bgScreen.fillColor(FACE_THEME.header.color);
            }
            bgScreen.fillRect(0, headHeight + rect.y, headWidth, rect.height);

            /* ---- line ---- */
            if (!overflow.ol || visualData.colPaneCount > 0) {
                lineScreen.vline(headWidth, headHeight + rect.y - LINE_WIDTH, rect.height + DOUBLE_LINE_WIDTH);
            }

            lineScreen.stroke();
        },

        __updateSelection: function (start, end) {
            this.lineScreen.strokeColor(FACE_THEME.color);
            this.lineScreen.setLineWidth(2);

            var range = $$.standardRange(start, end);

            var layout = this.rs('get.visiable.layout', range.start, range.end);

            if (!layout) {
                return;
            }

            this.__drawHorizontal(start, end, layout.h, layout.overflow);
            this.__drawVertical(start, end, layout.v, layout.overflow);
        },

        /* ---- mouse ----- */
        __hHover: function (c) {
            if (this.__c === c) {
                return;
            }

            this.__c = c;

            var visualData = this.rs('get.visual.data');
            var bgScreen = this.bgScreen;

            var x = visualData.headWidth + visualData.colPoints[c] + OFFSET;
            var y = 0;
            var width = visualData.colWidths[c];
            var height = visualData.headHeight;

            this.__drawSelection();

            bgScreen.save();

            bgScreen.fillColor(FACE_THEME.header.hover);
            bgScreen.fillRect(x, y, width, height);

            bgScreen.restore();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        },

        __hoverOut: function () {
            this.__r = -1;
            this.__c = -1;

            this.__drawSelection();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        },

        __vHover: function (r) {
            if (this.__r === r) {
                return;
            }

            this.__r = r;

            var visualData = this.rs('get.visual.data');
            var bgScreen = this.bgScreen;

            this.__drawSelection();

            var x = 0;
            var y = visualData.headHeight + visualData.rowPoints[r] + OFFSET;
            var width = visualData.headWidth;
            var height = visualData.rowHeights[r];

            bgScreen.fillColor(FACE_THEME.header.hover);
            bgScreen.fillRect(x, y, width, height);

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        }
    });
});