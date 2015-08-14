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
        // 当前保存的有效快照对象
        snapshot: null,

        init: function () {
            this.__initScreen();
            this.__initEvent();
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.screen = new Screen(this.getDeviceZoom(), 'btb-sel-screen', this.getMiddleContainer(), size.width, size.height);
        },

        __initEvent: function () {
            this.on({
                'devicezoomchange': this.__resetZoom
            });
        },

        __resetZoom: function () {
            var zoom = this.getDeviceZoom();

            this.screen.resetZoom(zoom);
        },

        draw: function () {
            // 每一次重绘，都会清空快照对象
            this.snapshot = null;

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
        },

        // 追加
        append: function (entry, start, end) {
            var screen = this.screen;

            if (!this.snapshot) {
                this.snapshot = this.__getSnapshot();
            }

            screen.putImageData(this.snapshot, 0, 0);

            this.__appendSelection(entry, start, end);

            screen.toggle();
        },

        __getSnapshot: function () {
            var ranges = this.queryCommandValue('allrange');
            this.__drawTempSelection(ranges);

            return this.screen.getInvisibleImageData();
        }
    });
});