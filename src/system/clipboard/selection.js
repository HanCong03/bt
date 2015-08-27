/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;

    var FACE_THEME = require('definition/face-theme');
    var FOCUS_COVER_COLOR = FACE_THEME.focus.cover;
    var FOCUS_SPACE_COLOR = FACE_THEME.focus.space;

    var TIME_INTERVAL = 40;

    var THEME_COLOR = FACE_THEME.color;

    module.exports = {
        __start: function (range) {
            var _self = this;
            this.offset = (this.offset + 1) % 12;

            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _self.__drawCopySelection(range);
                _self.__start(range);
            }, TIME_INTERVAL);
        },

        __drawCopySelection: function (range) {
            var rect = this.rs('get.visible.rect', range.start, range.end);

            if (!rect) {
                return;
            }

            var screen = this.screen;
            var visualData = this.rs('get.visual.data');

            screen.save();

            screen.setLineWidth(DOUBLE_LINE_WIDTH);

            screen.translate(visualData.headWidth, visualData.headHeight);
            screen.strokeColor(FACE_THEME.fill);

            screen.strokeRect(rect.x, rect.y, rect.width, rect.height);

            screen.strokeColor(THEME_COLOR);
            screen.setLineDashOffset(this.offset);
            screen.setLineDash([10, 2]);

            screen.strokeRect(rect.x, rect.y, rect.width, rect.height);

            screen.restore();

            this.screen.toggle();
        }
    };
});