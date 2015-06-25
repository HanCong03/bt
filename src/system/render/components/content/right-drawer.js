/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var StyleHelper = require('./style-helper');
    var DEFAULTS = require('../../definition/defaults');

    module.exports = {
        draw: function (screen, cellInfo, rect) {
            var verticalAlign = cellInfo.alignments.vertical;

            if ($$.isNdef(verticalAlign)) {
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
                    return this.__drawTopText(screen, cellInfo, rect);
                    break;

                case 'bottom':
                    return this.__drawBottomText(screen, cellInfo, rect);

                case 'middle':
                    return this.__drawMiddleText(screen, cellInfo, rect);
            }

            screen.restore();
        },

        __drawTopText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('top');

            var offset = rect.y;
            var x = rect.x + rect.width;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], x, offset);
                offset += fontSize;
            }
        },

        __drawBottomText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('bottom');

            var offset = rect.height + rect.y;
            var x = rect.x + rect.width;

            for (var i = contents.length - 1; i >= 0; i--) {
                screen.fillText(contents[i], x, offset);
                offset -= fontSize;
            }
        },

        __drawMiddleText: function (screen, cellInfo, rect) {
            var contents = cellInfo.content;
            var fontSize = Math.round(cellInfo.fonts.size * 4 / 3);

            screen.textBaseline('middle');

            var offset = rect.y + (rect.height - fontSize * contents.length) / 2;
            var x = rect.x + rect.width;

            for (var i = 0, len = contents.length; i < len; i++) {
                screen.fillText(contents[i], x, offset  + fontSize / 2);
                offset += fontSize;
            }
        }
    };
});