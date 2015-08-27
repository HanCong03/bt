/**
 * @file 工作表滚动控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Clipboard', {
        base: require('module'),

        mixin: [
            require('./selection'),
            require('./paste')
        ],

        screen: null,
        offset: 0,
        timer: null,

        init: function () {
            this.__initScreen();
            this.__initMessage();
            this.__initEvent();
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.screen = new Screen(this.getDeviceZoom(), 'btb-copy-screen', this.getMiddleContainer(), size.width, size.height);
        },

        __initMessage: function () {
            this.onMessage({
                'control.copy': this.__copy,
                'control.cut': this.__cut,
                'control.paste': this.__paste
            });
        },

        __initEvent: function () {
            this.on({
                'devicezoomchange': this.__resetZoom,
                'resize': this.__resize
            });
        },

        __copy: function (evt, type) {
            this.__record(evt, 'copy');
        },

        __cut: function (evt) {
            this.__record(evt, 'cut');
        },

        __record: function (evt, type) {
            evt.preventDefault();
            evt.stopPropagation();

            var heap = this.getWorkbookHeap();
            var range = this.queryCommandValue('range');

            heap.data = {
                type: type,
                range: {
                    start: {
                        row: range.start.row,
                        col: range.start.col
                    },
                    end: {
                        row: range.end.row,
                        col: range.end.col
                    }
                }
            };

            this.__start(range);
        },

        __resetZoom: function () {
            var zoom = this.getDeviceZoom();
            this.screen.resetZoom(zoom);
        },

        __resize: function () {
            var size = this.getContentContainerSize();
            this.screen.resize(size.width, size.height);
        },
    });
});