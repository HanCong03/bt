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

    var THEME_COLOR = FACE_THEME.color;

    var SystemUtils = require('system/utils/utils');

    var Screen = require('system/screen/screen');

    module.exports = $$.createClass('SelectionDrawer', {
        base: require('component'),

        mixin: [
            require('./single')
        ],

        screen: null,

        init: function () {
            this.__initScreen();
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.screen = new Screen('btb-sel-screen', this.getMiddleContainer(), size.width, size.height);
        },

        draw: function () {
            var ranges = this.queryCommandValue('allrange');
            var range;

            if (ranges.length === 1) {
                range = ranges[0];
                this.__drawSingleSelection(range.entry, range.start, range.end);
            }
        },

        update: function (entry, start, end) {
            var ranges = this.queryCommandValue('allrange');

            if (ranges.length === 1) {
                this.__drawSingleSelection(entry, start, end);
            } else {
                console.log(3)
            }
        }
    });
});