/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var StyleHelper = require('./style-helper');
    var DEFAULTS = require('../../definition/defaults');

    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        draw: function (screen, cellInfo, rect) {
            var verticalAlign = cellInfo.alignments.vertical;

            if (!verticalAlign) {
                verticalAlign = DEFAULTS.vertical;
            }

            var fonts = StyleHelper.getCssFont(cellInfo.fonts);

            screen.save();

            screen.font(fonts);
            screen.textAlign('right');

            screen.beginPath();
            screen.rect(rect.x, rect.y, rect.width, rect.height);
            screen.closePath();
            screen.clip();

            switch (verticalAlign) {
                case 'top':
                    this.__drawTopText(screen, cellInfo, rect);
                    break;

                case 'bottom':
                    this.__drawBottomText(screen, cellInfo, rect);
                    break;

                case 'middle':
                    this.__drawMiddleText(screen, cellInfo, rect);
                    break;
            }

            screen.restore();
        },

        __drawTopText: function (screen, cellInfo, rect) {
            var contents = cellInfo.contentInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('top');

            var offset = rect.y;
            var x = rect.x + rect.width;
            var underline = cellInfo.fonts.underline;
            var throughline = cellInfo.fonts.throughline;
            var textWidth;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], x, offset);
                offset += fontSize;

                if (underline || throughline) {
                    textWidth = screen.measureText(contents[i]).width;

                    if (underline) {
                        this.__drawUnderline(screen, cellInfo.fonts.size, x, offset, underline, textWidth);
                    }

                    if (throughline) {
                        this.__drawThroughline(screen, cellInfo.fonts.size, x, offset - fontSize / 2, textWidth);
                    }
                }
            }
        },

        __drawBottomText: function (screen, cellInfo, rect) {
            var contents = cellInfo.contentInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('bottom');

            var offset = rect.height + rect.y;
            var x = rect.x + rect.width;
            var underline = cellInfo.fonts.underline;
            var throughline = cellInfo.fonts.throughline;
            var textWidth;

            for (var i = contents.length - 1; i >= 0; i--) {
                screen.fillText(contents[i], x, offset);

                if (underline || throughline) {
                    textWidth = screen.measureText(contents[i]).width;

                    if (underline) {
                        this.__drawUnderline(screen, cellInfo.fonts.size, x, offset, underline, textWidth);
                    }

                    if (throughline) {
                        this.__drawThroughline(screen, cellInfo.fonts.size, x, offset - fontSize / 2, textWidth);
                    }
                }

                offset -= fontSize;
            }
        },

        __drawMiddleText: function (screen, cellInfo, rect) {
            var contents = cellInfo.contentInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('middle');

            var offset = rect.y + (rect.height - fontSize * contents.length) / 2;
            var x = rect.x + rect.width;
            var underline = cellInfo.fonts.underline;
            var throughline = cellInfo.fonts.throughline;
            var textWidth;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], x, offset  + fontSize / 2);
                offset += fontSize;

                if (underline || throughline) {
                    textWidth = screen.measureText(contents[i]).width;

                    if (underline) {
                        this.__drawUnderline(screen, cellInfo.fonts.size, x, offset, underline, textWidth);
                    }

                    if (throughline) {
                        this.__drawThroughline(screen, cellInfo.fonts.size, x, offset - fontSize / 2, textWidth);
                    }
                }
            }
        },

        __drawUnderline: function (screen, fontSize, x, y, underlineType, width) {
            var LINE_WIDTH = WIDTH;
            // 缩放因子为29像素
            var scale = 29;

            if (fontSize >= 40) {
                LINE_WIDTH += Math.floor((fontSize - 40) * 4 / 3 / scale) * WIDTH + WIDTH;
            }

            x |= 0;
            y |= 0;
            width |= 0;

            x -= width;

            if (underlineType === 'single') {
                screen.fillRect(x, y - LINE_WIDTH, width, LINE_WIDTH);
                // double
            } else {
                screen.fillRect(x, y - LINE_WIDTH, width, LINE_WIDTH);
                screen.fillRect(x, y - 3 * LINE_WIDTH, width, LINE_WIDTH);
            }
        },

        __drawThroughline: function (screen, fontSize, x, y, width) {
            var LINE_WIDTH = WIDTH;
            // 缩放因子为29像素
            var scale = 29;

            if (fontSize >= 40) {
                LINE_WIDTH += Math.floor((fontSize - 40) * 4 / 3 / scale) * WIDTH + WIDTH;
            }

            x |= 0;
            y |= 0;
            width |= 0;

            x -= width;

            screen.fillRect(x, y - LINE_WIDTH, width, LINE_WIDTH);
        }
    };
});