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


    var FACE_THEME = require('definition/face-theme');

    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Header', {
        base: require('module'),

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
                'control.header.out': this.__hoverOut
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
            this.bgScreen.fillColor(FACE_THEME.header.color);

            this.lineScreen.save();

            this.lineScreen.strokeColor(FACE_THEME.color);
            this.lineScreen.setLineWidth(2);

            $$.forEach(ranges, function (range) {
                var layout = _self.rs('get.visiable.layout', range.start, range.end);

                if (!layout) {
                    return;
                }

                _self.__drawHorizontal(layout.h);
                _self.__drawVertical(layout.v);
            });

            this.bgScreen.restore();
            this.lineScreen.restore();
        },

        __drawHorizontal: function (rect) {
            if (!rect) {
                return;
            }

            var visualData = this.rs('get.visual.data');

            var bgScreen = this.bgScreen;
            var lineScreen = this.lineScreen;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            /* ---- bg ---- */
            bgScreen.fillRect(headWidth + rect.x, 0, rect.width, headHeight);

            /* ---- line ---- */
            if (!rect.ot) {
                lineScreen.hline(headWidth + rect.x - LINE_WIDTH, headHeight, rect.width + DOUBLE_LINE_WIDTH);
            }

            lineScreen.stroke();
        },

        __drawVertical: function (rect) {
            if (!rect) {
                return;
            }

            var visualData = this.rs('get.visual.data');

            var bgScreen = this.bgScreen;
            var lineScreen = this.lineScreen;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            /* ---- bg ---- */
            bgScreen.fillRect(0, headHeight + rect.y, headWidth, rect.height);

            /* ---- line ---- */
            if (!rect.ol) {
                lineScreen.vline(headWidth, headHeight + rect.y - LINE_WIDTH, rect.height + DOUBLE_LINE_WIDTH);
            }

            lineScreen.stroke();
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

            // #d3f0e0
            bgScreen.fillColor('#9fd5b7');
            bgScreen.fillRect(x, y, width, height);

            bgScreen.restore();
            bgScreen.toggle();
        },

        __hoverOut: function () {
            this.__r = -1;
            this.__c = -1;

            this.__redrawSelection();
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

            bgScreen.fillColor('#9fd5b7');
            bgScreen.fillRect(x, y, width, height);

            bgScreen.toggle();
        }
    });
});