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
        drawNormalCell: function (screen, cellInfo, rect) {
            var verticalAlign = cellInfo.alignments.vertical;

            if (!verticalAlign) {
                verticalAlign = DEFAULTS.vertical;
            }

            var fonts = StyleHelper.getCssFont(cellInfo.fonts);

            screen.save();
            screen.fillColor(cellInfo.fonts.color.value);
            screen.strokeColor(cellInfo.fonts.color.value);

            screen.font(fonts);
            screen.textAlign('left');

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

        drawMergeCell: function (screen, cellInfo, rect) {
            var verticalAlign = cellInfo.alignments.vertical;

            if (!verticalAlign) {
                verticalAlign = DEFAULTS.vertical;
            }

            var fonts = StyleHelper.getCssFont(cellInfo.fonts);

            screen.save();
            screen.fillColor(cellInfo.fonts.color.value);
            screen.strokeColor(cellInfo.fonts.color.value);

            screen.font(fonts);
            screen.textAlign('left');

            // 合并单元格的垂直对齐方向上，需要检查内容是否超出单元格大小，
            // 如果超出，则需要重置对齐为顶部对齐。
            var fontsize = this.__convertFontSize(cellInfo.fonts.size);

            if (cellInfo.content.length * fontsize > rect.height) {
                verticalAlign = 'top';
            }

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

        __convertFontSize: function (size) {
            return Math.round(size * 4 / 3)
        },

        __drawTopText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('top');

            var offset = rect.y;
            var underline = cellInfo.fonts.underline;
            var textWidth;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], rect.x, offset);
                offset += fontSize;

                if (underline) {
                    textWidth = screen.measureText(contents[i]).width;
                    this.__drawUnderline(screen, cellInfo.fonts.size, rect.x, offset, underline, textWidth);
                }
            }
        },

        __drawBottomText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('bottom');

            var offset = rect.height + rect.y;
            var underline = cellInfo.fonts.underline;
            var textWidth;

            for (var i = contents.length - 1; i >= 0; i--) {
                screen.fillText(contents[i], rect.x, offset);

                if (underline) {
                    textWidth = screen.measureText(contents[i]).width;
                    this.__drawUnderline(screen, cellInfo.fonts.size, rect.x, offset, underline, textWidth);
                }

                offset -= fontSize;
            }
        },

        __drawMiddleText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('middle');

            var offset = rect.y + (rect.height - fontSize * contents.length) / 2;
            var underline = cellInfo.fonts.underline;
            var textWidth;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], rect.x, offset + fontSize / 2);
                offset += fontSize;

                if (underline) {
                    textWidth = screen.measureText(contents[i]).width;
                    this.__drawUnderline(screen, cellInfo.fonts.size, rect.x, offset, underline, textWidth);
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

            if (underlineType === 'single') {
                screen.fillRect(x, y - LINE_WIDTH, width, LINE_WIDTH);
            // double
            } else {
                screen.fillRect(x, y - LINE_WIDTH, width, LINE_WIDTH);
                screen.fillRect(x, y - 3 * LINE_WIDTH, width, LINE_WIDTH);
            }
        }
    };
});