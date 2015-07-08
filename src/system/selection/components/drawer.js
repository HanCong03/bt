/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('system/screen/screen');

    module.exports = $$.createClass('SelectionDrawer', {
        base: require('component'),

        mixin: [
            require('./single'),
            require('./multi')
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
            } else {
                this.__drawMultiSelection(ranges);
            }

            this.screen.toggle();
        },

        // change操作不区分选区数量。总是抹掉所有选区，然后建立新选区
        change: function (entry, start, end) {
            this.__drawSingleSelection(entry, start, end);
            this.screen.toggle();
        }
    });
});