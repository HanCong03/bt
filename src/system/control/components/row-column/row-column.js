/**
 * @file 行列控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var PANE_LINE = GRIDLINE_CONFIG.pane;
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var ControlUtils = require('system/control/utils');

    var Screen = require('system/screen/screen');

    var STATUS = {
        N: 0,
        H: 1,
        v: 2
    };

    module.exports = $$.createClass('RowColumnController', {
        base: require('component'),
        container: null,

        __c: -1,
        __r: -1,

        __x: 0,
        __y: 0,

        status: STATUS.N,

        init: function () {
            this.container = this.getMainContainer();
            var size = this.getContentContainerSize();

            this.screen = new Screen(this.getDeviceZoom(), 'btb-row-column', this.getMiddleContainer(), size.width, size.height);

            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'devicezoomchange': this.__resetZoom,
                'resize': this.__resize
            })
        },

        __resize: function () {
            var size = this.getContentContainerSize();
            this.screen.resize(size.width, size.height);
        },

        __resetZoom: function () {
            this.screen.resetZoom(this.getDeviceZoom());
        },

        __getIndex: function (evt) {
            var visualData = this.rs('get.visual.data');
            var index = ControlUtils.calculateCellIndex(this.container, visualData, evt.clientX, evt.clientY);

            var row = index.r;
            var col = index.c;

            if (index.r >= 0) {
                row = visualData.rows[index.r];
            }

            if (index.c >= 0) {
                col = visualData.cols[index.c];
            }

            return {
                x: index.x,
                y: index.y,
                r: index.r,
                c: index.c,
                row: row,
                col: col
            };
        },

        activeHorizontal: function (c) {
            this.__c = c;

            this.status = STATUS.H;

            this.rs('ignore.header.control');
            this.__showHorizontalLine();
        },

        activeVertical: function (r) {
            this.__r = r;

            this.status = STATUS.V;

            this.rs('ignore.header.control');
            this.__showVerticalLine();
        },

        exit: function () {
            this.__c = -1;
            this.__r = -1;
            this.__x = 0;
            this.__y = 0;
            this.status = STATUS.N;
        },

        __onmousemove: function (evt) {
            var index = this.__getIndex(evt);

            if (this.status === STATUS.H) {
                this.__updateHorizontalLine(index.x, index.c);
            } else {
                this.__updateVerticalLine(index.y, index.r);
            }
        },

        __onmouseup: function () {
            var visualData = this.rs('get.visual.data');
            var row;
            var col;

            var start;

            this.__hideLine();

            if (this.status === STATUS.H) {
                start = visualData.colPoints[this.__c] + visualData.headWidth + OFFSET;
                col = visualData.cols[this.__c];

                this.rs('recover.header.control');
                this.execCommand('columnwidth', this.__x - start, col, col);
            } else {
                start = visualData.rowPoints[this.__r] + visualData.headHeight + OFFSET;
                row = visualData.rows[this.__r];

                this.rs('recover.header.control');
                this.execCommand('rowheight', this.__y - start, row, row);
            }

            this.postMessage('control.free');
        },

        __hideLine: function () {
            this.screen.toggle();
        },

        // 显示水平辅助线
        __showHorizontalLine: function () {
            var c = this.__c;
            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var screen = this.screen;

            screen.save();
            // 辅助线颜色和pane-lien颜色一致
            screen.strokeColor(PANE_LINE);

            screen.vline(visualData.colPoints[c] + headWidth, 0, headHeight + visualData.spaceHeight);
            screen.vline(visualData.colPoints[c + 1] + headWidth, 0, headHeight + visualData.spaceHeight);

            this.__x = visualData.colPoints[c + 1] + headWidth - OFFSET;

            screen.stroke();

            screen.restore();

            screen.toggle();
        },

        __showVerticalLine: function () {
            var r = this.__r;
            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var screen = this.screen;

            screen.save();
            // 辅助线颜色和pane-lien颜色一致
            screen.strokeColor(PANE_LINE);

            screen.hline(0, visualData.rowPoints[r] + headHeight, headWidth + visualData.spaceWidth);
            screen.hline(0, visualData.rowPoints[r + 1] + headHeight, headWidth + visualData.spaceWidth);

            this.__y = visualData.rowPoints[r + 1] + headHeight - OFFSET;

            screen.stroke();

            screen.restore();

            screen.toggle();
        },

        __updateHorizontalLine: function (x, c) {
            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var sc = this.__c;

            var screen = this.screen;

            screen.save();
            // 辅助线颜色和pane-lien颜色一致
            screen.strokeColor(PANE_LINE);

            screen.vline(visualData.colPoints[sc] + headWidth, 0, headHeight + visualData.spaceHeight);

            if (c === -1 || c === -2) {
                // do nothing
            } else if (c === -4) {
                screen.vline(visualData.spaceWidth + headWidth - OFFSET, 0, headHeight + visualData.spaceHeight);
                this.__x = visualData.spaceWidth + headWidth - LINE_WIDTH;
            } else if (c !== -3 && c < sc) {
                // do nothing
            } else {
                this.__x = Math.max((x | 0), visualData.colPoints[this.__c] - OFFSET);
                screen.vline(this.__x + OFFSET, 0, headHeight + visualData.spaceHeight);
            }

            screen.stroke();

            screen.restore();

            screen.toggle();
        },

        __updateVerticalLine: function (y, r) {
            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var sr = this.__r;

            var screen = this.screen;

            screen.save();
            // 辅助线颜色和pane-lien颜色一致
            screen.strokeColor(PANE_LINE);

            screen.hline(0, visualData.rowPoints[sr] + headHeight, headWidth + visualData.spaceWidth);

            if (r === -1 || r === -2) {
                // do nothing
            } else if (r === -4) {
                screen.hline(0, visualData.spaceHeight + headHeight - OFFSET, headWidth + visualData.spaceWidth);
                this.__y = visualData.spaceHeight + headHeight - LINE_WIDTH;
            } else if (r !== -3 && r < sr) {
                // do nothing
            } else {
                this.__y = Math.max((y | 0), visualData.rowPoints[this.__r] - OFFSET);
                screen.hline(0, this.__y + OFFSET, headWidth + visualData.spaceWidth);
            }

            screen.stroke();

            screen.restore();

            screen.toggle();
        }
    });
});