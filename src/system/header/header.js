/**
 * @file 工作表滚动控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

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
            this.screen = new Screen('btb-header-screen', this.getMiddleContainer(), size.width, size.height);
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
            this.__r = -1;
            this.__c = -1;
        },

        __hHover: function (c) {
            if (this.__c === c) {
                return;
            }

            this.__c = c;

            var visualData = this.rs('get.visual.data');
            var screen = this.screen;

            var x = visualData.headWidth + visualData.colPoints[c] + OFFSET;
            var y = 0;
            var width = visualData.colWidths[c];
            var height = visualData.headHeight;

            // #d3f0e0
            screen.fillColor('#9fd5b7');
            screen.fillRect(x, y, width, height);

            screen.toggle();
        },

        __hoverOut: function () {
            this.__r = -1;
            this.__c = -1;

            this.screen.toggle();
        },

        __vHover: function (r) {
            if (this.__r === r) {
                return;
            }

            this.__r = r;

            var visualData = this.rs('get.visual.data');
            var screen = this.screen;

            var x = 0;
            var y = visualData.headHeight + visualData.rowPoints[r] + OFFSET;
            var width = visualData.headWidth;
            var height = visualData.rowHeights[r];

            screen.fillColor('#9fd5b7');
            screen.fillRect(x, y, width, height);

            screen.toggle();
        }
    });
});